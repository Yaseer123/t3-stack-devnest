import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Head from "next/head";
import NavigationBar from "~/components/admin/NavigationBar";
import { AuroraBackground } from "~/components/ui/aurora-background";
import { ThemeProvider } from "~/components/ThemeProvider"; // Import ThemeProvider

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <SignedIn>
          <AuroraBackground>
            {/* Header with Navigation */}
            <header>
              <NavigationBar />
            </header>
            {/* Main content */}
            <main className="min-h-screen">{children}</main>{" "}
            {/* Full viewport height */}
          </AuroraBackground>
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn redirectUrl="/admin" />
        </SignedOut>
      </>
    </ThemeProvider>
  );
};

export default AdminLayout;
