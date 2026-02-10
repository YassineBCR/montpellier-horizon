// lib/actions.ts
"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// 1. Soumettre une proposition
export async function submitProposal(data: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('proposals').insert({
    title: data.title,
    content: data.content,
    theme: data.theme,
    sector: data.sector,
    neighborhood: data.neighborhood,
    is_anonymous: data.isAnonymous,
    author_pseudo: data.pseudo || 'Anonyme',
    contact_email: data.email,
    status: 'pending' // Par défaut en attente
  })

  if (error) {
    console.error("Erreur Supabase:", error)
    throw new Error("Erreur lors de l'enregistrement")
  }

  // Optionnel : Envoyer un mail via Resend ici
  return { success: true }
}

// 2. Récupérer les propositions publiées (pour la page d'accueil)
export async function getPublishedProposals() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('proposals')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  
  return data || []
}

// 3. Actions Admin (Valider/Rejeter)
export async function updateProposalStatus(id: string, status: 'published' | 'rejected') {
  const supabase = await createClient()
  
  // Vérification de sécurité (Role Admin)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Non connecté")
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') throw new Error("Non autorisé")

  await supabase.from('proposals').update({ status }).eq('id', id)
  revalidatePath('/dashboard')
  revalidatePath('/')
  return { success: true }
}