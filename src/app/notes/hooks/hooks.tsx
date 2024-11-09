import axios from 'axios'
export const  apiClient = axios.create({ baseURL: '/api/' });
import z from 'zod';
import { addNotesSchema } from '@/types/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const getNotes = async (id?: string) => {
  return (await apiClient.get(`notes${id ? `?id=${id}` : ''}`))
    .data;
};

export const postNotes = async (data: z.infer<typeof addNotesSchema>) => {
  return (await apiClient.post('notes', data)).data;
};

export const deleteNotes = async (id:string) => {
  return (await apiClient.delete(`notes?id=${id}`,)).data;
};

export const updateNotes = async (data: { id: string; title: string; content: string;}) => {
  return (await apiClient.put('notes', data)).data;
};


export function useGetNotes(id?: string) {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => getNotes(id),
  });
}

export function usePostNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postNotes,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useDeleteNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNotes,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

export function useUpdateNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNotes,
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}