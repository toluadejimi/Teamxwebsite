"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  mode?: "typing" | "fade";
  delay?: number;
  speed?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className,
  mode = "fade",
  delay = 0,
  speed = 40,
  as: Component = "span",
}: AnimatedTextProps) {
  const [displayed, setDisplayed] = useState(mode === "fade" ? text : "");
  const [isComplete, setIsComplete] = useState(mode === "fade");

  useEffect(() => {
    if (mode !== "typing") return;

    setDisplayed("");
    setIsComplete(false);
    let index = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, mode, delay, speed]);

  if (mode === "fade") {
    const words = text.split(" ");

    return (
      <Component className={cn("inline", className)}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={cn("inline", className)}>
      {displayed}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-accent"
          aria-hidden
        />
      )}
    </Component>
  );
}
