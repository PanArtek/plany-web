"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration: number, go: boolean) {
  const [value, setValue] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!go || ran.current) return;
    ran.current = true;
    const steps = Math.ceil(duration / 16);
    let s = 0;
    const tick = () => {
      s++;
      const eased = 1 - Math.pow(1 - s / steps, 3);
      setValue(Math.round(eased * end));
      if (s < steps) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, end, duration]);

  return value;
}
