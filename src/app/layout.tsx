import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Media Aggregator',
  description: 'An app that aggregates posts and messages from various social networks',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      </body>
      </html>
  )
}