"use client";

import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "../animations/reveal";
import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from "../ui/animated-card";
import { Visual3 } from "../ui/visual-3";
import { Visual4 } from "../ui/visual-4";
import { Visual5 } from "../ui/visual-5";
import { Visual6 } from "../ui/visual-6";
import SectionHeader from "./SectionHeader";

const AboutSection = () => {
  const [_isCodeCompareActive, setIsCodeCompareActive] = useState(false);

  return (
    <section id="about" className="pt-20 px-6">
      <div className="relative z-20 -translate-y-8 md:translate-y-0">
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
          <Reveal
            preset="fadeIn"
            duration={0.7}
            className="flex flex-row w-full items-center justify-center gap-4 opacity-75"
          >
            {/* Ghost Cards on Top */}
            <AnimatedCard className="mask-top-fade" />
            <AnimatedCard className="hidden md:block mask-top-fade" />
            <AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-bot-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-bot-right-fade" />
          </Reveal>
          {/* First Flex Row  */}
          <RevealGroup
            className="flex flex-col md:flex-row w-full items-center justify-center gap-4"
            staggerChildren={0.18}
            delayChildren={0.05}
          >
            {/* Animated Cards */}
            {/* First Animated Card with Chart */}
            <RevealItem
              preset="slideLeft"
              distance={40}
              duration={0.65}
              className="w-full max-w-100 min-w-0 md:max-w-125 md:flex-1"
            >
              <AnimatedCard className="w-full md:w-full">
                <CardVisual>
                  <Visual3 mainColor="#35bae7" secondaryColor="#204fd7" />
                </CardVisual>
                <CardBody>
                  <CardTitle>Always Improving</CardTitle>
                  <CardDescription>
                    I grow with every challenge - continuouse learning is part
                    of my journey.
                  </CardDescription>
                </CardBody>
              </AnimatedCard>
            </RevealItem>
            {/* Second Animated Card */}
            <RevealItem
              preset="slideRight"
              distance={40}
              duration={0.65}
              className="w-full max-w-100 min-w-0 md:max-w-125 md:flex-1"
            >
              <AnimatedCard className="w-full md:w-full">
                <CardBody>
                  <CardTitle>Teamplayer</CardTitle>
                  <CardDescription>
                    Collaboration makes every idea stronger.
                  </CardDescription>
                </CardBody>
                <CardVisual>
                  <Visual4 />
                </CardVisual>
              </AnimatedCard>
            </RevealItem>
            {/* Ghost Cards */}
            <AnimatedCard className="absolute translate-x-104 translate-y-33 md:translate-x-193 md:translate-y-79 mask-left-fade opacity-65" />
            <AnimatedCard className="absolute -translate-x-104 translate-y-33 md:-translate-x-193 md:translate-y-79 mask-right-fade opacity-65" />
            <AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:-translate-x-193 md:translate-y-0 mask-right-fade opacity-65" />
            <AnimatedCard className="absolute translate-x-104 -translate-y-33 md:translate-x-193 md:translate-y-0 mask-left-fade opacity-65" />
          </RevealGroup>
          {/* Second Flex Row  */}
          <RevealGroup
            className="flex flex-col md:flex-row w-full items-center justify-center gap-4"
            staggerChildren={0.18}
            delayChildren={0.05}
          >
            {/* Animated Cards */}
            <RevealItem
              preset="slideLeft"
              distance={40}
              duration={0.65}
              className="w-full max-w-100 min-w-0 md:max-w-125 md:flex-1"
            >
              <AnimatedCard
                className="w-full md:w-full"
                onMouseEnter={() => setIsCodeCompareActive(true)}
                onMouseLeave={() => setIsCodeCompareActive(false)}
              >
                <CardVisual>
                  {/* Clean Structure Illustration */}
                  <Visual5 />
                </CardVisual>
                <CardBody>
                  <CardTitle> Clean Structure </CardTitle>
                  <CardDescription>
                    I turn complexity into clear, scalable structure.
                  </CardDescription>
                </CardBody>
              </AnimatedCard>
            </RevealItem>
            <RevealItem
              preset="slideRight"
              distance={40}
              duration={0.65}
              className="w-full max-w-100 min-w-0 md:max-w-125 md:flex-1"
            >
              <AnimatedCard className="w-full md:w-full">
                <CardBody>
                  <CardTitle> Pixel Perfect </CardTitle>
                  <CardDescription>
                    Every pixel counts - design and function always in perfect
                    sync.
                  </CardDescription>
                </CardBody>
                <CardVisual>
                  <Visual6 />
                </CardVisual>
              </AnimatedCard>
            </RevealItem>
            {/* Ghost Cards in Mobile View*/}
            <AnimatedCard className="absolute translate-x-104 translate-y-33 md:hidden opacity-65 mask-left-fade" />
            <AnimatedCard className="absolute translate-x-104 -translate-y-33 md:hidden opacity-65 mask-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 translate-y-33 md:hidden opacity-65 mask-right-fade" />
            <AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:hidden opacity-65 mask-right-fade" />
          </RevealGroup>
          {/* Second Ghost Row on Bottom */}
          <Reveal
            preset="fadeIn"
            duration={0.7}
            className="flex flex-col md:flex-row w-full items-center justify-center gap-4 opacity-60"
          >
            {/* Ghost Cards on Bottom */}
            <AnimatedCard className="mask-bot-fade" />
            <AnimatedCard className="hidden md:block mask-bot-fade" />
            <AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-top-left-fade" />
            <AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-top-right-fade" />
          </Reveal>
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
