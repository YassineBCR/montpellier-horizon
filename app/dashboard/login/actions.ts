// app/login/actions.ts
"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Email ou mot de passe incorrect." }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const pseudo = formData.get("pseudo") as string

  // 1. Créer l'utilisateur Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  // 2. Le profil est créé automatiquement via le Trigger SQL (étape précédente),
  // mais on peut mettre à jour le pseudo ici si besoin.
  // Note: Par sécurité, le rôle est 'user' par défaut.
  
  revalidatePath("/", "layout")
  redirect("/")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}