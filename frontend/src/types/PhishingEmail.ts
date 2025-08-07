export interface PhishingEmail {
    id: number;
    title: string;
    image: string;
    suspicious_areas: string[];
    explanation: Record<string, string>;
    is_phishing: boolean;
  }
  