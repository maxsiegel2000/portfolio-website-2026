import type { ReactNode } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const animationClasses = {
	fadeUp: "opacity-0 translate-y-8",
	fadeIn: "opacity-0",
	slideLeft: "opacity-0 -translate-x-12",
	slideRight: "opacity-0 translate-x-12",
	scaleIn: "opacity-0 scale-90"
} as const

type AnimationKey = keyof typeof animationClasses

type ScrollRevealProps = {
	children: ReactNode
	animation?: AnimationKey
	delay?: number
	duration?: number
	threshold?: number
}

const visibleClasses = "opacity-100 translate-y-0 translate-x-0 scale-100"

const ScrollReveal = ({
	children,
	animation = "fadeUp",
	delay = 0,
	duration = 700,
	threshold = 0.1
}: ScrollRevealProps) => {
	const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold })

	return(
		<div 
			ref={ref}
			className={`transition-all ease-out ${isVisible ? visibleClasses: animationClasses[animation]}`}
			style={{
				transitionDuration: `${duration}ms`,
				transitionDelay: `${delay}ms`
			}}>
			{children}
		</div>
	)
}

export default ScrollReveal
