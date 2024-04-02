'use client';
import { SessionProvider } from 'next-auth/react';

function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default NextAuthProvider;
