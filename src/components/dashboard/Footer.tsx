import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
  sidebarWidth?: number;
  isSidebarOpen?: boolean;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({
  className,
  sidebarWidth = 256,
  isSidebarOpen = true,
}) => {
  // Footer sections data
  const footerSections: FooterSection[] = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "News", href: "/news" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:contact@yourbrand.com",
      icon: Mail,
    },
  ];

  // Calculate footer position based on sidebar
  const footerStyle = {
    marginLeft: isSidebarOpen ? `${sidebarWidth}px` : '0',
    width: isSidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
  };

  return (
    <footer
      className={cn(
        "bg-gray-900 text-gray-200 border-t border-gray-800",
        className
      )}
      style={footerStyle}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-block"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                YourBrand
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Empowering businesses with innovative solutions for a better tomorrow.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} YourBrand. All rights reserved.
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link href="/accessibility" className="hover:text-blue-400 transition-colors duration-200">
                Accessibility
              </Link>
              <Link href="/sitemap" className="hover:text-blue-400 transition-colors duration-200">
                Sitemap
              </Link>
              <a 
                href="tel:+1234567890"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;