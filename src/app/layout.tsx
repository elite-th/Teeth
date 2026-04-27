import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n/context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina Dental — Transform Your Smile Today",
  description: "Experience world-class dental care in a serene, luxury environment. Your comfort and confidence are our only priorities.",
  keywords: ["Lumina Dental", "dental care", "cosmetic dentistry", "smile makeover", "dental implants"],
  authors: [{ name: "Lumina Dental" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${playfair.variable} ${vazirmatn.variable} font-sans antialiased grain`}
        style={{ color: "#1A2332", overflowX: "hidden" }}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster />
        <script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var locale = localStorage.getItem('lumina-locale');
      if (locale === 'fa' || locale === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', locale);
      }
    } catch(e) {}
  })();
`}} />
      </body>
    </html>
  );
}
