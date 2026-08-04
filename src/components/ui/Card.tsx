"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useResolvedMedia } from "@/components/shared/CmsMediaProvider";

interface CardBaseProps {
  title: string;
  description: string;
  iconName?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
  badge?: string;
}

function CardShell({
  title,
  description,
  iconName,
  image,
  imageAlt = "",
  href,
  className,
  children,
  badge,
}: CardBaseProps) {
  const Icon = iconName ? getIcon(iconName) : null;
  const resolvedImage = useResolvedMedia(image);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.15)]",
        className
      )}
    >
      {resolvedImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          {resolvedImage.startsWith("data:") ||
          resolvedImage.startsWith("/uploads/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedImage}
              alt={imageAlt || title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={resolvedImage}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized={
                !resolvedImage.includes("images.unsplash.com") &&
                resolvedImage.startsWith("http")
              }
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
          )}
          {badge && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {badge}
            </span>
          )}
          {href && (
            <ArrowUpRight className="ml-auto h-4 w-4 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent" />
          )}
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
        {children}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export function FeatureCard(props: CardBaseProps) {
  return <CardShell {...props} />;
}

export function ServiceCard(props: CardBaseProps) {
  return (
    <CardShell
      {...props}
      className={cn("bg-gradient-to-b from-surface to-background", props.className)}
    />
  );
}

export type { CardBaseProps as CardProps };
