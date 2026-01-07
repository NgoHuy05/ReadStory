"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, initialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/login");
    }
  }, [initialized, user, router]);


  if (!user) return null;

  return <>{children}</>;
}
