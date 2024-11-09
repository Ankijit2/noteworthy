"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { addNotesSchema } from '@/types/type'
import z from 'zod'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePostNotes } from '../hooks/hooks'
function Addform() {
  const { mutate,isPending } = usePostNotes()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const addForm = useForm<z.infer<typeof addNotesSchema>>({
    resolver: zodResolver(addNotesSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  function addNote(data: z.infer<typeof addNotesSchema>) {
    mutate(data,{
      onSettled: () => setIsAddDialogOpen(false)
    })
    
  }

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    <DialogTrigger asChild>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Add Note
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Note</DialogTitle>
      </DialogHeader>
      <Form {...addForm}>
        <form onSubmit={addForm.handleSubmit(addNote)} className="space-y-4">
          <FormField
            control={addForm.control}
            name="title"
            render={({ field,fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Note Title" {...field} />
                </FormControl>
                <FormMessage >{fieldState.error?.message  }</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={addForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Note Content" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>{isPending ? "Adding..." : "Add Note"}</Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
  )
}

export default Addform