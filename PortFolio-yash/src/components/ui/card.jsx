import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base Glassmorphism & 3D setup
      "rounded-[2rem] border border-white/10 bg-slate-900/40 text-card-foreground backdrop-blur-xl transition-all duration-500",
      "transform-gpu preserve-3d", 
      // Floating Shadow & Hover Lift
      "shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(59,130,246,0.25)]",
      "hover:-translate-y-4 hover:[transform:translateZ(30px)] hover:border-blue-500/50",
      className
    )}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-7 [transform:translateZ(20px)]", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-bold leading-none tracking-tight text-white drop-shadow-md", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-7 pt-0 [transform:translateZ(10px)]", className)} 
    {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }