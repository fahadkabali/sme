import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Only allow access to the dashboard if the user is authenticated
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = { matcher: ['/dashboard'] }






// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value
 
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }
 
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }