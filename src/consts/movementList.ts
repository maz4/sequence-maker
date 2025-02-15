export const moveTypes = [
  "chute",
  "esquivar",
  "cair",
  "varrer",
  "movimento",
  "defensivo",
  "acrobático",
  "finta",
  "queda",
  "contra-ataque",
] as const;

// "todos",

export const jogoTypes = ["Benguela", "São Bento Grande"] as const;

export type JogoType = (typeof jogoTypes)[number];

export interface MovementType {
  name: string;
  jogoType: (typeof jogoTypes)[number][];
  moveType: (typeof moveTypes)[number];
}

export const capoeiraMovements: Record<string, MovementType> = {
  "Meia Lua de Frente": {
    name: "Meia Lua de Frente",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  "Meia Lua de Compasso (Baixa)": {
    name: "Meia Lua de Compasso (Baixa)",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  Armada: {
    name: "Armada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "chute",
  },
  "Queixada (Baixa)": {
    name: "Queixada (Baixa)",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  Benção: {
    name: "Benção",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "chute",
  },
  "Martelo (Baixo)": {
    name: "Martelo (Baixo)",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  "Ponteira (Baixa)": {
    name: "Ponteira (Baixa)",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  "Esquiva Baixa": {
    name: "Esquiva Baixa",
    jogoType: ["Benguela"],
    moveType: "esquivar",
  },
  "Esquiva Lateral": {
    name: "Esquiva Lateral",
    jogoType: ["Benguela"],
    moveType: "esquivar",
  },
  "Esquiva Diagonal": {
    name: "Esquiva Diagonal",
    jogoType: ["Benguela"],
    moveType: "esquivar",
  },
  "Esquiva de Frente": {
    name: "Esquiva de Frente",
    jogoType: ["Benguela"],
    moveType: "esquivar",
  },
  "Queda de Quatro": {
    name: "Queda de Quatro",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "cair",
  },
  "Queda de Rins (Baixa)": {
    name: "Queda de Rins (Baixa)",
    jogoType: ["Benguela"],
    moveType: "cair",
  },
  Rasteira: {
    name: "Rasteira",
    jogoType: ["Benguela"],
    moveType: "varrer",
  },
  "Ginga (Baixa)": {
    name: "Ginga (Baixa)",
    jogoType: ["Benguela"],
    moveType: "movimento",
  },
  Negativa: {
    name: "Negativa",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "defensivo",
  },
  Cocorinha: {
    name: "Cocorinha",
    jogoType: ["Benguela"],
    moveType: "defensivo",
  },
  "Rolê (Baixo)": {
    name: "Rolê (Baixo)",
    jogoType: ["Benguela"],
    moveType: "movimento",
  },
  "Macaco (Benguela)": {
    name: "Macaco (Benguela)",
    jogoType: ["Benguela"],
    moveType: "acrobático",
  },
  "Aú (Baixo)": {
    name: "Aú (Baixo)",
    jogoType: ["Benguela"],
    moveType: "acrobático",
  },
  Pisão: {
    name: "Pisão",
    jogoType: ["Benguela"],
    moveType: "chute",
  },
  "Troca de Base": {
    name: "Troca de Base",
    jogoType: ["Benguela"],
    moveType: "movimento",
  },
  "Meia Lua de Compasso (Alto)": {
    name: "Meia Lua de Compasso (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Armada Dupla": {
    name: "Armada Dupla",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Armada com Martelo": {
    name: "Armada com Martelo",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Queixada (Alta)": {
    name: "Queixada (Alta)",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Martelo (Alto)": {
    name: "Martelo (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Martelo Rotado": {
    name: "Martelo Rotado",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Chapa Giratória": {
    name: "Chapa Giratória",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Chapa de Costas": {
    name: "Chapa de Costas",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Chapa Baiana": {
    name: "Chapa Baiana",
    jogoType: ["São Bento Grande"],
    moveType: "chute",
  },
  "Esquiva Lateral com Giro": {
    name: "Esquiva Lateral com Giro",
    jogoType: ["São Bento Grande"],
    moveType: "esquivar",
  },
  "Queda de Rins (Explosiva)": {
    name: "Queda de Rins (Explosiva)",
    jogoType: ["São Bento Grande"],
    moveType: "cair",
  },
  "Rasteira Alta": {
    name: "Rasteira Alta",
    jogoType: ["São Bento Grande"],
    moveType: "varrer",
  },
  "Ginga (Rápida)": {
    name: "Ginga (Rápida)",
    jogoType: ["São Bento Grande"],
    moveType: "movimento",
  },
  "Rolê Explosivo": {
    name: "Rolê Explosivo",
    jogoType: ["São Bento Grande"],
    moveType: "movimento",
  },
  "Macaco (Alto)": {
    name: "Macaco (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Aú Aberto": {
    name: "Aú Aberto",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Aú Sem Mão": {
    name: "Aú Sem Mão",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Aú Mortal": {
    name: "Aú Mortal",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Pião de Mão": {
    name: "Pião de Mão",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Pião de Cabeça": {
    name: "Pião de Cabeça",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  Mortal: {
    name: "Mortal",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  Parafuso: {
    name: "Parafuso",
    jogoType: ["São Bento Grande"],
    moveType: "acrobático",
  },
  "Finta de Meia Lua de Frente": {
    name: "Finta de Meia Lua de Frente",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Armada": {
    name: "Finta de Armada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Benção": {
    name: "Finta de Benção",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Chapa": {
    name: "Finta de Chapa",
    jogoType: ["São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Martelo": {
    name: "Finta de Martelo",
    jogoType: ["São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Queixada": {
    name: "Finta de Queixada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "finta",
  },
  "Finta de Negativa": {
    name: "Finta de Negativa",
    jogoType: ["Benguela"],
    moveType: "finta",
  },
  "Finta de Rasteira": {
    name: "Finta de Rasteira",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "finta",
  },
  "Tesoura de Frente": {
    name: "Tesoura de Frente",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "queda",
  },
  "Tesoura de Costas": {
    name: "Tesoura de Costas",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "queda",
  },
  "Tesoura Baixa": {
    name: "Tesoura Baixa",
    jogoType: ["Benguela"],
    moveType: "queda",
  },
  "Tesoura Voadora": {
    name: "Tesoura Voadora",
    jogoType: ["São Bento Grande"],
    moveType: "queda",
  },
  "Vingativa Simples": {
    name: "Vingativa Simples",
    jogoType: ["São Bento Grande", "Benguela"],
    moveType: "contra-ataque",
  },
  "Vingativa Baixa": {
    name: "Vingativa Baixa",
    jogoType: ["Benguela"],
    moveType: "contra-ataque",
  },
  "Vingativa com Projeção": {
    name: "Vingativa com Projeção",
    jogoType: ["São Bento Grande"],
    moveType: "contra-ataque",
  },
};
