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

