"use client";

import { useEffect, useRef, useState } from "react";

type Balloon = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  grounded: boolean;
};

const COLORS = ["#ff6b6b", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff", "#f72585"];

function createBalloon(width: number, height: number, settled = false): Balloon {
  const radius = 13 + Math.random() * 16;
  const y = settled
    ? height - radius - 8 - Math.random() * Math.min(80, height * 0.2)
    : -Math.random() * (height * 0.9) - radius;

  return {
    x: Math.random() * width,
    y,
    vx: (Math.random() - 0.5) * 0.8,
    vy: settled ? 0 : 0.7 + Math.random() * 0.9,
    r: radius,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.025 + Math.random() * 0.03,
    grounded: settled
  };
}

export function BalloonFall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationId = 0;
    let tick = 0;

    const pointer = { x: -9999, y: -9999, active: false, radius: 135 };
    let balloons: Balloon[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const settledCount = Math.max(24, Math.floor(width / 24));
      const fallingCount = Math.max(8, Math.floor(width / 120));
      balloons = [
        ...Array.from({ length: settledCount }, () => createBalloon(width, height, true)),
        ...Array.from({ length: fallingCount }, () => createBalloon(width, height, false))
      ];
    };

    const drawBalloon = (balloon: Balloon) => {
      const wobbleX = Math.sin(balloon.wobble) * 4;
      const x = balloon.x + wobbleX;
      const y = balloon.y;

      context.fillStyle = balloon.color;
      context.beginPath();
      context.ellipse(x, y, balloon.r * 0.85, balloon.r, 0, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = "rgba(255,255,255,0.24)";
      context.beginPath();
      context.ellipse(
        x - balloon.r * 0.24,
        y - balloon.r * 0.2,
        balloon.r * 0.18,
        balloon.r * 0.28,
        0,
        0,
        Math.PI * 2
      );
      context.fill();

      context.strokeStyle = "rgba(232, 236, 255, 0.5)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x, y + balloon.r);
      context.quadraticCurveTo(
        x + Math.sin(balloon.wobble * 0.5) * 6,
        y + balloon.r + 20,
        x,
        y + balloon.r + 42
      );
      context.stroke();
    };

    const animate = () => {
      tick += 1;
      context.clearRect(0, 0, width, height);

      if (tick % 22 === 0 && balloons.length > 0) {
        const index = Math.floor(Math.random() * balloons.length);
        if (balloons[index].grounded) {
          balloons[index] = createBalloon(width, height, false);
        }
      }

      for (const balloon of balloons) {
        if (pointer.active) {
          const dx = balloon.x - pointer.x;
          const dy = balloon.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;

          if (distance < pointer.radius) {
            const force = (1 - distance / pointer.radius) * 1.2;
            balloon.vx += (dx / distance) * force;
            balloon.vy += (dy / distance) * force;
            balloon.grounded = false;
          }
        }

        balloon.vy += 0.04;
        balloon.vx *= balloon.grounded ? 0.96 : 0.992;
        balloon.vy *= 0.992;

        balloon.x += balloon.vx;
        balloon.y += balloon.vy;
        balloon.wobble += balloon.wobbleSpeed;

        if (balloon.x - balloon.r < 0) {
          balloon.x = balloon.r;
          balloon.vx *= -0.76;
        }
        if (balloon.x + balloon.r > width) {
          balloon.x = width - balloon.r;
          balloon.vx *= -0.76;
        }

        if (balloon.y + balloon.r > height - 6) {
          balloon.y = height - balloon.r - 6;
          balloon.vy *= -0.62;
          balloon.vx *= 0.92;
          if (Math.abs(balloon.vy) < 0.22) {
            balloon.vy = 0;
            balloon.grounded = true;
          }
        }

        if (balloon.y - balloon.r > height + 120) {
          Object.assign(balloon, createBalloon(width, height, true));
        }

        drawBalloon(balloon);
      }

      animationId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const totalHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      const revealDistance = Math.max(520, window.innerHeight * 0.9);
      const shouldShow = window.scrollY + window.innerHeight >= totalHeight - revealDistance;
      setVisible(shouldShow);
    };

    resize();
    onScroll();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`balloon-canvas ${visible ? "active" : ""}`}
      aria-label="Falling balloons"
    />
  );
}
