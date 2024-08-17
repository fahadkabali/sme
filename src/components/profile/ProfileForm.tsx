"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  user: {
    id: string
    name: string
    email: string
    companyName: string
    companyType: string
    industry: string
    location: string
    description: string
    website: string
  }
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState(user)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      router.refresh()
    } else {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full p-2 border rounded"
      />
      <select
        name="companyType"
        value={formData.companyType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Company Type</option>
        <option value="SME">SME</option>
        <option value="Large Enterprise">Large Enterprise</option>
      </select>
      <input
        type="text"
        name="industry"
        value={formData.industry}
        onChange={handleChange}
        placeholder="Industry"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Company Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="Website"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  )
}