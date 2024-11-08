import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen p-4">
      <nav>
        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          Profile
        </Link>
        <Link href="/matches" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          Matches
        </Link>
      </nav>
    </div>
  );
}
