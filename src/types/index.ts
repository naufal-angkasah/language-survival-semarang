import { EmotionTone } from '../utils/speechEngine';

export type Language = 'id' | 'en';

export type CategoryId = 'transport' | 'culinary' | 'etiquette' | 'emergency' | 'culture';

export interface CategoryInfo {
  id: CategoryId;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  iconName: string;
  color: string;
  badge: string;
}

export interface SurvivalPhrase {
  id: string;
  categoryId: CategoryId;
  phraseId: string;
  phraseEn: string;
  phonetic: string;
  contextNoteId: string;
  contextNoteEn: string;
  tags: string[];
  audioFile?: string;
  isImportant?: boolean;
  emotionTone?: EmotionTone;
  emotionLabelId?: string;
  emotionLabelEn?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  category: string;
  location?: string;
  mapsUrl?: string;
}

export interface QuizQuestion {
  id: string;
  situationEn: string;
  situationId: string;
  questionEn: string;
  questionId: string;
  options: {
    id: string;
    textEn: string;
    textId: string;
    isCorrect: boolean;
    explanationEn: string;
    explanationId: string;
  }[];
}

export interface EvaluationItem {
  id: string;
  aspect: string;
  criteriaId: string;
  criteriaEn: string;
  score: number; // 1 to 5
}

// Data models for Researcher Web Admin Dashboard
export interface RespondentRecord {
  id: string;
  name: string;
  country: string;
  university: string;
  program: string;
  preTestScore: number;
  postTestScore: number;
  gainScore: number;
  date: string;
}

export interface ValidatorRecord {
  id: string;
  validatorName: string;
  expertise: string;
  contentScore: number;
  uiScore: number;
  bilingualScore: number;
  usabilityScore: number;
  averageScore: number;
  percentage: number;
  feedback: string;
  date: string;
}
