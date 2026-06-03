"use client";

import {
  useTool,
} from "@/context/ToolContext";

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

  return (
    <div className="h-14 bg-zinc-800 flex items-center gap-4 px-4 text-white">

      <button
        onClick={() =>
          setTool("pen")
        }
      >
        Pen
      </button>

      <button
        onClick={() =>
          setTool("eraser")
        }
      >
        Eraser
      </button>

      <button
        onClick={() =>
          setTool(
            "rectangle"
          )
        }
      >
        Rectangle
      </button>

      <button
        onClick={() =>
          setTool("circle")
        }
      >
        Circle
      </button>

      <button
        onClick={() =>
          setTool("arrow")
        }
      >
        Arrow
      </button>

      <button
        onClick={() =>
          setTool("text")
        }
      >
        Text
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
        min={1}
        max={30}
        value={brushSize}
        onChange={(e) =>
          setBrushSize(
            Number(
              e.target.value
            )
          )
        }
      />

      <label>
        Pressure

        <input
          type="checkbox"
          checked={
            pressureEnabled
          }
          onChange={() =>
            setPressureEnabled(
              !pressureEnabled
            )
          }
        />
      </label>

      <span>
        Active Tool:
        {tool}
      </span>

    </div>
  );
}
