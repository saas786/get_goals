import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase/userFunction";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  currentUser: null,
});

export const TaskContext = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user?.uid);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser: user }}>
      {children}
    </AuthContext.Provider>
  );
};