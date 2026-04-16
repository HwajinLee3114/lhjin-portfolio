import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/styles/custom.css'

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
  metadataBase: new URL('https://lhjin.dev'),
  title: {
    default: '이화진 | 프론트엔드 개발자 포트폴리오',
    template: '%s | 이화진 포트폴리오',
  },
  description:
    '프론트엔드 개발자 이화진의 포트폴리오입니다. Next.js, React, TypeScript 기반의 프로젝트와 경력을 소개합니다.',
  keywords: ['프론트엔드', '개발자', '포트폴리오', 'React', 'Next.js', 'TypeScript', '이화진'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '이화진 포트폴리오',
    title: '이화진 | 프론트엔드 개발자 포트폴리오',
    description:
      '프론트엔드 개발자 이화진의 포트폴리오입니다. Next.js, React, TypeScript 기반의 프로젝트와 경력을 소개합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이화진 | 프론트엔드 개발자 포트폴리오',
    description:
      '프론트엔드 개발자 이화진의 포트폴리오입니다. Next.js, React, TypeScript 기반의 프로젝트와 경력을 소개합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
