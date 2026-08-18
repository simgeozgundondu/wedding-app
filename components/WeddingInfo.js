import { getMapsUrl } from "@/lib/wedding-data";

export default function WeddingInfo({ wedding }) {
  return (
    <section
      id="wedding"
      className="scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze">
          Wedding Information
        </p>

        <div className="mt-14 space-y-8">
          <p className="font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            {wedding.date}
          </p>

          <div className="mx-auto h-px w-8 bg-line" />

          <p className="font-sans text-sm uppercase tracking-[0.28em] text-muted">
            {wedding.time}
          </p>

          <div className="mx-auto h-px w-8 bg-line" />

          <div>
            <p className="font-serif text-2xl font-light leading-snug text-ink sm:text-3xl">
              {wedding.venue}
            </p>
            <p className="mt-3 font-sans text-sm leading-6 text-muted">
              {wedding.address}
            </p>
          </div>
        </div>

        <a
          href={getMapsUrl(wedding.mapsQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-flex min-h-12 touch-manipulation items-center justify-center border border-bronze/50 px-10 py-3 font-sans text-[11px] font-medium tracking-[0.32em] text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory"
        >
          YOL TARİFİ
        </a>
      </div>
    </section>
  );
}
