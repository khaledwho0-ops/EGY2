import { dir } from "i18next";
import "../../globals.css"; // Ensure this matches actual global css path

export async function generateStaticParams() { 
  return [{ lang: "ar" }, { lang: "en" }]; 
}

export default async function RootLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ lang: "ar" | "en" }> }) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={dir(lang)}>
      <body className={lang === "ar" ? "font-arabic" : "font-latin"}>
        {/* I18nProvider logic would wrap children here in production */}
        {children}
      </body>
    </html>
  );
}
