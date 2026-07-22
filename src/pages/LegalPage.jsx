import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { renderBlocks } from '../components/LegalSectionContent';
import { legalDocuments } from '../data/legalContent';

const pageTitles = {
  terms: 'תקנון האתר',
  privacy: 'מדיניות פרטיות',
  accessibility: 'הצהרת נגישות',
};

function LegalPage({ document: documentKey }) {
  const doc = legalDocuments[documentKey];

  useEffect(() => {
    document.title = `${pageTitles[documentKey]} | אור בן זימרה`;
    return () => {
      document.title = 'אור בן זימרה | מאמן כושר אונליין – ליווי אימונים ותזונה אישי';
    };
  }, [documentKey]);

  if (!doc) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar homeHref="/" />
      <main className="flex-1 pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {doc.title}
            </h1>
            {doc.subtitle && (
              <p className="text-lg text-muted-foreground mb-2">{doc.subtitle}</p>
            )}
            <p className="text-sm text-muted-foreground">
              עודכן לאחרונה: {doc.lastUpdated}
            </p>
          </header>

          <div className="space-y-10">
            {doc.sections.map((section, index) => (
              <section key={section.title}>
                {index > 0 && (
                  <hr className="border-border mb-10" aria-hidden="true" />
                )}
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">{renderBlocks(section.blocks)}</div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← חזרה לדף הבית
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default LegalPage;
