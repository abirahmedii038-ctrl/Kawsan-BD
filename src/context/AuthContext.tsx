import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isDemoAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  toggleDemoAdmin: (enable?: boolean) => void;
  adminEmail: string;
}

const BOOTSTRAP_ADMIN_EMAIL = 'abirahmedii038@gmail.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('vionex_demo_admin') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.email === BOOTSTRAP_ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const toggleDemoAdmin = (enable?: boolean) => {
    setIsDemoAdmin((prev) => {
      const next = enable !== undefined ? enable : !prev;
      localStorage.setItem('vionex_demo_admin', String(next));
      return next;
    });
  };

  const effectiveAdmin = isAdmin || isDemoAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: effectiveAdmin,
        isDemoAdmin,
        loading,
        signInWithGoogle,
        logOut,
        toggleDemoAdmin,
        adminEmail: BOOTSTRAP_ADMIN_EMAIL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
