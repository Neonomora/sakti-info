import HomePageDesktop from "@/components/HomePageDesktop";
import HomePageMobile from "@/components/HomePageMobile";


export default function HomePage() {
  return (
    <>
      <div className="block md:hidden">
        <HomePageMobile/>
      </div>
      <div className="hidden md:block">
        <HomePageDesktop/>
      </div>
    </>
  );
}
