// components/withAuth.tsx
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ComponentType } from "react"
import { User } from "../types/auth"  

type AllowedRoles = ('SME' | 'BigBrand')[]

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles?: AllowedRoles
) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") {
      return <p>Loading...</p>
    }

    if (!session) {
      router.replace("/auth/signin")
      return null
    }

    const user = session.user as User

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized")
      return null
    }

    return <WrappedComponent {...props} />
  }
}