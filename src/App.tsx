import React, { useState, useEffect, useCallback } from 'react';
import { ViewMode, LessonId } from './types/lesson';
import { Header } from './components/Header';
import { PresentationMode } from './components/PresentationMode';
import { StudyGuideView } from './components/StudyGuideView';
import { CircuitSimulator } from './components/CircuitSimulator';
import { MagnetismSimulator } from './components/MagnetismSimulator';
import { HydraulicAnalogy } from './components/HydraulicAnalogy';
import { OhmTriangle } from './components/OhmTriangle';
import { QuizView } from './components/QuizView';
import { GlossaryView } from './components/GlossaryView';
import { PrintableSummary } from './components/PrintableSummary';
import { ArtefactsHubModal, ARTEFACT_BLOCKS } from './components/ArtefactsHubModal';
import {
  Presentation,
  BookOpen,
  Cpu,
  HelpCircle,
  BookMarked,
  Zap,
  Magnet,
  Droplets,
  Printer,
  Sparkles,
  Copy,
  Check,
  Share2,
  Globe,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('presentation');
  const [currentLesson, setCurrentLesson] = useState<LessonId>('lesson-1');
  const [studyGuideTab, setStudyGuideTab] = useState<'l1' | 'l2'>('l1');
  const [simulatorTab, setSimulatorTab] = useState<'circuit' | 'magnet' | 'hydraulic' | 'triangle'>('circuit');
  const [quizFilter, setQuizFilter] = useState<'all' | 'lesson-1' | 'lesson-2'>('lesson-1');
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [isHubOpen, setIsHubOpen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Calcola l'hash corrente coerente con lo stato attivo
  const getCurrentHash = useCallback((): string => {
    if (isPrintOpen) return 'print-summary';
    if (currentView === 'presentation') {
      return currentLesson === 'lesson-1' ? 'presentation-l1' : 'presentation-l2';
    }
    if (currentView === 'study-guide') {
      return studyGuideTab === 'l1' ? 'study-guide-l1' : 'study-guide-l2';
    }
    if (currentView === 'simulator') {
      if (simulatorTab === 'circuit') return 'circuit-simulator';
      if (simulatorTab === 'magnet') return 'magnet-simulator';
      if (simulatorTab === 'hydraulic') return 'hydraulic-analogy';
      if (simulatorTab === 'triangle') return 'ohm-triangle';
    }
    if (currentView === 'quiz') {
      if (quizFilter === 'lesson-2') return 'quiz-l2';
      if (quizFilter === 'all') return 'quiz-all';
      return 'quiz-l1';
    }
    if (currentView === 'glossary') return 'glossary';
    return 'presentation-l1';
  }, [isPrintOpen, currentView, currentLesson, studyGuideTab, simulatorTab, quizFilter]);

  // Aggiorna lo stato in base a un hash
  const applyHash = useCallback((rawHash: string) => {
    const hash = rawHash.replace(/^#\/?/, '').trim();
    if (!hash) return;

    if (hash === 'blocks' || hash === 'artefacts') {
      setIsHubOpen(true);
      return;
    }

    if (hash === 'print-summary') {
      setIsPrintOpen(true);
      return;
    }
    setIsPrintOpen(false);

    if (hash === 'presentation-l1' || hash === 'presentation') {
      setCurrentView('presentation');
      setCurrentLesson('lesson-1');
    } else if (hash === 'presentation-l2') {
      setCurrentView('presentation');
      setCurrentLesson('lesson-2');
    } else if (hash === 'study-guide-l1' || hash === 'study-guide') {
      setCurrentView('study-guide');
      setStudyGuideTab('l1');
    } else if (hash === 'study-guide-l2') {
      setCurrentView('study-guide');
      setStudyGuideTab('l2');
    } else if (hash === 'circuit-simulator') {
      setCurrentView('simulator');
      setSimulatorTab('circuit');
    } else if (hash === 'magnet-simulator') {
      setCurrentView('simulator');
      setSimulatorTab('magnet');
    } else if (hash === 'hydraulic-analogy') {
      setCurrentView('simulator');
      setSimulatorTab('hydraulic');
    } else if (hash === 'ohm-triangle') {
      setCurrentView('simulator');
      setSimulatorTab('triangle');
    } else if (hash === 'quiz-l1' || hash === 'quiz') {
      setCurrentView('quiz');
      setQuizFilter('lesson-1');
    } else if (hash === 'quiz-l2') {
      setCurrentView('quiz');
      setQuizFilter('lesson-2');
    } else if (hash === 'quiz-all') {
      setCurrentView('quiz');
      setQuizFilter('all');
    } else if (hash === 'glossary') {
      setCurrentView('glossary');
    }
  }, []);

  // Ascolta cambi di URL hash (es. click su link diretto o pulsanti Avanti/Indietro del browser)
  useEffect(() => {
    const handleHashChange = () => {
      applyHash(window.location.hash);
    };

    // Applica subito l'hash presente nell'URL all'avvio
    if (window.location.hash) {
      applyHash(window.location.hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [applyHash]);

  // Sincronizza l'hash nell'URL quando l'utente naviga all'interno della UI
  useEffect(() => {
    const targetHash = getCurrentHash();
    if (window.location.hash !== `#${targetHash}`) {
      window.history.replaceState(null, '', `#${targetHash}`);
    }
  }, [getCurrentHash]);

  // Copia link diretto del blocco corrente per GitHub Pages
  const handleCopyCurrentLink = () => {
    const hash = getCurrentHash();
    const origin = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://cinziascala.github.io/elettricita-magnetismo/';
    const fullUrl = `${origin}#${hash}`;

    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  // Navigazione esplicita richiesta dall'hub degli artefatti
  const handleNavigateToHash = (hash: string) => {
    window.location.hash = hash;
    applyHash(hash);
  };

  // Se è attiva la visualizzazione stampabile a tutta pagina
  if (isPrintOpen) {
    return <PrintableSummary onBack={() => {
      setIsPrintOpen(false);
      window.location.hash = 'study-guide-l1';
    }} />;
  }

  // Trova le info del blocco attivo corrente per la didascalia
  const activeHash = getCurrentHash();
  const currentBlockInfo = ARTEFACT_BLOCKS.find((b) => b.hash === activeHash) || ARTEFACT_BLOCKS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header Top Bar Contract (§2 Universal Frontend Design) */}
      <Header
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          if (view === 'presentation') window.location.hash = currentLesson === 'lesson-1' ? 'presentation-l1' : 'presentation-l2';
          if (view === 'study-guide') window.location.hash = studyGuideTab === 'l1' ? 'study-guide-l1' : 'study-guide-l2';
          if (view === 'simulator') window.location.hash = `${simulatorTab === 'circuit' ? 'circuit-simulator' : simulatorTab === 'magnet' ? 'magnet-simulator' : simulatorTab === 'hydraulic' ? 'hydraulic-analogy' : 'ohm-triangle'}`;
          if (view === 'quiz') window.location.hash = quizFilter === 'lesson-1' ? 'quiz-l1' : quizFilter === 'lesson-2' ? 'quiz-l2' : 'quiz-all';
          if (view === 'glossary') window.location.hash = 'glossary';
        }}
        onOpenHub={() => setIsHubOpen(true)}
      />

      {/* Barra Informativa del Blocco Attivo & Condivisione GitHub Pages */}
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-slate-400">Blocco attivo:</span>
            <span className="font-semibold text-white truncate">{currentBlockInfo.title}</span>
            <span className="text-slate-500 font-mono hidden md:inline">#{activeHash}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyCurrentLink}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors text-[11px] font-semibold border ${
                copiedNotification
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title="Copia l'URL diretto con questo hash da incollare su GitHub Pages o Classroom"
            >
              {copiedNotification ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copiedNotification ? 'Link Copiato!' : 'Copia Link Diretto Sezione'}</span>
            </button>

            <button
              onClick={() => setIsHubOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-950/80 text-sky-300 border border-sky-800/60 hover:bg-sky-900 transition-colors text-[11px] font-semibold"
            >
              <Globe className="w-3 h-3 text-sky-400" />
              <span>Tutti i Blocchi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar / Barra di Navigazione Mobile e Tablet */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto no-print">
        <button
          onClick={() => {
            setCurrentView('presentation');
            window.location.hash = currentLesson === 'lesson-1' ? 'presentation-l1' : 'presentation-l2';
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'presentation' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Presentazione
        </button>
        <button
          onClick={() => {
            setCurrentView('study-guide');
            window.location.hash = studyGuideTab === 'l1' ? 'study-guide-l1' : 'study-guide-l2';
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'study-guide' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Quaderno
        </button>
        <button
          onClick={() => {
            setCurrentView('simulator');
            window.location.hash = simulatorTab === 'circuit' ? 'circuit-simulator' : simulatorTab === 'magnet' ? 'magnet-simulator' : simulatorTab === 'hydraulic' ? 'hydraulic-analogy' : 'ohm-triangle';
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Laboratori
        </button>
        <button
          onClick={() => {
            setCurrentView('glossary');
            window.location.hash = 'glossary';
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'glossary' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Glossario
        </button>
        <button
          onClick={() => {
            setCurrentView('quiz');
            window.location.hash = quizFilter === 'lesson-1' ? 'quiz-l1' : quizFilter === 'lesson-2' ? 'quiz-l2' : 'quiz-all';
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'quiz' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50'
          }`}
        >
          Quiz
        </button>
      </div>

      {/* Contenuto Principale */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* VISTA 1: PRESENTAZIONE SLIDE */}
        {currentView === 'presentation' && (
          <div className="space-y-6">
            <PresentationMode
              currentLesson={currentLesson}
              onSelectLesson={(lesson) => {
                setCurrentLesson(lesson);
                window.location.hash = lesson === 'lesson-1' ? 'presentation-l1' : 'presentation-l2';
              }}
              onOpenSimulator={() => {
                const target = currentLesson === 'lesson-1' ? 'circuit' : 'magnet';
                setSimulatorTab(target);
                setCurrentView('simulator');
                window.location.hash = target === 'circuit' ? 'circuit-simulator' : 'magnet-simulator';
              }}
              onOpenQuiz={() => {
                setCurrentView('quiz');
                setQuizFilter(currentLesson === 'lesson-1' ? 'lesson-1' : 'lesson-2');
                window.location.hash = currentLesson === 'lesson-1' ? 'quiz-l1' : 'quiz-l2';
              }}
            />

            {/* Schede di accesso rapido ad altri artefatti */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div
                onClick={() => {
                  setCurrentView('study-guide');
                  setStudyGuideTab(currentLesson === 'lesson-1' ? 'l1' : 'l2');
                  window.location.hash = currentLesson === 'lesson-1' ? 'study-guide-l1' : 'study-guide-l2';
                }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Vuoi approfondire il testo?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apri la <strong>Dispensa di Studio</strong> per leggere le spiegazioni estese con tutte le definizioni dettagliate.
                </p>
              </div>

              <div
                onClick={() => {
                  setSimulatorTab('circuit');
                  setCurrentView('simulator');
                  window.location.hash = 'circuit-simulator';
                }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Laboratorio Virtuale
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sperimenta con il <strong>Banco di Prova</strong> dei circuiti, l'elettromagnete regolabile e l'analogia idraulica.
                </p>
              </div>

              <div
                onClick={() => {
                  setCurrentView('quiz');
                  setQuizFilter(currentLesson === 'lesson-1' ? 'lesson-1' : 'lesson-2');
                  window.location.hash = currentLesson === 'lesson-1' ? 'quiz-l1' : 'quiz-l2';
                }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Autovalutazione Formativa
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fai il <strong>Quiz da 10 o 20 domande</strong> con il commento pedagogico immediato del docente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: DISPENSA & QUADERNO DI STUDIO */}
        {currentView === 'study-guide' && (
          <StudyGuideView
            initialLessonTab={studyGuideTab}
            onOpenPresentation={() => {
              setCurrentView('presentation');
              window.location.hash = 'presentation-l1';
            }}
            onOpenQuiz={() => {
              setCurrentView('quiz');
              window.location.hash = 'quiz-l1';
            }}
            onPrint={() => {
              setIsPrintOpen(true);
              window.location.hash = 'print-summary';
            }}
          />
        )}

        {/* VISTA 3: LABORATORI INTERATTIVI */}
        {currentView === 'simulator' && (
          <div className="space-y-6">
            {/* Selettore Laboratori */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Esperimenti Digitali</span>
                <h2 className="text-lg font-bold text-slate-900">Laboratorio Scientifico di Tecnologia</h2>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => {
                    setSimulatorTab('circuit');
                    window.location.hash = 'circuit-simulator';
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'circuit'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Circuito & Legge di Ohm
                </button>
                <button
                  onClick={() => {
                    setSimulatorTab('magnet');
                    window.location.hash = 'magnet-simulator';
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'magnet'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Magnet className="w-3.5 h-3.5 text-rose-500" />
                  Magnetismo & Elettromagnete
                </button>
                <button
                  onClick={() => {
                    setSimulatorTab('hydraulic');
                    window.location.hash = 'hydraulic-analogy';
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'hydraulic'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  Analogia Idraulica
                </button>
                <button
                  onClick={() => {
                    setSimulatorTab('triangle');
                    window.location.hash = 'ohm-triangle';
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'triangle'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  Triangolo di Ohm (DSA)
                </button>
              </div>
            </div>

            {/* Contenuto del Laboratorio Selezionato */}
            {simulatorTab === 'circuit' && <CircuitSimulator />}
            {simulatorTab === 'magnet' && <MagnetismSimulator />}
            {simulatorTab === 'hydraulic' && <HydraulicAnalogy />}
            {simulatorTab === 'triangle' && <OhmTriangle />}
          </div>
        )}

        {/* VISTA 4: QUIZ DI VERIFICA */}
        {currentView === 'quiz' && (
          <QuizView
            initialFilter={quizFilter}
            onBackToStudy={() => {
              setCurrentView('study-guide');
              window.location.hash = 'study-guide-l1';
            }}
          />
        )}

        {/* VISTA 5: GLOSSARIO TECNOLOGICO */}
        {currentView === 'glossary' && <GlossaryView />}
      </main>

      {/* Footer silenzioso e sobrio */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 px-6 text-xs text-slate-500 no-print">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              TecnoLab · Didattica della Tecnologia per la Scuola Secondaria di Primo Grado
            </p>
            <p className="text-slate-400">
              Conforme alle Indicazioni Nazionali MIUR per il Curricolo di Tecnologia.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-slate-500">
            <button
              onClick={() => setIsHubOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium flex items-center gap-1 text-sky-700"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tutti i Blocchi & Link
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setIsPrintOpen(true);
                window.location.hash = 'print-summary';
              }}
              className="hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Stampa Scheda Sintetica
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setCurrentView('glossary');
                window.location.hash = 'glossary';
              }}
              className="hover:text-slate-700 transition-colors"
            >
              Glossario 30 Termini
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Hub con tutti i Blocchi Didattici e Link GitHub Pages */}
      <ArtefactsHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        onNavigateToHash={handleNavigateToHash}
      />
    </div>
  );
}
