import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

type AuthenticatedMiddlewareProps = {
  children: ReactNode;
};

export function AuthenticatedMiddleware({
  children,
}: AuthenticatedMiddlewareProps) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };

        localStorage.setItem("@devlink:user", JSON.stringify(userData));

        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <></>;
  }

  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
