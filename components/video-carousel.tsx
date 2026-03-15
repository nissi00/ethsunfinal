"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface VideoCarouselProps {
    videos: string[]
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

    useEffect(() => {
        // Initialiser les refs si nécessaire
        videoRefs.current = videoRefs.current.slice(0, videos.length)
    }, [videos])

    const handleVideoEnded = () => {
        if (videos.length === 0) return
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }

    const handleVideoError = () => {
        console.error(`Error loading video at index ${currentIndex}: ${videos[currentIndex]}`)
        if (videos.length > 1) {
            handleVideoEnded()
        }
    }

    if (!videos || videos.length === 0) {
        return <div className="absolute inset-0 bg-slate-900" />
    }

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={videos[currentIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <video
                        key={videos[currentIndex]}
                        ref={(el) => { videoRefs.current[currentIndex] = el; }}
                        src={videos[currentIndex]}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                        onError={handleVideoError}
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            </AnimatePresence>

            {/* Overlay pour assurer la lisibilité tout au long de la transition */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />
        </div>
    )
}
