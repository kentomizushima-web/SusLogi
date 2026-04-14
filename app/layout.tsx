import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SusLogi | 物流積載効率最適化プラットフォーム',
  description: 'データを紡ぎ、"物流"を"最適化"する — 積載率・積載効率・CO2排出量の可視化と改善支援',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased bg-[#F8FAFB]">{children}</body>
    </html>
  );
}
