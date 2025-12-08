import type React from "react"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "Afterglow - Ignorance: Can it be Changed?",
  description:
    "Khám phá về sự thiếu hiểu biết trong xã hội hiện đại và tìm kiếm những phương pháp hiệu quả để thay đổi",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${robotoMono.variable} font-mono antialiased limbus-overlay`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
