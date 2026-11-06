// bring in shared memory tools & the type for inner pieces
import { createContext, ReactNode, useContext, useState } from 'react';

// the facts every page can read
type AuthContextValue = {
  email: string; // the saved email, or an empty string
  isLoggedIn: boolean; // true after a person logs in
  logIn: (email: string) => void; // save the email
  logOut: () => void; // clear the email
};

// the shared box that holds those facts
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// wrap the app so every page can use the shared box
export function AuthProvider({ children }: { children: ReactNode }) {
  // remember the email for the whole app
  const [email, setEmail] = useState('');

  // save an email when a person logs in
  function logIn(nextEmail: string) {
    setEmail(nextEmail);
  }

  // clear the email when a person logs out
  function logOut() {
    setEmail('');
  }

  return (
    // share the email, the login flag & the two actions
    <AuthContext.Provider
      value={{
        email,
        isLoggedIn: email.length > 0,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// a helper so a page can read the shared box
export function useAuth() {
  // grab the shared box
  const value = useContext(AuthContext);

  // stop if a page forgot the provider
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return value;
}