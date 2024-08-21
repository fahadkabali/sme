
export interface User {
    id: string;
    email: string;
    role: 'SME' | 'BigBrand';
  }
  
  export interface SignInCredentials {
    email: string;
    password: string;
  }
  
  export interface SignUpData extends SignInCredentials {
    role: 'SME' | 'BigBrand';
  }