import { useState, useEffect } from "react";
import Navbar from "./navbar";

export default function Layout({ children }: React.PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <>
      <Navbar />
      {hydrated ? <main>{children}</main> : <main>Loading...</main>}
    </>
  );
}
