import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#1C1A17] flex flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
      <NavLink to="/" className="font-display text-[22px] italic tracking-tight text-[#E8C98A]">
        loaf <span className="not-italic font-bold text-[#E8C98A]">lab</span>
      </NavLink>

      <p className="font-mono text-[11px] tracking-wide text-[#F5F0E84D]">
        Built with React · TypeScript · Node.js · and a lot of sourdough
      </p>
    </footer>
  );
};
