import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
  decimals?: number;
  delay?: number;
}

interface ParsedValue {
  prefix: string;
  numeric: number | null;
  suffix: string;
  raw: string;
}

const parseValue = (raw: string): ParsedValue => {
  const match = raw.match(/([-+]?\d[\d.,]*)/);
  if (!match || match.index === undefined) {
    return { prefix: "", numeric: null, suffix: "", raw };
  }

  const prefix = raw.slice(0, match.index);
  const numericPart = match[0];
  const suffix = raw.slice(match.index + numericPart.length);
  const numeric = Number(numericPart.replace(/,/g, ""));

  if (Number.isNaN(numeric)) {
    return { prefix, numeric: null, suffix, raw };
  }

  return { prefix, numeric, suffix, raw };
};

export const AnimatedNumber = ({
  value,
  duration = 1200,
  delay = 0,
  decimals = 0,
  className,
}: AnimatedNumberProps) => {
  const safeValue = useMemo(() => {
    if (typeof value === "number") return value.toString();
    if (typeof value === "string") return value;
    return value != null ? String(value) : "";
  }, [value]);

  const { prefix, numeric, suffix, raw } = useMemo(() => parseValue(safeValue), [safeValue]);
  const [display, setDisplay] = useState<number>(numeric !== null ? 0 : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || numeric === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [numeric]);

  useEffect(() => {
    if (numeric === null || !hasAnimated) return;

    let frameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      const nextValue = numeric * progress;
      setDisplay(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [numeric, duration, delay, hasAnimated]);

  if (numeric === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formatted = display >= numeric
    ? numeric.toLocaleString(undefined, { maximumFractionDigits: decimals })
    : display.toLocaleString(undefined, { maximumFractionDigits: decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
