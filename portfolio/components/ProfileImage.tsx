"use client"

import { useClerk, useUser } from "@clerk/nextjs"
import Image from "next/image";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

interface ProfileImageProps{
	imageUrl: string;
	firstName: string;
	lastName: string;
}

export function ProfileImage({
	imageUrl,
	firstName,
	lastName,
}: ProfileImageProps){
	const [isHovered, setIsHovered] = useState(false)
	const { toggleSidebar, open } = useSidebar()
	const { isSignedIn } = useUser()
	const { openSignIn } = useClerk()

	return(
		<button
			type="button"
			onClick={() => (isSignedIn ? toggleSidebar(): openSignIn())}
			className="group relative w-full max-w-150 overflow-hidden rounded-2xl drop-shadow-card aspect-square"
			onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
			aria-label="Toggle AI Chat Sidebar"
			>
			<Image
				src={imageUrl}
				alt={`${firstName} ${lastName}`}
				fill
				priority
				className="object-cover transtition-transform duration-300 group-hover:scale-105"
			/>
			{/* Online Badge */}
			{/* <div className="absolute top-70 right-12 flex items-center gap-2 bg-secondary backdrop-blur-sm px-3 py-1.5 rounded-full -z-10">
				<div className="bg-green-500 size-2.5 rounded-full relative">
					<div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
					</div>
				<span className="text-xs font-medium">Online</span>
			</div> */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-b from-transparent to-background" />
			{/* Hover Overlay */}
             <div
              className={`absolute inset-0 bg-background/70 border rounded-2xl backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
                <div className="text-center space-y-3">
					{open?(
						<X className="w-12 h-12 text-primary mx-auto"/>
					):(
						<MessageCircle className="w-12 h-12 text-primary mx-auto" />
					)}
                	<span className="text-primary text-xl font-semibold">
						{open ? "Close Chat" : "Chat with AI Twin"}
                	</span>
              	</div>
            </div>
		</button>
	)
}
