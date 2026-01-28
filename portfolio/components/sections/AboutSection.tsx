"use client"
import { gridItems } from "@/components/data";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid"
import { LampContainer } from "../ui/lamp"
import { motion } from "motion/react";
import { PointerHighlight } from "../ui/pointer-highlight";
import { StarButton } from "../ui/star-button";
import { AnimatedCard, CardBody, CardDescription, CardTitle, CardVisual } from "../ui/animated-card";
import { Visual3 } from "../ui/visual-3";
import { Visual4 } from "../ui/visual-4";

const AboutSection = () => {
	return(
		<section id="about" className="py-20 px-6">
			<div className="container mx-auto max-w-4xl">
				<div className="flex flex-col items-center justify-center gap-2 mb-12">
					<StarButton className="rounded-xl">
						<h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
					</StarButton>
					<p className="text-xl text-text-secondary z-10">Get to know me better.</p>
				</div>
			</div>
			<div className="relative mx-auto w-full -translate-y-55 md:-translate-y-65">
				<div className="flex flex-col items-center justify-center gap-4">
					{/* First Ghost Row on Top */}
					<div className="flex flex-row w-full items-center justify-center gap-4 opacity-75">
						{/* Ghost Cards on Top */}
						<AnimatedCard className="mask-top-fade"/>
						<AnimatedCard className="hidden md:block mask-top-fade"/>
						<AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-bot-left-fade"/>
						<AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-bot-right-fade"/>
					</div>
					{/* First Flex Row  */}
					<div className="flex flex-col md:flex-row w-full items-center justify-center gap-4">
						{/* Animated Cards */}
						<AnimatedCard>
							<CardVisual>
								<Visual3 mainColor="#35bae7" secondaryColor="#204fd7"/>
							</CardVisual>
							<CardBody>
								<CardTitle>Always Improving</CardTitle>
								<CardDescription>I grow with every challenge - continuouse learning is part of my journey.</CardDescription>
							</CardBody>
						</AnimatedCard>
						<AnimatedCard>
							<CardBody>
								<CardTitle>Teamplayer</CardTitle>
								<CardDescription>Collaboration makes every idea stronger.</CardDescription>
							</CardBody>
							<CardVisual>
								<Visual4/>
							</CardVisual>
						</AnimatedCard>
						{/* Ghost Cards */}
						<AnimatedCard className="absolute translate-x-104 translate-y-33 md:translate-x-193 md:translate-y-79 mask-left-fade opacity-65"/>
						<AnimatedCard className="absolute -translate-x-104 translate-y-33 md:-translate-x-193 md:translate-y-79 mask-right-fade opacity-65"/>
						<AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:-translate-x-193 md:translate-y-0 mask-right-fade opacity-65"/>
						<AnimatedCard className="absolute translate-x-104 -translate-y-33 md:translate-x-193 md:translate-y-0 mask-left-fade opacity-65"/>
					</div>
					{/* Second Flex Row  */}
					<div className="flex flex-col md:flex-row w-full items-center justify-center gap-4">
						{/* Animated Cards */}
						<AnimatedCard>
						</AnimatedCard>
						<AnimatedCard>
						</AnimatedCard>
						{/* Ghost Cards in Mobile View*/}
						<AnimatedCard className="absolute translate-x-104 translate-y-33 md:hidden opacity-65 mask-left-fade"/>
						<AnimatedCard className="absolute translate-x-104 -translate-y-33 md:hidden opacity-65 mask-left-fade"/>
						<AnimatedCard className="absolute -translate-x-104 translate-y-33 md:hidden opacity-65 mask-right-fade"/>
						<AnimatedCard className="absolute -translate-x-104 -translate-y-33 md:hidden opacity-65 mask-right-fade"/>
					</div>
					{/* Second Ghost Row on Bottom */}
					<div className="flex flex-col md:flex-row w-full items-center justify-center gap-4 opacity-60">
						{/* Ghost Cards on Bottom */}
						<AnimatedCard className="mask-bot-fade"/>
						<AnimatedCard className="hidden md:block mask-bot-fade"/>
						<AnimatedCard className="absolute translate-x-104 md:translate-x-193 mask-top-left-fade"/>
						<AnimatedCard className="absolute -translate-x-104 md:-translate-x-193 mask-top-right-fade"/>
					</div>
				</div>
				<div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
					{/* <AnimatedCard className="absolute left-0 -translate-x-[calc(65%+1rem)] top-0" />
					<AnimatedCard className="absolute left-0 -translate-x-[calc(65%+1rem)] bottom-0" />
					<AnimatedCard className="absolute right-0 -translate-x-[calc(-71%+1rem)] top-0" />
					<AnimatedCard className="absolute right-0 -translate-x-[calc(-71%+1rem)] bottom-0" /> */}
				</div>

			</div>
			
			{/* <LampContainer>
				<motion.h6
					initial={{ opacity: 0.5, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
					}}
					className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent"
				>
					From ideas to products
				</motion.h6>
			</LampContainer> */}
			{/* <BentoGrid>
				{gridItems.map(({id, title, description, className, img, imgClassName, titleClassName, spareImg}) => (
						<BentoGridItem 
							id={id}
							key={id}
							title={title}
							description={description}
							className={className}
							img={img}
							imgClassName={imgClassName}
							titleClassName={titleClassName}
							spareImg={spareImg}
						/>
					))}
			</BentoGrid> */}
		</section>
	)
}

export default AboutSection
