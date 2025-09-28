import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, Clock, Target, BookOpen, Unlock, Lock, RotateCcw, Brain, Zap, Eye, GraduationCap } from 'lucide-react';
import Metronome from './Metronome';
import ScaleTheoryPanel from './ScaleTheoryPanel';
import ChordAnatomyPanel from './ChordAnatomyPanel';
import MethodologyPanel from './MethodologyPanel';
import { getScaleInfo } from '../data/scaleTheory';

// Interfaces
interface ChordSequence {
  name: string;
  chords: string[];
  scales: string[];
  positions: number[];
  difficulty: 'Intermedio' | 'Avanzado' | 'Experto' | 'Virtuoso' | 'Demencial' | 'Imposible' | 'Transcendental';
  tempoRange: [number, number];
  phase: number;
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: 'Intermedio' | 'Avanzado' | 'Experto' | 'Virtuoso' | 'Demencial' | 'Imposible' | 'Transcendental';
  techniques: string[];
  mentalChallenges?: string[];
  sequenceIds: number[];
  instructions: string[];
  warnings?: string[];
}

interface ChordCardProps {
  chord: string;
  scale: string;
  position: number;
  index: number;
  isActive: boolean;
  difficulty: string;
}

const ChordCard: React.FC<ChordCardProps> = ({ chord, scale, position, index, isActive, difficulty }) => {
  const getDifficultyColor = (diff: string) => {
    const colors = {
      'Intermedio': 'border-blue-300 bg-blue-50',
      'Avanzado': 'border-green-300 bg-green-50',
      'Experto': 'border-orange-300 bg-orange-50',
      'Virtuoso': 'border-purple-300 bg-purple-50',
      'Demencial': 'border-red-400 bg-red-100',
      'Imposible': 'border-purple-500 bg-purple-100',
      'Transcendental': 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50'
    };
    return colors[diff] || 'border-gray-300 bg-gray-50';
  };

  return (
    <div 
      className={`p-3 border-2 rounded-lg transition-all duration-200 hover:shadow-md min-h-[100px] flex flex-col justify-between cursor-pointer ${
      isActive ? 'ring-2 ring-blue-500 bg-blue-100' : getDifficultyColor(difficulty)
    }`}
      onClick={() => {
        // Esta función se pasará desde el componente padre
        if (window.selectChord) {
          window.selectChord({ name: chord, scale, position, index });
        }
      }}
    >
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-1">#{index + 1}</div>
        <div className="font-bold text-sm leading-tight mb-1 break-words">{chord}</div>
        <div className="text-xs text-gray-600 leading-tight break-words">{scale}</div>
      </div>
      <div className="text-xs text-center text-gray-500 mt-2">
        Pos. {position}
      </div>
    </div>
  );
};

