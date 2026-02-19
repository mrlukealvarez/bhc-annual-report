// BHC Annual Report — Root layout with sticky nav + 4-column footer
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BHC Annual Report 2026 | Black Hills Consortium",
  description: "13 entities. $52M capital raise. $71.59M\u2013$439.5M Year 1 revenue. Interactive annual report from the Black Hills Consortium.",
  openGraph: {
    title: "BHC Annual Report 2026",
    description: "Interactive annual report from the Black Hills Consortium \u2014 13 entities building Rural America\u2019s future.",
    siteName: "Black Hills Consortium",
    type: "website",
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/entity/growwise", label: "Entities" },
  { href: "/financials", label: "Financials" },
  { href: "/compare", label: "Compare" },
  { href: "/flywheel", label: "Flywheel" },
  { href: "/team", label: "Team" },
  { href: "/goals", label: "Goals" },
  { href: "/investors", label: "Investors" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {/* Header */}
        <header className="bg-navy text-white sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold tracking-tight">
                BHC <span className="text-emerald-400">Annual Report</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-navy-dark text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Technology</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/entity/growwise" className="hover:text-white transition-colors">GrowWise</Link></li>
                  <li><Link href="/entity/auric-labs" className="hover:text-white transition-colors">Auric Labs</Link></li>
                  <li><Link href="/entity/delegate-iq" className="hover:text-white transition-colors">Delegate Digital</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Community</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/entity/bhc" className="hover:text-white transition-colors">BHC</Link></li>
                  <li><Link href="/entity/seed-foundation" className="hover:text-white transition-colors">Seed Foundation</Link></li>
                  <li><Link href="/entity/the-op" className="hover:text-white transition-colors">THE OP</Link></li>
                  <li><Link href="/entity/the-cult" className="hover:text-white transition-colors">THE CULT</Link></li>
                  <li><Link href="/entity/settle-the-west" className="hover:text-white transition-colors">Settle the West</Link></li>
                  <li><Link href="/entity/adventurecap" className="hover:text-white transition-colors">AdventureCap</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Real Estate</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/entity/pass-creek" className="hover:text-white transition-colors">Pass Creek Holdings</Link></li>
                  <li><Link href="/entity/grow-campus" className="hover:text-white transition-colors">Grow Campus</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Education & Media</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/entity/seed-academy" className="hover:text-white transition-colors">Seed Academy</Link></li>
                  <li><Link href="/entity/outpost-media" className="hover:text-white transition-colors">Outpost Media</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">&copy; 2026 Black Hills Consortium. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/financials" className="text-sm hover:text-white transition-colors">Financials</Link>
                <Link href="/investors" className="text-sm hover:text-white transition-colors">Investors</Link>
                <Link href="/print" className="text-sm hover:text-white transition-colors">Print Report</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
