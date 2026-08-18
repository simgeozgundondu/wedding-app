const links = [
  { href: "#our-story", label: "Our Story" },
  { href: "#wedding", label: "Wedding" },
  { href: "#photos", label: "Photos" },
  { href: "#messages", label: "Messages" },
];

export default function WeddingNavigation() {
  return (
    <nav
      aria-label="Düğün"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-ivory/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:bottom-auto md:top-0 md:border-t-0 md:border-b"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-between px-5 py-3.5 md:max-w-2xl md:justify-center md:gap-12 md:py-5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="touch-manipulation whitespace-nowrap font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-ink sm:text-[10px] sm:tracking-[0.22em]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
