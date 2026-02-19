"use client"

import { motion } from "framer-motion"
import { ConnectIcon} from "../ui/connect";
import { useRef } from "react";
import { WrenchIcon } from "../ui/wrench";
import GradientText from "../GradientText";
import { BotIcon } from "../ui/bot";
import { RevealGroup, RevealItem } from "../animations/reveal";

type PillIcon = "connect" | "tool" | "bot"

type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

interface SectionHeaderProps {
	header: string,
	animatedHeader?: string
	describtion?: string,
	pillText?: string, 
	pillIcon?: PillIcon
}

function SectionHeader({header, animatedHeader, describtion, pillText, pillIcon}: SectionHeaderProps) {
	const iconRef = useRef<AnimatedIconHandle | null>(null);

	const renderPillIcon = () => {
		const common = {
		size: 16,
		className: "text-[#7aecf5]",
		ref: (instance: AnimatedIconHandle | null) => {
			iconRef.current = instance;
		},
		};

		switch (pillIcon) {
			case "bot": return <BotIcon {...common}/>
			case "tool": return <WrenchIcon {...common}/>
			default: return <ConnectIcon {...common} />;
		}
	};
  	return (
		<RevealGroup className="text-center mb-16" staggerChildren={0.35} delayChildren={0.2}>
			{/* Pill with Hover Effect */}
			{pillText &&(
				<RevealItem>
					<motion.div
						className="inline-flex items-center gap-2 bg-[#1e222b] border rounded-full px-4 py-2 mb-6"
						whileHover={{
							scale: 1.1,
							borderColor: "rgba(53,186,231,0.5)",
							backgroundImage: "linear-gradient(135deg, rgba(53,186,231,.2), rgba(32,79,215,.2))",
							boxShadow: "0 0 16px rgba(53,186,231,0.3)",
						}}
						onMouseEnter={() => iconRef.current?.startAnimation()}
						onMouseLeave={() => iconRef.current?.stopAnimation()}
					>
						{renderPillIcon()}
						<span className="text-sm font-medium text-[#7aecf5]">
							{pillText}
						</span>
					</motion.div>
				</RevealItem>
			)}
			{/* Header with animated Gradient */}
			<RevealItem>
				<h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
					{header}
					<GradientText
						animationSpeed={3}
						className="inline-flex! items-baseline! font-bold! bg-bg-gradient-primary"
					>
						{animatedHeader}
					</GradientText>
				</h2>
			</RevealItem>
			{/* Describtion */}
			{describtion && (
				<RevealItem>
					<p className="text-xl sm:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed">
						{describtion}
					</p>
				</RevealItem>
			)}
		</RevealGroup>
  )
}

export default SectionHeader