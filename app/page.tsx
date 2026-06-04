"use client";

import { useState } from "react";
import PDFViewer from "../components/PDFViewer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  if (file) {
    return <PDFViewer file={file} />;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-6xl mx-auto px-6">

        <nav className="h-20 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            Annotate
          </h1>

          <button className="bg-white text-black px-5 py-2 rounded-xl font-medium">
            Open Document
          </button>

        </nav>

        <section className="py-24 text-center">

          <h1 className="text-6xl font-bold mb-6">
            Annotate Anything.
          </h1>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
            Upload PDFs, Word documents,
            PowerPoints and images. Draw,
            highlight and take notes with full
            graphics tablet support.
          </p>

          <label className="cursor-pointer">

            <input
              hidden
              type="file"
              accept=".pdf,.docx,.pptx,image/*"
              onChange={(e) => {
                const uploaded =
                  e.target.files?.[0];

                if (uploaded) {
                  setFile(uploaded);
                }
              }}
            />

            <div className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg hover:scale-105 transition">
              Upload Document
            </div>

          </label>

        </section>

        <section className="grid md:grid-cols-3 gap-6 pb-24">

          <FeatureCard
            title="Graphics Tablet Ready"
            description="Pressure sensitivity, palm rejection and stylus support."
          />

          <FeatureCard
            title="Real-Time Autosave"
            description="Never lose annotations or notes."
          />

          <FeatureCard
            title="Export Anywhere"
            description="Export to PDF, PNG and JPEG."
          />

        </section>

      </div>

    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

      <h2 className="font-semibold text-xl mb-3">
        {title}
      </h2>

      <p className="text-zinc-400">
        {description}
      </p>

    </div>
  );
}