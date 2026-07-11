export type Paper = 'paper1' | 'paper2' | 'paper3' | 'paper4';

export interface Option {
  label: string;
  text: string;
}

export interface Question {
  paper: string;
  section: string;
  year: number;
  number: number;
  topic: string;
  context: string | null;
  text: string;
  table: string | null;
  options: Option[];
  marks?: number | string;
  instructions?: string;
}

export interface AnswerKey {
  [paper: string]: {
    [section: string]: {
      [year: string]: {
        [questionNumber: string]: string;
      };
    };
  };
}

export interface ExplanationKey {
  [paper: string]: {
    [section: string]: {
      [year: string]: {
        [questionNumber: string]: string;
      };
    };
  };
}

export interface NoteSection {
  id: string;
  label: string;
  content: string;
}

export interface NoteTopic {
  title: string;
  sections: NoteSection[];
  tips?: string;
}

export interface NoteBook {
  [paper: string]: {
    [sectionKey: string]: NoteTopic;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
