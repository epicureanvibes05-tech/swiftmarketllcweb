import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="section">
      <div className="page-container">
        <div className="reading-container stack">
          <p className="type-eyebrow text-secondary">404 / Page not found</p>
          <h1 className="type-h1">This page isn’t here.</h1>
          <p className="type-body-large text-secondary">
            The page may have moved, changed, or no longer be available.
          </p>
          <div>
            <Link href="/" className="button-base button-primary">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
