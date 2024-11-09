/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState,useCallback, useEffect } from 'react'
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
  import { Textarea } from "@/components/ui/textarea"
  import { Button } from "@/components/ui/button"
  import { zodResolver } from '@hookform/resolvers/zod'
  import { useForm,useWatch } from 'react-hook-form'
  import { addNotesSchema } from '@/types/type'
  import z from 'zod'
import { Input } from '@/components/ui/input'

import { useToast } from '@/hooks/use-toast'
import { Edit2 } from 'lucide-react'
import { useUpdateNotes } from '../hooks/hooks'

export default function Editform({note}:any) {
    const { mutate,isPending } = useUpdateNotes()
    const { toast } = useToast()
    const initialValues = useCallback(
        () => ({
            title: note.title,
            content: note.content,
        }),
        [note.title, note.content],
      );
    
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDirty, setIsDirty] = useState(false);
    const editForm = useForm<z.infer<typeof addNotesSchema>>({
        resolver: zodResolver(addNotesSchema),
        defaultValues: {
          title: note.title,
          content: note.content,
        },
      })
      const watchedValues = useWatch({
        control: editForm.control,
      });

      useEffect(() => {
        const initial = initialValues();
        const isChanged = JSON.stringify(initial) !== JSON.stringify(watchedValues);
        setIsDirty(isChanged);
        
      },[watchedValues,initialValues])


  
    const updateNote = async (data: z.infer<typeof addNotesSchema>) => {
        const id = note.id
        mutate({...data,id}, {
          onSuccess: () => {
            toast({
              title: "Note Updated",
              description: "Note updated successfully",
            })
          },
          onError: () => {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update note",
            })
          },onSettled: () => {
            setIsEditDialogOpen(false);
          },
        });
      }
const openEditDialog = () => setIsEditDialogOpen(true)
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="outline" size="icon" onClick={() => openEditDialog()}>
        <Edit2 className="h-4 w-4" />
        <span className="sr-only">Edit note</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Note</DialogTitle>
      </DialogHeader>
      <Form {...editForm}>
        <form onSubmit={editForm.handleSubmit(updateNote)} className="space-y-4">
          <FormField
            control={editForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isDirty || isPending}>{isPending ? "Updating..." : "Update Note"}</Button>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
  )
}

