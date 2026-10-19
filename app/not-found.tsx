import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[80svh] place-content-center pt-24 text-center">
      <h1 className="display text-[clamp(3rem,9vw,7rem)]">All eaten.</h1>
      <p className="mx-auto mt-4 max-w-[36ch] text-ink-soft">That page is not on the menu.</p>
      <div className="mt-8 flex justify-center">
        <Link href="/#menu" className="btn btn-primary">See the menu</Link>
      </div>
    </div>
  );
}
