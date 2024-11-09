import z from 'zod';

export const addNotesSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters long' }).max(100, { message: 'Title must be at most 100 characters long' }),
    content: z.string().min(3, { message: 'Content must be at least 3 characters long' }).max(1000, { message: 'Content must be at most 1000 characters long' }),
});