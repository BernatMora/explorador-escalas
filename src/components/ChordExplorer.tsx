import React, { useState } from 'react';
import { Music, Shuffle, Info } from 'lucide-react';

const ChordExplorer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showScaleInfo, setShowScaleInfo] = useState(false);

  // INFORMACIÓN REAL DE ESCALAS
  const scaleInfo = {
    "Mayor": { notes: "C-D-E-F-G-A-B", intervals: "T-T-S-T-T-T-S", character: "Alegre, estable" },
    "Menor": { notes: "A-B-C-D-E-F-G", intervals: "T-S-T-T-S-T-T", character: "Melancólico, emotivo" },
    "Dórico": { notes: "D-E-F-G-A-B-C", intervals: "T-S-T-T-T-S-T", character: "Folk, celta" },
    "Frigio": { notes: "E-F-G-A-B-C-D", intervals: "S-T-T-T-S-T-T", character: "Español, dramático" },
    "Lidio": { notes: "F-G-A-B-C-D-E", intervals: "T-T-T-S-T-T-S", character: "Etéreo, flotante" },
    "Mixolidio": { notes: "G-A-B-C-D-E-F", intervals: "T-T-S-T-T-S-T", character: "Blues, dominante" },
    "Locrio": { notes: "B-C-D-E-F-G-A", intervals: "S-T-T-S-T-T-T", character: "Inestable, tenso" },
    "Menor Armónica": { notes: "A-B-C-D-E-F-G#", intervals: "T-S-T-T-S-T+S-S", character: "Clásico, exótico" },
    "Menor Melódica": { notes: "A-B-C-D-E-F#-G#", intervals: "T-S-T-T-T-T-S", character: "Jazz, sofisticado" },
    "Bebop": { notes: "G-A-B-C-D-E-F-F#", intervals: "T-T-S-T-T-S-S-S", character: "Jazz swing" },
    "Alterada": { notes: "G-Ab-Bb-B-Db-Eb-F", intervals: "S-T-S-T-T-T-T", character: "Tensión máxima" },
    "Disminuida": { notes: "C-D-Eb-F-Gb-Ab-A-B", intervals: "T-S-T-S-T-S-T-S", character: "Simétrica, tensa" },
    "Tonos Enteros": { notes: "C-D-E-F#-G#-A#", intervals: "T-T-T-T-T-T", character: "Flotante, impresionista" },
    "Árabe": { notes: "C-Db-E-F-G-Ab-B", intervals: "S-T+S-S-T-S-T+S", character: "Exótico, oriental" },
    "Húngara": { notes: "C-D-Eb-F#-G-Ab-B", intervals: "T-S-T+S-S-S-T+S", character: "Gitana, dramática" },
    "Japonesa": { notes: "C-D-Eb-G-Ab", intervals: "T-S-2T-S-2T", character: "Zen, minimalista" },
    "Flamenca": { notes: "E-F-G#-A-B-C-D", intervals: "S-T+S-S-T-S-T", character: "Pasión andaluza" },
    "Celta": { notes: "D-E-F-G-A-B-C", intervals: "T-S-T-T-T-S-T", character: "Mística, folk" },
    "Blues": { notes: "C-Eb-F-Gb-G-Bb", intervals: "m3-T-S-S-m3-T", character: "Blues, expresivo" },
    "Pentatónica Mayor": { notes: "C-D-E-G-A", intervals: "T-T-m3-T-m3", character: "Universal, simple" },
    "Pentatónica Menor": { notes: "A-C-D-E-G", intervals: "m3-T-T-m3-T", character: "Rock, blues" }
  };

  // 12 FASES CON SECUENCIAS REALES DE 10+ ACORDES
  const phases = [
    {
      id: 1,
      name: "Fundamentos Sólidos",
      emoji: "📗",
      color: "from-green-400 to-blue-500",
      exercises: [
        {
          name: "Círculo Básico Extendido",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7", scale: "Lidio" },
            { name: "Bm7b5", scale: "Locrio" },
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Cmaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Progresión Jazz Básica",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "C7", scale: "Mixolidio" },
            { name: "Fmaj7", scale: "Mayor" },
            { name: "Fm7", scale: "Menor" },
            { name: "Em7", scale: "Menor" },
            { name: "A7", scale: "Mixolidio" },
            { name: "Dm7", scale: "Menor" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Em7", scale: "Menor" },
            { name: "Am7", scale: "Menor" },
            { name: "Dm7", scale: "Menor" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Cmaj7", scale: "Mayor" }
          ]
        },
        {
          name: "Colores Modales Básicos",
          chords: [
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7", scale: "Lidio" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Am7", scale: "Menor" },
            { name: "Bm7b5", scale: "Locrio" },
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7", scale: "Lidio" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Cmaj7", scale: "Mayor" }
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
          name: "Viaje Modal Completo",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Dm9", scale: "Dórico" },
            { name: "Em7b9", scale: "Frigio" },
            { name: "Fmaj7#11", scale: "Lidio" },
            { name: "G13", scale: "Mixolidio" },
            { name: "Am11", scale: "Menor" },
            { name: "Bm7b5", scale: "Locrio" },
            { name: "Cmaj9", scale: "Mayor" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Em7", scale: "Frigio" },
            { name: "Fmaj7", scale: "Lidio" },
            { name: "G7", scale: "Mixolidio" }
          ]
        },
        {
          name: "Contraste Modal",
          chords: [
            { name: "Am7", scale: "Menor" },
            { name: "A7", scale: "Mixolidio" },
            { name: "Amaj7#11", scale: "Lidio" },
            { name: "Am7b5", scale: "Locrio" },
            { name: "Dm7", scale: "Dórico" },
            { name: "D7", scale: "Mixolidio" },
            { name: "Dmaj7#11", scale: "Lidio" },
            { name: "Dm7b5", scale: "Locrio" },
            { name: "Gm7", scale: "Menor" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Gmaj7#11", scale: "Lidio" },
            { name: "Gm7b5", scale: "Locrio" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Jazz Avanzado",
      emoji: "📕",
      color: "from-red-400 to-pink-500",
      exercises: [
        {
          name: "Sustituciones Tritonales",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Db7", scale: "Alterada" },
            { name: "Cmaj9#11", scale: "Lidio" },
            { name: "F#7alt", scale: "Alterada" },
            { name: "Bmaj7", scale: "Mayor" },
            { name: "E7alt", scale: "Alterada" },
            { name: "Am(maj7)", scale: "Menor Armónica" },
            { name: "D7alt", scale: "Alterada" },
            { name: "Gmaj7#11", scale: "Lidio" },
            { name: "C#7alt", scale: "Alterada" },
            { name: "F#maj7", scale: "Mayor" },
            { name: "B7alt", scale: "Alterada" }
          ]
        },
        {
          name: "Bebop Avanzado",
          chords: [
            { name: "C7", scale: "Bebop" },
            { name: "F7", scale: "Bebop" },
            { name: "Bb7", scale: "Bebop" },
            { name: "Eb7", scale: "Bebop" },
            { name: "Ab7", scale: "Bebop" },
            { name: "Db7", scale: "Bebop" },
            { name: "Gb7", scale: "Bebop" },
            { name: "B7", scale: "Bebop" },
            { name: "E7", scale: "Bebop" },
            { name: "A7", scale: "Bebop" },
            { name: "D7", scale: "Bebop" },
            { name: "G7", scale: "Bebop" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Escalas Exóticas",
      emoji: "🌶️",
      color: "from-orange-400 to-red-500",
      exercises: [
        {
          name: "Oriente Medio",
          chords: [
            { name: "Cm7", scale: "Árabe" },
            { name: "Fm7", scale: "Árabe" },
            { name: "Gm7", scale: "Húngara" },
            { name: "Cm7", scale: "Húngara" },
            { name: "Dm7", scale: "Árabe" },
            { name: "Am7", scale: "Húngara" },
            { name: "Bb7", scale: "Árabe" },
            { name: "Fm7", scale: "Húngara" },
            { name: "Gm7", scale: "Árabe" },
            { name: "Cm7", scale: "Húngara" },
            { name: "Dm7", scale: "Árabe" },
            { name: "Gm7", scale: "Húngara" }
          ]
        },
        {
          name: "España y Flamenco",
          chords: [
            { name: "Em7", scale: "Flamenca" },
            { name: "F7", scale: "Flamenca" },
            { name: "G7", scale: "Flamenca" },
            { name: "Am7", scale: "Flamenca" },
            { name: "Dm7", scale: "Frigio" },
            { name: "Em7", scale: "Frigio" },
            { name: "F7", scale: "Frigio" },
            { name: "Gm7", scale: "Flamenca" },
            { name: "Am7", scale: "Frigio" },
            { name: "Bb7", scale: "Flamenca" },
            { name: "Cm7", scale: "Frigio" },
            { name: "Dm7", scale: "Flamenca" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Escalas Asiáticas",
      emoji: "🎋",
      color: "from-green-400 to-teal-500",
      exercises: [
        {
          name: "Japón Tradicional",
          chords: [
            { name: "Cm7", scale: "Japonesa" },
            { name: "Fm7", scale: "Japonesa" },
            { name: "Gm7", scale: "Japonesa" },
            { name: "Bb7", scale: "Japonesa" },
            { name: "Dm7", scale: "Pentatónica Menor" },
            { name: "Gm7", scale: "Pentatónica Menor" },
            { name: "Cm7", scale: "Pentatónica Menor" },
            { name: "Fm7", scale: "Pentatónica Menor" },
            { name: "Am7", scale: "Japonesa" },
            { name: "Dm7", scale: "Japonesa" },
            { name: "Gm7", scale: "Japonesa" },
            { name: "Cm7", scale: "Japonesa" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Europa Folk",
      emoji: "🏰",
      color: "from-purple-400 to-indigo-500",
      exercises: [
        {
          name: "Tierras Celtas",
          chords: [
            { name: "Dm7", scale: "Celta" },
            { name: "Gm7", scale: "Celta" },
            { name: "Am7", scale: "Celta" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Bb7", scale: "Celta" },
            { name: "F7", scale: "Celta" },
            { name: "Gm7", scale: "Dórico" },
            { name: "Cm7", scale: "Celta" },
            { name: "Dm7", scale: "Dórico" },
            { name: "Am7", scale: "Celta" },
            { name: "Bb7", scale: "Dórico" },
            { name: "Dm7", scale: "Celta" }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "Escalas Simétricas",
      emoji: "⚖️",
      color: "from-yellow-400 to-orange-500",
      exercises: [
        {
          name: "Disminuidas y Aumentadas",
          chords: [
            { name: "C7", scale: "Disminuida" },
            { name: "Eb7", scale: "Disminuida" },
            { name: "F#7", scale: "Disminuida" },
            { name: "A7", scale: "Disminuida" },
            { name: "Cmaj7", scale: "Tonos Enteros" },
            { name: "D7", scale: "Tonos Enteros" },
            { name: "E7", scale: "Tonos Enteros" },
            { name: "F#7", scale: "Tonos Enteros" },
            { name: "Ab7", scale: "Disminuida" },
            { name: "B7", scale: "Disminuida" },
            { name: "D7", scale: "Disminuida" },
            { name: "F7", scale: "Disminuida" }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "Jazz Modal Extremo",
      emoji: "🎺",
      color: "from-indigo-400 to-purple-600",
      exercises: [
        {
          name: "Alteradas y Melódicas",
          chords: [
            { name: "G7alt", scale: "Alterada" },
            { name: "Cmaj7#11", scale: "Lidio" },
            { name: "Am(maj9)", scale: "Menor Melódica" },
            { name: "D7alt", scale: "Alterada" },
            { name: "Gmaj13#11", scale: "Lidio" },
            { name: "Em(maj7)", scale: "Menor Melódica" },
            { name: "A7alt", scale: "Alterada" },
            { name: "Dmaj7#11", scale: "Lidio" },
            { name: "Bm(maj9)", scale: "Menor Melódica" },
            { name: "E7alt", scale: "Alterada" },
            { name: "Amaj13#11", scale: "Lidio" },
            { name: "F#m(maj7)", scale: "Menor Melódica" }
          ]
        }
      ]
    },
    {
      id: 9,
      name: "Blues y Rock",
      emoji: "🎸",
      color: "from-blue-600 to-purple-700",
      exercises: [
        {
          name: "Blues Tradicional Extendido",
          chords: [
            { name: "C7", scale: "Blues" },
            { name: "F7", scale: "Blues" },
            { name: "C7", scale: "Blues" },
            { name: "G7", scale: "Blues" },
            { name: "F7", scale: "Mixolidio" },
            { name: "C7", scale: "Blues" },
            { name: "Am7", scale: "Pentatónica Menor" },
            { name: "Dm7", scale: "Blues" },
            { name: "G7", scale: "Mixolidio" },
            { name: "C7", scale: "Blues" },
            { name: "F7", scale: "Blues" },
            { name: "G7", scale: "Blues" }
          ]
        }
      ]
    },
    {
      id: 10,
      name: "Fusión Mundial",
      emoji: "🌍",
      color: "from-green-500 to-blue-600",
      exercises: [
        {
          name: "Mezcla Global",
          chords: [
            { name: "Cm7", scale: "Árabe" },
            { name: "Fm7", scale: "Japonesa" },
            { name: "Gm7", scale: "Flamenca" },
            { name: "Am7", scale: "Húngara" },
            { name: "Dm7", scale: "Celta" },
            { name: "Bb7", scale: "Blues" },
            { name: "Em7", scale: "Frigio" },
            { name: "A7", scale: "Alterada" },
            { name: "Dm7", scale: "Dórico" },
            { name: "G7", scale: "Mixolidio" },
            { name: "Cm7", scale: "Menor Armónica" },
            { name: "F7", scale: "Bebop" }
          ]
        },
        {
          name: "Continentes Musicales",
          chords: [
            { name: "Am7", scale: "Pentatónica Menor" },
            { name: "D7", scale: "Árabe" },
            { name: "Gm7", scale: "Húngara" },
            { name: "C7", scale: "Flamenca" },
            { name: "Fm7", scale: "Japonesa" },
            { name: "Bb7", scale: "Celta" },
            { name: "Em7", scale: "Blues" },
            { name: "A7", scale: "Frigio" },
            { name: "Dm7", scale: "Menor Melódica" },
            { name: "G7", scale: "Alterada" },
            { name: "Cm7", scale: "Disminuida" },
            { name: "F7", scale: "Tonos Enteros" }
          ]
        }
      ]
    },
    {
      id: 11,
      name: "Experimental",
      emoji: "🔬",
      color: "from-purple-600 to-pink-600",
      exercises: [
        {
          name: "Laboratorio Sonoro",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "F#maj7#11", scale: "Lidio" },
            { name: "Bbm7", scale: "Disminuida" },
            { name: "E7", scale: "Tonos Enteros" },
            { name: "Am7", scale: "Menor Melódica" },
            { name: "D7", scale: "Árabe" },
            { name: "Gm7", scale: "Húngara" },
            { name: "C7", scale: "Bebop" },
            { name: "Fm7", scale: "Japonesa" },
            { name: "Bb7", scale: "Flamenca" },
            { name: "Em7", scale: "Celta" },
            { name: "A7", scale: "Blues" }
          ]
        }
      ]
    },
    {
      id: 12,
      name: "RANDOM TOTAL",
      emoji: "🎲",
      color: "from-gray-800 to-black",
      exercises: [
        {
          name: "Caos Armónico Controlado",
          chords: [
            { name: "C7alt", scale: "Alterada" },
            { name: "Fm7", scale: "Japonesa" },
            { name: "Bb7", scale: "Húngara" },
            { name: "Em7", scale: "Celta" },
            { name: "A7", scale: "Árabe" },
            { name: "Dm7", scale: "Blues" },
            { name: "G7", scale: "Flamenca" },
            { name: "Cmaj7#11", scale: "Lidio" },
            { name: "F#m7", scale: "Frigio" },
            { name: "B7", scale: "Disminuida" },
            { name: "Em7", scale: "Menor Melódica" },
            { name: "A7", scale: "Tonos Enteros" },
            { name: "Dm7", scale: "Bebop" },
            { name: "G7", scale: "Pentatónica Menor" }
          ]
        },
        {
          name: "Mezcla Imposible",
          chords: [
            { name: "Am7", scale: "Menor Armónica" },
            { name: "D7", scale: "Alterada" },
            { name: "Gm7", scale: "Japonesa" },
            { name: "C7", scale: "Húngara" },
            { name: "Fm7", scale: "Árabe" },
            { name: "Bb7", scale: "Flamenca" },
            { name: "Em7", scale: "Celta" },
            { name: "A7", scale: "Disminuida" },
            { name: "Dm7", scale: "Tonos Enteros" },
            { name: "G7", scale: "Blues" },
            { name: "Cm7", scale: "Bebop" },
            { name: "F7", scale: "Frigio" },
            { name: "Bb7", scale: "Lidio" },
            { name: "Em7", scale: "Dórico" }
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
            🎸 Secuencias de Acordes para Guitarra
          </h1>
          <p className="text-gray-300">12 Fases • Escalas Mezcladas • Secuencias de 10+ Acordes</p>
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
              {currentPhaseData.exercises.length} secuencias • Escalas mezcladas
            </p>
          </div>
        </div>

        {/* Selector de Secuencias */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Secuencias Disponibles</h3>
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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{currentExerciseData.name}</h3>
            <p className="text-gray-300">
              {currentExerciseData.chords.length} acordes • Escalas mezcladas
            </p>
          </div>

          {/* Secuencia de Acordes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {currentExerciseData.chords.map((chord, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="text-lg font-bold mb-1">{chord.name}</div>
                <div className="text-sm font-medium">{chord.scale}</div>
                <div className="text-xs opacity-75 mt-1">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Información de Escalas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Información de Escalas</h3>
            <button
              onClick={() => setShowScaleInfo(!showScaleInfo)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Info size={16} />
              {showScaleInfo ? 'Ocultar' : 'Mostrar'} Info
            </button>
          </div>

          {showScaleInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(scaleInfo).map(([scaleName, info]) => (
                <div key={scaleName} className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-bold text-white mb-2">{scaleName}</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div><strong>Notas:</strong> {info.notes}</div>
                    <div><strong>Intervalos:</strong> {info.intervals}</div>
                    <div><strong>Carácter:</strong> {info.character}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;