import "./globals.css";

import {
  ToolProvider,
} from "../context/ToolContext";

import {
  DocumentProvider,
} from "../context/DocumentContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToolProvider>
          <DocumentProvider>
            {children}
          </DocumentProvider>
        </ToolProvider>
      </body>
    </html>
  );
}
