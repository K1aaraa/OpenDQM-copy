"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type TypedHeadingProps = {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
};

export function TypedHeading({ as: Tag = "h2", children, className = "" }: TypedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`typed-heading ${visible ? "typed-heading-visible" : ""} ${className}`.trim()}
    >
      <span>{children}</span>
    </Tag>
  );
}
