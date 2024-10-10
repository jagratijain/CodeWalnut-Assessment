/* eslint-disable react/jsx-filename-extension */
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import "./globals.css"; // Import global styles

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata = {
  title: "CodeWalnut",
  description: "Tech Test",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children} {/* Render child components */}
        </body>
      </AuthProvider>
    </html>
  );
}
