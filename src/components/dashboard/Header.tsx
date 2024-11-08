import LogoutButton from '../auth/LogoutButton';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow dark:bg-gray-800">
      <h1 className="text-2xl font-bold dark:text-gray-200">Dashboard</h1>
      <LogoutButton />
    </header>
  );
}