const ChordExplorer: React.FC = () => {
  // Estados principales
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [tempo, setTempo] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedChord, setSelectedChord] = useState<{
    name: string;
    scale: string;
    position: number;
    index: number;
  } | null>(null);

  // Secuencias de acordes
  const chordSequences: ChordSequence[] = [
    // FASE 1 - Intermedio
    {
      name: "Construcción Básica I-vi-IV-V",
      chords: ["Cmaj7", "Am7", "Fmaj7", "G7"],
      scales: ["Mayor", "Menor", "Lidio", "Mixolidio"],
      positions: [8, 5, 1, 3],
      difficulty: "Intermedio",
      tempoRange: [60, 90],
      phase: 1
    },
    {
      name: "Tensiones Básicas con 9nas",
      chords: ["Cmaj9", "Dm9", "Em7", "Fmaj9", "G9", "Am9"],
      scales: ["Mayor", "Dórico", "Frigio", "Lidio", "Mixolidio", "Menor"],
      positions: [8, 10, 12, 1, 3, 5],
      difficulty: "Intermedio",
      tempoRange: [70, 100],
      phase: 1
    },

    // FASE 2 - Avanzado
    {
      name: "Colores Modales Avanzados",
      chords: ["Cmaj7#11", "Dm7", "Em7b5", "Fmaj7#11", "G7alt", "Am(maj7)"],
      scales: ["Lidio", "Dórico", "Locrio", "Lidio", "Alterada", "Menor Armónica"],
      positions: [8, 10, 12, 1, 3, 5],
      difficulty: "Avanzado",
      tempoRange: [80, 120],
      phase: 2
    },
    {
      name: "Sustituciones Cromáticas",
      chords: ["Cmaj7", "C#dim7", "Dm7", "D#dim7", "Em7", "F#m7b5", "G7"],
      scales: ["Mayor", "Disminuida", "Dórico", "Disminuida", "Frigio", "Locrio", "Mixolidio"],
      positions: [8, 9, 10, 11, 12, 2, 3],
      difficulty: "Avanzado",
      tempoRange: [90, 130],
      phase: 2
    },

    // FASE 3 - Experto
    {
      name: "Rearmónización Compleja",
      chords: ["Cmaj13#11", "F#7alt", "Em11", "A7#9#11", "Dm9", "G13sus4", "Cmaj7add6"],
      scales: ["Lidio", "Alterada", "Dórico", "Alterada", "Dórico", "Mixolidio", "Mayor"],
      positions: [8, 2, 12, 5, 10, 3, 8],
      difficulty: "Experto",
      tempoRange: [100, 160],
      phase: 3
    },
    {
      name: "Modulación por Terceras",
      chords: ["Cmaj7", "Emaj7", "G#maj7", "Bmaj7", "D#maj7", "Gmaj7", "Cmaj7"],
      scales: ["Mayor", "Mayor", "Mayor", "Mayor", "Mayor", "Mayor", "Mayor"],
      positions: [8, 4, 11, 7, 2, 3, 8],
      difficulty: "Experto",
      tempoRange: [110, 170],
      phase: 3
    },

    // FASE 4 - Virtuoso
    {
      name: "Politonalidad Extrema",
      chords: ["Cmaj7#11/G", "F#maj7#5/C#", "Bbmaj13/F", "Emaj7alt/B", "Amaj9#11/E"],
      scales: ["Lidio", "Tonos Enteros", "Lidio", "Alterada", "Lidio"],
      positions: [15, 9, 6, 7, 12],
      difficulty: "Virtuoso",
      tempoRange: [140, 200],
      phase: 4
    },
    {
      name: "Secuencia Imposible de Coltrane",
      chords: ["Cmaj7", "E7alt", "Amaj7", "C#7alt", "F#maj7", "Bb7alt", "Ebmaj7", "G7alt"],
      scales: ["Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada"],
      positions: [8, 6, 5, 4, 2, 6, 6, 3],
      difficulty: "Virtuoso",
      tempoRange: [160, 220],
      phase: 4
    },

    // FASE 5 - Demencial (Retos Mentales)
    {
      name: "Modulación Cada 2 Acordes",
      chords: ["Cmaj7", "Am7", "F#maj7", "D#m7", "Bmaj7", "G#m7", "Emaj7", "C#m7"],
      scales: ["Mayor", "Menor", "Mayor", "Menor", "Mayor", "Menor", "Mayor", "Menor"],
      positions: [8, 5, 2, 11, 7, 4, 12, 9],
      difficulty: "Demencial",
      tempoRange: [150, 240],
      phase: 5
    },
    {
      name: "Polirritmo 7/8 con Armonía Compleja",
      chords: ["Cmaj13#11", "F#7alt", "Bmaj9#5", "E7#9b13", "Amaj7#11", "D7alt", "Gmaj13"],
      scales: ["Lidio", "Alterada", "Tonos Enteros", "Alterada", "Lidio", "Alterada", "Lidio"],
      positions: [8, 2, 7, 6, 5, 10, 3],
      difficulty: "Demencial",
      tempoRange: [170, 260],
      phase: 5
    },

    // FASE 6 - Imposible (Técnica Extrema)
    {
      name: "Tapping + Hybrid + Bends Simultáneos",
      chords: ["Cmaj7#11add13", "F#7alt#9#11", "Bmaj13#5", "E7#9b13add11", "Amaj7#11add6"],
      scales: ["Lidio", "Alterada", "Tonos Enteros", "Alterada", "Lidio"],
      positions: [15, 9, 7, 6, 12],
      difficulty: "Imposible",
      tempoRange: [180, 280],
      phase: 6
    },
    {
      name: "Saltos de 7+ Trastes por Acorde",
      chords: ["Cmaj7", "F#maj7", "Bmaj7", "Emaj7", "Amaj7", "Dmaj7", "Gmaj7"],
      scales: ["Mayor", "Mayor", "Mayor", "Mayor", "Mayor", "Mayor", "Mayor"],
      positions: [3, 14, 7, 12, 5, 10, 15],
      difficulty: "Imposible",
      tempoRange: [200, 300],
      phase: 6
    },

    // FASE 7 - Transcendental
    {
      name: "Meditación Armónica Transcendental",
      chords: ["Cmaj13#11", "∞", "Fmaj13#11", "∞", "Gmaj13#11", "∞"],
      scales: ["Lidio", "Silencio", "Lidio", "Silencio", "Lidio", "Silencio"],
      positions: [8, 0, 1, 0, 3, 0],
      difficulty: "Transcendental",
      tempoRange: [220, 300],
      phase: 7
    },

    // FASE 8 - Retos Cerebrales
    {
      name: "Análisis Funcional en Tiempo Real",
      chords: ["Cmaj7", "A7alt", "Dm9", "G13sus4", "Em7b5", "A7b9", "Dm6/9", "G7alt", "Cmaj9"],
      scales: ["Mayor", "Alterada", "Dórico", "Mixolidio", "Locrio", "Alterada", "Dórico", "Alterada", "Mayor"],
      positions: [8, 5, 10, 3, 12, 5, 10, 3, 8],
      difficulty: "Demencial",
      tempoRange: [120, 180],
      phase: 8
    },
    {
      name: "Transposición Mental Doble",
      chords: ["Dm7", "G7", "Cmaj7", "Am7", "F#m7", "B7", "Emaj7", "C#m7"],
      scales: ["Dórico", "Mixolidio", "Mayor", "Menor", "Dórico", "Mixolidio", "Mayor", "Menor"],
      positions: [10, 3, 8, 5, 2, 7, 12, 9],
      difficulty: "Demencial",
      tempoRange: [100, 160],
      phase: 8
    },
    {
      name: "Memoria Fotográfica - 20 Acordes",
      chords: [
        "Cmaj7", "F#7alt", "Bmaj7", "E7#9", "Amaj7", "D7alt", "Gmaj7", "C#7#11",
        "F#maj7", "B7alt", "Emaj7", "A7#9", "Dmaj7", "G7alt", "Cmaj7", "F7#11",
        "Bbmaj7", "E7alt", "Amaj7", "D7#9"
      ],
      scales: [
        "Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada",
        "Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada", "Mayor", "Alterada",
        "Mayor", "Alterada", "Mayor", "Alterada"
      ],
      positions: [8, 2, 7, 6, 5, 10, 3, 9, 2, 7, 12, 5, 10, 3, 8, 1, 6, 6, 5, 10],
      difficulty: "Demencial",
      tempoRange: [80, 140],
      phase: 8
    }
  ];

  // Ejercicios por fase
  const exercisesByPhase: Record<number, Exercise[]> = {
    1: [
      {
        id: "1-1",
        name: "Construcción Gradual",
        description: "Construye acordes nota por nota, añadiendo tensiones progresivamente",
        duration: 15,
        difficulty: "Intermedio",
        techniques: ["Fingerpicking", "Chord Building"],
        sequenceIds: [0],
        instructions: [
          "Toca cada acorde como tríada primero",
          "Añade la 7ma",
          "Añade la 9na si está disponible",
          "Mantén cada voicing 4 tiempos"
        ]
      },
      {
        id: "1-2", 
        name: "Tensiones Básicas",
        description: "Explora las tensiones naturales en contexto tonal",
        duration: 20,
        difficulty: "Intermedio",
        techniques: ["Extended Chords", "Voice Leading"],
        sequenceIds: [1],
        instructions: [
          "Enfócate en las 9nas naturales",
          "Observa cómo cada tensión cambia el color",
          "Practica transiciones suaves entre acordes",
          "Tempo constante, sin acelerar"
        ]
      }
    ],
    2: [
      {
        id: "2-1",
        name: "Exploración Modal",
        description: "Descubre los colores únicos de cada modo",
        duration: 25,
        difficulty: "Avanzado", 
        techniques: ["Modal Harmony", "Color Tones"],
        sequenceIds: [2],
        instructions: [
          "Identifica el modo de cada acorde",
          "Enfatiza las notas características de cada modo",
          "Usa la #11 en acordes lidios",
          "Siente la diferencia entre cada color modal"
        ]
      },
      {
        id: "2-2",
        name: "Sustituciones Cromáticas",
        description: "Domina el movimiento cromático en progresiones",
        duration: 30,
        difficulty: "Avanzado",
        techniques: ["Chromatic Movement", "Diminished Passing"],
        sequenceIds: [3],
        instructions: [
          "Los acordes disminuidos son de paso",
          "Mantén el bajo cromático",
          "Cada dim7 dura solo 2 tiempos",
          "Enfócate en la fluidez del movimiento"
        ]
      }
    ],
    3: [
      {
        id: "3-1",
        name: "Rearmónización Avanzada",
        description: "Transforma progresiones simples en complejas",
        duration: 35,
        difficulty: "Experto",
        techniques: ["Reharmonization", "Tritone Substitution"],
        sequenceIds: [4],
        instructions: [
          "Cada acorde tiene múltiples tensiones",
          "Usa sustituciones tritonales",
          "Mantén la función armónica clara",
          "Practica saltos de posición amplios"
        ]
      },
      {
        id: "3-2",
        name: "Modulación por Terceras",
        description: "Navega por tonalidades distantes con elegancia",
        duration: 40,
        difficulty: "Experto",
        techniques: ["Modulation", "Wide Position Jumps"],
        sequenceIds: [5],
        instructions: [
          "Cada acorde está en tonalidad diferente",
          "Saltos de posición de 4+ trastes",
          "Mantén la conexión melódica",
          "Visualiza el círculo de terceras"
        ]
      }
    ],
    4: [
      {
        id: "4-1",
        name: "Politonalidad Extrema",
        description: "Combina múltiples centros tonales simultáneamente",
        duration: 45,
        difficulty: "Virtuoso",
        techniques: ["Polytonality", "Advanced Voicings"],
        sequenceIds: [6],
        instructions: [
          "Acordes slash con politonalidad",
          "Mantén ambos centros tonales claros",
          "Posiciones extremas del mástil",
          "Requiere técnica de stretching avanzada"
        ]
      },
      {
        id: "4-2",
        name: "Coltrane Changes",
        description: "La secuencia más desafiante del jazz",
        duration: 50,
        difficulty: "Virtuoso",
        techniques: ["Coltrane Changes", "Rapid Modulation"],
        sequenceIds: [7],
        instructions: [
          "Modulación por terceras mayores",
          "Cambio de tonalidad cada 2 acordes",
          "Velocidad extrema requerida",
          "Memorización perfecta necesaria"
        ]
      }
    ],
    5: [
      {
        id: "5-1",
        name: "Modulación Mental Constante",
        description: "Cambia de tonalidad cada 2 acordes mientras analizas",
        duration: 60,
        difficulty: "Demencial",
        techniques: ["Mental Modulation", "Real-time Analysis"],
        mentalChallenges: ["Análisis funcional simultáneo", "Procesamiento de múltiples tonalidades"],
        sequenceIds: [8],
        instructions: [
          "Di en voz alta la función de cada acorde",
          "Identifica la tonalidad de cada par de acordes",
          "Mantén el tempo mientras analizas",
          "Procesa 4 tonalidades diferentes en 8 acordes"
        ],
        warnings: ["Puede causar fatiga mental extrema", "Requiere concentración absoluta"]
      },
      {
        id: "5-2",
        name: "Polirritmo 7/8 con Análisis",
        description: "Ritmo irregular con armonía compleja y análisis teórico",
        duration: 75,
        difficulty: "Demencial",
        techniques: ["Polyrhythm", "Complex Harmony", "Mental Analysis"],
        mentalChallenges: ["Conteo irregular", "Análisis armónico", "Coordinación asimétrica"],
        sequenceIds: [9],
        instructions: [
          "Cuenta en 7/8: 1-2-3-4-5-6-7",
          "Analiza la función armónica de cada acorde",
          "Identifica las alteraciones en tiempo real",
          "Mantén el polirritmo mientras analizas"
        ],
        warnings: ["Extremadamente desafiante mentalmente", "Puede causar confusión rítmica"]
      }
    ],
    6: [
      {
        id: "6-1",
        name: "Técnica Imposible Combinada",
        description: "Tapping + Hybrid Picking + Bends simultáneos",
        duration: 90,
        difficulty: "Imposible",
        techniques: ["Tapping", "Hybrid Picking", "Bending", "Wide Stretches"],
        sequenceIds: [10],
        instructions: [
          "Tapping con mano derecha en trastes altos",
          "Hybrid picking en cuerdas medias",
          "Bends en cuerdas graves",
          "Todo simultáneamente"
        ],
        warnings: ["Riesgo de lesión", "Requiere calentamiento extremo", "Técnica sobrehumana"]
      },
      {
        id: "6-2",
        name: "Ejecución Ciega Extrema",
        description: "Toca saltos de 7+ trastes sin mirar el mástil",
        duration: 120,
        difficulty: "Imposible",
        techniques: ["Blind Playing", "Wide Position Jumps", "Muscle Memory"],
        sequenceIds: [11],
        instructions: [
          "Cierra los ojos completamente",
          "Saltos de 7+ trastes entre acordes",
          "Confía solo en la memoria muscular",
          "Mantén la precisión absoluta"
        ],
        warnings: ["Extremadamente difícil", "Requiere años de práctica", "Riesgo de notas falsas"]
      }
    ],
    7: [
      {
        id: "7-1",
        name: "Meditación Armónica",
        description: "Fusión total entre mente, cuerpo y música",
        duration: 150,
        difficulty: "Transcendental",
        techniques: ["Meditation", "Transcendental Technique", "Spiritual Connection"],
        sequenceIds: [12],
        instructions: [
          "Entra en estado meditativo profundo",
          "Toca desde el alma, no desde la mente",
          "Los silencios (∞) son tan importantes como las notas",
          "Conecta con la esencia universal de la música"
        ],
        warnings: ["Experiencia transformadora", "Puede cambiar tu percepción musical", "Solo para maestros"]
      }
    ],
    8: [
      {
        id: "8-1",
        name: "Análisis Funcional en Vivo",
        description: "Ejecuta mientras analizas y verbalizas cada función armónica",
        duration: 45,
        difficulty: "Demencial",
        techniques: ["Real-time Analysis", "Functional Harmony", "Verbal Processing"],
        mentalChallenges: [
          "Análisis funcional instantáneo",
          "Verbalización simultánea", 
          "Procesamiento multi-tarea",
          "Memoria teórica perfecta"
        ],
        sequenceIds: [13],
        instructions: [
          "Di en voz alta: 'Imaj7, VIalt, ii9, V13sus4...'",
          "Identifica cada sustitución tritonal",
          "Explica por qué cada acorde funciona",
          "Mantén tempo perfecto mientras hablas"
        ],
        warnings: ["Sobrecarga cognitiva extrema", "Requiere dominio teórico total"]
      },
      {
        id: "8-2",
        name: "Transposición Mental Doble",
        description: "Toca en Dm pero piensa como si fuera Gm - procesamiento dual",
        duration: 60,
        difficulty: "Demencial", 
        techniques: ["Mental Transposition", "Dual Processing", "Cognitive Flexibility"],
        mentalChallenges: [
          "Procesamiento de dos tonalidades",
          "Traducción mental constante",
          "Flexibilidad cognitiva extrema",
          "Resistencia a la confusión"
        ],
        sequenceIds: [14],
        instructions: [
          "Toca físicamente en Dm",
          "Piensa mentalmente como si fuera Gm",
          "Traduce cada acorde en tiempo real",
          "Mantén ambas realidades simultáneamente"
        ],
        warnings: ["Puede causar confusión mental", "Requiere concentración sobrehumana"]
      },
      {
        id: "8-3",
        name: "Memoria Fotográfica Total",
        description: "Memoriza 20 acordes, toca sin mirar, analiza cada función",
        duration: 90,
        difficulty: "Demencial",
        techniques: ["Photographic Memory", "Blind Execution", "Perfect Recall"],
        mentalChallenges: [
          "Memorización perfecta de 20 acordes",
          "Ejecución completamente ciega",
          "Análisis teórico simultáneo",
          "Resistencia mental extrema"
        ],
        sequenceIds: [15],
        instructions: [
          "Estudia la secuencia 5 minutos",
          "Cierra los ojos y toca de memoria",
          "Analiza cada acorde mientras lo ejecutas",
          "Sin errores permitidos"
        ],
        warnings: ["Requiere memoria excepcional", "Extremadamente frustrante", "Solo para genios musicales"]
      },
      {
        id: "8-4",
        name: "Profesor Virtual Extremo",
        description: "Enseña la secuencia a un estudiante imaginario mientras la ejecutas perfectamente",
        duration: 120,
        difficulty: "Demencial",
        techniques: ["Teaching", "Perfect Execution", "Multitasking"],
        mentalChallenges: [
          "Enseñanza simultánea",
          "Ejecución perfecta",
          "Explicación pedagógica",
          "Gestión de múltiples procesos mentales"
        ],
        sequenceIds: [13, 14],
        instructions: [
          "Explica cada acorde mientras lo tocas",
          "Enseña las digitaciones correctas",
          "Corrige errores imaginarios del estudiante",
          "Mantén paciencia pedagógica perfecta"
        ],
        warnings: ["Sobrecarga mental extrema", "Requiere maestría pedagógica", "Puede causar agotamiento"]
      }
    ],
    9: [
      {
        id: "9-1",
        name: "Exploración Mundial - Asia",
        description: "Viaja por las escalas asiáticas en una sola progresión",
        duration: 30,
        difficulty: "Avanzado",
        techniques: ["World Scales", "Cultural Adaptation", "Exotic Intervals"],
        sequenceIds: [16],
        instructions: [
          "Cada acorde viene de una escala asiática diferente",
          "Siente el cambio cultural en cada acorde",
          "Usa ornamentaciones típicas de cada región",
          "Conecta con la espiritualidad de cada escala"
        ]
      },
      {
        id: "9-2",
        name: "Sopa Árabe-Persa",
        description: "Desierto musical con escalas del Medio Oriente",
        duration: 35,
        difficulty: "Experto",
        techniques: ["Middle Eastern Scales", "Augmented 2nds", "Desert Vibes"],
        sequenceIds: [17],
        instructions: [
          "Enfatiza las segundas aumentadas",
          "Crea atmósfera de desierto místico",
          "Usa microtonos si es posible",
          "Siente el drama del Medio Oriente"
        ]
      },
      {
        id: "9-3",
        name: "Tradiciones Europeas",
        description: "Escalas ancestrales de Europa del Este",
        duration: 40,
        difficulty: "Experto",
        techniques: ["European Folk", "Gypsy Scales", "Classical Heritage"],
        sequenceIds: [18],
        instructions: [
          "Cada acorde representa una tradición europea",
          "Siente la historia en cada nota",
          "Usa técnicas de violín gitano",
          "Conecta con la memoria ancestral"
        ]
      },
      {
        id: "9-4",
        name: "Sopa Mundial Completa",
        description: "Viaje musical por todo el planeta",
        duration: 50,
        difficulty: "Maestro",
        techniques: ["Global Fusion", "Cultural Synthesis", "World Unity"],
        sequenceIds: [19],
        instructions: [
          "Cada acorde es de un continente diferente",
          "Fusiona todas las tradiciones musicales",
          "Crea un lenguaje musical universal",
          "Siente la unidad en la diversidad"
        ]
      }
    ],
    10: [
      {
        id: "10-1",
        name: "Viaje Temporal Musical",
        description: "Desde el Gregoriano hasta el futuro",
        duration: 45,
        difficulty: "Maestro",
        techniques: ["Historical Progression", "Era Blending", "Time Travel"],
        sequenceIds: [20],
        instructions: [
          "Cada acorde representa una época musical",
          "Siente la evolución de la armonía",
          "Adapta tu técnica a cada era",
          "Conecta pasado, presente y futuro"
        ]
      },
      {
        id: "10-2",
        name: "Maestros del Pasado",
        description: "Homenaje a los grandes compositores",
        duration: 50,
        difficulty: "Maestro",
        techniques: ["Classical Masters", "Compositional Styles", "Historical Homage"],
        sequenceIds: [21],
        instructions: [
          "Cada acorde honra a un maestro diferente",
          "Imita el estilo de cada compositor",
          "Siente su genio creativo",
          "Canaliza su espíritu musical"
        ]
      },
      {
        id: "10-3",
        name: "Sonidos del Mañana",
        description: "Escalas que aún no se han inventado",
        duration: 60,
        difficulty: "Legendario",
        techniques: ["Futuristic Harmony", "Experimental Scales", "Time Prophecy"],
        sequenceIds: [22],
        instructions: [
          "Imagina la música del futuro",
          "Crea sonidos nunca escuchados",
          "Trasciende las limitaciones actuales",
          "Profetiza la música del mañana"
        ]
      }
    ],
    11: [
      {
        id: "11-1",
        name: "Lágrimas Musicales",
        description: "Escalas que tocan el alma melancólica",
        duration: 40,
        difficulty: "Maestro",
        techniques: ["Emotional Expression", "Melancholic Beauty", "Soul Touch"],
        sequenceIds: [23],
        instructions: [
          "Cada acorde expresa una emoción diferente",
          "Deja que las lágrimas fluyan musicalmente",
          "Conecta con tu melancolía más profunda",
          "Transforma el dolor en belleza"
        ]
      },
      {
        id: "11-2",
        name: "Fuego Interior",
        description: "Pasión ardiente en cada acorde",
        duration: 45,
        difficulty: "Maestro",
        techniques: ["Passionate Expression", "Inner Fire", "Emotional Intensity"],
        sequenceIds: [24],
        instructions: [
          "Enciende tu pasión interior",
          "Cada acorde debe arder",
          "Expresa tu fuego más intenso",
          "Quema con tu música"
        ]
      },
      {
        id: "11-3",
        name: "Transcendencia Pura",
        description: "Escalas que elevan el espíritu",
        duration: 60,
        difficulty: "Legendario",
        techniques: ["Spiritual Transcendence", "Pure Elevation", "Soul Ascension"],
        sequenceIds: [25],
        instructions: [
          "Eleva tu espíritu con cada acorde",
          "Trasciende lo físico",
          "Conecta con lo divino",
          "Asciende musicalmente"
        ]
      },
      {
        id: "11-4",
        name: "Ingravidez Musical",
        description: "Flotación en el espacio armónico",
        duration: 75,
        difficulty: "Legendario",
        techniques: ["Musical Weightlessness", "Harmonic Floating", "Space Travel"],
        sequenceIds: [26],
        instructions: [
          "Flota en el espacio armónico",
          "Pierde la gravedad musical",
          "Navega entre las estrellas",
          "Experimenta la ingravidez total"
        ]
      }
    ],
    12: [
      {
        id: "12-1",
        name: "Tormenta Armónica",
        description: "Caos controlado con 8 escalas alteradas",
        duration: 60,
        difficulty: "Legendario",
        techniques: ["Controlled Chaos", "Altered Storm", "Harmonic Hurricane"],
        sequenceIds: [27],
        instructions: [
          "Navega en la tormenta armónica",
          "Controla el caos musical",
          "Cada acorde es un rayo diferente",
          "Sobrevive al huracán armónico"
        ]
      },
      {
        id: "12-2",
        name: "Drama Teatral Máximo",
        description: "Cada acorde es un acto dramático",
        duration: 90,
        difficulty: "Legendario",
        techniques: ["Maximum Drama", "Theatrical Expression", "Epic Storytelling"],
        sequenceIds: [28],
        instructions: [
          "Cada acorde cuenta una historia",
          "Maximiza el drama en cada cambio",
          "Sé actor y músico a la vez",
          "Crea teatro musical puro"
        ]
      },
      {
        id: "12-3",
        name: "Universo Infinito",
        description: "Expansión cósmica con silencios transcendentales",
        duration: 120,
        difficulty: "Legendario",
        techniques: ["Cosmic Expansion", "Infinite Universe", "Transcendental Silence"],
        sequenceIds: [29],
        instructions: [
          "Expande tu conciencia cósmica",
          "Los silencios son tan importantes como las notas",
          "Siente la infinitud del universo",
          "Conecta con la creación misma"
        ]
      },
      {
        id: "12-4",
        name: "ADN Musical Genético",
        description: "16 acordes cromáticos - el código genético de la música",
        duration: 150,
        difficulty: "Legendario",
        techniques: ["Musical DNA", "Genetic Code", "Chromatic Evolution"],
        sequenceIds: [30],
        instructions: [
          "Cada acorde es un gen musical",
          "Decodifica el ADN de la armonía",
          "16 acordes = código genético completo",
          "Evoluciona musicalmente"
        ]
      }
    ]
  };

  // Mapeo de secuencias por fase
  const phaseSequences: Record<number, number[]> = {
    1: [0, 1],
    2: [2, 3], 
    3: [4, 5],
    4: [6, 7],
    5: [8, 9],
    6: [10, 11],
    7: [12],
    8: [13, 14, 15],
    9: [16, 17, 18, 19],
    10: [20, 21, 22],
    11: [23, 24, 25, 26],
    12: [27, 28, 29, 30]
  };

  // Timer para ejercicios
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setExerciseTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Funciones auxiliares
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Intermedio': 'text-blue-600 bg-blue-100',
      'Avanzado': 'text-green-600 bg-green-100', 
      'Experto': 'text-orange-600 bg-orange-100',
      'Virtuoso': 'text-purple-600 bg-purple-100',
      'Demencial': 'text-red-600 bg-red-100',
      'Imposible': 'text-purple-800 bg-purple-200',
      'Transcendental': 'text-yellow-800 bg-gradient-to-r from-yellow-100 to-orange-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  const getPhaseProgress = (phase: number): number => {
    const exercises = exercisesByPhase[phase] || [];
    const completed = exercises.filter(ex => completedExercises.has(ex.id)).length;
    return exercises.length > 0 ? Math.round((completed / exercises.length) * 100) : 0;
  };

  const isPhaseUnlocked = (phase: number): boolean => {
    return true; // Todas las fases desbloqueadas
  };

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise.id);
    setExerciseTimer(0);
    setIsTimerRunning(true);
    
    // Configurar secuencia y tempo automáticamente
    if (exercise.sequenceIds.length > 0) {
      setCurrentSequence(exercise.sequenceIds[0]);
      const sequence = chordSequences[exercise.sequenceIds[0]];
      const avgTempo = Math.round((sequence.tempoRange[0] + sequence.tempoRange[1]) / 2);
      setTempo(avgTempo);
    }
  };

  const completeExercise = (exerciseId: string) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
    setActiveExercise(null);
    setIsTimerRunning(false);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Función para seleccionar acordes
  useEffect(() => {
    (window as any).selectChord = (chordData: any) => {
      setSelectedChord(chordData);
    };
  }, []);

  const currentExercises = exercisesByPhase[currentPhase] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="text-indigo-600" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Explorador de Acordes y Escalas
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Domina la armonía avanzada con ejercicios progresivos, desde construcción básica hasta técnicas transcendentales
          </p>
        </div>

        {/* Navegación de Fases */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap bg-white rounded-xl shadow-lg p-2 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(phase => {
              const unlocked = isPhaseUnlocked(phase);
              const getPhaseColor = (phase: number) => {
                if (phase <= 4) return currentPhase === phase ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100';
                if (phase === 5) return currentPhase === phase ? 'bg-red-600 text-white' : 'text-red-600 hover:bg-red-50';
                if (phase === 6) return currentPhase === phase ? 'bg-purple-600 text-white' : 'text-purple-600 hover:bg-purple-50';
                if (phase === 7) return currentPhase === phase ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'text-orange-600 hover:bg-orange-50';
                if (phase === 8) return currentPhase === phase ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'text-pink-600 hover:bg-pink-50';
                if (phase === 9) return currentPhase === phase ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' : 'text-green-600 hover:bg-green-50';
                if (phase === 10) return currentPhase === phase ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'text-indigo-600 hover:bg-indigo-50';
                if (phase === 11) return currentPhase === phase ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' : 'text-rose-600 hover:bg-rose-50';
                if (phase === 12) return currentPhase === phase ? 'bg-gradient-to-r from-gray-800 to-black text-white' : 'text-gray-800 hover:bg-gray-100';
                return 'text-gray-600';
              };
              
              const getPhaseEmoji = (phase: number) => {
                const emojis = { 1: '📗', 2: '📘', 3: '📕', 4: '📜', 5: '🔥', 6: '💀', 7: '🏆', 8: '🧠', 9: '🌍', 10: '⏳', 11: '💫', 12: '🌌' };
                return emojis[phase] || '';
              };
              
              return (
                <button
                  key={phase}
                  onClick={() => setCurrentPhase(phase)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all flex flex-col items-center gap-1 min-w-[80px] ${
                    getPhaseColor(phase) + (currentPhase === phase ? ' shadow-md' : '')
                  } ${phase > 4 && unlocked ? 'animate-pulse' : ''}`}
                  title={phase > 4 ? 'Fase Extrema - Solo para valientes' : ''}
                >
                  <div className="flex items-center gap-1">
                    <Unlock size={14} />
                    <span className="text-lg">{getPhaseEmoji(phase)}</span>
                  </div>
                  <div className="text-sm">Fase {phase}</div>
                  <div className="text-xs opacity-75">
                    {getPhaseProgress(phase)}%
                  </div>
                  {phase > 4 && unlocked && (
                    <div className="text-xs font-bold">
                      {phase === 5 && 'MENTAL'}
                      {phase === 6 && 'IMPOSIBLE'}
                      {phase === 7 && 'TRANSCENDENTAL'}
                      {phase === 8 && 'CEREBRAL'}
                      {phase === 9 && 'MUNDIAL'}
                      {phase === 10 && 'TEMPORAL'}
                      {phase === 11 && 'EMOCIONAL'}
                      {phase === 12 && 'EXTREMA'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advertencia para Fases Extremas */}
        {currentPhase > 4 && (
          <div className="mb-8 bg-gradient-to-r from-red-500 to-purple-600 text-white p-6 rounded-xl shadow-lg border-2 border-red-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-xl font-bold">
                  {currentPhase === 5 && '🧠 ZONA DE RETOS MENTALES EXTREMOS'}
                  {currentPhase === 6 && '💀 ZONA DE TÉCNICA IMPOSIBLE'}
                  {currentPhase === 7 && '🏆 ZONA DE TRANSCENDENCIA MUSICAL'}
                  {currentPhase === 8 && '🧠 ZONA DE RETOS CEREBRALES PUROS'}
                  {currentPhase === 9 && '🌍 DIVERSIDAD CULTURAL EXTREMA - Requiere apertura mental total - Mezcla tradiciones milenarias'}
                  {currentPhase === 10 && '⏳ VIAJE TEMPORAL MUSICAL - Puede causar desorientación histórica - Saltos entre épocas extremos'}
                  {currentPhase === 11 && '💫 INTENSIDAD EMOCIONAL MÁXIMA - Puede provocar catarsis musical - Preparación psicológica necesaria'}
                  {currentPhase === 12 && '🌌 CAOS ARMÓNICO TOTAL - Puede fracturar la realidad musical - Solo para exploradores del infinito'}
                </h3>
                <p className="text-sm opacity-90">
                  {currentPhase === 5 && 'Estos ejercicios desafían tu comprensión armónica y capacidad de procesamiento mental.'}
                  {currentPhase === 6 && 'Combinaciones de técnicas que parecen físicamente imposibles. Procede bajo tu propio riesgo.'}
                  {currentPhase === 7 && 'El nivel final. Maestría absoluta que trasciende la técnica pura.'}
                  {currentPhase === 8 && 'Retos puramente cerebrales que requieren capacidad mental sobrehumana.'}
                  {currentPhase === 9 && 'Exploración de tradiciones musicales de todo el mundo con escalas exóticas y técnicas ancestrales.'}
                  {currentPhase === 10 && 'Viaje a través de la historia musical desde el canto gregoriano hasta sonidos futuristas.'}
                  {currentPhase === 11 && 'Expresión emocional extrema que puede provocar catarsis y transformación personal profunda.'}
                  {currentPhase === 12 && 'Caos controlado que desafía las leyes de la armonía tradicional y la percepción musical.'}
                </p>
              </div>
            </div>
            <div className="text-xs opacity-75">
              {currentPhase === 5 && '⚡ Requiere: Memoria fotográfica, procesamiento mental extremo, resistencia psicológica'}
              {currentPhase === 6 && '🔥 Requiere: Coordinación sobrehumana, técnicas simultáneas, preparación física extrema'}
              {currentPhase === 7 && '✨ Requiere: Fusión total mente-cuerpo-música, creatividad transcendental, estado meditativo'}
              {currentPhase === 8 && '🧠 Requiere: Capacidad mental sobrehumana, procesamiento multi-tarea extremo, resistencia cognitiva'}
              {currentPhase === 9 && '🌍 Requiere: Apertura cultural total, conocimiento de tradiciones mundiales, adaptabilidad extrema'}
              {currentPhase === 10 && '⏳ Requiere: Conocimiento histórico musical, adaptación temporal, flexibilidad estilística'}
              {currentPhase === 11 && '💫 Requiere: Inteligencia emocional extrema, vulnerabilidad controlada, expresión auténtica'}
              {currentPhase === 12 && '🌌 Requiere: Mente abierta al caos, resistencia al vértigo armónico, valor para lo desconocido'}
            </div>
          </div>
        )}

        {/* Contenido Principal */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panel Principal de Ejercicios */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Fase {currentPhase}: {
                    currentPhase === 1 ? 'Fundamentos Sólidos' :
                    currentPhase === 2 ? 'Exploración Sonora' :
                    currentPhase === 3 ? 'Desarrollo Avanzado' :
                    currentPhase === 4 ? 'Maestría Técnica' :
                    currentPhase === 5 ? 'Retos Mentales' :
                    currentPhase === 6 ? 'Técnica Extrema' :
                    currentPhase === 7 ? 'Maestría Total' :
                    currentPhase === 8 ? 'Retos Cerebrales' :
                    currentPhase === 9 ? 'Sopa Mundial' :
                    currentPhase === 10 ? 'Sopa Temporal' :
                    currentPhase === 11 ? 'Sopa Emocional' :
                    'Sopa Extrema'
                  }
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentPhase <= 4 ? 'text-blue-600 bg-blue-100' :
                  currentPhase === 5 ? 'text-red-600 bg-red-100' :
                  currentPhase === 6 ? 'text-purple-600 bg-purple-100' :
                  currentPhase === 7 ? 'text-yellow-700 bg-yellow-100' :
                  currentPhase === 8 ? 'text-pink-600 bg-pink-100' :
                  currentPhase === 9 ? 'text-green-600 bg-green-100' :
                  currentPhase === 10 ? 'text-indigo-600 bg-indigo-100' :
                  currentPhase === 11 ? 'text-rose-600 bg-rose-100' :
                  'text-gray-800 bg-gray-200'
                }`}>
                  {getPhaseProgress(currentPhase)}% Completado
                </div>
              </div>

              {/* Lista de Ejercicios */}
              <div className="space-y-4">
                {currentExercises.map((exercise) => (
                  <div key={exercise.id} className={`border rounded-lg p-4 transition-all ${
                    activeExercise === exercise.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  } ${completedExercises.has(exercise.id) ? 'bg-green-50 border-green-300' : ''}`}>
                    
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{exercise.name}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                            {exercise.difficulty}
                          </div>
                          {completedExercises.has(exercise.id) && (
                            <div className="text-green-600 text-sm">✅ Completado</div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                        
                        {/* Técnicas */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {exercise.techniques.map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Retos Mentales */}
                        {exercise.mentalChallenges && (
                          <div className="mb-2">
                            <div className="text-xs font-medium text-purple-700 mb-1">🧠 Retos Mentales:</div>
                            <div className="flex flex-wrap gap-1">
                              {exercise.mentalChallenges.map((challenge, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                  {challenge}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Advertencias */}
                        {exercise.warnings && (
                          <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 mb-2">
                            <div className="font-medium mb-1">⚠️ Advertencias:</div>
                            <ul className="list-disc list-inside space-y-1">
                              {exercise.warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="text-right text-sm text-gray-500">
                          <Clock size={14} className="inline mr-1" />
                          {exercise.duration} min
                        </div>
                        
                        {activeExercise === exercise.id ? (
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600 mb-2">
                              {formatTime(exerciseTimer)}
                            </div>
                            <button
                              onClick={() => completeExercise(exercise.id)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                            >
                              Completar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startExercise(exercise)}
                            disabled={completedExercises.has(exercise.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              completedExercises.has(exercise.id)
                                ? 'bg-green-100 text-green-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {completedExercises.has(exercise.id) ? 'Completado' : 'Iniciar'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Instrucciones del ejercicio */}
                    {activeExercise === exercise.id && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">📋 Instrucciones:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                          {exercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Secuencias de Acordes - Movido al área principal */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🎼 Secuencias de Práctica</h3>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <select
                    value={currentSequence}
                    onChange={(e) => setCurrentSequence(parseInt(e.target.value))}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-sm"
                  >
                    {chordSequences.map((seq, index) => (
                      <option key={index} value={index}>
                        {seq.name} (Fase {seq.phase})
                      </option>
                    ))}
                  </select>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chordSequences[currentSequence].difficulty)}`}>
                    {chordSequences[currentSequence].difficulty}
                  </div>
                </div>

                {/* Información de la secuencia */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">
                      Fase {chordSequences[currentSequence].phase} - {chordSequences[currentSequence].difficulty}
                    </span>
                    <span className="text-blue-600">
                      Tempo: {chordSequences[currentSequence].tempoRange[0]}-{chordSequences[currentSequence].tempoRange[1]} BPM
                    </span>
                  </div>
                  <div className="text-blue-700">
                    {chordSequences[currentSequence].phase === 1 && "Construcción gradual con tensiones básicas"}
                    {chordSequences[currentSequence].phase === 2 && "Exploración sonora y colores armónicos"}
                    {chordSequences[currentSequence].phase === 3 && "Desarrollo de fluidez y velocidad"}
                    {chordSequences[currentSequence].phase === 4 && "Aplicación musical avanzada"}
                    {chordSequences[currentSequence].phase === 5 && "Retos mentales con modulación constante"}
                    {chordSequences[currentSequence].phase === 6 && "Técnicas imposibles combinadas"}
                    {chordSequences[currentSequence].phase === 7 && "Transcendencia musical total"}
                    {chordSequences[currentSequence].phase === 8 && "Retos cerebrales puros"}
                  </div>
                </div>
                
                {/* Alertas de dificultad */}
                {chordSequences[currentSequence].difficulty === 'Virtuoso' && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700 mt-2">
                    🎸 <strong>Nivel Virtuoso:</strong> Requiere técnicas avanzadas como tapping, wide stretches y hybrid picking. ¡Calienta bien antes de intentar!
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Demencial' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mt-2">
                    🧠 <strong>Nivel Demencial:</strong> Retos mentales extremos que requieren procesamiento cognitivo sobrehumano. ¡Prepara tu mente!
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Imposible' && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700 mt-2">
                    💀 <strong>Nivel Imposible:</strong> Técnicas que desafían las leyes de la física. Solo para superhéroes de la guitarra.
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Transcendental' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 mt-2">
                    🏆 <strong>Nivel Transcendental:</strong> Más allá de la técnica. Fusión total entre músico y música.
                  </div>
                )}
              </div>
              
              {/* Grid de Acordes - Mejorado para acordes largos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 max-h-80 overflow-y-auto">
                {chordSequences[currentSequence].chords.map((chord, index) => (
                  <div key={index} className="relative group">
                    <ChordCard
                      chord={chord}
                      scale={chordSequences[currentSequence].scales[index]}
                      position={chordSequences[currentSequence].positions[index]}
                      index={index}
                      isActive={false}
                      difficulty={chordSequences[currentSequence].difficulty}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const phaseSeqs = phaseSequences[currentPhase] || [0];
                    const currentIndex = phaseSeqs.indexOf(currentSequence);
                    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % phaseSeqs.length : 0;
                    setCurrentSequence(phaseSeqs[nextIndex]);
                  }}
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Siguiente de Fase {currentPhase}
                </button>
                
                <button
                  onClick={() => {
                    const expertSequences = chordSequences
                      .map((seq, index) => ({ seq, index }))
                      .filter(({ seq }) => seq.difficulty === 'Experto' || seq.difficulty === 'Virtuoso');
                    const randomExpert = expertSequences[Math.floor(Math.random() * expertSequences.length)];
                    setCurrentSequence(randomExpert.index);
                  }}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  🔥 Desafío Aleatorio
                </button>
              </div>
            </div>
            
            {/* Progreso General */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Progreso General</h3>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(phase => {
                  const progress = getPhaseProgress(phase);
                  const unlocked = true; // Todas desbloqueadas
                  
                  return (
                    <div key={phase} className="p-3 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          <Unlock size={16} className="inline mr-2" />
                          Fase {phase}: {
                            phase === 1 ? 'Fundamentos' :
                            phase === 2 ? 'Exploración' :
                            phase === 3 ? 'Desarrollo' :
                            phase === 4 ? 'Maestría' :
                            phase === 5 ? 'Retos Mentales' :
                            phase === 6 ? 'Técnica Extrema' :
                            phase === 7 ? 'Transcendencia' :
                            phase === 8 ? 'Retos Cerebrales' :
                            phase === 9 ? 'Sopa Mundial' :
                            phase === 10 ? 'Sopa Temporal' :
                            phase === 11 ? 'Sopa Emocional' :
                            'Sopa Extrema'
                          }
                        </span>
                        <span className="text-sm font-bold">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            phase <= 4 ? 'bg-blue-500' :
                            phase === 5 ? 'bg-red-500' :
                            phase === 6 ? 'bg-purple-500' :
                            phase === 7 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            phase === 8 ? 'bg-gradient-to-r from-pink-500 to-red-500' :
                            phase === 9 ? 'bg-gradient-to-r from-green-500 to-teal-600' :
                            phase === 10 ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
                            phase === 11 ? 'bg-gradient-to-r from-pink-400 to-rose-600' :
                            'bg-gradient-to-r from-gray-800 to-black'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="lg:col-span-2 space-y-6">
            {/* Panel de Anatomía de Acordes */}
            <ChordAnatomyPanel selectedChord={selectedChord} />
            
            {/* Panel de Metodología */}
            {/* Panel de Metodología */}
            <MethodologyPanel currentPhase={currentPhase} />
            
            {/* Panel de Teoría Musical */}
            <ScaleTheoryPanel />
            
            {/* Metrónomo */}
            <Metronome 
              tempo={tempo}
              setTempo={setTempo}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
        
        {/* Script para manejar la selección de acordes */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.selectChord = function(chordData) {
              // Esta función será reemplazada por React
            };
          `
        }} />
      </div>
    </div>
  );
};

export default ChordExplorer;