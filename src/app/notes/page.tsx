"use client"

import { useState } from 'react'
import { Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Note } from '@prisma/client'
import Addform from './components/add-form'
import { useGetNotes } from './hooks/hooks'
import Editform from './components/edit-form'
import { Skeleton } from "@/components/ui/skeleton"
import { useDeleteNotes } from './hooks/hooks'
import Profile from './components/profile'
import { useToast } from '@/hooks/use-toast'

export default function NotesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading } = useGetNotes()
  const { mutate } = useDeleteNotes()

  const filteredNotes = data?.filter((note: Note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async(id: string) => {
    console.log(id)
    await mutate(id,{
      onSuccess: () => {
        toast({
          title: "Note Deleted",
          description: "Note deleted successfully",
        })
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete note",
        })
      }
    })
  }
  return (
    <div className="container mx-auto p-4 max-w-7xl ">
      <div className='flex justify-between'> <h1 className="text-3xl font-bold mb-6">Your Created Notes</h1>
      <Profile/></div>
     
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Addform />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          // Actual notes
          filteredNotes?.map((note: Note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle className="break-words">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">{note.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</span>
                <div className="flex space-x-2">
                  <Editform note={note} />
                  <Button variant="outline" size="icon" onClick={() => handleDelete(note.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete note</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}