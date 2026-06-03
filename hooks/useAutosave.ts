"use client";

import {
  useEffect,
} from "react";

export default function useAutosave(
  key: string,
  value: string
) {
  useEffect(() => {
    localStorage.setItem(
      key,
      value
    );
  }, [key, value]);
}
