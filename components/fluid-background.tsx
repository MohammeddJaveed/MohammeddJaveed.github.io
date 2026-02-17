"use client";

import { useEffect, useRef } from "react";

export function FluidBackground() {
  const interactiveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interactive = interactiveRef.current;
    if (!interactive) {
      return;
    }

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationId = 0;

    const move = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      interactive.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;
      animationId = window.requestAnimationFrame(move);
    };

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX - window.innerWidth / 2;
      targetY = event.clientY - window.innerHeight / 2;
    };

    window.addEventListener("mousemove", onMouseMove);
    animationId = window.requestAnimationFrame(move);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fluid-bg" aria-hidden="true">
      <div className="fluid-bg__base" />
      <div className="fluid-bg__blobs">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
        <div className="blob blob-four" />
        <div className="blob blob-five" />
        <div ref={interactiveRef} className="blob blob-interactive" />
      </div>
    </div>
  );
}
