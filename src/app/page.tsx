'use client'

import Link from 'next/link'
import {  Edit3, Save, Clock, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'


interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

export default function HomePage() {
  const { user, isLoading } = useUser()
  



  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">NoteWorthy</div>
          <div className="space-x-4">
            {isLoading ? (
              <Button variant="ghost" disabled>Loading...</Button>
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/notes">My Notes</Link>
                </Button>
                <Button asChild>
                  <Link href="/api/auth/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href="/api/auth/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Capture Your Thoughts, Anytime, Anywhere
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            NoteWorthy is your digital notebook, designed for speed, simplicity, and seamless organization.
          </p>
        
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Edit3 className="h-10 w-10 text-blue-500" />}
            title="Easy Note-Taking"
            description="Quickly jot down your ideas with our intuitive interface."
          />
          <FeatureCard
            icon={<Save className="h-10 w-10 text-green-500" />}
            title="Auto-Save"
            description="Never lose your work. Notes are saved automatically as you type."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-purple-500" />}
            title="Time-Stamped"
            description="Keep track of when you created or last modified your notes."
          />
          <FeatureCard
            icon={<Cloud className="h-10 w-10 text-indigo-500" />}
            title="Cloud Sync"
            description="Access your notes from any device, anytime, anywhere."
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 NoteWorthy. All rights reserved.</p>
      </footer>
    </div>
  )
}