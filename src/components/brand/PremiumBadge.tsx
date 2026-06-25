import React from "react";

interface PremiumBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pd-gold-500/30 bg-pd-cream-100/50 text-pd-gold-600 text-xs font-semibold tracking-wider uppercase font-sans select-none ${className}`}
    >
      <svg
        className="w-3.5 h-3.5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      {children}
    </div>
  );
};

export default PremiumBadge;
