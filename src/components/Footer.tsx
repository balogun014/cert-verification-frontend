import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary"></div>
              <span className="text-xl font-bold">CertiChain</span>
            </div>
            <p className="text-muted-foreground">
              Secure blockchain certification verification for educational institutions and professionals.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink to="/verify">Verify Certificate</FooterLink>
            </ul>
          </div>
          
      
          
    
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}Balogun CertiChain. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <SocialLink href="https://twitter.com" label="Twitter" />
            <SocialLink href="https://linkedin.com" label="LinkedIn" />
            <SocialLink href="https://github.com" label="GitHub" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, label }: { href: string; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-muted-foreground hover:text-foreground transition-colors"
    aria-label={label}
  >
    {label}
  </a>
);

export default Footer;
