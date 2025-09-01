export interface ScaleInfo {
  name: string;
  intervals: string;
  notes: string;
  characteristics: string;
  emotions: string;
  genres: string[];
  typicalChords: string[];
  practiceNotes: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export const scaleTheory: Record<string, ScaleInfo> = {
  "Mayor": {
    name: "Escala Mayor (Jónica)",
    intervals: "T-T-S-T-T-T-S",
    notes: "C-D-E-F-G-A-B (en Do)",
    characteristics: "Brillante, alegre, estable. La base de la música occidental.",
    emotions: "Felicidad, triunfo, claridad, optimismo",
    genres: ["Pop", "Rock", "Country", "Folk", "Clásica"],
    typicalChords: ["Cmaj7", "Cmaj9", "C6/9", "Cmaj13"],
    practiceNotes: "Practica en todas las posiciones. Es la referencia para entender todas las demás escalas.",
    difficulty: "Básico"
  },
  "Menor": {
    name: "Escala Menor Natural (Eólica)",
    intervals: "T-S-T-T-S-T-T",
    notes: "A-B-C-D-E-F-G (en La)",
    characteristics: "Melancólica, introspectiva, emotiva. Muy expresiva.",
    emotions: "Tristeza, nostalgia, misterio, profundidad",
    genres: ["Blues", "Rock", "Metal", "Folk", "Baladas"],
    typicalChords: ["Am7", "Am9", "Am6", "Am(add9)"],
    practiceNotes: "Enfócate en la expresividad. Usa bends y vibrato para maximizar la emotividad.",
    difficulty: "Básico"
  },
  "Dórico": {
    name: "Modo Dórico",
    intervals: "T-S-T-T-T-S-T",
    notes: "D-E-F-G-A-B-C (en Re)",
    characteristics: "Menor con un toque brillante. Más luminoso que el menor natural.",
    emotions: "Melancolía esperanzadora, folk, celta",
    genres: ["Jazz", "Folk Celta", "Rock Progresivo", "Fusion"],
    typicalChords: ["Dm7", "Dm9", "Dm6", "Dm11"],
    practiceNotes: "La 6ta mayor es clave. Compara con menor natural para sentir la diferencia.",
    difficulty: "Intermedio"
  },
  "Frigio": {
    name: "Modo Frigio",
    intervals: "S-T-T-T-S-T-T",
    notes: "E-F-G-A-B-C-D (en Mi)",
    characteristics: "Exótico, español, árabe. Muy dramático por la 2da menor.",
    emotions: "Drama, pasión, exotismo, tensión",
    genres: ["Flamenco", "Metal", "Música Árabe", "Jazz Modal"],
    typicalChords: ["Em7b9", "Esus4b9", "Em(add b9)"],
    practiceNotes: "La 2da menor (b9) es el sonido característico. Úsala como nota de aproximación.",
    difficulty: "Intermedio"
  },
  "Lidio": {
    name: "Modo Lidio",
    intervals: "T-T-T-S-T-T-S",
    notes: "F-G-A-B-C-D-E (en Fa)",
    characteristics: "Etéreo, flotante, mágico. La 4ta aumentada crea tensión hermosa.",
    emotions: "Magia, ensueño, flotación, misterio luminoso",
    genres: ["Jazz", "Música de Películas", "Prog Rock", "Ambient"],
    typicalChords: ["Fmaj7#11", "Fmaj9#11", "F6/9#11"],
    practiceNotes: "La #11 (4ta aumentada) es el alma del modo. Resuélvela hacia la 5ta.",
    difficulty: "Intermedio"
  },
  "Mixolidio": {
    name: "Modo Mixolidio",
    intervals: "T-T-S-T-T-S-T",
    notes: "G-A-B-C-D-E-F (en Sol)",
    characteristics: "Dominante, bluesy, groove. Mayor con 7ma menor.",
    emotions: "Groove, funk, blues, relajación activa",
    genres: ["Blues", "Rock", "Funk", "Country", "Jazz"],
    typicalChords: ["G7", "G9", "G13", "G7sus4"],
    practiceNotes: "Perfecto para dominantes. La 7ma menor crea el sonido de resolución.",
    difficulty: "Intermedio"
  },
  "Locrio": {
    name: "Modo Locrio",
    intervals: "S-T-T-S-T-T-T",
    notes: "B-C-D-E-F-G-A (en Si)",
    characteristics: "Inestable, tenso, disminuido. El más disonante de los modos.",
    emotions: "Tensión, inestabilidad, suspense, ansiedad",
    genres: ["Jazz Modal", "Metal Progresivo", "Música Experimental"],
    typicalChords: ["Bm7b5", "Bm11b5", "Bdim"],
    practiceNotes: "Difícil de usar como centro tonal. Mejor como color pasajero o en contextos experimentales.",
    difficulty: "Avanzado"
  },
  "Bebop": {
    name: "Escala Bebop Dominante",
    intervals: "T-T-S-T-T-S-S-S",
    notes: "G-A-B-C-D-E-F-F#-G (en Sol)",
    characteristics: "Jazz puro. Añade cromatismo a la escala mixolidia.",
    emotions: "Swing, sofisticación, fluidez jazzística",
    genres: ["Bebop", "Jazz Tradicional", "Swing"],
    typicalChords: ["G7", "G9", "G13", "G7alt"],
    practiceNotes: "La nota cromática permite fraseos que caen en tiempos fuertes. Esencial para el jazz.",
    difficulty: "Avanzado"
  },
  "Alterada": {
    name: "Escala Alterada (Super Locrio)",
    intervals: "S-T-S-T-T-T-T",
    notes: "G-Ab-Bb-B-Db-Eb-F (en Sol)",
    characteristics: "Máxima tensión armónica. Todas las tensiones alteradas disponibles.",
    emotions: "Tensión extrema, modernidad, sofisticación jazzística",
    genres: ["Jazz Moderno", "Fusion", "Jazz Contemporáneo"],
    typicalChords: ["G7alt", "G7#5#9", "G7b5b9", "G7#9#11"],
    practiceNotes: "Úsala sobre dominantes que resuelven. Cada nota es una alteración disponible.",
    difficulty: "Experto"
  },
  "Tonos Enteros": {
    name: "Escala de Tonos Enteros",
    intervals: "T-T-T-T-T-T",
    notes: "C-D-E-F#-G#-A# (en Do)",
    characteristics: "Simétrica, flotante, impresionista. Sin centro tonal claro.",
    emotions: "Ensueño, flotación, impresionismo, surrealismo",
    genres: ["Impresionismo", "Jazz Modal", "Música de Películas"],
    typicalChords: ["Caug", "C7#5", "C9#11"],
    practiceNotes: "Solo 2 escalas diferentes cubren todas las notas. Úsala para crear ambientes etéreos.",
    difficulty: "Avanzado"
  },
  "Disminuida": {
    name: "Escala Disminuida",
    intervals: "T-S-T-S-T-S-T-S",
    notes: "C-D-Eb-F-Gb-Ab-A-B (en Do)",
    characteristics: "Simétrica, tensa, cromática. Alterna tonos y semitonos.",
    emotions: "Tensión, cromatismo, sofisticación armónica",
    genres: ["Jazz", "Música Clásica Moderna", "Metal Progresivo"],
    typicalChords: ["Cdim7", "C7b9", "C13b9"],
    practiceNotes: "Solo 3 escalas diferentes. Perfecta sobre acordes disminuidos y dominantes con b9.",
    difficulty: "Experto"
  },
  "Menor Armónica": {
    name: "Escala Menor Armónica",
    intervals: "T-S-T-T-S-T+S-S",
    notes: "A-B-C-D-E-F-G# (en La)",
    characteristics: "Exótica, dramática. La 2da aumentada crea tensión única.",
    emotions: "Drama, exotismo, tensión oriental, pasión",
    genres: ["Música Clásica", "Metal Neoclásico", "Flamenco", "Música Árabe"],
    typicalChords: ["Am(maj7)", "Am6", "E7b9"],
    practiceNotes: "La 2da aumentada (F-G#) es característica. Practica saltos melódicos amplios.",
    difficulty: "Avanzado"
  },
  "Menor Melódica": {
    name: "Escala Menor Melódica",
    intervals: "T-S-T-T-T-T-S",
    notes: "A-B-C-D-E-F#-G# (en La)",
    characteristics: "Menor ascendente, mayor descendente. Muy versátil en jazz.",
    emotions: "Sofisticación, elegancia, fluidez melódica",
    genres: ["Jazz", "Fusion", "Música Clásica", "Jazz Contemporáneo"],
    typicalChords: ["Am(maj7)", "Am(maj9)", "Am6/9"],
    practiceNotes: "En jazz se usa igual ascendente y descendente. Genera muchos modos útiles.",
    difficulty: "Avanzado"
  },
  "Húngara": {
    name: "Escala Húngara",
    intervals: "T-S-T+S-S-S-T+S-S",
    notes: "C-D-Eb-F#-G-Ab-B (en Do)",
    characteristics: "Exótica, gitana, con dos 2das aumentadas. Muy dramática.",
    emotions: "Pasión gitana, drama, exotismo europeo del este",
    genres: ["Música Gitana", "Folk Húngaro", "Metal Sinfónico"],
    typicalChords: ["C7b5", "Cm#5", "Cdim(maj7)"],
    practiceNotes: "Las dos 2das aumentadas crean saltos melódicos únicos. Practica lentamente.",
    difficulty: "Experto"
  },
  "Japonesa": {
    name: "Escala Japonesa (Hirajoshi)",
    intervals: "T-S-2T-S-2T",
    notes: "C-D-Eb-G-Ab (en Do) - Pentatónica",
    characteristics: "Minimalista, contemplativa, asiática. Sin 3ra ni 7ma.",
    emotions: "Serenidad, contemplación, minimalismo zen",
    genres: ["Música Tradicional Japonesa", "Ambient", "New Age"],
    typicalChords: ["Csus2", "Cm(add9)", "C5"],
    practiceNotes: "Solo 5 notas. Enfócate en el espacio y el silencio entre notas.",
    difficulty: "Intermedio"
  },
  "Árabe": {
    name: "Escala Árabe (Hijaz)",
    intervals: "S-T+S-S-T-S-T+S-S",
    notes: "C-Db-E-F-G-Ab-B (en Do)",
    characteristics: "Exótica, oriental, con 2da aumentada característica.",
    emotions: "Misterio oriental, exotismo, espiritualidad",
    genres: ["Música Árabe", "Flamenco", "Metal Sinfónico", "World Music"],
    typicalChords: ["C7b9#11", "Cmaj7b5", "Csus4b9"],
    practiceNotes: "La 2da aumentada (Db-E) es el sonido característico. Practica ornamentaciones.",
    difficulty: "Experto"
  }
};

export const getScaleInfo = (scaleName: string): ScaleInfo | null => {
  // Buscar coincidencias exactas primero
  if (scaleTheory[scaleName]) {
    return scaleTheory[scaleName];
  }
  
  // Buscar coincidencias parciales para escalas con nombres compuestos
  const normalizedName = scaleName.toLowerCase();
  
  if (normalizedName.includes('mayor')) return scaleTheory["Mayor"];
  if (normalizedName.includes('menor natural')) return scaleTheory["Menor"];
  if (normalizedName.includes('menor melódica') || normalizedName.includes('menor mel')) return scaleTheory["Menor Melódica"];
  if (normalizedName.includes('menor armónica') || normalizedName.includes('menor arm')) return scaleTheory["Menor Armónica"];
  if (normalizedName.includes('dórico')) return scaleTheory["Dórico"];
  if (normalizedName.includes('frigio')) return scaleTheory["Frigio"];
  if (normalizedName.includes('lidio')) return scaleTheory["Lidio"];
  if (normalizedName.includes('mixolidio') || normalizedName.includes('mixo')) return scaleTheory["Mixolidio"];
  if (normalizedName.includes('locrio')) return scaleTheory["Locrio"];
  if (normalizedName.includes('bebop')) return scaleTheory["Bebop"];
  if (normalizedName.includes('alterada')) return scaleTheory["Alterada"];
  if (normalizedName.includes('tonos enteros')) return scaleTheory["Tonos Enteros"];
  if (normalizedName.includes('disminuida')) return scaleTheory["Disminuida"];
  if (normalizedName.includes('húngara')) return scaleTheory["Húngara"];
  if (normalizedName.includes('japonesa')) return scaleTheory["Japonesa"];
  if (normalizedName.includes('árabe')) return scaleTheory["Árabe"];
  
  return null;
};