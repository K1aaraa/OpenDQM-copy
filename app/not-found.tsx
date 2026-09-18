import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page you are looking for is not part of the OpenDQM site.</p>
        <Link className="button button-primary" href="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
