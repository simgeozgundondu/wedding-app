export default function WeddingHero({ wedding }) {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 pb-28 text-center sm:px-10 md:pt-28">
      <p className="font-sans text-[10px] font-medium uppercase tracking-[0.46em] text-bronze">
        {wedding.dateDisplay}
      </p>

      <h1 className="mt-8 whitespace-nowrap font-serif text-[clamp(1.8rem,7.2vw,3.75rem)] font-light leading-tight tracking-[0.1em] text-ink sm:tracking-[0.16em]">
        {wedding.bride.toLocaleUpperCase("tr-TR")}
        <span className="mx-2 font-serif italic tracking-normal text-bronze sm:mx-3">
          &
        </span>
        {wedding.groom.toLocaleUpperCase("tr-TR")}
      </h1>

      <div className="mt-10 h-px w-10 bg-bronze/40" />

      <p className="mt-10 max-w-sm font-serif text-lg font-light italic leading-8 text-ink/80 sm:max-w-md sm:text-xl sm:leading-9">
        {wedding.heroQuoteLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </section>
  );
}
