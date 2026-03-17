"use client";

import { useState } from "react";
import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from "../ui/animated-card";
import { Visual3 } from "../ui/visual-3";
import { Visual4 } from "../ui/visual-4";
import SectionHeader from "./SectionHeader";

const AboutSection = () => {
  const [isCodeCompareActive, setIsCodeCompareActive] = useState(false);

  return (
    <section id="about" className="pt-20 px-6">
      <div className="relative z-20">
        <SectionHeader
          header="About "
          animatedHeader="Me"
          describtion="Get to know me better."
          pillText="Engineer Behind the Code"
          pillIcon="bot"
        />
      </div>
      <div className="relative z-0 mx-auto w-full -mt-80">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* First Ghost Row on Top */}
          <div className="flex flex-row w-full items-center justify-center gap-4 opacity-75">
            {/* Ghost Cards on Top */}
            <AnimatedCard className="mask-top-fade" />
            <AnimatedCard className="hidden md:block mask-top-fade" />
            <AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-bot-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-bot-right-fade" />
          </div>
          {/* First Flex Row  */}
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4">
            {/* Animated Cards */}
            {/* First Animated Card with Chart */}
            <AnimatedCard>
              <CardVisual>
                <Visual3 mainColor="#35bae7" secondaryColor="#204fd7" />
              </CardVisual>
              <CardBody>
                <CardTitle>Always Improving</CardTitle>
                <CardDescription>
                  I grow with every challenge - continuouse learning is part of
                  my journey.
                </CardDescription>
              </CardBody>
            </AnimatedCard>
            {/* Second Animated Card */}
            <AnimatedCard>
              <CardBody>
                <CardTitle>Teamplayer</CardTitle>
                <CardDescription>
                  Collaboration makes every idea stronger.
                </CardDescription>
              </CardBody>
              <CardVisual>
                <Visual4/>
              </CardVisual>
            </AnimatedCard>
            {/* Ghost Cards */}
            <AnimatedCard className="absolute translate-x-104 translate-y-33 md:translate-x-193 md:translate-y-79 mask-left-fade opacity-65" />
            <AnimatedCard className="absolute -translate-x-104 translate-y-33 md:-translate-x-193 md:translate-y-79 mask-right-fade opacity-65" />
            <AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:-translate-x-193 md:translate-y-0 mask-right-fade opacity-65" />
            <AnimatedCard className="absolute translate-x-104 -translate-y-33 md:translate-x-193 md:translate-y-0 mask-left-fade opacity-65" />
          </div>
          {/* Second Flex Row  */}
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4">
            {/* Animated Cards */}
            <AnimatedCard
              onMouseEnter={() => setIsCodeCompareActive(true)}
              onMouseLeave={() => setIsCodeCompareActive(false)}
            >
              <CardVisual>
                {/* Clean Structure Illustration */}
              </CardVisual>
              <CardBody>
                <CardTitle> Clean Structure </CardTitle>
                <CardDescription>
                  I turn complexity into clear, scalable structure.
                </CardDescription>
              </CardBody>
            </AnimatedCard>
            <AnimatedCard>
              <CardBody>
                <CardTitle> Pixel Perfect </CardTitle>
                <CardDescription>
                  Every pixel counts - design and function always in perfect
                  sync.
                </CardDescription>
              </CardBody>
            </AnimatedCard>
            {/* Ghost Cards in Mobile View*/}
            <AnimatedCard className="absolute translate-x-104 translate-y-33 md:hidden opacity-65 mask-left-fade" />
            <AnimatedCard className="absolute translate-x-104 -translate-y-33 md:hidden opacity-65 mask-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 translate-y-33 md:hidden opacity-65 mask-right-fade" />
            <AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:hidden opacity-65 mask-right-fade" />
          </div>
          {/* Second Ghost Row on Bottom */}
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4 opacity-60">
            {/* Ghost Cards on Bottom */}
            <AnimatedCard className="mask-bot-fade" />
            <AnimatedCard className="hidden md:block mask-bot-fade" />
            <AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-top-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-top-right-fade" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          {/* <AnimatedCard className="absolute left-0 -translate-x-[calc(65%+1rem)] top-0" />
					<AnimatedCard className="absolute left-0 -translate-x-[calc(65%+1rem)] bottom-0" />
					<AnimatedCard className="absolute right-0 -translate-x-[calc(-71%+1rem)] top-0" />
					<AnimatedCard className="absolute right-0 -translate-x-[calc(-71%+1rem)] bottom-0" /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
