import React from "react";
import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; href: string }>;
  pathname: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links, pathname }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-pd-text/40 backdrop-blur-sm"
      />

      {/* Drawer content body panel */}
      <div
        className={`relative flex h-full w-[280px] flex-col bg-pd-cream-50 p-6 shadow-2xl border-l border-pd-border transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header with Close button */}
        <div className="flex items-center justify-between border-b border-pd-border pb-4 mb-6">
          <span className="font-serif text-lg font-semibold text-pd-green-900">
            Menu Navigation
          </span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-pd-border text-pd-green-900 transition hover:bg-pd-cream-100"
            aria-label="Close Navigation Menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`text-base font-medium py-2 px-3 rounded-lg transition ${
                  isActive
                    ? "bg-pd-cream-200/40 text-pd-green-900 font-semibold"
                    : "text-pd-muted hover:bg-pd-cream-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto border-t border-pd-border pt-6 flex flex-col gap-4">
          <Link
            href="/availability"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-pd-green-900 px-5 text-sm font-medium text-pd-cream-50 transition hover:bg-pd-green-800 focus:outline-none"
          >
            Check Availability
          </Link>
          <a
            href="https://wa.me/8801410120299"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-medium text-white transition hover:bg-[#20ba5a]"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.995 0 1.763.459 3.484 1.332 5.002L2 22l5.176-1.356c1.47.801 3.123 1.222 4.821 1.222l.007-.001c5.517 0 9.996-4.478 9.996-9.995C22 6.478 17.522 2 12.004 2zm0 18.286c-1.579 0-3.13-.424-4.484-1.225l-.321-.191-3.329.873.888-3.245-.21-.334c-.879-1.399-1.343-3.023-1.343-4.698C3.205 6.94 7.151 3.714 12.004 3.714c4.85 0 8.796 3.226 8.796 7.957-.001 4.731-3.948 7.957-8.796 7.957z" />
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
