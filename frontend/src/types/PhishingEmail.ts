export interface PhishingEmail {
    id: number;
    title: Record<Language, string>;
    image: string;
    suspicious_areas: string[];
    explanation: Record<string, Record<Language, string>>;
    is_phishing: boolean;
  }
  export type Language = "en" | "fr";

  