"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Annotation } from "../types/annotations";

interface DocumentContextType {
  annotations: Annotation[];

  addAnnotation: (
    annotation: Annotation
  ) => void;

  undo: () => void;

  redo: () => void;
}

const DocumentContext =
  createContext<DocumentContextType | null>(
    null
  );

export function DocumentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [annotations, setAnnotations] =
    useState<Annotation[]>([]);

  const [history, setHistory] =
    useState<Annotation[][]>([]);

  const [redoStack, setRedoStack] =
    useState<Annotation[][]>([]);

  function addAnnotation(
    annotation: Annotation
  ) {
    setHistory((prev) => [
      ...prev,
      annotations,
    ]);

    setRedoStack([]);

    setAnnotations((prev) => [
      ...prev,
      annotation,
    ]);
  }

  function undo() {
    if (history.length === 0) return;

    const previous =
      history[
        history.length - 1
      ];

    setRedoStack((r) => [
      ...r,
      annotations,
    ]);

    setAnnotations(previous);

    setHistory((h) =>
      h.slice(0, -1)
    );
  }

  function redo() {
    if (
      redoStack.length === 0
    )
      return;

    const next =
      redoStack[
        redoStack.length - 1
      ];

    setHistory((h) => [
      ...h,
      annotations,
    ]);

    setAnnotations(next);

    setRedoStack((r) =>
      r.slice(0, -1)
    );
  }

  return (
    <DocumentContext.Provider
      value={{
        annotations,
        addAnnotation,
        undo,
        redo,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context =
    useContext(DocumentContext);

  if (!context)
    throw new Error(
      "DocumentProvider missing"
    );

  return context;
}
