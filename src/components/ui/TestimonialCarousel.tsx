"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  className,
}: TestimonialCarouselProps) {
  return (
    <div className={cn("relative", className)}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".testimonial-pagination" }}
        navigation={{
          prevEl: ".testimonial-prev",
          nextEl: ".testimonial-next",
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-14"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={`${item.author}-${item.company}`}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Quote className="mb-4 h-8 w-8 text-accent/40" strokeWidth={1.5} />
              <blockquote className="flex-1 text-base leading-relaxed text-foreground md:text-lg">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                  {item.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <cite className="not-italic font-medium text-foreground">
                    {item.author}
                  </cite>
                  <p className="text-sm text-muted">
                    {item.role}, {item.company}
                  </p>
                </div>
              </footer>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="testimonial-prev flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="testimonial-pagination !w-auto" />
        <button
          type="button"
          aria-label="Next testimonial"
          className="testimonial-next flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
