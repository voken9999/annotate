"use client";

export default function DocumentHeader({
  fileName,
  zoom,
  setZoom,
}: {
  fileName: string;
  zoom: number;
  setZoom: (
    zoom: number
  ) => void;
}) {
  return (
    <header
      className="
      h-14
      border-b
      border-zinc-800
      bg-zinc-950
      flex
      items-center
      justify-between
      px-4
      text-white
    "
    >
      <div
        className="
        font-medium
        truncate
      "
      >
        {fileName}
      </div>

      <div
        className="
        flex
        items-center
        gap-2
      "
      >
        <button
          onClick={() =>
            setZoom(
              Math.max(
                0.5,
                zoom - 0.25
              )
            )
          }
          className="
          px-3
          py-1
          bg-zinc-800
          rounded
          "
        >
          −
        </button>

        <span>
          {Math.round(
            zoom * 100
          )}
          %
        </span>

        <button
          onClick={() =>
            setZoom(
              Math.min(
                5,
                zoom + 0.25
              )
            )
          }
          className="
          px-3
          py-1
          bg-zinc-800
          rounded
          "
        >
          +
        </button>
      </div>
    </header>
  );
}
