"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase" // Assurez-vous que ce chemin est correct
import { Button } from "@/components/ui/button"
import { Menu, X, User, LayoutDashboard } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    checkUser()

    // Écouter les changements d'état (connexion/déconnexion)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const routes = [
    { href: "/", label: "Accueil" },
    { href: "/#manifesto", label: "Manifeste" },
    { href: "/#propose", label: "Participer" },
    { href: "/#ideas", label: "Idées" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Montpellier Horizon</span>
          </Link>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
          
          {/* Bouton Dynamique : Connexion ou Dashboard */}
          {user ? (
            <Button variant="default" size="sm" asChild>
              <Link href="/admin/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <User className="mr-2 h-4 w-4" />
                Se connecter
              </Link>
            </Button>
          )}
        </nav>

        {/* Menu Mobile (Hamburger) */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Content */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium"
            >
              {route.label}
            </Link>
          ))}
          <div className="pt-4 border-t">
            {user ? (
              <Button className="w-full" asChild>
                <Link href="/admin/dashboard">Accéder au Dashboard</Link>
              </Button>
            ) : (
              <Button className="w-full" variant="outline" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}