"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type ToolType =
  | "pen"
  | "eraser"
  | "rectangle"
  | "circle"
  | "arrow"
  | "text";

interface ToolContextType {
  tool: ToolType;
  setTool: (tool: ToolType) => void;

  color: string;
  setColor: (color: string) => void;

  brushSize: number;
  setBrushSize: (size: number) => void;

  pressureEnabled: boolean;
  setPressureEnabled: (
    enabled: boolean
  ) => void;
}

const ToolContext =
  createContext<ToolContextType | null>(
    null
  );

export function ToolProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [tool, setTool] =
    useState<ToolType>("pen");

  const [color, setColor] =
    useState("#ff0000");

  const [brushSize, setBrushSize] =
    useState(4);

  const [
    pressureEnabled,
    setPressureEnabled,
  ] = useState(true);

  return (
    <ToolContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        brushSize,
        setBrushSize,
        pressureEnabled,
        setPressureEnabled,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export function useTool() {
  const context =
    useContext(ToolContext);

  if (!context) {
    throw new Error(
      "useTool must be used inside ToolProvider"
    );
  }

  return context;
}