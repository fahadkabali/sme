export interface User {
    id: string,
    email: string,
    role: 'SME' | 'BigBrand'| 'Admin',
}
interface SessionUser {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
  
  const sessionUser = (session: { user: SessionUser }) => session.user