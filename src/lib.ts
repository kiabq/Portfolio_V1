export const TRANSITION_DURATION = 700;
export const TRANSITION_IN = ["translate-y-0", "opacity-100"];
export const TRANSITION_OUT = ["translate-y-8", "opacity-0"];
export const TRANSITION = [
  "opacity-0",
  "translate-y-8",
  "transition-translate",
  "ease-out",
  "motion-reduce:transition-none",
  "motion-reduce:translate-none",
];

export const titleSlide = {
  old: {
    name: "title-slide-out",
    duration: "0.2s",
    easing: "ease-in",
    fillMode: "both" as const,
  },
  new: {
    name: "title-slide-in",
    duration: "0.3s",
    easing: "ease-out",
    fillMode: "both" as const,
  },
};

export const customTransition = (animation: any) => ({
  forwards: animation,
  backwards: animation,
});
