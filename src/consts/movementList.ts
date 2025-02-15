export interface MovementType {
  name: string;
  jogoType: string[];
  moveType: string;
}

export const capoeiraMovements: Record<string, MovementType> = {
  "Meia Lua de Frente": {
    name: "Meia Lua de Frente",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  "Meia Lua de Compasso (Baixa)": {
    name: "Meia Lua de Compasso (Baixa)",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  Armada: {
    name: "Armada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "kick",
  },
  "Queixada (Baixa)": {
    name: "Queixada (Baixa)",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  Benção: {
    name: "Benção",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "kick",
  },
  "Martelo (Baixo)": {
    name: "Martelo (Baixo)",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  "Ponteira (Baixa)": {
    name: "Ponteira (Baixa)",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  "Esquiva Baixa": {
    name: "Esquiva Baixa",
    jogoType: ["Benguela"],
    moveType: "dodge",
  },
  "Esquiva Lateral": {
    name: "Esquiva Lateral",
    jogoType: ["Benguela"],
    moveType: "dodge",
  },
  "Esquiva Diagonal": {
    name: "Esquiva Diagonal",
    jogoType: ["Benguela"],
    moveType: "dodge",
  },
  "Esquiva de Frente": {
    name: "Esquiva de Frente",
    jogoType: ["Benguela"],
    moveType: "dodge",
  },
  "Queda de Quatro": {
    name: "Queda de Quatro",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "fall",
  },
  "Queda de Rins (Baixa)": {
    name: "Queda de Rins (Baixa)",
    jogoType: ["Benguela"],
    moveType: "fall",
  },
  Rasteira: {
    name: "Rasteira",
    jogoType: ["Benguela"],
    moveType: "sweep",
  },
  "Ginga (Baixa)": {
    name: "Ginga (Baixa)",
    jogoType: ["Benguela"],
    moveType: "movement",
  },
  Negativa: {
    name: "Negativa",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "defensive",
  },
  Cocorinha: {
    name: "Cocorinha",
    jogoType: ["Benguela"],
    moveType: "defensive",
  },
  "Rolê (Baixo)": {
    name: "Rolê (Baixo)",
    jogoType: ["Benguela"],
    moveType: "movement",
  },
  "Macaco (Benguela)": {
    name: "Macaco (Benguela)",
    jogoType: ["Benguela"],
    moveType: "acrobatic",
  },
  "Aú (Baixo)": {
    name: "Aú (Baixo)",
    jogoType: ["Benguela"],
    moveType: "acrobatic",
  },
  Pisão: {
    name: "Pisão",
    jogoType: ["Benguela"],
    moveType: "kick",
  },
  "Troca de Base": {
    name: "Troca de Base",
    jogoType: ["Benguela"],
    moveType: "movement",
  },
  "Meia Lua de Compasso (Alto)": {
    name: "Meia Lua de Compasso (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Armada Dupla": {
    name: "Armada Dupla",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Armada com Martelo": {
    name: "Armada com Martelo",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Queixada (Alta)": {
    name: "Queixada (Alta)",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Martelo (Alto)": {
    name: "Martelo (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Martelo Rotado": {
    name: "Martelo Rotado",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Chapa Giratória": {
    name: "Chapa Giratória",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Chapa de Costas": {
    name: "Chapa de Costas",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Chapa Baiana": {
    name: "Chapa Baiana",
    jogoType: ["São Bento Grande"],
    moveType: "kick",
  },
  "Esquiva Lateral com Giro": {
    name: "Esquiva Lateral com Giro",
    jogoType: ["São Bento Grande"],
    moveType: "dodge",
  },
  "Queda de Rins (Explosiva)": {
    name: "Queda de Rins (Explosiva)",
    jogoType: ["São Bento Grande"],
    moveType: "fall",
  },
  "Rasteira Alta": {
    name: "Rasteira Alta",
    jogoType: ["São Bento Grande"],
    moveType: "sweep",
  },
  "Ginga (Rápida)": {
    name: "Ginga (Rápida)",
    jogoType: ["São Bento Grande"],
    moveType: "movement",
  },
  "Rolê Explosivo": {
    name: "Rolê Explosivo",
    jogoType: ["São Bento Grande"],
    moveType: "movement",
  },
  "Macaco (Alto)": {
    name: "Macaco (Alto)",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Aú Aberto": {
    name: "Aú Aberto",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Aú Sem Mão": {
    name: "Aú Sem Mão",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Aú Mortal": {
    name: "Aú Mortal",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Pião de Mão": {
    name: "Pião de Mão",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Pião de Cabeça": {
    name: "Pião de Cabeça",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  Mortal: {
    name: "Mortal",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  Parafuso: {
    name: "Parafuso",
    jogoType: ["São Bento Grande"],
    moveType: "acrobatic",
  },
  "Finta de Meia Lua de Frente": {
    name: "Finta de Meia Lua de Frente",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Armada": {
    name: "Finta de Armada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Benção": {
    name: "Finta de Benção",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Chapa": {
    name: "Finta de Chapa",
    jogoType: ["São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Martelo": {
    name: "Finta de Martelo",
    jogoType: ["São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Queixada": {
    name: "Finta de Queixada",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "feint",
  },
  "Finta de Negativa": {
    name: "Finta de Negativa",
    jogoType: ["Benguela"],
    moveType: "feint",
  },
  "Finta de Rasteira": {
    name: "Finta de Rasteira",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "feint",
  },
  "Tesoura de Frente": {
    name: "Tesoura de Frente",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "takedown",
  },
  "Tesoura de Costas": {
    name: "Tesoura de Costas",
    jogoType: ["Benguela", "São Bento Grande"],
    moveType: "takedown",
  },
  "Tesoura Baixa": {
    name: "Tesoura Baixa",
    jogoType: ["Benguela"],
    moveType: "takedown",
  },
  "Tesoura Voadora": {
    name: "Tesoura Voadora",
    jogoType: ["São Bento Grande"],
    moveType: "takedown",
  },
  "Vingativa Simples": {
    name: "Vingativa Simples",
    jogoType: ["São Bento Grande", "Benguela"],
    moveType: "counterattack",
  },
  "Vingativa Baixa": {
    name: "Vingativa Baixa",
    jogoType: ["Benguela"],
    moveType: "counterattack",
  },
  "Vingativa com Projeção": {
    name: "Vingativa com Projeção",
    jogoType: ["São Bento Grande"],
    moveType: "counterattack",
  },
};
