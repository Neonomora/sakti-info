import { Fredoka } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const fontSans = Fredoka({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'], // pilih sesuai kebutuhan
  variable: "--font-fredoka", // opsional: kalau mau pakai CSS variable
});

export const metadata = {
  title: "Sakti Info | Portal Informasi Kampus",
  description:
    "Sakti Info adalah portal informasi resmi kampus yang menyajikan berita, agenda, info kelas, dan UKM secara lengkap dan terkini.",
  keywords: [
    "kampus",
    "informasi kampus",
    "berita kampus",
    "UKM kampus",
    "jadwal kelas",
    "event kampus",
    "portal mahasiswa",
    "sakti info",
  ],
  metadataBase: new URL("https://saktiinfo.example.com"), // Ganti dengan domain kamu
  openGraph: {
    title: "Sakti Info | Portal Informasi Kampus",
    description:
      "Temukan berita kampus, informasi UKM, jadwal kelas, dan berbagai agenda menarik hanya di Sakti Info.",
    url: "https://saktiinfo.example.com",
    siteName: "Sakti Info",
    images: [
      {
        url: "https://saktiinfo.example.com/og-image.jpg", // Ganti dengan link gambar Open Graph kamu
        width: 1200,
        height: 630,
        alt: "Sakti Info - Portal Informasi Kampus",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakti Info | Portal Informasi Kampus",
    description:
      "Temukan semua info penting kampus: berita, UKM, agenda, dan jadwal kelas di Sakti Info.",
    images: ["https://saktiinfo.example.com/og-image.jpg"], // Ganti sesuai kebutuhan
  },
  authors: [{ name: "Tim Sakti Info", url: "https://saktiinfo.example.com" }],
  creator: "Sakti Info Dev Team",
  publisher: "Universitas Sakti",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${fontSans.variable} bg-red-400 h-full antialiased`}>
        <div className="lg:w-8/12 md:w-10/12 mx-auto overflow-hidden">
          <Toaster richColors position="top-center" />
          {children}
        </div>
      </body>
    </html>
  );
}
