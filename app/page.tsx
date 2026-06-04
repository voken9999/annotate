"use client";

import { useState, useEffect, useRef } from "react";
import PDFViewer from "../components/PDFViewer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFile = (uploaded: File) => {
    setFile(uploaded);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  if (file) {
    return <PDFViewer file={file} />;
  }

  return (
    <main
      className="min-h-screen bg-zinc-950 text-white overflow-x-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Ambient glow top-left */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ambient glow bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(120,120,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            height: "72px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(9,9,11,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "white",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 2h7l3 3v9H3V2z" stroke="#09090b" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 2v3h3" stroke="#09090b" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5.5 8.5h5M5.5 11h3" stroke="#09090b" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>
              annotate
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <NavLink>Changelog</NavLink>
            <NavLink>Docs</NavLink>
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                marginLeft: "8px",
                padding: "8px 18px",
                background: "white",
                color: "#09090b",
                border: "none",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Open File
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "100px 48px 80px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 12px 5px 8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px",
              marginBottom: "40px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                boxShadow: "0 0 6px #4ade80",
              }}
            />
            Now with graphics tablet support
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(52px, 7vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              marginBottom: "28px",
              maxWidth: "820px",
            }}
          >
            Mark up
            <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>any document.</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "460px",
              lineHeight: 1.65,
              marginBottom: "56px",
              letterSpacing: "-0.01em",
            }}
          >
            Annotate PDFs, Word docs, PowerPoints and images with a
            pen, highlighter or text tool. Designed for stylus and
            touch from the ground up.
          </p>

          {/* Upload zone */}
          <UploadZone onFile={handleFile} inputRef={inputRef} />
        </section>

        {/* Divider */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 48px",
          }}
        >
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
        </div>

        {/* Features */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "80px 48px 120px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Feature
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 16l5-5m0 0l5-5m-5 5l5 5m-5-5L4 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            label="01"
            title="Stylus-first"
            description="Pressure sensitivity, palm rejection, and tilt support. Works with Apple Pencil, Surface Pen, and Wacom."
          />
          <Feature
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v2m0 10v2M3 10h2m10 0h2M5.64 5.64l1.42 1.42m5.88 5.88l1.42 1.42M5.64 14.36l1.42-1.42m5.88-5.88l1.42-1.42" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            label="02"
            title="Autosave"
            description="Annotations are saved continuously. Close the tab and come back — everything is right where you left it."
          />
          <Feature
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 14l4-4 3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="3" width="14" height="14" rx="3" stroke="white" strokeWidth="1.5" />
              </svg>
            }
            label="03"
            title="Export anywhere"
            description="Flatten your annotations and export as PDF, PNG, or JPEG — ready to share or archive."
          />
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "32px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.25)",
            fontSize: "13px",
          }}
        >
          <span>© 2026 Annotate</span>
          <span>Built for thinkers who write on things.</span>
        </footer>
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.docx,.pptx,image/*"
        onChange={(e) => {
          const uploaded = e.target.files?.[0];
          if (uploaded) handleFile(uploaded);
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Geist', -apple-system, sans-serif; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.6s ease forwards;
        }
        .fade-up-1 { animation-delay: 0.05s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.15s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.35s; opacity: 0; }
      `}</style>
    </main>
  );
}

function NavLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.45)",
        fontSize: "13px",
        fontWeight: 500,
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: "8px",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
    >
      {children}
    </button>
  );
}

function UploadZone({
  onFile,
  inputRef,
}: {
  onFile: (f: File) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      style={{
        border: `1.5px dashed ${dragging ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "20px",
        padding: "48px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        transition: "all 0.2s ease",
        maxWidth: "560px",
      }}
      onMouseEnter={(e) => {
        if (!dragging) {
          (e.currentTarget as HTMLDivElement).style.border =
            "1.5px dashed rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLDivElement).style.background =
            "rgba(255,255,255,0.03)";
        }
      }}
      onMouseLeave={(e) => {
        if (!dragging) {
          (e.currentTarget as HTMLDivElement).style.border =
            "1.5px dashed rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLDivElement).style.background =
            "rgba(255,255,255,0.02)";
        }
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 20px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 14V4m0 0L7.5 7.5M11 4l3.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17h14" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>

      <p style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", letterSpacing: "-0.02em" }}>
        Drop your file here
      </p>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", letterSpacing: "-0.01em" }}>
        PDF, DOCX, PPTX, or image — or{" "}
        <span style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
          click to browse
        </span>
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginTop: "28px",
        }}
      >
        {["PDF", "DOCX", "PPTX", "PNG", "JPG"].map((ext) => (
          <span
            key={ext}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {ext}
          </span>
        ))}
      </div>
    </div>
  );
}

function Feature({
  icon,
  label,
  title,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding: "40px",
        background: "#09090b",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "#0f0f12")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.background = "#09090b")
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          {label}
        </span>
      </div>

      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          marginBottom: "10px",
          letterSpacing: "-0.025em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.65,
          letterSpacing: "-0.01em",
        }}
      >
        {description}
      </p>
    </div>
  );
}
