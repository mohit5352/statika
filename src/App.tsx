import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Filter, Search, Sparkles, ChevronLeft, ChevronRight, AlertCircle, Menu, X, ChevronDown } from 'lucide-react';

// Type declarations
import { Question, AnswerKey, ExplanationKey, NoteBook } from './types';

// Component imports
import QuestionCard from './components/QuestionCard';
import { RevisionNotes } from './components/RevisionNotes';
import StudyAssistant from './components/StudyAssistant';
import AdminPanel from './components/AdminPanel';
import { SyllabusModal } from './components/SyllabusModal';
import EditQuestionModal from './components/EditQuestionModal';
import EditExplanationModal from './components/EditExplanationModal';
import EditNoteModal from './components/EditNoteModal';

// JSON imports (Vite parses these automatically)
import questionsRaw from './data/questions.json';
import answersRaw from './data/answers.json';
import explanationsRaw from './data/explanations.json';
import notesRaw from './data/notes.json';

// Deep merge helper — used to apply Vercel KV admin overrides onto bundled base data
function deepMerge(base: any, overrides: any): any {
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) return base;
  const result = { ...base };
  for (const key of Object.keys(overrides)) {
    if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])
        && result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
      result[key] = deepMerge(result[key], overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

const SUBJECT_LABELS: Record<string, string> = {
  prob: 'Probability & Statistical Methods',
  num: 'Numerical Analysis',
  comp: 'Computer Application & Data Processing',
  linear: 'Linear Models',
  inference: 'Statistical Inference & Hypothesis Testing',
  official: 'Official Statistics',
  sampling: 'Sampling Techniques',
  econometrics: 'Econometrics',
  applied: 'Applied Statistics',
  timeseries: 'Time Series Analysis',
  or: 'Operations Research',
  demography: 'Demography & Vital Statistics',
  survival: 'Survival Analysis & Clinical Trials',
  sqc: 'Statistical Quality Control',
  multivariate: 'Multivariate Analysis',
  design: 'Design of Experiments',
  computing: 'Computing with C/R',
};

export default function App() {
  // ── Read initial filter values from URL on first render ────────────────────
  const _initParams = new URLSearchParams(window.location.search);
  const _validPapers = ['paper1', 'paper2', 'paper3', 'paper4'] as const;

  // Application modes: 'pyq' (Objective Question Bank) or 'notes' (Revision Notes)
  const [activeTab, setActiveTab] = useState<'pyq' | 'notes'>(() => {
    const v = _initParams.get('tab');
    return v === 'notes' ? 'notes' : 'pyq';
  });
  
  // Database States (loaded from JSON, updated reactively by Admin edits)
  const [questions, setQuestions] = useState<Question[]>(questionsRaw as Question[]);
  const [answers, setAnswers] = useState<AnswerKey>(answersRaw as AnswerKey);
  const [explanations, setExplanations] = useState<ExplanationKey>(explanationsRaw as ExplanationKey);
  const [notes, setNotes] = useState<NoteBook>(notesRaw as NoteBook);

  // Filter States (initialised from URL so reload restores position)
  const [selectedPaper, setSelectedPaper] = useState<'paper1' | 'paper2' | 'paper3' | 'paper4'>(() => {
    const v = _initParams.get('paper');
    return (_validPapers as readonly string[]).includes(v ?? '') ? (v as any) : 'paper1';
  });
  const [selectedSection, setSelectedSection] = useState<string>(() => _initParams.get('section') || 'all');
  const [selectedYear, setSelectedYear] = useState<string>(() => _initParams.get('year') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Left Drawer and Header Search Toggles
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState<boolean>(false);
  const [isHeaderSearchOpen, setIsHeaderSearchOpen] = useState<boolean>(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const questionsPerPage = 10;

  // Study Notes active Paper (initialised from URL)
  const [selectedNotesPaper, setSelectedNotesPaper] = useState<'paper1' | 'paper2' | 'paper3' | 'paper4'>(() => {
    const v = _initParams.get('notesPaper');
    return (_validPapers as readonly string[]).includes(v ?? '') ? (v as any) : 'paper1';
  });
  const [activeNotesSectionKey, setActiveNotesSectionKey] = useState<string>(() => _initParams.get('notesSection') || '');

  // Drawer filter draft states (edited freely before clicking Apply)
  const [tempTab, setTempTab] = useState<'pyq' | 'notes'>('pyq');
  const [tempPaper, setTempPaper] = useState<'paper1' | 'paper2' | 'paper3' | 'paper4'>('paper1');
  const [tempSection, setTempSection] = useState<string>('all');
  const [tempYear, setTempYear] = useState<string>('all');
  const [tempNotesPaper, setTempNotesPaper] = useState<'paper1' | 'paper2' | 'paper3' | 'paper4'>('paper1');
  const [tempNotesSectionKey, setTempNotesSectionKey] = useState<string>('');

  // Synchronize draft states when the drawer is opened
  useEffect(() => {
    if (isLeftDrawerOpen) {
      setTempTab(activeTab);
      setTempPaper(selectedPaper);
      setTempSection(selectedSection);
      setTempYear(selectedYear);
      setTempNotesPaper(selectedNotesPaper);
      setTempNotesSectionKey(activeNotesSectionKey);
    }
  }, [isLeftDrawerOpen, activeTab, selectedPaper, selectedSection, selectedYear, selectedNotesPaper, activeNotesSectionKey]);

  // Admin state — initialised from localStorage so admin buttons are visible on first load
  const [isAdmin, setIsAdmin] = useState<boolean>(() => !!localStorage.getItem('iss_admin_token'));
  // Rehydrate Vercel KV admin overrides on every page load.
  // On Railway / local, the endpoint returns empty objects (no-op).
  useEffect(() => {
    fetch('/api/overrides')
      .then((r) => r.json())
      .then(({ answers: aOv, explanations: eOv, questions: qOv, notes: nOv }) => {
        if (aOv && Object.keys(aOv).length > 0) {
          setAnswers((prev) => deepMerge(prev, aOv) as AnswerKey);
        }
        if (eOv && Object.keys(eOv).length > 0) {
          setExplanations((prev) => deepMerge(prev, eOv) as ExplanationKey);
        }
        if (Array.isArray(qOv) && qOv.length > 0) {
          setQuestions((prev) =>
            prev.map((q) => {
              const ov = qOv.find(
                (o: any) => o.paper === q.paper && o.section === q.section &&
                  o.year === q.year && o.number === q.number
              );
              return ov ? { ...q, text: ov.text ?? q.text, topic: ov.topic ?? q.topic, options: ov.options ?? q.options } : q;
            })
          );
        }
        if (Array.isArray(nOv) && nOv.length > 0) {
          setNotes((prev) => {
            const updated = { ...prev };
            nOv.forEach((n: any) => {
              if (updated[n.paper]?.[n.sectionKey]) {
                const sec = { ...updated[n.paper][n.sectionKey] };
                sec.sections = sec.sections.map((s: any) =>
                  s.id === n.sectionId ? { ...s, content: n.content, label: n.label ?? s.label } : s
                );
                updated[n.paper] = { ...updated[n.paper], [n.sectionKey]: sec };
              }
            });
            return updated;
          });
        }
      })
      .catch(() => {}); // silently fail when offline or endpoint unavailable
  }, []);


  // Hoisted Modals State (Z-index and Overflow Safe with Live Preview!)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingExplanation, setEditingExplanation] = useState<{ question: Question; explanationText: string } | null>(null);
  const [editingNote, setEditingNote] = useState<{ paper: string; sectionKey: string; sectionId: string; label: string; content: string } | null>(null);

  // Chat/Assistant Side Drawer
  // Ref for scrolling back to the top of the question list on page change
  const questionsTopRef = useRef<HTMLDivElement>(null);

  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [activeAssistantContext, setActiveAssistantContext] = useState<string | null>(null);
  const [initialAssistantQuestion, setInitialAssistantQuestion] = useState<string | null>(null);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState<boolean>(false);

  // Triggering AI Study Assistant chat for a specific question card
  const handleAskAI = (questionText: string) => {
    setActiveAssistantContext(questionText);
    setInitialAssistantQuestion(questionText);
    setIsAssistantOpen(true);
  };

  // State update handlers after Admin inline edits
  const handleAnswerChange = (paper: string, section: string, year: number, number: number, correctOption: string) => {
    setAnswers((prev) => {
      const copy = { ...prev };
      if (!copy[paper]) copy[paper] = {};
      if (!copy[paper][section]) copy[paper][section] = {};
      if (!copy[paper][section][year]) copy[paper][section][year] = {};
      copy[paper][section][year][number] = correctOption;
      return copy;
    });
  };

  const handleQuestionChange = (
    paper: string,
    section: string,
    year: number,
    number: number,
    text: string,
    topic: string,
    options: Array<{ label: string; text: string }>
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.paper === paper && q.section === section && q.year === year && q.number === number
          ? { ...q, text, topic, options }
          : q
      )
    );
  };

  const handleExplanationChange = (paper: string, section: string, year: number, number: number, newExplanation: string) => {
    setExplanations((prev) => {
      const copy = { ...prev };
      if (!copy[paper]) copy[paper] = {};
      if (!copy[paper][section]) copy[paper][section] = {};
      if (!copy[paper][section][year]) copy[paper][section][year] = {};
      copy[paper][section][year][number] = newExplanation;
      return copy;
    });
  };

  const handleNoteChange = (paper: string, sectionKey: string, sectionId: string, content: string, label?: string) => {
    setNotes((prev) => {
      const updatedPaper = { ...prev[paper] };
      if (updatedPaper && updatedPaper[sectionKey]) {
        const updatedSection = { ...updatedPaper[sectionKey] };
        const updatedSections = updatedSection.sections.map((s) =>
          s.id === sectionId ? { ...s, content, ...(label ? { label } : {}) } : s
        );
        updatedSection.sections = updatedSections;
        updatedPaper[sectionKey] = updatedSection;
      }
      return {
        ...prev,
        [paper]: updatedPaper,
      };
    });
  };

  const handleSaveQuestionOverride = async (
    text: string,
    topic: string,
    options: Array<{ label: string; text: string }>
  ): Promise<boolean> => {
    if (!editingQuestion) return false;
    try {
      const res = await fetch('/api/questions/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper: editingQuestion.paper,
          section: editingQuestion.section,
          year: editingQuestion.year.toString(),
          questionNumber: editingQuestion.number.toString(),
          text,
          topic,
          options,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleQuestionChange(
          editingQuestion.paper,
          editingQuestion.section,
          editingQuestion.year,
          editingQuestion.number,
          text,
          topic,
          options
        );
        return true;
      } else {
        alert('Failed to save question edits on server: ' + (data.message || 'unknown error'));
        return false;
      }
    } catch (err) {
      alert('Network error saving question.');
      return false;
    }
  };

  const handleSaveExplanationOverride = async (newExplanation: string): Promise<boolean> => {
    if (!editingExplanation) return false;
    const { question } = editingExplanation;
    try {
      const res = await fetch('/api/explanations/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper: question.paper,
          section: question.section,
          year: question.year.toString(),
          questionNumber: question.number.toString(),
          explanation: newExplanation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleExplanationChange(
          question.paper,
          question.section,
          question.year,
          question.number,
          newExplanation
        );
        return true;
      } else {
        alert('Failed to save explanation on server: ' + (data.message || 'unknown error'));
        return false;
      }
    } catch (err) {
      alert('Network error saving explanation.');
      return false;
    }
  };

  const handleSaveNoteOverride = async (newContent: string, newLabel: string): Promise<boolean> => {
    if (!editingNote) return false;
    try {
      const res = await fetch('/api/notes/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paper: editingNote.paper,
          sectionKey: editingNote.sectionKey,
          sectionId: editingNote.sectionId,
          content: newContent,
          label: newLabel,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleNoteChange(
          editingNote.paper,
          editingNote.sectionKey,
          editingNote.sectionId,
          newContent,
          newLabel
        );
        return true;
      } else {
        alert('Failed to save note edits on server: ' + (data.message || 'unknown error'));
        return false;
      }
    } catch (err) {
      alert('Network error saving notes.');
      return false;
    }
  };

  // Filter sections options based on selected paper
  const availableSections = 
    selectedPaper === 'paper1' 
      ? ['prob', 'num', 'comp'] 
      : selectedPaper === 'paper2'
        ? ['linear', 'inference', 'official']
        : selectedPaper === 'paper3'
          ? ['sampling', 'econometrics', 'applied', 'timeseries']
          : ['or', 'demography', 'survival', 'sqc', 'multivariate', 'design', 'computing'];

  // When the paper changes, only reset section if it is incompatible with the new paper.
  // This lets "Apply Filters" set paper + section together without the section being wiped.
  useEffect(() => {
    const validSections: Record<string, string[]> = {
      paper1: ['prob', 'num', 'comp'],
      paper2: ['linear', 'inference', 'official'],
      paper3: ['sampling', 'econometrics', 'applied', 'timeseries'],
      paper4: ['or', 'demography', 'survival', 'sqc', 'multivariate', 'design', 'computing'],
    };
    if (selectedSection !== 'all' && !validSections[selectedPaper]?.includes(selectedSection)) {
      setSelectedSection('all');
    }
    setCurrentPage(1);
  }, [selectedPaper]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSection, selectedYear, searchQuery]);

  // Set default notes section when paper changes, but preserve a valid URL-restored key
  useEffect(() => {
    const paperNotes = notes[selectedNotesPaper] || {};
    const keys = Object.keys(paperNotes);
    if (keys.length > 0) {
      if (!activeNotesSectionKey || !keys.includes(activeNotesSectionKey)) {
        setActiveNotesSectionKey(keys[0]);
      }
    } else {
      setActiveNotesSectionKey('');
    }
  }, [selectedNotesPaper, notes]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filtered Questions list
  const filteredQuestions = questions.filter((q) => {
    if (q.paper !== selectedPaper) return false;
    if (selectedSection !== 'all' && q.section !== selectedSection) return false;
    if (selectedYear !== 'all' && q.year.toString() !== selectedYear) return false;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const textMatches = q.text.toLowerCase().includes(query);
      const topicMatches = q.topic.toLowerCase().includes(query);
      const contextMatches = q.context ? q.context.toLowerCase().includes(query) : false;
      return textMatches || topicMatches || contextMatches;
    }
    
    return true;
  });

  // Sync applied filter state to URL so page reload restores position
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== 'pyq') params.set('tab', activeTab);
    if (selectedPaper !== 'paper1') params.set('paper', selectedPaper);
    if (selectedSection !== 'all') params.set('section', selectedSection);
    if (selectedYear !== 'all') params.set('year', selectedYear);
    if (activeTab === 'notes') {
      if (selectedNotesPaper !== 'paper1') params.set('notesPaper', selectedNotesPaper);
      if (activeNotesSectionKey) params.set('notesSection', activeNotesSectionKey);
    }
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
  }, [activeTab, selectedPaper, selectedSection, selectedYear, selectedNotesPaper, activeNotesSectionKey]);

  // All unique years across all questions (used only as fallback)
  const uniqueYears = Array.from(new Set(questions.map((q) => q.year.toString()))).sort((a: string, b: string) => b.localeCompare(a));

  // Years available for the currently selected paper in the drawer (paper-specific)
  const drawerYears = Array.from(
    new Set(questions.filter((q) => q.paper === tempPaper).map((q) => q.year.toString()))
  ).sort((a: string, b: string) => b.localeCompare(a));

  const drawerYearMin = drawerYears.length > 0 ? drawerYears[drawerYears.length - 1] : '';
  const drawerYearMax = drawerYears.length > 0 ? drawerYears[0] : '';

  // Pagination bounds
  const totalQuestions = filteredQuestions.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Answered stats (retrieved from localStorage to track user progress!)
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  useEffect(() => {
    // Simple hook to calculate answered questions from completed choices in local storage
    const count = questions.filter((q) => {
      const key = `answered_${q.paper}_${q.section}_${q.year}_${q.number}`;
      return localStorage.getItem(key) !== null;
    }).length;
    setAnsweredCount(count);
  }, [questions]);

  // Scroll locking for left and right drawers when open
  useEffect(() => {
    if (isLeftDrawerOpen || isAssistantOpen || isSyllabusOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isLeftDrawerOpen, isAssistantOpen, isSyllabusOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* ==================== LEFT NAVIGATION & FILTER DRAWER ==================== */}
      {isLeftDrawerOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-all duration-300 animate-in fade-in"
          onClick={() => setIsLeftDrawerOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-[290px] sm:w-[330px] bg-slate-950 border-r border-white/10 flex flex-col shadow-2xl transition-transform duration-300 translate-x-0 overflow-hidden h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base tracking-widest text-white uppercase font-light">Statika</span>
                <span className="text-[9px] bg-indigo-600/20 text-indigo-300 px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold">UPSC ISS</span>
              </div>
              <button 
                onClick={() => setIsLeftDrawerOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-all hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Drawer Body - Compact spacing and no nested boxes */}
            <div className="flex-1 p-5 flex flex-col justify-between min-h-0 space-y-5 overflow-y-auto scrollbar-none">
              <div className="space-y-5">
                {/* Syllabus Quick Reference Link */}
                <button
                  onClick={() => {
                    setIsSyllabusOpen(true);
                    setIsLeftDrawerOpen(false);
                  }}
                  className="w-full py-1.5 text-left text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>UPSC ISS Syllabus Reference</span>
                </button>

                {/* Study Mode Selector Underline Tab Bar */}
                <div className="flex border-b border-white/5">
                  <button
                    onClick={() => setTempTab('pyq')}
                    className={`flex-1 pb-2 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      tempTab === 'pyq'
                        ? 'text-indigo-400 border-b-2 border-indigo-500'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    PYQ
                  </button>
                  <button
                    onClick={() => setTempTab('notes')}
                    className={`flex-1 pb-2 text-center text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      tempTab === 'notes'
                        ? 'text-indigo-400 border-b-2 border-indigo-500'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Notes
                  </button>
                </div>

                {/* Dynamic Content */}
                {tempTab === 'pyq' ? (
                  <div className="space-y-4">
                    
                    {/* Select ISS Paper */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ISS Paper</label>
                      <div className="flex gap-2">
                        {(['paper1', 'paper2', 'paper3', 'paper4'] as const).map((paperKey, idx) => {
                          const roman = ['I', 'II', 'III', 'IV'][idx];
                          const isActive = tempPaper === paperKey;
                          return (
                            <button
                              key={paperKey}
                              onClick={() => {
                                setTempPaper(paperKey);
                                const allowed = paperKey === 'paper1' 
                                  ? ['prob', 'num', 'comp'] 
                                  : paperKey === 'paper2'
                                    ? ['linear', 'inference', 'official']
                                    : paperKey === 'paper3'
                                      ? ['sampling', 'econometrics', 'applied', 'timeseries']
                                      : ['or', 'demography', 'survival', 'sqc', 'multivariate', 'design', 'computing'];
                                if (tempSection !== 'all' && !allowed.includes(tempSection)) {
                                  setTempSection('all');
                                }
                              }}
                              className={`flex-1 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                isActive
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {roman}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject Section Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject Section</label>
                      <div className="relative">
                        <select
                          value={tempSection}
                          onChange={(e) => setTempSection(e.target.value)}
                          className="w-full appearance-none bg-slate-950 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-xs px-3 py-2 rounded-lg focus:outline-hidden transition-all text-slate-200 cursor-pointer"
                        >
                          <option value="all">All Sections</option>
                          {(tempPaper === 'paper1' 
                            ? ['prob', 'num', 'comp'] 
                            : tempPaper === 'paper2'
                              ? ['linear', 'inference', 'official']
                              : tempPaper === 'paper3'
                                ? ['sampling', 'econometrics', 'applied', 'timeseries']
                                : ['or', 'demography', 'survival', 'sqc', 'multivariate', 'design', 'computing']
                          ).map((sec) => (
                            <option key={sec} value={sec}>
                              {SUBJECT_LABELS[sec] || sec}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Year Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exam Year</label>
                      <div className="relative">
                        <select
                          value={tempYear}
                          onChange={(e) => setTempYear(e.target.value)}
                          className="w-full appearance-none bg-slate-950 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-xs px-3 py-2 rounded-lg focus:outline-hidden transition-all text-slate-200 cursor-pointer"
                        >
                          <option value="all">
                            All Years{drawerYearMin && drawerYearMax ? ` (${drawerYearMin}–${drawerYearMax})` : ''}
                          </option>
                          {drawerYears.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Progress Bar (Boxless) */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono tracking-wider">
                        <span>REVISION PROGRESS</span>
                        <span className="font-bold text-emerald-400">{answeredCount} / {questions.length}</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (answeredCount / questions.length) * 100)}%` }}
                        />
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="space-y-4 flex flex-col min-h-0">
                    
                    {/* Notes Paper */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Notes Paper</label>
                      <div className="flex gap-2">
                        {(['paper1', 'paper2', 'paper3', 'paper4'] as const).map((paperKey, idx) => {
                          const roman = ['I', 'II', 'III', 'IV'][idx];
                          const isActive = tempNotesPaper === paperKey;
                          return (
                            <button
                              key={paperKey}
                              onClick={() => {
                                setTempNotesPaper(paperKey);
                                const paperNotes = notes[paperKey] || {};
                                const keys = Object.keys(paperNotes);
                                if (keys.length > 0) {
                                  setTempNotesSectionKey(keys[0]);
                                } else {
                                  setTempNotesSectionKey('');
                                }
                              }}
                              className={`flex-1 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                isActive
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {roman}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes Paper Topics - Elegant text list */}
                    <div className="space-y-1.5 flex flex-col min-h-0">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Paper Topics</label>
                      <div className="space-y-1 overflow-y-auto max-h-[170px] pr-1 scrollbar-none">
                        {Object.keys(notes[tempNotesPaper] || {}).map((key) => {
                          const isActive = tempNotesSectionKey === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setTempNotesSectionKey(key)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
                                isActive
                                  ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {notes[tempNotesPaper]?.[key]?.title || key}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveTab(tempTab);
                    setSelectedPaper(tempPaper);
                    setSelectedSection(tempSection);
                    setSelectedYear(tempYear);
                    setSelectedNotesPaper(tempNotesPaper);
                    setActiveNotesSectionKey(tempNotesSectionKey);
                    setIsLeftDrawerOpen(false);
                  }}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/15"
                >
                  <Filter className="w-3.5 h-3.5 text-white" />
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Drawer Footer with Admin Login */}
            <div className="p-4 border-t border-white/5 bg-slate-950 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-medium uppercase tracking-wider">System Role</span>
                <span className={`font-mono font-bold ${isAdmin ? 'text-indigo-400' : 'text-slate-500'}`}>
                  {isAdmin ? 'ADMINISTRATOR' : 'GUEST STUDENT'}
                </span>
              </div>
              <div className="flex justify-center">
                <AdminPanel isAdmin={isAdmin} onAdminChange={setIsAdmin} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== RIGHT AI ASSISTANT DRAWER ==================== */}
      {isAssistantOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs z-50 transition-all duration-300 animate-in fade-in"
          onClick={() => {
            setIsAssistantOpen(false);
            setActiveAssistantContext(null);
            setInitialAssistantQuestion(null);
          }}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full sm:w-[460px] md:w-[500px] bg-slate-900 border-l border-white/10 flex flex-col shadow-2xl transition-transform duration-300 translate-x-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <StudyAssistant
              currentContextText={activeAssistantContext}
              isOpen={isAssistantOpen}
              onClose={() => {
                setIsAssistantOpen(false);
                setActiveAssistantContext(null);
                setInitialAssistantQuestion(null);
              }}
              initialQuestion={initialAssistantQuestion}
            />
          </div>
        </div>
      )}

      {/* Dynamic Header Banner */}
      <header className="bg-slate-950/80 border-b border-white/10 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">
          
          {/* Left menu trigger button */}
          <button
            onClick={() => setIsLeftDrawerOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-semibold font-display tracking-wide uppercase">Menu</span>
          </button>

          {/* Centered Serif Logo "Statika" */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <h1 className="text-xl md:text-2xl font-serif tracking-widest text-slate-100 uppercase pointer-events-auto cursor-pointer hover:text-white select-none transition-colors">
              Statika
            </h1>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-1.5">
            {/* Minimal Search trigger icon */}
            <button
              onClick={() => setIsHeaderSearchOpen(!isHeaderSearchOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isHeaderSearchOpen || searchQuery 
                  ? 'bg-indigo-600/20 text-indigo-300' 
                  : 'hover:bg-white/5 text-slate-300 hover:text-white'
              }`}
              aria-label="Search content"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Study Assistant Trigger (Icon-Only Logo) */}
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isAssistantOpen
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/20'
                  : 'hover:bg-white/5 text-slate-300 hover:text-emerald-400'
              }`}
              title="Ask Study AI"
              aria-label="Ask Study AI"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Micro active indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden md:inline-block" />
          </div>
        </div>
      </header>

      {/* Header Search Overlay */}
      {isHeaderSearchOpen && (
        <div className="bg-slate-900 border-b border-white/10 py-3 px-4 animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas, CLT, ANOVA, questions..."
              className="w-full bg-slate-950 border border-white/15 focus:border-indigo-500 text-xs px-3 py-2 pl-9 rounded-xl focus:outline-hidden transition-all text-slate-200 placeholder:text-slate-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==================== STICKY ACTIVE FILTERS ROW ==================== */}
      <div className="bg-slate-950/95 border-b border-white/5 sticky top-[56px] z-30 shadow-xs backdrop-blur-md py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 flex-nowrap min-w-max">
          <button 
            onClick={() => setIsLeftDrawerOpen(true)}
            className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-[11px] font-semibold text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <b className="text-white">
              {activeTab === 'pyq' 
                ? (selectedPaper === 'paper3' || selectedPaper === 'paper4' ? 'Subjective PYQs' : 'Objective PYQs') 
                : 'Revision Notes'}
            </b>
          </button>

          {activeTab === 'pyq' ? (
            <>
              <button 
                onClick={() => setIsLeftDrawerOpen(true)}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-[11px] font-semibold text-slate-300 shrink-0 cursor-pointer"
              >
                <b className="text-white">
                  {selectedPaper === 'paper1' 
                    ? 'Paper I' 
                    : selectedPaper === 'paper2' 
                      ? 'Paper II' 
                      : selectedPaper === 'paper3' 
                        ? 'Paper III' 
                        : 'Paper IV'}
                </b>
              </button>
              
              {selectedSection !== 'all' && (
                <button 
                  onClick={() => setSelectedSection('all')}
                  className="px-2.5 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600/20 shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <b className="text-white">{SUBJECT_LABELS[selectedSection] || selectedSection}</b>
                  <X className="w-3 h-3 ml-0.5" />
                </button>
              )}

              {selectedYear !== 'all' && (
                <button 
                  onClick={() => setSelectedYear('all')}
                  className="px-2.5 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600/20 shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <b className="text-white">{selectedYear}</b>
                  <X className="w-3 h-3 ml-0.5" />
                </button>
              )}
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsLeftDrawerOpen(true)}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-[11px] font-semibold text-slate-300 shrink-0 cursor-pointer"
              >
                <b className="text-white">{selectedNotesPaper.toUpperCase().replace('PAPER', 'Paper ')}</b>
              </button>

              {activeNotesSectionKey && notes[selectedNotesPaper]?.[activeNotesSectionKey] && (
                <button 
                  onClick={() => setIsLeftDrawerOpen(true)}
                  className="px-2.5 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-600/20 shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <b className="text-white">{notes[selectedNotesPaper][activeNotesSectionKey].title}</b>
                </button>
              )}
            </>
          )}

          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20 shrink-0 cursor-pointer flex items-center gap-1"
            >
              <b className="text-white">"{searchQuery}"</b>
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          </div>
        </div>
      </div>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Core Area (Question list, notes list) */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          

          {/* ==================== PYQ BOARD ==================== */}
          {activeTab === 'pyq' && (
            <div className="space-y-4" ref={questionsTopRef}>

              {/* Top bar: range chip + page chip — consistent with filter chip theme */}
              <div className="flex items-center justify-between">

                {/* Left — range chip */}
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300 font-mono select-none">
                    <b className="text-white">
                      {totalQuestions === 0
                        ? '0'
                        : `${indexOfFirstQuestion + 1}–${Math.min(indexOfLastQuestion, totalQuestions)}`}
                    </b>
                    <span className="text-slate-500 mx-1">/</span>
                    {totalQuestions}
                    <span className="text-slate-500 ml-1 font-sans font-medium">questions</span>
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold text-rose-300 hover:bg-rose-500/20 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <X className="w-3 h-3" />
                      Clear
                    </button>
                  )}
                </div>

                {/* Right — single-chip pagination: ◀ 3/25 ▶ */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-0 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all border-r border-white/10"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-[11px] font-semibold font-mono text-slate-300 select-none">
                      <b className="text-white">{currentPage}</b>
                      <span className="text-slate-500 mx-1">/</span>
                      {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all border-l border-white/10"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((q) => {
                    const ansKey = answers[q.paper]?.[q.section]?.[q.year]?.[q.number];
                    const explText = explanations[q.paper]?.[q.section]?.[q.year]?.[q.number];
                    return (
                      <QuestionCard
                        key={`${q.paper}_${q.section}_${q.year}_${q.number}`}
                        question={q}
                        correctAnswer={ansKey}
                        explanation={explText}
                        isAdmin={isAdmin}
                        onAnswerChange={handleAnswerChange}
                        onAskAI={handleAskAI}
                        onEditQuestionClick={(question) => setEditingQuestion(question)}
                        onEditExplanationClick={(question, text) => setEditingExplanation({ question, explanationText: text })}
                      />
                    );
                  })
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-slate-400 backdrop-blur-xl">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-400" />
                    <p className="text-sm font-medium text-slate-300">No questions match your filter criteria.</p>
                    <p className="text-xs text-slate-500 mt-1">Try switching years or subject sections!</p>
                  </div>
                )}
              </div>

              {/* Bottom pagination — same segmented chip, scrolls to list top */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center pt-2">
                  <div className="flex items-center gap-0 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        questionsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all border-r border-white/10"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold font-mono text-slate-300 select-none">
                      <b className="text-white">{currentPage}</b>
                      <span className="text-slate-500 mx-1.5">/</span>
                      {totalPages}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        questionsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all border-l border-white/10"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== REVISION NOTES BOARD ==================== */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Notes display rendering */}
              <RevisionNotes
                notesData={notes}
                paper={selectedNotesPaper}
                isAdmin={isAdmin}
                activeSectionKey={activeNotesSectionKey}
                setActiveSectionKey={setActiveNotesSectionKey}
                onEditNoteClick={(noteInfo) => setEditingNote(noteInfo)}
              />
            </div>
          )}

        </div>

      </main>

      {/* Footer credits info */}
      <footer className="bg-slate-950/40 border-t border-white/5 mt-12 py-6 text-center text-xs text-slate-500 font-medium backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <span>© {new Date().getFullYear()} Statika. UPSC Indian Statistical Service (ISS) Revision Portal.</span>
          <span className="text-[10px] text-slate-600">Official Prep & Revision Companion</span>
        </div>
      </footer>

      {/* ==================== SYLLABUS QUICK REFERENCE MODAL ==================== */}
      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
      />

      {/* ==================== HOISTED MODALS FOR ADMIN EDITS (Z-INDEX SAFE WITH LIVE PREVIEW) ==================== */}
      {editingQuestion && (
        <EditQuestionModal
          isOpen={!!editingQuestion}
          onClose={() => setEditingQuestion(null)}
          question={editingQuestion}
          onSave={handleSaveQuestionOverride}
        />
      )}

      {editingExplanation && (
        <EditExplanationModal
          isOpen={!!editingExplanation}
          onClose={() => setEditingExplanation(null)}
          question={editingExplanation.question}
          explanationText={editingExplanation.explanationText}
          onSave={handleSaveExplanationOverride}
        />
      )}

      {editingNote && (
        <EditNoteModal
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          noteInfo={editingNote}
          onSave={handleSaveNoteOverride}
        />
      )}

    </div>
  );
}
export { App };
