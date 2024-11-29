import localFont from "next/font/local";
import "./globals.css";

// Import font lokal untuk Geist Sans
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Menyediakan rentang berat
  fallback: ["sans-serif"], // Fallback font jika font lokal gagal
});

// Import font lokal untuk Geist Mono
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  fallback: ["monospace"], // Fallback untuk font monospaced
});

// Metadata halaman
export const metadata = {
  title: "Voice to Text",
  description: "An application for real-time voice translation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata tambahan */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
      className="bg-white text-black antialiased"
     
        style={{
          fontFamily: "var(--font-geist-sans, Arial, sans-serif)", // Gunakan font Geist Sans sebagai default
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
