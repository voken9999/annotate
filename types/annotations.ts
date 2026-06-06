export type AnnotationTool =
  | "pen"
  | "highlighter"
  | "eraser"
  | "rectangle"
  | "circle"
  | "arrow"
  | "text";

export interface Point {
  x: number;
  y: number;
}

export interface Annotation {
  id: string;

  page: number;

  tool: AnnotationTool;

  color: string;

  width: number;

  points: Point[];

  text?: string;
}
