import Image from "next/image";
import { LoginForm } from "./components/forms/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm/>
    </main>
  );
}
