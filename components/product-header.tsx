"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductHeader() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </div>
    </div>
  )
}
