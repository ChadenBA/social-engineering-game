export interface RolePlayScenario {
  id: number;
  role: "attacker" | "defender";
  situation: {
    en: string;
    fr: string;
  };
  choices: {
    text: {
      en: string;
      fr: string;
    };
    outcome: {
      en: string;
      fr: string;
    };
  }[];
}
export type Language = "en" | "fr";
