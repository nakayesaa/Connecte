"use client"

import { useAnimationFrame } from "motion/react"
import { useRef } from "react"

export default function RoamingCube() {
  const ref = useRef<HTMLDivElement>(null)

  useAnimationFrame((t) => {
    if (!ref.current) return

    const speed = 0.0003
    const rotationSpeed = 0.0004
    
    const x = Math.sin(t * speed) * 350
    const y = Math.cos(t * speed * 0.7) * 250
    const rotateX = Math.sin(t * rotationSpeed) * 360
    const rotateY = Math.cos(t * rotationSpeed) * 360

    ref.current.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `
  })

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="cube" ref={ref}>
        <div className="side front bg-slate-700"></div>
        <div className="side back bg-indigo-400"></div>
        <div className="side right bg-sky-400"></div>
        <div className="side left bg-teal-400"></div>
        <div className="side top bg-violet-400"></div>
        <div className="side bottom bg-slate-500"></div>
      </div>
      <StyleSheet />
    </div>
  )
}

function StyleSheet() {
  return (
    <style>{`
      .cube {
        width: 150px;
        height: 150px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform-style: preserve-3d;
      }

      .side {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        opacity: 0.8;
        border: 1px solid rgba(255,255,255,0.1);
      }

      .front { transform: rotateY(0deg) translateZ(75px); }
      .back { transform: rotateY(180deg) translateZ(75px); }
      .right { transform: rotateY(90deg) translateZ(75px); }
      .left { transform: rotateY(-90deg) translateZ(75px); }
      .top { transform: rotateX(90deg) translateZ(75px); }
      .bottom { transform: rotateX(-90deg) translateZ(75px); }
    `}</style>
  )
}