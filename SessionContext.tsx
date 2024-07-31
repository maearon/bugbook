// SessionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Session {
  id: string;
  // Add other session properties if needed
}

interface User {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  // Add other user properties if needed
}

interface SessionContextType {
  user: User | null;
  session: Session | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  return (
    <SessionContext.Provider value={{ user, session, setUser, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
