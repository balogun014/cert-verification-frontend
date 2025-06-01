import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary"></div>
            <span className="text-xl font-bold">CertiChain</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/verify">Verify Certificate</NavLink>
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-2">
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/verify" onClick={toggleMenu}>Verify Certificate</MobileNavLink>
            <MobileNavLink to="/issue" onClick={toggleMenu}>Issue Certificate</MobileNavLink>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
  >
    {children}
  </Link>
);

// Mobile Navigation Link
const MobileNavLink = ({ to, onClick, children }: { to: string; onClick?: () => void; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-muted transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
