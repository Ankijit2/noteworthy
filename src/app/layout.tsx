import type { Metadata } from "next";

import "./globals.css";

import QueryProvider from "@/lib/query-client-provider";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export const metadata: Metadata = {
  title: "NoteWorthy",
  description: "NoteWorthy your notes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <QueryProvider>
        <UserProvider>
      
      <body
       
      >
        {children}
      </body>
      
      </UserProvider>
      </QueryProvider>
    </html>
  );
}
