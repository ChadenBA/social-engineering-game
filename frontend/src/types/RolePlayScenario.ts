export interface RolePlayScenario {
    id: number;
    role: "attacker" | "defender";
    situation: string;
    choices: {
      text: string;
      outcome: string;
    }[];
  }