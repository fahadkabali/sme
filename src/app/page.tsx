import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to SME Matching</h1>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Log In
        </Link>
        <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Register
        </Link>
      </div>
    </div>
  )
}



// import Link from "next/link";
// import { getDBVersion } from "./db";

// export default async function Home() {
//     const { version } = await getDBVersion();
//     console.log({version})
    
//   return (
//     <main className='w-full'>
//       <section className='p-8 h-[90vh] md:w-2/3 mx-auto text-center w-full flex flex-col items-center justify-center'>
//         <h2 className='text-3xl font-bold mb-4 md:text-4xl'>
//           Create invoices for your customers
//         </h2>
//         <p className='opacity-70 mb-4 text-sm md:text-base leading-loose'>
//           Invoicer is an online invoicing software that helps you craft and
//           print professional invoices for your customers for free! Keep your
//           business and clients with one invoicing software.
//         </p>
//         <Link
//           href='/dashboard'
//           className='rounded w-[200px] px-2 py-3 bg-blue-500 text-gray-50'
//         >
//           LOG IN
//         </Link>
//       </section>
//     </main>
//   );
// }