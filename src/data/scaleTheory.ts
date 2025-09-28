export interface ScaleInfo {
  name: string;
  intervals: string;
  notes: string;
  characteristics: string;
  emotions: string;
  genres: string[];
  typicalChords: string[];
  practiceNotes: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto' | 'Maestro' | 'Legendario';
  origin?: string;
  musicalEra?: string;
  famousUses?: string[];
}

export const scaleTheory: Record<string, ScaleInfo> = {
  // ESCALAS BÁSICAS
  "Mayor": {
    name: "Escala Mayor (Jónica)",
    intervals: "T-T-S-T-T-T-S",
    notes: "C-D-E-F-G-A-B (en Do)",
    characteristics: "Brillante, alegre, estable. La base de la música occidental.",
    emotions: "Felicidad, triunfo, claridad, optimismo",
    genres: ["Pop", "Rock", "Country", "Folk", "Clásica"],
    typicalChords: ["Cmaj7", "Cmaj9", "C6/9", "Cmaj13"],
    practiceNotes: "Practica en todas las posiciones. Es la referencia para entender todas las demás escalas.",
    difficulty: "Básico",
    origin: "Grecia Antigua",
    musicalEra: "Todas las épocas",
    famousUses: ["Himno a la Alegría - Beethoven", "Let It Be - Beatles", "Sweet Caroline - Neil Diamond"]
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
    difficulty: "Básico",
    origin: "Grecia Antigua",
    musicalEra: "Todas las épocas",
    famousUses: ["Stairway to Heaven - Led Zeppelin", "The Sound of Silence - Simon & Garfunkel"]
  },

  // MODOS GRIEGOS
  "Dórico": {
    name: "Modo Dórico",
    intervals: "T-S-T-T-T-S-T",
    notes: "D-E-F-G-A-B-C (en Re)",
    characteristics: "Menor con un toque brillante. Más luminoso que el menor natural.",
    emotions: "Melancolía esperanzadora, folk, celta",
    genres: ["Jazz", "Folk Celta", "Rock Progresivo", "Fusion"],
    typicalChords: ["Dm7", "Dm9", "Dm6", "Dm11"],
    practiceNotes: "La 6ta mayor es clave. Compara con menor natural para sentir la diferencia.",
    difficulty: "Intermedio",
    origin: "Grecia Antigua",
    musicalEra: "Medieval, Jazz Moderno",
    famousUses: ["So What - Miles Davis", "Eleanor Rigby - Beatles", "Scarborough Fair"]
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
    difficulty: "Intermedio",
    origin: "Grecia Antigua",
    musicalEra: "Medieval, Flamenco, Metal Moderno",
    famousUses: ["White Rabbit - Jefferson Airplane", "Flamenco tradicional", "Metallica - Wherever I May Roam"]
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
    difficulty: "Intermedio",
    origin: "Grecia Antigua",
    musicalEra: "Jazz Moderno, Cine",
    famousUses: ["The Simpsons Theme", "Joe Satriani - Flying in a Blue Dream", "Música de John Williams"]
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
    difficulty: "Intermedio",
    origin: "Grecia Antigua",
    musicalEra: "Blues, Rock, Funk",
    famousUses: ["Sweet Child O' Mine - Guns N' Roses", "Norwegian Wood - Beatles", "Grateful Dead"]
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
    difficulty: "Avanzado",
    origin: "Grecia Antigua",
    musicalEra: "Jazz Moderno, Metal Progresivo",
    famousUses: ["Björk - Army of Me", "Dream Theater", "Música experimental"]
  },

  // ESCALAS DE JAZZ
  "Bebop": {
    name: "Escala Bebop Dominante",
    intervals: "T-T-S-T-T-S-S-S",
    notes: "G-A-B-C-D-E-F-F#-G (en Sol)",
    characteristics: "Jazz puro. Añade cromatismo a la escala mixolidia.",
    emotions: "Swing, sofisticación, fluidez jazzística",
    genres: ["Bebop", "Jazz Tradicional", "Swing"],
    typicalChords: ["G7", "G9", "G13", "G7alt"],
    practiceNotes: "La nota cromática permite fraseos que caen en tiempos fuertes. Esencial para el jazz.",
    difficulty: "Avanzado",
    origin: "Estados Unidos",
    musicalEra: "1940s - Bebop",
    famousUses: ["Charlie Parker", "Dizzy Gillespie", "Bud Powell"]
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
    difficulty: "Experto",
    origin: "Estados Unidos",
    musicalEra: "1960s - Jazz Moderno",
    famousUses: ["John Coltrane", "Bill Evans", "Herbie Hancock"]
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
    difficulty: "Avanzado",
    origin: "Europa",
    musicalEra: "Barroco, Romántico",
    famousUses: ["Bach - Invenciones", "Yngwie Malmsteen", "Música clásica romántica"]
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
    difficulty: "Avanzado",
    origin: "Europa",
    musicalEra: "Clásico, Jazz Moderno",
    famousUses: ["Bill Evans", "Keith Jarrett", "Pat Metheny"]
  },

  // ESCALAS SIMÉTRICAS
  "Tonos Enteros": {
    name: "Escala de Tonos Enteros",
    intervals: "T-T-T-T-T-T",
    notes: "C-D-E-F#-G#-A# (en Do)",
    characteristics: "Simétrica, flotante, impresionista. Sin centro tonal claro.",
    emotions: "Ensueño, flotación, impresionismo, surrealismo",
    genres: ["Impresionismo", "Jazz Modal", "Música de Películas"],
    typicalChords: ["Caug", "C7#5", "C9#11"],
    practiceNotes: "Solo 2 escalas diferentes cubren todas las notas. Úsala para crear ambientes etéreos.",
    difficulty: "Avanzado",
    origin: "Francia",
    musicalEra: "Impresionismo (1890s)",
    famousUses: ["Claude Debussy", "Maurice Ravel", "Stevie Wonder"]
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
    difficulty: "Experto",
    origin: "Europa",
    musicalEra: "Siglo XX",
    famousUses: ["Art Tatum", "Olivier Messiaen", "Joe Pass"]
  },

  // ESCALAS EXÓTICAS MUNDIALES
  "Húngara": {
    name: "Escala Húngara",
    intervals: "T-S-T+S-S-S-T+S-S",
    notes: "C-D-Eb-F#-G-Ab-B (en Do)",
    characteristics: "Exótica, gitana, con dos 2das aumentadas. Muy dramática.",
    emotions: "Pasión gitana, drama, exotismo europeo del este",
    genres: ["Música Gitana", "Folk Húngaro", "Metal Sinfónico"],
    typicalChords: ["C7b5", "Cm#5", "Cdim(maj7)"],
    practiceNotes: "Las dos 2das aumentadas crean saltos melódicos únicos. Practica lentamente.",
    difficulty: "Experto",
    origin: "Hungría/Roma",
    musicalEra: "Tradicional, Romántico",
    famousUses: ["Franz Liszt", "Béla Bartók", "Django Reinhardt"]
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
    difficulty: "Intermedio",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Joe Hisaishi", "Toru Takemitsu"]
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
    difficulty: "Experto",
    origin: "Medio Oriente",
    musicalEra: "Tradicional Árabe",
    famousUses: ["Música árabe tradicional", "Paco de Lucía", "Anoushka Shankar"]
  },

  // NUEVAS ESCALAS ÉPICAS
  "Bizantina": {
    name: "Escala Bizantina",
    intervals: "S-T+S-S-T-S-T+S-S",
    notes: "C-Db-E-F-G-Ab-B (en Do)",
    characteristics: "Mística, religiosa, oriental. Similar al Hijaz pero con matices únicos.",
    emotions: "Misticismo, religiosidad, contemplación sagrada",
    genres: ["Música Bizantina", "Metal Sinfónico", "Ambient Religioso"],
    typicalChords: ["Cmaj7b9", "C7#11b9", "Csus4b9"],
    practiceNotes: "Úsala para crear atmósferas místicas. La 2da aumentada es sagrada.",
    difficulty: "Experto",
    origin: "Imperio Bizantino",
    musicalEra: "Medieval Bizantino",
    famousUses: ["Cantos bizantinos", "Música ortodoxa", "Therion"]
  },
  "Persa": {
    name: "Escala Persa",
    intervals: "S-T+S-S-S-T+S-S-T",
    notes: "C-Db-E-F-Gb-A-Bb (en Do)",
    characteristics: "Exótica persa con múltiples 2das aumentadas. Extremadamente dramática.",
    emotions: "Exotismo persa, drama épico, misterio ancestral",
    genres: ["Música Persa", "World Fusion", "Metal Progresivo"],
    typicalChords: ["C7b5b9", "Cm(maj7)b5", "C#dim(maj7)"],
    practiceNotes: "Tres 2das aumentadas crean saltos únicos. Practica con ornamentaciones persas.",
    difficulty: "Maestro",
    origin: "Persia (Irán)",
    musicalEra: "Tradicional Persa",
    famousUses: ["Música persa clásica", "Anoushka Shankar", "Shakti"]
  },
  "India Raga": {
    name: "Raga Bhairav (India)",
    intervals: "S-T+S-S-T-S-T+S-S",
    notes: "C-Db-E-F-G-Ab-B (en Do)",
    characteristics: "Raga matutino sagrado. Despierta el alma al amanecer.",
    emotions: "Despertar espiritual, serenidad matutina, conexión divina",
    genres: ["Música Clásica India", "World Fusion", "Meditación"],
    typicalChords: ["Cmaj7b9", "C7sus4b9", "Cm(add b9)"],
    practiceNotes: "Toca al amanecer para máximo efecto. Usa microtonos si es posible.",
    difficulty: "Maestro",
    origin: "India",
    musicalEra: "Clásica India Antigua",
    famousUses: ["Ravi Shankar", "Ali Akbar Khan", "John McLaughlin"]
  },
  "Flamenca": {
    name: "Escala Flamenca",
    intervals: "S-T+S-S-T-S-T-S-T",
    notes: "E-F-G#-A-B-C-D (en Mi)",
    characteristics: "Pasión flamenca pura. Frigio con 3ra mayor ocasional.",
    emotions: "Pasión andaluza, duende, drama gitano",
    genres: ["Flamenco", "Rumba", "Latin Jazz"],
    typicalChords: ["E7b9", "Esus4b9", "Em(add b9)"],
    practiceNotes: "Alterna entre 3ra menor y mayor. Usa rasgueados flamencos.",
    difficulty: "Avanzado",
    origin: "Andalucía, España",
    musicalEra: "Flamenco Tradicional",
    famousUses: ["Paco de Lucía", "Vicente Amigo", "Jesse Cook"]
  },
  "Klezmer": {
    name: "Escala Klezmer",
    intervals: "T-S-T+S-S-T-S-T",
    notes: "D-E-F-G#-A-B-C (en Re)",
    characteristics: "Judía ashkenazi. Mezcla alegría y melancolía profunda.",
    emotions: "Nostalgia judía, celebración melancólica, memoria ancestral",
    genres: ["Klezmer", "Folk Judío", "World Music"],
    typicalChords: ["Dm(maj7)", "D7#11", "Dm6/9"],
    practiceNotes: "Alterna entre alegría y tristeza. Usa ornamentaciones típicas.",
    difficulty: "Avanzado",
    origin: "Europa del Este",
    musicalEra: "Tradicional Judía",
    famousUses: ["Música klezmer tradicional", "John Zorn", "The Klezmatics"]
  },
  "Balinesa": {
    name: "Escala Balinesa (Pelog)",
    intervals: "S-T-2T-S-2T",
    notes: "C-Db-Eb-G-Ab (en Do) - Pentatónica",
    characteristics: "Gamelan balinés. Mística y ceremonial.",
    emotions: "Misticismo balinés, ceremonia sagrada, trance",
    genres: ["Gamelan", "World Music", "Ambient Étnico"],
    typicalChords: ["Csus2b5", "Cm(add b9)", "C7sus4"],
    practiceNotes: "Piensa en gongs y metalófonos. Crea texturas metálicas.",
    difficulty: "Intermedio",
    origin: "Bali, Indonesia",
    musicalEra: "Tradicional Balinesa",
    famousUses: ["Gamelan tradicional", "Colin McPhee", "Lou Harrison"]
  },
  "Africana": {
    name: "Escala Africana",
    intervals: "T-T-S-T-T-S-T",
    notes: "C-D-E-F-G-A-Bb (en Do)",
    characteristics: "Mixolidia africana. Groove ancestral y ritmo tribal.",
    emotions: "Ritmo tribal, conexión ancestral, groove primitivo",
    genres: ["Música Africana", "Afrobeat", "World Fusion"],
    typicalChords: ["C7", "C9", "C7sus4"],
    practiceNotes: "Enfócate en el groove y la percusión. Piensa en tambores.",
    difficulty: "Intermedio",
    origin: "África Occidental",
    musicalEra: "Tradicional Africana",
    famousUses: ["Fela Kuti", "Ali Farka Touré", "Youssou N'Dour"]
  },
  "Celta": {
    name: "Escala Celta",
    intervals: "T-S-T-T-T-S-T",
    notes: "D-E-F-G-A-B-C (en Re)",
    characteristics: "Dórica celta. Mística de las tierras altas.",
    emotions: "Nostalgia celta, brumas de Escocia, magia ancestral",
    genres: ["Folk Celta", "Irish Traditional", "New Age"],
    typicalChords: ["Dm7", "Dm9", "Dm6"],
    practiceNotes: "Piensa en gaitas y violines. Usa ornamentaciones celtas.",
    difficulty: "Intermedio",
    origin: "Islas Británicas",
    musicalEra: "Tradicional Celta",
    famousUses: ["The Chieftains", "Clannad", "Loreena McKennitt"]
  },
  "Gitana": {
    name: "Escala Gitana",
    intervals: "S-T+S-S-T-S-T+S-S",
    notes: "C-Db-E-F-G-Ab-B (en Do)",
    characteristics: "Roma/Gitana. Pasión nómada y libertad sin fronteras.",
    emotions: "Libertad gitana, pasión nómada, vida sin fronteras",
    genres: ["Música Gitana", "Gypsy Jazz", "Flamenco"],
    typicalChords: ["C7b9", "Cmaj7b9", "C7#11b9"],
    practiceNotes: "Libertad total en la interpretación. Siente la pasión gitana.",
    difficulty: "Avanzado",
    origin: "Pueblo Roma",
    musicalEra: "Tradicional Gitana",
    famousUses: ["Django Reinhardt", "Gipsy Kings", "Bireli Lagrene"]
  },
  "Enigmática": {
    name: "Escala Enigmática",
    intervals: "S-T+S-T-T-T-S-S",
    notes: "C-Db-E-F#-G#-A#-B (en Do)",
    characteristics: "Misteriosa y única. Creada por Verdi, usada por pocos.",
    emotions: "Misterio absoluto, enigma musical, rareza única",
    genres: ["Música Clásica", "Experimental", "Avant-garde"],
    typicalChords: ["Cmaj7#5#11", "C7#5#9#11", "Cmaj13#5#11"],
    practiceNotes: "Extremadamente rara. Úsala para efectos únicos y misteriosos.",
    difficulty: "Maestro",
    origin: "Italia (Giuseppe Verdi)",
    musicalEra: "Romántico Tardío",
    famousUses: ["Giuseppe Verdi", "Scriabin", "Música experimental"]
  },
  "Neapolitana": {
    name: "Escala Neapolitana",
    intervals: "S-T-T-T-T-S-T",
    notes: "C-Db-Eb-F-G-A-B (en Do)",
    characteristics: "Clásica italiana. Mayor con 2da menor, muy expresiva.",
    emotions: "Drama operístico, pasión italiana, expresividad clásica",
    genres: ["Ópera", "Música Clásica", "Jazz Moderno"],
    typicalChords: ["Cmaj7b9", "C6/9b9", "Cmaj13b9"],
    practiceNotes: "La b2 crea tensión única. Úsala en contextos dramáticos.",
    difficulty: "Avanzado",
    origin: "Nápoles, Italia",
    musicalEra: "Barroco, Clásico",
    famousUses: ["Scarlatti", "Mozart", "Chopin"]
  },
  "Prometheus": {
    name: "Escala Prometheus",
    intervals: "T-T-T-T+S-S-T",
    notes: "C-D-E-F#-A-Bb (en Do)",
    characteristics: "Mística de Scriabin. Fuego prometeico y misticismo ruso.",
    emotions: "Fuego místico, iluminación, transcendencia",
    genres: ["Música Clásica Moderna", "Experimental"],
    typicalChords: ["Cmaj7#11", "C7#11", "Cmaj9#11"],
    practiceNotes: "Creada por Scriabin para su sinfonía Prometheus. Muy mística.",
    difficulty: "Maestro",
    origin: "Rusia (Scriabin)",
    musicalEra: "Siglo XX Temprano",
    famousUses: ["Alexander Scriabin", "Música experimental rusa"]
  },
  "Hirajoshi": {
    name: "Escala Hirajoshi",
    intervals: "T-S-2T-S-2T",
    notes: "C-D-Eb-G-Ab (en Do)",
    characteristics: "Pentatónica japonesa. Pureza zen y simplicidad elegante.",
    emotions: "Zen, simplicidad, elegancia japonesa",
    genres: ["Música Japonesa", "Ambient", "New Age"],
    typicalChords: ["Csus2", "Cm(add9)", "C5"],
    practiceNotes: "Menos es más. Enfócate en el espacio entre notas.",
    difficulty: "Intermedio",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Toru Takemitsu"]
  },
  "Kumoi": {
    name: "Escala Kumoi",
    intervals: "T-S-2T-T-S",
    notes: "C-D-Eb-G-A (en Do)",
    characteristics: "Pentatónica japonesa menor. Melancolía zen.",
    emotions: "Melancolía zen, contemplación, tristeza elegante",
    genres: ["Música Japonesa", "Ambient", "World Music"],
    typicalChords: ["Cm(add9)", "Csus2", "Cm6"],
    practiceNotes: "Versión menor del Hirajoshi. Más melancólica pero igualmente zen.",
    difficulty: "Intermedio",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Joe Hisaishi"]
  },
  "Iwato": {
    name: "Escala Iwato",
    intervals: "S-2T-S-2T-T",
    notes: "C-Db-F-Gb-Bb (en Do)",
    characteristics: "Pentatónica japonesa dramática. La más tensa de las escalas japonesas.",
    emotions: "Drama japonés, tensión zen, conflicto interno",
    genres: ["Música Japonesa", "Experimental", "Ambient Oscuro"],
    typicalChords: ["Cm7b5", "Cdim", "C7sus4b5"],
    practiceNotes: "La más disonante de las escalas japonesas. Úsala para crear tensión.",
    difficulty: "Avanzado",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Música experimental"]
  },
  "Yo": {
    name: "Escala Yo",
    intervals: "T-T-S-T-T",
    notes: "C-D-E-F-G (en Do)",
    characteristics: "Pentatónica japonesa mayor. Alegría zen y simplicidad pura.",
    emotions: "Alegría zen, simplicidad, pureza japonesa",
    genres: ["Música Japonesa", "Folk", "New Age"],
    typicalChords: ["Cmaj7", "C6", "Csus2"],
    practiceNotes: "La más simple y alegre de las escalas japonesas.",
    difficulty: "Básico",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Música infantil japonesa"]
  },
  "In Sen": {
    name: "Escala In Sen",
    intervals: "S-2T-T-S-2T",
    notes: "C-Db-F-G-Ab (en Do)",
    characteristics: "Pentatónica japonesa mística. Profundidad espiritual.",
    emotions: "Misticismo japonés, profundidad espiritual, meditación",
    genres: ["Música Japonesa", "Meditación", "Ambient"],
    typicalChords: ["Csus4", "Cm7", "C7sus4"],
    practiceNotes: "Perfecta para meditación. Crea atmósferas profundas.",
    difficulty: "Intermedio",
    origin: "Japón",
    musicalEra: "Tradicional Japonesa",
    famousUses: ["Música tradicional japonesa", "Música de meditación"]
  },
  "Doble Armónica": {
    name: "Escala Doble Armónica",
    intervals: "S-T+S-S-T-S-T+S-S",
    notes: "C-Db-E-F-G-Ab-B (en Do)",
    characteristics: "Dos 2das aumentadas. Extremadamente exótica y dramática.",
    emotions: "Drama extremo, exotismo máximo, tensión épica",
    genres: ["Música Árabe", "Metal Sinfónico", "Experimental"],
    typicalChords: ["Cmaj7b9", "C7#11b9", "Cmaj13b9"],
    practiceNotes: "La más exótica de todas. Dos saltos de 2da aumentada crean drama único.",
    difficulty: "Maestro",
    origin: "Medio Oriente/Europa del Este",
    musicalEra: "Tradicional",
    famousUses: ["Música árabe tradicional", "Yngwie Malmsteen", "Symphony X"]
  },
  "Ultralocrio": {
    name: "Escala Ultralocrio",
    intervals: "S-S-T-S-T-T-T",
    notes: "C-Db-D-E-F-G-A (en Do)",
    characteristics: "Más inestable que el Locrio. Máxima disonancia posible.",
    emotions: "Inestabilidad extrema, caos controlado, tensión máxima",
    genres: ["Experimental", "Avant-garde", "Metal Extremo"],
    typicalChords: ["Cm7b5b9", "Cdim(maj7)", "C7b5b9"],
    practiceNotes: "Solo para experimentación extrema. Casi imposible de usar tonalmente.",
    difficulty: "Legendario",
    origin: "Teórica/Experimental",
    musicalEra: "Siglo XXI",
    famousUses: ["Música experimental extrema", "Compositores de vanguardia"]
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
  if (normalizedName.includes('bizantina')) return scaleTheory["Bizantina"];
  if (normalizedName.includes('persa')) return scaleTheory["Persa"];
  if (normalizedName.includes('india') || normalizedName.includes('raga')) return scaleTheory["India Raga"];
  if (normalizedName.includes('flamenca')) return scaleTheory["Flamenca"];
  if (normalizedName.includes('klezmer')) return scaleTheory["Klezmer"];
  if (normalizedName.includes('balinesa') || normalizedName.includes('pelog')) return scaleTheory["Balinesa"];
  if (normalizedName.includes('africana')) return scaleTheory["Africana"];
  if (normalizedName.includes('celta')) return scaleTheory["Celta"];
  if (normalizedName.includes('gitana')) return scaleTheory["Gitana"];
  if (normalizedName.includes('enigmática')) return scaleTheory["Enigmática"];
  if (normalizedName.includes('neapolitana')) return scaleTheory["Neapolitana"];
  if (normalizedName.includes('prometheus')) return scaleTheory["Prometheus"];
  if (normalizedName.includes('hirajoshi')) return scaleTheory["Hirajoshi"];
  if (normalizedName.includes('kumoi')) return scaleTheory["Kumoi"];
  if (normalizedName.includes('iwato')) return scaleTheory["Iwato"];
  if (normalizedName.includes('yo')) return scaleTheory["Yo"];
  if (normalizedName.includes('in sen')) return scaleTheory["In Sen"];
  if (normalizedName.includes('doble armónica')) return scaleTheory["Doble Armónica"];
  if (normalizedName.includes('ultralocrio')) return scaleTheory["Ultralocrio"];
  
  return null;
};