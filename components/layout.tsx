import Navbar from "./navbar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
