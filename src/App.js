import Seo from "@/components/Seo";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SolutionFinder } from "@/components/landing/SolutionFinder";
import { Journey } from "@/components/landing/Journey";
import { TwoWays } from "@/components/landing/TwoWays";
import { RichzShowcase } from "@/components/landing/RichzShowcase";
import { CustomSolution } from "@/components/landing/CustomSolution";
import { Industries } from "@/components/landing/Industries";
import { Stories } from "@/components/landing/Stories";
import { WhySwa } from "@/components/landing/WhySwa";
import { Insights } from "@/components/landing/Insights";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-[#0B1220] antialiased">
      <Seo
        title="SWA Digital Solusindo — Digital Solution Partner"
        siteName="SWA Digital Solusindo"
        description="SWA Digital Solusindo membantu bisnis menemukan dan membangun solusi digital yang tepat, dari solusi siap pakai hingga custom digital solution."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SWA Digital Solusindo",
          description:
            "Digital Solution Partner yang membantu bisnis menemukan dan membangun solusi digital yang tepat.",
          email: "hello@swadigital.id",
          address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <SolutionFinder />
        <Journey />
        <TwoWays />
        <RichzShowcase />
        <CustomSolution />
        <Industries />
        <Stories />
        <WhySwa />
        <Insights />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
