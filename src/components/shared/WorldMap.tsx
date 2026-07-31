"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MapDot {
  x: number;
  y: number;
  label?: string;
  size?: number;
}

const defaultDots: MapDot[] = [
  { x: 310, y: 210, label: "Lagos", size: 5 },
  { x: 318, y: 195, label: "Abuja", size: 4 },
];

interface WorldMapProps {
  dots?: MapDot[];
  className?: string;
}

export function WorldMap({ dots = defaultDots, className }: WorldMapProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 720 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        aria-label="Global presence map"
        role="img"
      >
        {/* Simplified world continents outline */}
        <g className="fill-foreground/[0.04] stroke-border" strokeWidth="0.5">
          {/* North America */}
          <path d="M80 80 Q120 60 160 70 L180 100 Q170 130 140 150 L100 160 Q70 140 80 80Z" />
          {/* South America */}
          <path d="M140 180 Q160 170 170 200 L165 260 Q150 280 135 260 L130 210 Q135 190 140 180Z" />
          {/* Europe */}
          <path d="M300 90 Q330 80 350 95 L360 120 Q350 140 320 135 L300 110 Q295 100 300 90Z" />
          {/* Africa */}
          <path d="M310 145 Q340 140 355 170 L350 240 Q330 270 315 250 L305 180 Q308 155 310 145Z" />
          {/* Asia */}
          <path d="M370 70 Q450 60 520 80 L560 120 Q550 160 480 170 L400 150 Q370 120 370 70Z" />
          {/* Australia */}
          <path d="M520 250 Q560 245 580 270 L570 295 Q540 300 520 280 L520 250Z" />
        </g>

        {/* Grid lines */}
        {[90, 180, 270].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="720"
            y2={y}
            className="stroke-border/50"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        ))}
        {[180, 360, 540].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="360"
            className="stroke-border/50"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        ))}

        {/* Connection arcs between major hubs */}
        <motion.path
          d="M120 155 Q200 100 280 140"
          className="stroke-accent/20"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M280 140 Q400 120 520 175"
          className="stroke-accent/20"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M120 155 Q220 200 310 210"
          className="stroke-accent/15"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Animated dots */}
        {dots.map((dot, i) => (
          <g key={`${dot.x}-${dot.y}`}>
            <motion.circle
              cx={dot.x}
              cy={dot.y}
              r={(dot.size ?? 3) * 3}
              className="fill-accent/10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={dot.x}
              cy={dot.y}
              r={dot.size ?? 3}
              className="fill-accent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: i * 0.15,
              }}
            />
            {dot.label && (
              <text
                x={dot.x}
                y={dot.y - (dot.size ?? 3) - 6}
                textAnchor="middle"
                className="fill-muted text-[8px] font-medium"
              >
                {dot.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
