"use client";

import { useTool } from "../context/ToolContext";

export default function Toolbar() {
  const {
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    pressureEnabled,
    setPressureEnabled,
  } = useTool();

  const tools = [
    { id: "pen", label: "✏️ Pen" },
    { id: "highlighter", label: "🖍️ Highlighter" },
    { id: "eraser", label: "🧽 Eraser" },
    { id: "rectangle", label: "⬜ Rectangle" },
    { id: "circle", label: "⭕ Circle" },
    { id: "arrow", label: "➜ Arrow" },
    { id: "text", label: "T Text" },
  ];

  return (
    <div
      className="
        sticky
        top-0
        z-50
        h-16
        border-b
        border-zinc-800
        bg-zinc-950/90
        backdrop-blur-xl
        flex
        items-center
        justify-between
        px-6
        text-white
      "
    >
      <div className="flex items-center gap-2">
        {tools.map((item) => (
          <button
            key={item.id}
            onClick={() => setTool(item.id as any)}
            className={`px-3 py-2 rounded-xl text-sm transition-all ${
              tool === (item.id as any)
                ? "bg-white text-black"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="
            w-10
            h-10
            rounded-lg
            overflow-hidden
            cursor-pointer
          "
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">
            Size
          </span>

          <input
            type="range"
            min={1}
            max={30}
            value={brushSize}
            onChange={(e) =>
              setBrushSize(Number(e.target.value))
            }
          />

          <span className="text-xs w-6">
            {brushSize}
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pressureEnabled}
            onChange={() =>
              setPressureEnabled(!pressureEnabled)
            }
          />
          Pressure
        </label>
      </div>
    </div>
  );
}
