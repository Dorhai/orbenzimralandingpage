import { siteContent } from '../data/siteContent';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 bg-transparent px-6 py-4">
      <a href="#home" className="flex items-center" aria-label={siteContent.gym.name}>
        <Logo variant="compact" />
      </a>
    </nav>
  );
};

export default Navbar;
