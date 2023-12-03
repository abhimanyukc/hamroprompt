'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  //wrapping other component
  <SessionProvider session={session}>
     {/* rendering children */}
    {children}
  </SessionProvider>
)

export default Provider;
