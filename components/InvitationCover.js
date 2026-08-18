"use client";

export default function InvitationCover({ wedding, onOpen, isOpening = false }) {
  return (
    <div className="paper-grain invitation-frame relative flex h-dvh w-screen items-center justify-center px-6 py-10 sm:px-10">
      <div
        className={`flex max-w-md flex-col items-center text-center transition-opacity duration-300 ${
          isOpening ? "opacity-80" : "opacity-100"
        }`}
      >
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.46em] text-bronze">
          Düğün Davetiyesi
        </p>

        <div className="mt-10 sm:mt-14">
          <h1 className="flex flex-col items-center">
            <span className="font-serif text-[3.35rem] font-light leading-none tracking-[0.18em] text-ink sm:text-7xl">
              {wedding.bride.toLocaleUpperCase("tr-TR")}
            </span>
            <span className="my-4 font-serif text-3xl font-light italic text-bronze sm:my-5 sm:text-4xl">
              &
            </span>
            <span className="font-serif text-[3.35rem] font-light leading-none tracking-[0.18em] text-ink sm:text-7xl">
              {wedding.groom.toLocaleUpperCase("tr-TR")}
            </span>
          </h1>
        </div>

        <div className="mt-10 h-px w-10 bg-bronze/40 sm:mt-12" />

        <p className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-muted">
          {wedding.dateDisplay}
        </p>

        <p className="mt-8 max-w-[16.5rem] font-serif text-lg font-light italic leading-8 text-ink/80 sm:max-w-xs sm:text-xl sm:leading-9">
          {wedding.coverQuote}
        </p>

        <button
          type="button"
          onClick={onOpen}
          disabled={isOpening}
          className={`mt-12 min-h-12 touch-manipulation border border-bronze/50 px-10 py-3 font-sans text-[11px] font-medium tracking-[0.32em] text-ink transition-colors duration-300 sm:mt-14 ${
            isOpening
              ? "pointer-events-none opacity-0"
              : "hover:bg-ink hover:text-ivory"
          }`}
          aria-label="Daveti aç"
        >
          DAVETİ AÇ
        </button>
      </div>
    </div>
  );
}
