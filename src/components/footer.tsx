const currentYear = new Date().getFullYear();

const LINKS = ['Privacy', 'Terms', 'Docs', 'Support'] as const;

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="shrink-0 border-t border-white/[0.06] bg-[#111317]"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-5 md:px-6 md:py-6 lg:px-10 lg:py-7">
        <div className="hidden md:flex items-center gap-3">
          <img
            src="/atlas-logo.svg"
            alt=""
            width={120}
            height={32}
            className="h-8 w-auto max-w-[min(42vw,140px)] object-contain object-left md:h-12 md:max-w-none"
            decoding="async"
          />
          <span className="text-xs text-neutral-500 font-sans">
            © {currentYear} · Intelligent travel planning
          </span>
        </div>

        <span className="md:hidden text-[11px] text-neutral-500 font-sans">
          © {currentYear} Atlas AI
        </span>

        <nav
          aria-label="Footer links"
          className="flex items-center gap-3 md:gap-4"
        >
          {LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={`text-[10px] md:text-[11px] font-sans uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-auxiliary-400
                ${label === 'Docs' || label === 'Support' ? 'hidden md:inline' : ''}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
