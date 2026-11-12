import React, { useState } from 'react';
import {
  Layers,
  Copy,
  Check,
  ExternalLink,
  X,
  Presentation,
  BookOpen,
  Cpu,
  HelpCircle,
  BookMarked,
  Printer,
  Sparkles,
  Share2,
  Globe,
} from 'lucide-react';

export interface ArtefactBlock {
  id: string;
  hash: string;
  title: string;
  category: 'Presentazione' | 'Dispensa' | 'Laboratorio' | 'Verifica' | 'Compendio';
  badgeColor: string;
  description: string;
  icon: React.ReactNode;
}

export const ARTEFACT_BLOCKS: ArtefactBlock[] = [
  {
    id: 'block-pres-l1',
    hash: 'presentation-l1',
    title: 'Presentazione LIM: Lezione 1 (Elettricità)',
    category: 'Presentazione',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
    description: '10 slide multimediali con audio sintesi vocale su atomo, cariche, grandezze SI, legge di Ohm e circuiti in serie/parallelo.',
    icon: <Presentation className="w-5 h-5 text-sky-600" />,
  },
  {
    id: 'block-pres-l2',
    hash: 'presentation-l2',
    title: 'Presentazione LIM: Lezione 2 (Magnetismo)',
    category: 'Presentazione',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    description: '10 slide su calamite, campo magnetico terrestre, esperimenti di Oersted e Faraday, elettromagnete, motore e treno Maglev.',
    icon: <Presentation className="w-5 h-5 text-rose-600" />,
  },
  {
    id: 'block-circuit-sim',
    hash: 'circuit-simulator',
    title: 'Laboratorio: Banco di Prova Circuiti Elettrici',
    category: 'Laboratorio',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    description: 'Simulatore interattivo con flusso di elettroni animato, voltmetro, amperometro e commutatore Serie / Parallelo.',
    icon: <Cpu className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 'block-magnet-sim',
    hash: 'magnet-simulator',
    title: 'Laboratorio: Calamita, Bussola & Elettromagnete',
    category: 'Laboratorio',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    description: 'Bussola interattiva orientabile attorno alla calamita, taglio del magnete e solenoide con graffette metalliche attirate.',
    icon: <Cpu className="w-5 h-5 text-rose-600" />,
  },
  {
    id: 'block-hydraulic',
    hash: 'hydraulic-analogy',
    title: 'Laboratorio BES/DSA: L\'Analogia Idraulica',
    category: 'Laboratorio',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
    description: 'Modello visivo ad acqua con dislivello (Volt), strozzatura (Ohm) e turbina a flusso (Ampere) per la comprensione intuitiva.',
    icon: <Cpu className="w-5 h-5 text-sky-600" />,
  },
  {
    id: 'block-ohm-triangle',
    hash: 'ohm-triangle',
    title: 'Strumento Didattico: Il Triangolo Magico di Ohm',
    category: 'Laboratorio',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Triangolo interattivo con il metodo della mano coprente per ricavare al volo V = R·I, I = V/R e R = V/I con calcolatrice integrata.',
    icon: <Cpu className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'block-study-l1',
    hash: 'study-guide-l1',
    title: 'Quaderno di Studio: Lezione 1 (Testo Completo)',
    category: 'Dispensa',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    description: 'Testo didattico approfondito con capitoli teorici, tabella delle grandezze SI e modalità lettura facilitata DSA.',
    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
  },
  {
    id: 'block-study-l2',
    hash: 'study-guide-l2',
    title: 'Quaderno di Studio: Lezione 2 (Testo Completo)',
    category: 'Dispensa',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    description: 'Dispensa completa con approfondimenti su Oersted, Faraday, macchine elettriche e tecnologie quotidiane.',
    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
  },
  {
    id: 'block-quiz-l1',
    hash: 'quiz-l1',
    title: 'Verifica Formativa: Quiz Elettricità (10 Domande)',
    category: 'Verifica',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Test a scelta multipla con voto in decimi (es. 8/10) e feedback immediato del docente per ciascuna risposta.',
    icon: <HelpCircle className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'block-quiz-l2',
    hash: 'quiz-l2',
    title: 'Verifica Formativa: Quiz Magnetismo (10 Domande)',
    category: 'Verifica',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Test interattivo con spiegazione pedagogica dell\'errore per l\'autovalutazione autonoma degli studenti.',
    icon: <HelpCircle className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'block-glossary',
    hash: 'glossary',
    title: 'Dizionario Tecnologico: Glossario Completo',
    category: 'Compendio',
    badgeColor: 'text-slate-700 bg-slate-100 border-slate-200',
    description: '30 termini tecnici indicizzati con filtri per categoria, formule formali e spiegazioni semplificate a parole facili.',
    icon: <BookMarked className="w-5 h-5 text-slate-600" />,
  },
  {
    id: 'block-print-summary',
    hash: 'print-summary',
    title: 'Scheda di Sintesi Stampabile (PDF / Cartaceo)',
    category: 'Compendio',
    badgeColor: 'text-slate-800 bg-slate-100 border-slate-200',
    description: 'Foglio riassuntivo stampabile a pagina singola per il ripasso prima della verifica in classe con tabelle e formule.',
    icon: <Printer className="w-5 h-5 text-slate-700" />,
  },
];

interface ArtefactsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToHash: (hash: string) => void;
}

export const ArtefactsHubModal: React.FC<ArtefactsHubModalProps> = ({
  isOpen,
  onClose,
  onNavigateToHash,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Tutti');

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://cinziascala.github.io/elettricita-magnetismo/';

  const handleCopy = (hash: string) => {
    const fullUrl = `${currentOrigin}#${hash}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2500);
    });
  };

  const categories = ['Tutti', 'Presentazione', 'Laboratorio', 'Dispensa', 'Verifica', 'Compendio'];

  const filteredBlocks = ARTEFACT_BLOCKS.filter((b) => {
    if (filterCategory === 'Tutti') return true;
    return b.category === filterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Intestazione del Modal */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
              <Globe className="w-3.5 h-3.5" />
              <span>GitHub Pages · Struttura a Blocchi & Link Diretti</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Tutti gli Artefatti del Progetto
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Ciascun blocco ha un indirizzo univoco (anchor hash <code>#sezione</code>) che puoi pubblicare e condividere tramite il singolo URL di GitHub Pages con studenti o colleghi.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
            title="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra Filtri Categorie */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium mr-2">Filtra blocchi:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Griglia Blocchi / Artefatti */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlocks.map((block) => {
              const isCopied = copiedHash === block.hash;
              return (
                <div
                  key={block.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between space-y-3 transition-colors group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {block.icon}
                        <h3 className="font-bold text-slate-900 text-sm">{block.title}</h3>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${block.badgeColor}`}>
                        {block.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {block.description}
                    </p>

                    <div className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-150 flex items-center gap-1 overflow-x-auto">
                      <span className="text-slate-400">URL:</span>
                      <span className="text-sky-700 font-semibold truncate">.../#{block.hash}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopy(block.hash)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        isCopied
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                      title="Copia link completo per la condivisione"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{isCopied ? 'Link Copiato!' : 'Copia Link'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateToHash(block.hash);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                    >
                      <span>Apri Blocco</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guida Rapida a piè di pagina */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-sky-100 text-sky-700 font-bold">Consiglio didattico:</span>
            <span>Incolla il link copiato su Google Classroom o nel Registro Elettronico per indirizzare gli studenti direttamente al laboratorio scelto.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Chiudi Finestra
          </button>
        </div>
      </div>
    </div>
  );
};
