import { Hero } from "@/components/home/Hero";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { Directions } from "@/components/home/Directions";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhyUs } from "@/components/home/WhyUs";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { DeliveryOptions } from "@/components/home/DeliveryOptions";
import { RequestFormSection } from "@/components/home/RequestFormSection";

// PortfolioPreview читает опубликованные кейсы из БД — без ревалидации
// новые кейсы, добавленные через админку, не появлялись бы на главной без
// пересборки сайта.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Directions />
      <HowWeWork />
      <WhyUs />
      <PortfolioPreview />
      <DeliveryOptions />
      <RequestFormSection />
    </>
  );
}
