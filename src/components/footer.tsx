const currentYear = new Date().getFullYear();

const LINKS = ['Privacy', 'Terms', 'Docs', 'Support'] as const;

export function Footer() {
  return (
    <footer role="contentinfo" className="shrink-0 border-t border-white/[0.06] bg-[#111317]">
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-5 md:px-6 md:py-6 lg:px-10 lg:py-7">
        <div className="hidden md:flex items-center gap-3">
          <span className="font-display italic text-lg lg:text-xl text-primary-400 tracking-tight">
            Atlas <span className="text-auxiliary-400 not-italic font-sans font-black">AI</span>
          </span>
          <span className="text-xs text-neutral-500 font-sans">
            © {currentYear} · Intelligent travel planning
          </span>
        </div>

        <span className="md:hidden text-[11px] text-neutral-500 font-sans">© {currentYear} Atlas AI</span>

        <nav aria-label="Footer links" className="flex items-center gap-3 md:gap-4">
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
