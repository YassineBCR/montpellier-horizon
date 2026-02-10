import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Montpellier Horizon - Plateforme de Participation Citoyenne',
  description:
    'Collectons, structurons et présentons nos besoins aux candidats des municipales. Une plateforme de démocratie participative pour Montpellier.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
