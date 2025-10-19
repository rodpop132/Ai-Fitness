import { cn } from "@/lib/utils";

type SectionDividerProps = {
  orientation?: "top" | "bottom";
  tone?: "background" | "muted" | "card" | "primary";
  className?: string;
};

const toneMap: Record<NonNullable<SectionDividerProps["tone"]>, string> = {
  background: "hsl(var(--background))",
  muted: "hsl(var(--muted))",
  card: "hsl(var(--card))",
  primary: "hsl(var(--primary) / 0.2)",
};

export const SectionDivider = ({
  orientation = "bottom",
  tone = "background",
  className,
}: SectionDividerProps) => {
  const fill = toneMap[tone];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden leading-[0]",
        orientation === "top" && "rotate-180",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="h-20 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0L1200 0 1200 120 0 120 0 0z"
          fill={fill}
        />
        <path
          d="M321.39 56.37C427.34 74.27 532.66 74.27 638.61 56.37 769.56 33.75 899.74 -7.63 1030.69 3.46 1099.02 9.35 1168.35 27.6 1200 38.14L1200 120 0 120 0 16.48C43.4 6.19 87.32 -0.36 131.19 1.94 204.51 5.75 268.66 47.19 321.39 56.37Z"
          fill={fill}
          opacity={0.7}
        />
      </svg>
    </div>
  );
};

