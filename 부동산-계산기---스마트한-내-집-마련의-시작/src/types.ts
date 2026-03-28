export interface CalculationHistory {
  id: string;
  type: 'acquisition' | 'rent' | 'yield' | 'loan';
  title: string;
  date: string;
  inputs: any;
  result: any;
}

export interface FAQItem {
  question: string;
  answer: string;
}
