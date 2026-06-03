"use client";

import { useState } from "react";

export default function Toolbar() {
  const [pressureEnabled, setPressureEnabled] =
    useState(true);

  return (
    <div className="h-14 bg-zinc-800 flex items-center gap-4 px-4 text-white">

      <input type="color" />

      <input
        type="range"
        min={1}
        max={30}
        defaultValue={4}
      />

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Pen
      </button>

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Eraser
      </button>

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Rectangle
      </button>

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Circle
      </button>

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Arrow
      </button>

      <button className="px-3 py-1 bg-zinc-700 rounded">
        Text
      </button>

      <label className="flex items-center gap-2">
        Pressure

        <input
          type="checkbox"
          checked={pressureEnabled}
          onChange={() =>
            setPressureEnabled(!pressureEnabled)
          }
        />
      </label>
    </div>
  );
}
