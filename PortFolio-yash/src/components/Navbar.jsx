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
    <nav aria-label="Main navigation" className="portfolio-navbar fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="portfolio-nav-shell border rounded-full px-4 py-2 flex justify-between items-center">
        
        {/* Branding */}
        <div className="flex items-center gap-2 pl-2">
  <div className="portfolio-brand-mark h-9 w-9 border rounded-lg flex items-center justify-center font-black text-sm">
    YS
  </div>
  <span className="font-bold tracking-tight hidden sm:block text-white">Yash Sahane</span>
</div>

        {/* Navigation Items */}
        <NavigationMenu className="portfolio-nav-links">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                {/* Link to IDs like #experience or #projects */}
                <a 
                  href={item.href} 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "portfolio-nav-link bg-transparent rounded-full"
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
            href="/Resume May - Yash Sahane.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="portfolio-cv-button rounded-full px-6 font-medium"
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