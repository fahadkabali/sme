"use client"

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    
    <button  
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">          
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </button>
  )
}