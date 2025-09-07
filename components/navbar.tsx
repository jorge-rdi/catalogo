"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              Tienda
            </Link>
            <Link href="/productos" className="text-foreground hover:text-muted-foreground transition-colors">
              Productos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
