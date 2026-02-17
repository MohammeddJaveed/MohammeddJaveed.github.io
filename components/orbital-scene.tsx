"use client";

import { useEffect, useRef } from "react";

type OrbitalSceneProps = {
  variant?: "hero" | "work";
};

type Dot = {
  x: number;
  y: number;
  z: number;
  size: number;
};

function buildSpherePoints(count: number) {
  const dots: Dot[] = [];
  for (let index = 0; index < count; index += 1) {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

    dots.push({
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
      size: 1 + Math.random() * 1.8
    });
  }
  return dots;
}

export function OrbitalScene({ variant = "hero" }: OrbitalSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let frame = 0;
    let animationId = 0;
    let targetX = 0;
    let targetY = 0;
    let rotX = 0;
    let rotY = 0;

    const dots = buildSpherePoints(120);

    const baseColor = variant === "hero" ? "120, 157, 255" : "96, 255, 216";
    const lineColor = variant === "hero" ? "125, 194, 255" : "160, 127, 255";

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const rotate = (dot: Dot) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const x1 = dot.x * cosY - dot.z * sinY;
      const z1 = dot.x * sinY + dot.z * cosY;
      const y1 = dot.y * cosX - z1 * sinX;
      const z2 = dot.y * sinX + z1 * cosX;

      const depth = 2.6 + z2;
      const scale = 180 / depth;

      return {
        x: x1 * scale,
        y: y1 * scale,
        z: z2,
        size: dot.size * (0.7 + (z2 + 1) * 0.3)
      };
    };

    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const mx = (event.clientX - bounds.left) / bounds.width - 0.5;
      const my = (event.clientY - bounds.top) / bounds.height - 0.5;

      targetX = my * 0.9;
      targetY = mx * 1.2;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const draw = () => {
      frame += 1;
      rotX += (targetX - rotX) * 0.06;
      rotY += 0.008 + (targetY - rotY) * 0.06;

      context.clearRect(0, 0, width, height);

      context.save();
      context.translate(width / 2, height / 2);

      const points = dots.map(rotate).sort((a, b) => a.z - b.z);

      for (let i = 0; i < points.length; i += 1) {
        const pointA = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const pointB = points[j];
          const dx = pointA.x - pointB.x;
          const dy = pointA.y - pointB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 44) {
            const alpha = (1 - distance / 44) * 0.32;
            context.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(pointA.x, pointA.y);
            context.lineTo(pointB.x, pointB.y);
            context.stroke();
          }
        }
      }

      for (const point of points) {
        const glow = Math.max(0.1, (point.z + 1.1) / 2.1);
        context.fillStyle = `rgba(${baseColor}, ${0.25 + glow * 0.75})`;
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      }

      const pulse = 22 + Math.sin(frame * 0.03) * 6;
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, pulse * 3.3);
      gradient.addColorStop(0, `rgba(${baseColor}, 0.16)`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(0, 0, pulse * 3.3, 0, Math.PI * 2);
      context.fill();

      context.restore();
      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="orbital-canvas" aria-hidden="true" />;
}
