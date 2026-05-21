import { cva } from "class-variance-authority";

export const tabVariants = cva(
  [
    "relative text-left cursor-pointer transition-all duration-400",
    "border-b border-line min-[900px]:border-b-0 min-[900px]:border-r min-[900px]:last:border-r-0",
    "py-5 px-4 min-[900px]:py-8 min-[900px]:px-6",
    "min-h-[44px]",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
  ].join(" "),
  {
    variants: {
      state: {
        idle: "text-dim hover:text-muted hover:bg-bg-alt",
        active: "text-text bg-bg-alt",
      },
    },
    defaultVariants: { state: "idle" },
  },
);
