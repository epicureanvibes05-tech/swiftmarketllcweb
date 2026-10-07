import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Swift Market LLC",
    template: "%s | Swift Market LLC",
  },
  description:
    "Swift Market LLC provides digital growth, marketing, creative, web, app, and technology consulting for the U.S. market.",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US">
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link button-base">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
