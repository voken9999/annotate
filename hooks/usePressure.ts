"use client";

export default function getPressure(
  pressureEnabled: boolean,
  pressure: number,
  brushSize: number
) {
  if (
    !pressureEnabled
  )
    return brushSize;

  return Math.max(
    1,
    pressure *
      brushSize *
      2
  );
}
