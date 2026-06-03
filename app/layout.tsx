import "./globals.css";
import {
  ToolProvider,
} from "@/context/ToolContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ToolProvider>
          {children}
        </ToolProvider>
      </body>
    </html>
  );
}
