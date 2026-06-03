"use client";

import {
  useEffect,
  useRef,
} from "react";

export default function AnnotationCanvas() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    let drawing = false;

    let lastX = 0;
    let lastY = 0;

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

    canvas.addEventListener(
      "pointerdown",
      (e) => {
        drawing = true;

        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    );

    canvas.addEventListener(
      "pointermove",
      (e) => {
        if (!drawing) return;

        const pressure =
          e.pressure || 1;

        ctx.lineWidth =
          pressure * 8;

        ctx.strokeStyle =
          "#ff0000";

        ctx.lineCap =
          "round";

        ctx.beginPath();

        ctx.moveTo(
          lastX,
          lastY
        );

        ctx.lineTo(
          e.offsetX,
          e.offsetY
        );

        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    );

    canvas.addEventListener(
      "pointerup",
      () => {
        drawing = false;
      }
    );

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
}
