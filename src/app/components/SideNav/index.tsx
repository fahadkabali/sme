import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

interface SideNavProps {
  items: NavItem[];
}

const SideNav: React.FC<SideNavProps> = ({ items }) => {
  return (
    <nav className="w-64 bg-gray-800 h-screen fixed left-0 top-0 overflow-y-auto">
      <ul className="py-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link 
              href={item.href}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;