import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { SuperTokensProvider } from "./_components/supertokensProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
          <SuperTokensProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </SuperTokensProvider>
      </body>
    </html>
  );
}
