import React from 'react';
// Changed from @/ to relative paths to fix your import error
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const Navbar = () => {
  const navItems = [
    { name: 'About', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-background/60 backdrop-blur-xl border border-border/50 rounded-full px-4 py-2 flex justify-between items-center shadow-lg shadow-black/20">
        
        {/* Branding */}
        <div className="flex items-center gap-2 pl-2">
  <div className="h-9 w-9 bg-primary/20 border border-primary/50 rounded-lg flex items-center justify-center font-black text-primary text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
    YS
  </div>
  <span className="font-bold tracking-tight hidden sm:block text-white">Yash Sahane</span>
</div>

        {/* Navigation Items */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {/* Link to IDs like #experience or #projects */}
                <a 
                  href={item.href} 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent hover:bg-accent/50 rounded-full transition-all duration-300"
                  )}
                >
                  {item.name}
                </a>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* View CV Button - No Download, Opens in New Tab */}
        <div className="flex items-center gap-2">
          <a 
            href="/Yash-Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-6 font-medium border-primary/40 hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
            >
              View CV
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;