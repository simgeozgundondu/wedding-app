export default function OurStory({ wedding }) {
  return (
    <section
      id="our-story"
      className="scroll-mt-24 px-6 py-24 sm:px-10 sm:py-32 md:scroll-mt-28"
    >
      <div className="mx-auto max-w-md text-center">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] text-bronze">
          Our Story
        </p>

        <div className="mt-10 h-px w-10 mx-auto bg-bronze/40" />

        <p className="mt-10 font-serif text-xl font-light italic leading-9 text-ink/85 sm:text-2xl sm:leading-10">
          {wedding.storyLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
