import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../lib/firebase';

const AuthContext = createContext({ currentUser: null });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsb = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsb;
  }, []);

  const context = { currentUser };

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
