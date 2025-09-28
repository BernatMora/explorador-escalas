import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ChordExplorer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentChord, setCurrentChord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 12 FASES CON SECUENCIAS DE ESCALAS MEZCLADAS
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
          name: "Modos Griegos",
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
          name: "Sustituciones",
          chords: [
            { name: "Cmaj7", scale: "Mayor" },
            { name: "Db7", scale: "Alterada" },
            { name: "Cmaj9#11", scale: "Lidio" },
            { name: "Am11", scale: "Menor Melódica" }
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
          name: "Virtuosismo",
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
          name: "Procesamiento Mental",
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
        }
      ]
    }
  ];

  const currentPhaseData = phases.find(p => p.id === currentPhase) || phases[0];
  const currentExerciseData = currentPhaseData.exercises[currentExercise] || currentPhaseData.exercises[0];
  const currentChordData = currentExerciseData.chords[currentChord] || currentExerciseData.chords[0];

  const nextChord = () => {
    if (currentChord < currentExerciseData.chords.length - 1) {
      setCurrentChord(currentChord + 1);
    } else {
      setCurrentChord(0);
    }
  };

  const prevChord = () => {
    if (currentChord > 0) {
      setCurrentChord(currentChord - 1);
    } else {
      setCurrentChord(currentExerciseData.chords.length - 1);
    }
  };

  const resetSequence = () => {
    setCurrentChord(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎸 Explorador de Escalas y Acordes
          </h1>
          <p className="text-gray-300">12 Fases • Secuencias de Escalas Mezcladas</p>
        </div>

        {/* Selector de Fases */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => {
                setCurrentPhase(phase.id);
                setCurrentExercise(0);
                setCurrentChord(0);
                setIsPlaying(false);
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
              {currentPhaseData.exercises.length} ejercicios con secuencias de escalas mezcladas
            </p>
          </div>
        </div>

        {/* Selector de Ejercicios */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Ejercicios de la Fase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPhaseData.exercises.map((exercise, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentExercise(index);
                  setCurrentChord(0);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-xl text-left transition-all ${
                  currentExercise === index
                    ? 'bg-white/20 text-white border-2 border-white/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="font-semibold mb-2">{exercise.name}</div>
                <div className="text-sm opacity-75">
                  {exercise.chords.length} acordes • Escalas mezcladas
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Secuencia Actual */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{currentExerciseData.name}</h3>
            <p className="text-gray-300">
              Acorde {currentChord + 1} de {currentExerciseData.chords.length}
            </p>
          </div>

          {/* Acorde Actual */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-8 rounded-2xl inline-block mb-4">
              <div className="text-6xl font-bold mb-2">{currentChordData.name}</div>
              <div className="text-xl">Escala: {currentChordData.scale}</div>
            </div>
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={prevChord}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={resetSequence}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </button>
            <button
              onClick={nextChord}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Siguiente →
            </button>
          </div>

          {/* Secuencia Completa */}
          <div className="bg-black/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Secuencia Completa:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {currentExerciseData.chords.map((chord, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center transition-all cursor-pointer ${
                    index === currentChord
                      ? 'bg-yellow-500 text-black font-bold scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => setCurrentChord(index)}
                >
                  <div className="font-bold">{chord.name}</div>
                  <div className="text-xs opacity-75">{chord.scale}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;