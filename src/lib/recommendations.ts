import * as tf from '@tensorflow/tfjs'
import { prisma } from './db'

async function trainRecommendationModel() {
  const users = await prisma.user.findMany()
  const userFeatures : any = users.map((user) => [
    user.industry,
    user.companyType,
    user.location,
  ])
  const userIds = users.map((user) => user.id)

  const model = tf.sequential()
  model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [3] }))
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }))
  model.add(tf.layers.dense({ units: userIds.length, activation: 'sigmoid' }))
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' })

  const trainData = tf.tensor2d(userFeatures)
  const trainLabels = tf.tensor2d(
    userIds.map((id) => userIds.map((userId) => userId === id))
  )

  await model.fit(trainData, trainLabels, { epochs: 10, batchSize: 32 })
  return { model, userIds }
}

export async function getRecommendations(userId: string, limit = 10) {
  const { model, userIds } = await trainRecommendationModel()

  const userFeatures = await prisma.user.findUnique({
    where: { id: userId },
    select: { industry: true, companyType: true, location: true },
  })

  const userInput = tf.tensor2d([[
    userFeatures?.industry || '',
    userFeatures?.companyType || '',
    userFeatures?.location || '',
  ]])

  const predictions = await model.predict(userInput)
  const data = Array.isArray(predictions) ? predictions.map(tensor => tensor.data()) : predictions.data() 

  const sortedIndices = predictions[0].argsort((a: number, b: number) => b - a)

  const recommendedUserIds = sortedIndices
    .filter((index: any) => userIds[index] !== userId) 
    .slice(0, limit)
    .map((index: any) => userIds[index])

  const recommendedUsers = await prisma.user.findMany({
    where: { id: { in: recommendedUserIds } },
  })

  return recommendedUsers.map((user) => ({
    id: user.id,
    name: user.name,
    companyName: user.companyName,
    companyType: user.companyType,
    industry: user.industry,
    location: user.location,
    description: user.description,
    website: user.website,
  }))
}