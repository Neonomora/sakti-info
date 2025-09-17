import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "@/app/(guest)/notification/SubscribeForm";

const cardLinkClass = "py-10 relative cursor-pointer hover:opacity-90 h-full";
const overlayClass =
  "absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 rounded-xl";
const titleSize = "text-3xl md:text-5xl font-semibold";

function ImageCard({ href, src, alt, title }) {
  return (
    <Card asChild className={cardLinkClass}>
      <Link href={href}>
        <Image src={src} alt={alt} fill className="object-cover rounded-xl" />
        <div className={overlayClass}>
          <CardTitle className={titleSize}>{title}</CardTitle>
        </div>
      </Link>
    </Card>
  );
}

function LogoCard() {
  return (
    <Card className="border px-4 py-2">
      <Link
        href="/"
        className="flex flex-row items-center justify-center gap-2"
      >
        <Image
          src="/images/logo.png"
          alt="Logo Sakti Info"
          width={80}
          height={50}
          className="rounded-full"
        />
        <CardTitle className="text-3xl font-light bg-gradient-to-r from-gray-800 to-gray-300 bg-clip-text text-transparent">
          Sakti Info
        </CardTitle>
      </Link>
    </Card>
  );
}

function AdminLoginCard() {
  return (
    <Card
      asChild
      className="py-3 border flex justify-center items-center cursor-pointer hover:opacity-90"
    >
      <Link href="/admin/login">
        <CardTitle className="text-black/80 text-base md:text-lg font-medium">
          Admin? Login here.
        </CardTitle>
      </Link>
    </Card>
  );
}

function NotificationCard() {
  return (
    <Card className="border flex flex-col justify-center items-center gap-2 py-5">
      <CardTitle className="text-gray-800 text-base md:text-lg font-medium">
        Get Notification
      </CardTitle>
      <SubscribeForm />
    </Card>
  );
}

export default function HomePageMobile() {
  const col1 = [
    { href: "/news", src: "/images/news.png", alt: "Berita Terbaru", title: "News" },
    { href: "/album", src: "/images/album.png", alt: "Album Kegiatan", title: "Album" }
  ];

  const col2 = [
    { href: "/event", src: "/images/event.png", alt: "Event Kampus", title: "Events" }
  ];

  const col3 = [
    { href: "/class", src: "/images/class.png", alt: "Kelas Perkuliahan", title: "Class" },
    { href: "/ukm", src: "/images/ukm.png", alt: "Unit Kegiatan Mahasiswa", title: "UKM" }
  ];

  return (
    <div className="block md:hidden grid grid-cols-1 gap-4 max-h-screen p-4">
      
      {/* Kolom 1 */}
      <div className="flex flex-col gap-4 h-full">
        <LogoCard />
        {col1.map((item) => (
          <ImageCard key={item.href} {...item} />
        ))}
      </div>

      {/* Kolom 2 */}
      <div className="flex flex-col gap-4 h-full">
        {col2.map((item) => (
          <ImageCard key={item.href} {...item} />
        ))}
      </div>

      {/* Kolom 3 */}
      <div className="flex flex-col gap-4 h-full">
        {col3.map((item) => (
          <ImageCard key={item.href} {...item} />
        ))}
        <AdminLoginCard />
      </div>

      {/* Subscribe */}
      <NotificationCard />
    </div>
  );
}
