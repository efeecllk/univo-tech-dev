import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Univo - University Events & Announcements",
  description: "Your central hub for university events, announcements, and campus news. Stay connected with your campus community.",
  icons: {
    icon: '/univo-logo-transparent.png?v=3',
    apple: '/univo-logo-transparent.png?v=3',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            {/* Decorative Left Bars */}
            <div className="fixed left-0 top-0 h-full flex gap-0.5 z-[60] pointer-events-none">
              <div className="w-1.5 h-full bg-pink-500/80"></div>
              <div className="w-3 h-full bg-pink-500/40"></div>
              <div className="w-0.5 h-full bg-pink-500/20"></div>
            </div>
            <Header />
            <main className="flex-1 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
              <Toaster
                position="top-center"
                richColors
                toastOptions={{
                  style: {
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    borderRadius: '12px',
                    border: '1px solid #e5e5e5',
                  },
                }}
              />
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
