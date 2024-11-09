import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma-client'
import { getSession } from "@auth0/nextjs-auth0";
import { addNotesSchema } from '@/types/type';

// GET /api/notes/:id - Retrieve a note by ID
export async function GET(req: NextRequest) {


    const session = await getSession() 
    const id = req.nextUrl.searchParams.get('id');
  try {
    if(!session) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }
   const note = await prisma.note.findMany({
       where: { userId: session.user.sub,
        ...(id && { id: id }),
        },
   })
    if (!note) {
      return NextResponse.json({ error: 'Note not found or access denied' }, { status: 404 })
    }
    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve note' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
    const session = await getSession()
    try {
      const { title, content } = await req.json()
      if(!session) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
      }
      const validated = addNotesSchema.safeParse({ title, content });
      if (!validated.success) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
      }

     console.log(session.user)
  
      const newNote = await prisma.note.create({
        data: { title, content, userId: session.user.sub },
      })
      return NextResponse.json(newNote)
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
     
    }
  }

// PUT /api/notes/:id - Update a note by ID
export async function PUT(req: NextRequest) {
  
  const data = await req.json()

  const session = await getSession()
  if(!session) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
  }
const updateNotesSchema = addNotesSchema.partial();
  const validated = updateNotesSchema.safeParse(data);
  if (!validated.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  try {
  

    

    const updatedNote = await prisma.note.update({
      where: { 
        id:data.id,
        userId: session.user.sub
       },
      data: { 
        title: validated.data.title,
        content: validated.data.content
       },
    })
    if(!updatedNote) {
      return NextResponse.json({ error: 'Note not found or access denied' }, { status: 404 })
    }
    return NextResponse.json(updatedNote)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

// DELETE /api/notes/:id - Delete a note by ID
export async function DELETE(req: NextRequest,) {
    const session = await getSession()

    const id = req.nextUrl.searchParams.get('id');

    
    if(!id) {
      return NextResponse.json({ error: 'Id not found' }, { status: 404 })
    }

    if(!session) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }


  try {
   

    await prisma.note.delete({
      where: { id: id,userId: session.user.sub },
    })
    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}