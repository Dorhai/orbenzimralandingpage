import { siteContent } from '../data/siteContent';
import { DumbbellMark } from './DumbbellMark';

const LOGO_COLOR = '#3b4654';

const TaperLine = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 100 6"
    preserveAspectRatio="none"
    className={className}
    fill="currentColor"
    aria-hidden
  >
    <polygon points={flip ? '100,0 0,3 100,6' : '0,0 100,3 0,6'} />
  </svg>
);

const SIZES = {
  full: {
    name: 'text-2xl md:text-3xl tracking-[0.35em] ms-[0.35em]',
    midRow: 'max-w-[280px] my-3 gap-2',
    dumbbell: 'w-14',
    longLine: 'flex-1 h-[3px]',
    subRow: 'gap-3',
    shortLine: 'w-8 h-[2px]',
    subtext: 'text-[10px] md:text-xs tracking-[0.45em] ms-[0.45em]',
  },
  compact: {
    name: 'text-sm md:text-base tracking-[0.3em] ms-[0.3em]',
    midRow: 'max-w-[140px] my-1.5 gap-1',
    dumbbell: 'w-8',
    longLine: 'flex-1 h-[2px]',
    subRow: 'gap-1.5',
    shortLine: 'w-5 h-[1.5px]',
    subtext: 'text-[8px] md:text-[10px] tracking-[0.4em] ms-[0.4em]',
  },
};

const LogoLockup = ({ size, className = '' }) => {
  const s = SIZES[size];

  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      style={{ color: LOGO_COLOR }}
      dir="ltr"
    >
      <span className={`font-medium leading-none ${s.name}`}>
        {siteContent.gym.logoText}
      </span>

      <div className={`flex items-center w-full ${s.midRow}`}>
        <TaperLine className={s.longLine} />
        <DumbbellMark className={`${s.dumbbell} shrink-0`} />
        <TaperLine className={s.longLine} flip />
      </div>

      <div className={`flex items-center ${s.subRow}`}>
        <TaperLine className={s.shortLine} />
        <span className={`font-light leading-none ${s.subtext}`}>
          {siteContent.gym.logoSubtext}
        </span>
        <TaperLine className={s.shortLine} flip />
      </div>
    </div>
  );
};

/*
 * Brand logo lockup recreated from the original artwork.
 * variant="full"    -> stacked logo (name + dumbbell divider + subtext)
 * variant="compact" -> scaled-down stacked logo for the navbar
 */
const Logo = ({ variant = 'full', className = '' }) => (
  <LogoLockup size={variant === 'compact' ? 'compact' : 'full'} className={className} />
);

export default Logo;
