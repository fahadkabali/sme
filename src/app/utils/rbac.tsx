import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ComponentType } from "react"
import { User } from "../types/auth"  

type Permission = 'create:product' | 'edit:product' | 'delete:product' | 'view:analytics';

const rolePermissions: Record<User['role'], Permission[]> = {
  'SME': ['create:product', 'edit:product', 'delete:product'],
  'BigBrand': ['create:product', 'edit:product', 'delete:product', 'view:analytics'],
};

export function hasPermission(user: User, permission: Permission): boolean {
  return rolePermissions[user.role].includes(permission);
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredPermission?: Permission
) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()
    if (!session) {
        router.replace("/auth/signin")
        return null
      }
    const user = session.user as User
    if (requiredPermission && !hasPermission(user, requiredPermission)) {
      router.replace("/unauthorized")
      return null
    }
    return <WrappedComponent {...props} />
  }
}