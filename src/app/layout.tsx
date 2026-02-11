import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/styles/custom.css'
import ThemeShell from '@/components/comn/ThemeShell'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'lhjin 이화진 포트폴리오',
  description: '이화진 포트폴리오. lhjin Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeShell>{children}</ThemeShell>
      </body>
    </html>
  )
}
