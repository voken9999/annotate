"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PDFViewer({
  file,
}: {
  file: File;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1.25);

  useEffect(() => {
    loadPDF();
  }, [file, zoom]);

  async function loadPDF() {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const data = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data,
    }).promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const viewport = page.getViewport({
        scale: zoom,
      });

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "relative mx-auto mb-8";

      const pdfCanvas =
        document.createElement("canvas");

      pdfCanvas.width = viewport.width;
      pdfCanvas.height = viewport.height;

      const ctx =
        pdfCanvas.getContext("2d");

      await page.render({
        canvasContext: ctx!,
        viewport,
      }).promise;

      const annotationCanvas =
        document.createElement("canvas");

      annotationCanvas.width =
        viewport.width;

      annotationCanvas.height =
        viewport.height;

      annotationCanvas.className =
        "absolute left-0 top-0";

      setupDrawing(annotationCanvas);

      wrapper.appendChild(pdfCanvas);
      wrapper.appendChild(annotationCanvas);

      containerRef.current.appendChild(
        wrapper
      );
    }
  }

  return (
    <div className="h-full flex flex-col">

      <div className="bg-zinc-800 p-2 flex gap-2">

        <button
          onClick={() =>
            setZoom((z) =>
              Math.max(0.5, z - 0.25)
            )
          }
          className="px-3 py-1 bg-zinc-700 text-white rounded"
        >
          -
        </button>

        <button
          onClick={() =>
            setZoom((z) =>
              Math.min(5, z + 0.25)
            )
          }
          className="px-3 py-1 bg-zinc-700 text-white rounded"
        >
          +
        </button>

        <span className="text-white">
          {Math.round(zoom * 100)}%
        </span>

      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-6 bg-zinc-900"
      />

    </div>
  );
}

function setupDrawing(
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  let drawing = false;

  let lastX = 0;
  let lastY = 0;

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
        e.pressure > 0
          ? e.pressure
          : 1;

      ctx.strokeStyle = "#ff0000";

      ctx.lineWidth =
        Math.max(
          1,
          pressure * 8
        );

      ctx.lineCap = "round";

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

      saveCanvas(canvas);
    }
  );

  canvas.addEventListener(
    "pointerup",
    () => {
      drawing = false;
    }
  );

  canvas.addEventListener(
    "pointerleave",
    () => {
      drawing = false;
    }
  );

  loadCanvas(canvas);
}

function saveCanvas(
  canvas: HTMLCanvasElement
) {
  localStorage.setItem(
    `annotation-${canvas.width}-${canvas.height}`,
    canvas.toDataURL()
  );
}

function loadCanvas(
  canvas: HTMLCanvasElement
) {
  const saved =
    localStorage.getItem(
      `annotation-${canvas.width}-${canvas.height}`
    );

  if (!saved) return;

  const img = new Image();

  img.onload = () => {
    const ctx =
      canvas.getContext("2d");

    ctx?.drawImage(
      img,
      0,
      0
    );
  };

  img.src = saved;
}
