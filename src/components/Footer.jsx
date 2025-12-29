'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>using Next.js, shadcn/ui & Recharts</span>
          </div>

          {/* Center Section */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} FinBoard. All rights reserved.
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-md hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-md hover:bg-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>

            <a
              href="mailto:contact@finboard.com"
              className="p-1 rounded-md hover:bg-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
} 
