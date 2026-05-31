import { Button } from '@/components/ui/button';
import { useMotionSafe } from '@/lib/animations';

/**
 * Button with a diagonal light sweep that crosses on hover.
 * Falls back to a plain button when the user prefers reduced motion.
 */
const ShineButton = ({ children, className = '', ...props }) => {
  const { reduced } = useMotionSafe();

  return (
    <Button className={`relative overflow-hidden group ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      {!reduced && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
        />
      )}
    </Button>
  );
};

export default ShineButton;
