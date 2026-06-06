"use client";

import { useTool } from "../context/ToolContext";
import { useDocument } from "../context/DocumentContext";

export default function FloatingToolbar() {
  const {
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
  } = useTool();

  const {
    undo,
    redo,
  } = useDocument();

  return (
    <div
      className="
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      z-50
      bg-zinc-900
      border
      border-zinc-700
      rounded-xl
      px-4
      py-3
      flex
      gap-3
      items-center
    "
    >
      <button
        onClick={() =>
          setTool("pen")
        }
      >
        ✏️
      </button>

      <button
        onClick={() =>
          setTool(
            "highlighter" as any
          )
        }
      >
        🖍️
      </button>

      <button
        onClick={() =>
          setTool("eraser")
        }
      >
        🧹
      </button>

      <button
        onClick={undo}
      >
        ↶
      </button>

      <button
        onClick={redo}
      >
        ↷
      </button>

      <input
        type="color"
        value={color}
        onChange={(e) =>
          setColor(
            e.target.value
          )
        }
      />

      <input
        type="range"
        min="1"
        max="20"
        value={brushSize}
        onChange={(e) =>
          setBrushSize(
            Number(
              e.target.value
            )
          )
        }
      />
    </div>
  );
}
