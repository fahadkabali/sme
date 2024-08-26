import Link from 'next/link'
import Hero from '@components/home/Hero'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to SME Matching</h1>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Log In
        </Link>
        <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Register
        </Link>
      </div>
      <Hero />
    </div>
  )
}
