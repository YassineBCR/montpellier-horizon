// components/site-header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { LayoutDashboard, LogIn, User, LogOut } from "lucide-react"
import { logout } from "@/app/login/actions"

export async function SiteHeader() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Vérification du rôle UNIQUEMENT si connecté
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
    isAdmin = profile?.role === 'admin'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl hover:opacity-80 transition-opacity">
           <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">M</div>
           <span className="hidden sm:inline">Montpellier<span className="text-primary">Horizon</span></span>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-3 md:gap-4">
          {user ? (
            <>
              {/* Bouton Admin - Visible uniquement si Admin */}
              {isAdmin && (
                <Button variant="default" size="sm" asChild className="hidden md:flex shadow-sm bg-purple-600 hover:bg-purple-700 text-white">
                  <Link href="/dashboard"><LayoutDashboard className="w-4 h-4 mr-2"/> Admin</Link>
                </Button>
              )}
              
              <div className="flex items-center gap-2 pl-2 md:pl-4 md:border-l">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="bg-muted p-1.5 rounded-full"><User className="w-4 h-4"/></div>
                    <span className="hidden md:inline-block max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                </div>
                
                <form action={logout}>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" title="Se déconnecter">
                        <LogOut className="w-4 h-4"/>
                    </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/login">Inscription</Link>
                </Button>
                <Button size="sm" asChild>
                <Link href="/login"><LogIn className="w-4 h-4 mr-2"/> Connexion</Link>
                </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}