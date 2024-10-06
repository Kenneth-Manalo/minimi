import CompanyList from '@/components/CompanyList';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-0 sm:p-10 font-[family-name:var(--font-geist-sans)]`}>
      <main className="flex flex-col gap-8 row-start-2 justify-center sm:items-center">
        <CompanyList />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p><b>Author: Kenneth Manalo</b></p>
        <p><b>Copyright © 2024 Minimi. All Rights Reserved.</b></p>
      </footer>
    </div>
  )
}
