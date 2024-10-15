import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";
import NavigationBar from "../_components/admin/NavigationBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <SignedIn>
        <header>
          <NavigationBar />
        </header>
        <main>{children}</main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/admin" />
      </SignedOut>
    </>
  );
};

export default AdminLayout;
