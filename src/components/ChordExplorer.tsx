import React, { useState } from 'react';

const ChordExplorer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);

  // 12 FASES CON MUCHAS SECUENCIAS CADA UNA
  const phases = [
    {
      id: 1,
      name: "Fundamentos",
      emoji: "📗",
      color: "from-green-400 to-blue-500",
      exercises: [
        {
          name: "Básico Mayor-Menor",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Am7", scale: "Menor" },
            { name: "Fmaj7", scale: "Mayor" },
            { name: "G7", scale: "Mixolidio" }
          ]
        },
        {
          name: "Círculo Básico",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7", scale: "Lidio" }
          ]
        },
        {
          name: "Progresión Clásica",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "G7", scale: "Mixolidio" }
          ]
        },
        {
          name: "Colores Básicos",
          chords: [
            { name: "Fmaj7", scale: "Lidio" },
            { name: "Em7", scale: "Frigio" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Dórico" }
          ]
        },
        {
          name: "Fundamentos Jazz",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "C7", scale: "Mixolidio" },
            { name: "Fmaj7", scale: "Mayor" },
            { name: "Fm7", scale: "Menor" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Exploración Modal",
      emoji: "📘",
      color: "from-blue-400 to-purple-500",
      exercises: [
        {
          name: "Modos Griegos Completos",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7#11", scale: "Lidio" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Am7", scale: "Menor" },
            { name: "Bm7b5", scale: "Locrio" }
          ]
        },
        {
          name: "Colores Modales",
          chords: [
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7b9", scale: "Frigio" },
            { name: "Fmaj7#11", scale: "Lidio" },
            { name: "G13", scale: "Mixolidio" }
          ]
        },
        {
          name: "Contraste Modal",
          chords: [
            { name: "Am7", scale: "Menor" },
            { name: "A7", scale: "Mixolidio" },
            { name: "Amaj7#11", scale: "Lidio" },
            { name: "Am7b5", scale: "Locrio" }
          ]
        },
        {
          name: "Viaje Modal",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Cmaj7#11", scale: "Lidio" },
            { name: "C7", scale: "Mixolidio" },
            { name: "Cm7", scale: "Dórico" }
          ]
        },
        {
          name: "Tensiones Modales",
          chords: [
            { name: "Dm9", scale: "Dórico" },
            { name: "Em7b9", scale: "Frigio" },
            { name: "Fmaj9#11", scale: "Lidio" },
            { name: "G13", scale: "Mixolidio" }
          ]
        },
        {
          name: "Cadencias Modales",
          chords: [
            { name: "Bm7b5", scale: "Locrio" },
            { name: "Em7", scale: "Frigio" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Dórico" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Desarrollo Avanzado",
      emoji: "📕",
      color: "from-red-400 to-pink-500",
      exercises: [
        {
          name: "Jazz Avanzado",
          chords: [
            { name: "Cmaj9", scale: "Mayor" },
            { name: "Dm9", scale: "Dórico" },
            { name: "G7alt", scale: "Alterada" },
            { name: "Cmaj7#11", scale: "Lidio" }
          ]
        },
        {
          name: "Sustituciones Tritonales",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Db7", scale: "Alterada" },
            { name: "Cmaj9#11", scale: "Lidio" },
            { name: "Am11", scale: "Menor Melódica" }
          ]
        },
        {
          name: "Rearmónización",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "E7alt", scale: "Alterada" },
            { name: "Am(maj7)", scale: "Menor Armónica" },
            { name: "D7alt", scale: "Alterada" }
          ]
        },
        {
          name: "Cromáticos Avanzados",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "C#dim7", scale: "Disminuida" },
            { name: "Dm7", scale: "Dórico" },
            { name: "D#dim7", scale: "Disminuida" }
          ]
        },
        {
          name: "Tensiones Extremas",
          chords: [
            { name: "Cmaj13#11", scale: "Lidio" },
            { name: "F#7alt", scale: "Alterada" },
            { name: "Bmaj7#5", scale: "Lidio Aumentado" },
            { name: "E7#9#11", scale: "Alterada" }
          ]
        },
        {
          name: "Modulaciones Cromáticas",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dbmaj7", scale: "Mayor" },
            { name: "Dmaj7", scale: "Mayor" },
            { name: "Ebmaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Bebop Avanzado",
          chords: [
            { name: "C7", scale: "Bebop" },
            { name: "F7", scale: "Bebop" },
            { name: "Bb7", scale: "Bebop" },
            { name: "Eb7", scale: "Bebop" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Maestría Técnica",
      emoji: "📜",
      color: "from-yellow-400 to-orange-500",
      exercises: [
        {
          name: "Virtuosismo Armónico",
          chords: [
            { name: "Cmaj13#11", scale: "Lidio" },
            { name: "G7alt", scale: "Alterada" },
            { name: "Am(maj9)", scale: "Menor Melódica" },
            { name: "F#m7b5", scale: "Locrio" }
          ]
        },
        {
          name: "Técnicas Extremas",
          chords: [
            { name: "C7#9#11", scale: "Alterada" },
            { name: "Bbmaj7#5", scale: "Lidio Aumentado" },
            { name: "Am(maj7)", scale: "Menor Armónica" },
            { name: "G7b13", scale: "Alterada" }
          ]
        },
        {
          name: "Politonalidad",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "F#maj7", scale: "Mayor" },
            { name: "Bbmaj7", scale: "Mayor" },
            { name: "Emaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Simetrías Complejas",
          chords: [
            { name: "C7", scale: "Disminuida" },
            { name: "Eb7", scale: "Disminuida" },
            { name: "F#7", scale: "Disminuida" },
            { name: "A7", scale: "Disminuida" }
          ]
        },
        {
          name: "Escalas Sintéticas",
          chords: [
            { name: "Cmaj7", scale: "Tonos Enteros" },
            { name: "D7", scale: "Tonos Enteros" },
            { name: "E7", scale: "Tonos Enteros" },
            { name: "F#7", scale: "Tonos Enteros" }
          ]
        },
        {
          name: "Microtonalidad",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "C+25maj7", scale: "Microtonal" },
            { name: "C+50maj7", scale: "Microtonal" },
            { name: "C+75maj7", scale: "Microtonal" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Retos Mentales",
      emoji: "🔥",
      color: "from-orange-500 to-red-600",
      exercises: [
        {
          name: "Procesamiento Mental Extremo",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "F#7alt", scale: "Alterada" },
            { name: "Bmaj7#11", scale: "Lidio" },
            { name: "Eb7#9", scale: "Bebop" }
          ]
        },
        {
          name: "Análisis Simultáneo",
          chords: [
            { name: "Am(maj9)", scale: "Menor Melódica" },
            { name: "D7alt", scale: "Alterada" },
            { name: "Gmaj13#11", scale: "Lidio" },
            { name: "C#dim7", scale: "Disminuida" }
          ]
        },
        {
          name: "Transposición Mental",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dbmaj7", scale: "Mayor" },
            { name: "Dmaj7", scale: "Mayor" },
            { name: "Ebmaj7", scale: "Mayor" },
            { name: "Emaj7", scale: "Mayor" },
            { name: "Fmaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Memoria Fotográfica",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "F#m(maj7)", scale: "Menor Armónica" },
            { name: "Bbmaj7#5", scale: "Lidio Aumentado" },
            { name: "E7#9b13", scale: "Alterada" },
            { name: "Am11", scale: "Menor Melódica" },
            { name: "D7b5", scale: "Alterada" }
          ]
        },
        {
          name: "Procesamiento Dual",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Gm7", scale: "Menor" },
            { name: "Fmaj7#11", scale: "Lidio" },
            { name: "B7alt", scale: "Alterada" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Técnica Extrema",
      emoji: "💀",
      color: "from-gray-600 to-black",
      exercises: [
        {
          name: "Coordinación Sobrehumana",
          chords: [
            { name: "C13#11b9", scale: "Alterada" },
            { name: "F#maj7#5#11", scale: "Lidio Aumentado" },
            { name: "Bbm(maj13)", scale: "Menor Melódica" },
            { name: "E7alt", scale: "Alterada" }
          ]
        },
        {
          name: "Límites Físicos",
          chords: [
            { name: "Amaj9#11", scale: "Lidio" },
            { name: "Eb7#9b13", scale: "Alterada" },
            { name: "C#m(maj7)", scale: "Menor Armónica" },
            { name: "G7b5#9", scale: "Alterada" }
          ]
        },
        {
          name: "Imposibilidad Técnica",
          chords: [
            { name: "Cmaj13#11", scale: "Lidio" },
            { name: "F#7alt", scale: "Alterada" },
            { name: "Bmaj7#5", scale: "Lidio Aumentado" },
            { name: "E7#9#11b13", scale: "Alterada" },
            { name: "Am(maj9)", scale: "Menor Melódica" },
            { name: "D7alt", scale: "Alterada" }
          ]
        },
        {
          name: "Resistencia Extrema",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "Db7alt", scale: "Alterada" },
            { name: "D7alt", scale: "Alterada" },
            { name: "Eb7alt", scale: "Alterada" },
            { name: "E7alt", scale: "Alterada" },
            { name: "F7alt", scale: "Alterada" },
            { name: "F#7alt", scale: "Alterada" },
            { name: "G7alt", scale: "Alterada" }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "Transcendencia",
      emoji: "🏆",
      color: "from-yellow-400 to-yellow-600",
      exercises: [
        {
          name: "Fusión Espiritual",
          chords: [
            { name: "∞", scale: "Transcendental" },
            { name: "Cmaj∞", scale: "Cósmica" },
            { name: "∞7", scale: "Infinita" },
            { name: "Om", scale: "Universal" }
          ]
        },
        {
          name: "Más Allá de la Técnica",
          chords: [
            { name: "Alma", scale: "Espiritual" },
            { name: "Luz", scale: "Divina" },
            { name: "Amor", scale: "Universal" },
            { name: "∞", scale: "Transcendental" }
          ]
        },
        {
          name: "Conexión Cósmica",
          chords: [
            { name: "Universo", scale: "Cósmica" },
            { name: "Galaxia", scale: "Estelar" },
            { name: "Nebulosa", scale: "Intergaláctica" },
            { name: "BigBang", scale: "Primordial" }
          ]
        },
        {
          name: "Iluminación Musical",
          chords: [
            { name: "Sabiduría", scale: "Ancestral" },
            { name: "Compasión", scale: "Búdica" },
            { name: "Vacuidad", scale: "Zen" },
            { name: "Nirvana", scale: "Absoluta" }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "Retos Cerebrales",
      emoji: "🧠",
      color: "from-purple-500 to-indigo-600",
      exercises: [
        {
          name: "Capacidad Mental Extrema",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "F#maj7#11", scale: "Lidio" },
            { name: "Bbm(maj9)", scale: "Menor Melódica" },
            { name: "E7#9b13", scale: "Alterada" }
          ]
        },
        {
          name: "Genialidad Musical",
          chords: [
            { name: "Amaj13#11", scale: "Lidio" },
            { name: "D7alt", scale: "Alterada" },
            { name: "Gm(maj7)", scale: "Menor Armónica" },
            { name: "C#7b5", scale: "Alterada" }
          ]
        },
        {
          name: "Procesamiento Cuántico",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "C#maj7", scale: "Mayor" },
            { name: "Dmaj7", scale: "Mayor" },
            { name: "D#maj7", scale: "Mayor" },
            { name: "Emaj7", scale: "Mayor" },
            { name: "Fmaj7", scale: "Mayor" },
            { name: "F#maj7", scale: "Mayor" },
            { name: "Gmaj7", scale: "Mayor" },
            { name: "G#maj7", scale: "Mayor" },
            { name: "Amaj7", scale: "Mayor" },
            { name: "A#maj7", scale: "Mayor" },
            { name: "Bmaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Superinteligencia",
          chords: [
            { name: "C∞", scale: "Cuántica" },
            { name: "AI7", scale: "Artificial" },
            { name: "Neural∞", scale: "Sintética" },
            { name: "Quantum7", scale: "Probabilística" }
          ]
        }
      ]
    },
    {
      id: 9,
      name: "Sopa Mundial",
      emoji: "🌍",
      color: "from-green-500 to-teal-600",
      exercises: [
        {
          name: "Escalas del Planeta",
          chords: [
            { name: "Cm7", scale: "Árabe" },
            { name: "Fmaj7", scale: "Japonesa" },
            { name: "G7", scale: "Flamenca" },
            { name: "Am7", scale: "Húngara" },
            { name: "Dm7", scale: "Celta" },
            { name: "Bb7", scale: "Africana" }
          ]
        },
        {
          name: "Fusión Global",
          chords: [
            { name: "Em7", scale: "India Raga" },
            { name: "A7", scale: "Persa" },
            { name: "Dm7", scale: "Klezmer" },
            { name: "G7", scale: "Balinesa" },
            { name: "Cm7", scale: "Bizantina" },
            { name: "F7", scale: "Gitana" }
          ]
        },
        {
          name: "Viaje Sonoro",
          chords: [
            { name: "Am7", scale: "Hirajoshi" },
            { name: "D7", scale: "Kumoi" },
            { name: "G7", scale: "Iwato" },
            { name: "C7", scale: "In Sen" },
            { name: "F7", scale: "Yo" },
            { name: "Bb7", scale: "Neapolitana" }
          ]
        },
        {
          name: "Continentes Musicales",
          chords: [
            { name: "Cm7", scale: "Africana" },
            { name: "F7", scale: "Árabe" },
            { name: "Bb7", scale: "India Raga" },
            { name: "Eb7", scale: "Japonesa" },
            { name: "Ab7", scale: "Celta" },
            { name: "Db7", scale: "Húngara" }
          ]
        },
        {
          name: "Tradiciones Ancestrales",
          chords: [
            { name: "Am7", scale: "Persa" },
            { name: "Dm7", scale: "Bizantina" },
            { name: "G7", scale: "Flamenca" },
            { name: "C7", scale: "Gitana" },
            { name: "F7", scale: "Klezmer" },
            { name: "Bb7", scale: "Balinesa" }
          ]
        },
        {
          name: "Pentatónicas del Mundo",
          chords: [
            { name: "Em7", scale: "Hirajoshi" },
            { name: "Am7", scale: "Kumoi" },
            { name: "Dm7", scale: "Iwato" },
            { name: "G7", scale: "In Sen" },
            { name: "C7", scale: "Yo" },
            { name: "F7", scale: "Africana" }
          ]
        }
      ]
    },
    {
      id: 10,
      name: "Sopa Temporal",
      emoji: "⏳",
      color: "from-indigo-500 to-purple-600",
      exercises: [
        {
          name: "Viaje en el Tiempo",
          chords: [
            { name: "Cmaj7", scale: "Enigmática" },
            { name: "F7", scale: "Prometheus" },
            { name: "Am7", scale: "Doble Armónica" },
            { name: "G7", scale: "Ultralocrio" },
            { name: "Dm7", scale: "Tonos Enteros" },
            { name: "Bb7", scale: "Disminuida" }
          ]
        },
        {
          name: "Épocas Musicales",
          chords: [
            { name: "Em7", scale: "Menor Armónica" },
            { name: "A7", scale: "Bebop" },
            { name: "Dm7", scale: "Alterada" },
            { name: "G7", scale: "Lidio" },
            { name: "Cm7", scale: "Frigio" },
            { name: "F7", scale: "Mixolidio" }
          ]
        },
        {
          name: "Cronos Musical",
          chords: [
            { name: "Fmaj7", scale: "Prometheus" },
            { name: "Bb7", scale: "Enigmática" },
            { name: "Em7", scale: "Ultralocrio" },
            { name: "A7", scale: "Doble Armónica" },
            { name: "Dm7", scale: "Tonos Enteros" },
            { name: "G7", scale: "Disminuida" }
          ]
        },
        {
          name: "Barroco Futurista",
          chords: [
            { name: "Cm7", scale: "Menor Armónica" },
            { name: "F7", scale: "Alterada" },
            { name: "Bb7", scale: "Disminuida" },
            { name: "Eb7", scale: "Tonos Enteros" },
            { name: "Ab7", scale: "Prometheus" },
            { name: "Db7", scale: "Enigmática" }
          ]
        },
        {
          name: "Renacimiento Cósmico",
          chords: [
            { name: "Am7", scale: "Neapolitana" },
            { name: "D7", scale: "Húngara" },
            { name: "G7", scale: "Doble Armónica" },
            { name: "C7", scale: "Ultralocrio" },
            { name: "F7", scale: "Prometheus" },
            { name: "Bb7", scale: "Enigmática" }
          ]
        }
      ]
    },
    {
      id: 11,
      name: "Sopa Emocional",
      emoji: "💫",
      color: "from-pink-400 to-rose-600",
      exercises: [
        {
          name: "Paisajes del Alma",
          chords: [
            { name: "Am7", scale: "Menor" },
            { name: "F7", scale: "Lidio" },
            { name: "C7", scale: "Frigio" },
            { name: "G7", scale: "Dórico" },
            { name: "Em7", scale: "Menor Armónica" },
            { name: "Dm7", scale: "Celta" }
          ]
        },
        {
          name: "Emociones Profundas",
          chords: [
            { name: "Cm7", scale: "Árabe" },
            { name: "Fm7", scale: "Húngara" },
            { name: "Bb7", scale: "Flamenca" },
            { name: "Eb7", scale: "Gitana" },
            { name: "Am7", scale: "Klezmer" },
            { name: "D7", scale: "Bizantina" }
          ]
        },
        {
          name: "Colores del Corazón",
          chords: [
            { name: "Em7", scale: "Japonesa" },
            { name: "A7", scale: "Hirajoshi" },
            { name: "Dm7", scale: "Kumoi" },
            { name: "G7", scale: "In Sen" },
            { name: "Cm7", scale: "Iwato" },
            { name: "F7", scale: "Yo" }
          ]
        },
        {
          name: "Nostalgia Universal",
          chords: [
            { name: "Fm7", scale: "Menor" },
            { name: "Bb7", scale: "Dórico" },
            { name: "Eb7", scale: "Celta" },
            { name: "Ab7", scale: "Klezmer" },
            { name: "Db7", scale: "Húngara" },
            { name: "Gb7", scale: "Árabe" }
          ]
        },
        {
          name: "Lágrimas de Alegría",
          chords: [
            { name: "Cmaj7", scale: "Lidio" },
            { name: "Am7", scale: "Menor Armónica" },
            { name: "F7", scale: "Flamenca" },
            { name: "G7", scale: "Frigio" },
            { name: "Em7", scale: "Japonesa" },
            { name: "Dm7", scale: "Celta" }
          ]
        },
        {
          name: "Pasión Infinita",
          chords: [
            { name: "Am7", scale: "Flamenca" },
            { name: "D7", scale: "Árabe" },
            { name: "G7", scale: "Húngara" },
            { name: "C7", scale: "Gitana" },
            { name: "F7", scale: "Persa" },
            { name: "Bb7", scale: "Bizantina" }
          ]
        }
      ]
    },
    {
      id: 12,
      name: "Sopa Extrema",
      emoji: "🌌",
      color: "from-purple-600 to-black",
      exercises: [
        {
          name: "Caos Armónico Total",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "F#7", scale: "Ultralocrio" },
            { name: "Bb7", scale: "Enigmática" },
            { name: "E7", scale: "Doble Armónica" },
            { name: "A7", scale: "Prometheus" },
            { name: "D7", scale: "Disminuida" },
            { name: "G7", scale: "Tonos Enteros" },
            { name: "C7", scale: "Húngara" }
          ]
        },
        {
          name: "Fusión Imposible",
          chords: [
            { name: "Am7", scale: "Persa" },
            { name: "Eb7", scale: "India Raga" },
            { name: "F#7", scale: "Balinesa" },
            { name: "B7", scale: "Africana" },
            { name: "Dm7", scale: "Neapolitana" },
            { name: "Ab7", scale: "Bizantina" },
            { name: "C#7", scale: "Gitana" },
            { name: "G7", scale: "Alterada" }
          ]
        },
        {
          name: "Universo Sonoro",
          chords: [
            { name: "Fmaj7", scale: "Enigmática" },
            { name: "Bb7", scale: "Ultralocrio" },
            { name: "Em7", scale: "Doble Armónica" },
            { name: "A7", scale: "Prometheus" },
            { name: "Dm7", scale: "Árabe" },
            { name: "G7", scale: "Húngara" },
            { name: "Cm7", scale: "Persa" },
            { name: "F7", scale: "Alterada" }
          ]
        },
        {
          name: "Apocalipsis Armónico",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "Db7alt", scale: "Alterada" },
            { name: "D7", scale: "Ultralocrio" },
            { name: "Eb7", scale: "Enigmática" },
            { name: "E7", scale: "Doble Armónica" },
            { name: "F7", scale: "Prometheus" },
            { name: "F#7", scale: "Disminuida" },
            { name: "G7", scale: "Tonos Enteros" },
            { name: "Ab7", scale: "Húngara" },
            { name: "A7", scale: "Persa" },
            { name: "Bb7", scale: "Árabe" },
            { name: "B7", scale: "Bizantina" }
          ]
        },
        {
          name: "Big Bang Musical",
          chords: [
            { name: "∞7", scale: "Infinita" },
            { name: "Quantum", scale: "Cuántica" },
            { name: "Chaos7", scale: "Fractal" },
            { name: "Void", scale: "Vacío" },
            { name: "Genesis", scale: "Primordial" },
            { name: "Omega", scale: "Final" }
          ]
        },
        {
          name: "Multiverso Armónico",
          chords: [
            { name: "Reality1", scale: "Dimensión A" },
            { name: "Reality2", scale: "Dimensión B" },
            { name: "Reality3", scale: "Dimensión C" },
            { name: "Reality4", scale: "Dimensión D" },
            { name: "Reality5", scale: "Dimensión E" },
            { name: "Reality∞", scale: "Todas las Dimensiones" }
          ]
        }
      ]
    }
  ];

  const currentPhaseData = phases.find(p => p.id === currentPhase) || phases[0];
  const currentExerciseData = currentPhaseData.exercises[currentExercise] || currentPhaseData.exercises[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎸 Explorador de Escalas y Acordes
          </h1>
          <p className="text-gray-300">12 Fases • Muchas Secuencias • Escalas Mezcladas</p>
        </div>

        {/* Selector de Fases */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => {
                setCurrentPhase(phase.id);
                setCurrentExercise(0);
              }}
              className={`p-3 rounded-xl text-white font-semibold transition-all transform hover:scale-105 ${
                currentPhase === phase.id
                  ? `bg-gradient-to-r ${phase.color} shadow-lg scale-105`
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{phase.emoji}</div>
              <div className="text-xs">Fase {phase.id}</div>
              <div className="text-xs font-normal">{phase.name}</div>
            </button>
          ))}
        </div>

        {/* Fase Actual */}
        <div className={`bg-gradient-to-r ${currentPhaseData.color} p-6 rounded-2xl mb-8 text-white`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{currentPhaseData.emoji}</div>
            <h2 className="text-3xl font-bold mb-2">Fase {currentPhaseData.id}: {currentPhaseData.name}</h2>
            <p className="text-lg opacity-90">
              {currentPhaseData.exercises.length} secuencias con escalas mezcladas
            </p>
          </div>
        </div>

        {/* Selector de Secuencias */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Secuencias de la Fase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPhaseData.exercises.map((exercise, index) => (
              <button
                key={index}
                onClick={() => setCurrentExercise(index)}
                className={`p-4 rounded-xl text-left transition-all ${
                  currentExercise === index
                    ? 'bg-white/20 text-white border-2 border-white/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="font-semibold mb-2">{exercise.name}</div>
                <div className="text-sm opacity-75">
                  {exercise.chords.length} acordes
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Secuencia Completa */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{currentExerciseData.name}</h3>
            <p className="text-gray-300">
              {currentExerciseData.chords.length} acordes con escalas mezcladas
            </p>
          </div>

          {/* Secuencia de Acordes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {currentExerciseData.chords.map((chord, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-xl text-center"
              >
                <div className="text-xl font-bold mb-1">{chord.name}</div>
                <div className="text-sm font-medium">{chord.scale}</div>
                <div className="text-xs opacity-75 mt-1">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;