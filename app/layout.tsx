import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import {
  ListingFilterProvider,
  SearchBarFormProvider,
  SearchBarScrollProvider,
} from "@/components/search/SearchBarContext";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCOF | AI Solutions",
  description: "Cutting-edge AI solutions for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${syne.variable} ${outfit.variable} font-sans antialiased`}
      >
        <ReduxProvider>
        <SearchBarFormProvider>
          <ListingFilterProvider>
            <SearchBarScrollProvider>{children}</SearchBarScrollProvider>
          </ListingFilterProvider>
        </SearchBarFormProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}
