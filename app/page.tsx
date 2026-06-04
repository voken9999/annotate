"use client";

import { useState } from "react";
import Toolbar from "../components/Toolbar";
import PDFViewer from "../components/PDFViewer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="h-screen flex flex-col bg-zinc-900">
      <Toolbar />

      {!file ? (
        <div className="flex flex-1 items-center justify-center">
          <label className="cursor-pointer rounded-lg border-2 border-dashed border-zinc-500 p-10 text-white">
            Upload PDF

            <input
              hidden
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const uploaded = e.target.files?.[0];

                if (uploaded) {
                  setFile(uploaded);
                }
              }}
            />
          </label>
        </div>
      ) : (
        <PDFViewer file={file} />
      )}
    </main>
  );
}
