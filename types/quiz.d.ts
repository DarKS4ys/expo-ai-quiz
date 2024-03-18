export type Quiz = {
    name: string;
    questions: number;
    image: string;
    id: string;
    questionsData: Question[];
  };
  
  export type Question = {
    correctOption: string;
    options: string[];
    title: string;
    id: string;
  };