import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase/userFunction";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  currentUser: null,
});

export const Context = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user?.uid);
      setBusy(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {children}
    </AuthContext.Provider>
  );
};


