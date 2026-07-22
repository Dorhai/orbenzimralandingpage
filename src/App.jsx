import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<LegalPage document="terms" />} />
      <Route path="/privacy" element={<LegalPage document="privacy" />} />
      <Route path="/accessibility" element={<LegalPage document="accessibility" />} />
    </Routes>
    </>
  );
}

export default App;
