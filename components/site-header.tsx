"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    { href: "/", label: "Accueil" },
    { href: "/#manifesto", label: "Manifeste" },
    { href: "/#propose", label: "Participer" },
    { href: "/#ideas", label: "Idées" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-bold text-lg">Montpellier Votre voix </Link>
        
        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map(r => (
            <Link 
              key={r.href} 
              href={r.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === r.href ? "text-foreground" : "text-foreground/60"}`}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        {/* Menu Mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X/> : <Menu/>}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          {routes.map(r => (
            <Link key={r.href} href={r.href} onClick={() => setIsOpen(false)} className="block py-2 font-medium">
              {r.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}