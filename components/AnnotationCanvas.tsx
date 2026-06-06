"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useTool } from "../context/ToolContext";
import { useDocument } from "../context/DocumentContext";

export default function AnnotationCanvas({
  width,
  height,
  pageNumber,
}: {
  width: number;
  height: number;
  pageNumber: number;
}) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const {
    tool,
    color,
    brushSize,
    pressureEnabled,
  } = useTool();

  const {
    annotations,
    addAnnotation,
  } = useDocument();

  useEffect(() => {
    redraw();
  }, [annotations]);

  function redraw() {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx!.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    annotations
      .filter(
        (a) =>
          a.page === pageNumber
      )
      .forEach((annotation) => {
        if (
          annotation.points.length <
          2
        )
          return;

        ctx!.beginPath();

        ctx!.strokeStyle =
          annotation.color;

        ctx!.lineWidth =
          annotation.width;

        ctx!.lineCap =
          "round";

        if (
          annotation.tool ===
          "highlighter"
        ) {
          ctx!.globalAlpha =
            0.3;
        } else {
          ctx!.globalAlpha =
            1;
        }

        ctx!.moveTo(
          annotation.points[0].x,
          annotation.points[0].y
        );

        for (
          let i = 1;
          i <
          annotation.points.length;
          i++
        ) {
          ctx!.lineTo(
            annotation.points[i].x,
            annotation.points[i].y
          );
        }

        ctx!.stroke();
      });
  }

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    let drawing = false;

    let points: {
      x: number;
      y: number;
    }[] = [];

    function down(
      e: PointerEvent
    ) {
      drawing = true;

      points = [
        {
          x: e.offsetX,
          y: e.offsetY,
        },
      ];
    }

    function move(
  e: PointerEvent
) {
  if (!drawing) return;

  points.push({
    x: e.offsetX,
    y: e.offsetY,
  });

  redraw();

  ctx!.beginPath();

  ctx!.strokeStyle =
    color;

  ctx!.lineCap =
    "round";

  ctx!.lineWidth =
    pressureEnabled
      ? Math.max(
          1,
          e.pressure *
            brushSize
        )
      : brushSize;

  if (
    tool ===
    "highlighter"
  ) {
    ctx!.globalAlpha =
      0.3;
  } else {
    ctx!.globalAlpha =
      1;
  }

  ctx!.moveTo(
    points[0].x,
    points[0].y
  );

  points.forEach((p) =>
    ctx!.lineTo(
      p.x,
      p.y
    )
  );

  ctx!.stroke();
}
    function up() {
      if (!drawing) return;

      drawing = false;

      addAnnotation({
        id:
          crypto.randomUUID(),

        page: pageNumber,

        tool: tool as any,

        color,

        width:
          brushSize,

        points,
      });
    }

    canvas.addEventListener(
      "pointerdown",
      down
    );

    canvas.addEventListener(
      "pointermove",
      move
    );

    canvas.addEventListener(
      "pointerup",
      up
    );

    canvas.addEventListener(
      "pointerleave",
      up
    );

    return () => {
      canvas.removeEventListener(
        "pointerdown",
        down
      );

      canvas.removeEventListener(
        "pointermove",
        move
      );

      canvas.removeEventListener(
        "pointerup",
        up
      );

      canvas.removeEventListener(
        "pointerleave",
        up
      );
    };
  }, [
    tool,
    color,
    brushSize,
    pressureEnabled,
    annotations,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="
      absolute
      left-0
      top-0
      touch-none
      z-10
    "
    />
  );
}
