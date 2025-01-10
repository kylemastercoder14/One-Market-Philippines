import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";

// Define local fonts
const helveticaLight = localFont({
  src: "./fonts/helvetica/helvetica-light.ttf",
  variable: "--font-helvetica-light",
});
const helveticaRegular = localFont({
  src: "./fonts/helvetica/Helvetica.ttf",
  variable: "--font-helvetica-regular",
});
const helveticaBold = localFont({
  src: "./fonts/helvetica/Helvetica-Bold.ttf",
  variable: "--font-helvetica-bold",
});
const costaLight = localFont({
  src: "./fonts/costa/CostaPtf-Light.otf",
  variable: "--font-costa-light",
});
const costaRegular = localFont({
  src: "./fonts/costa/CostaPtf-Regular.otf",
  variable: "--font-costa-regular",
});
const costaBold = localFont({
  src: "./fonts/costa/CostaPtf-Bold.otf",
  variable: "--font-costa-bold",
});

// Combine all font variables
const fontVariables = [
  helveticaLight.variable,
  helveticaRegular.variable,
  helveticaBold.variable,
  costaLight.variable,
  costaRegular.variable,
  costaBold.variable,
].join(" ");

// Metadata for the app
export const metadata: Metadata = {
  title: "1 Market Philippines",
  description: "Generated by create next app",
};

// Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
