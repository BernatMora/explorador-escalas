import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Settings, Volume2, Clock, Target, Brain, Zap, Music, BookOpen, Guitar, Eye, Heart, Globe, Timer, Sparkles, Infinity } from 'lucide-react';
import Metronome from './Metronome';
import ChordAnatomyPanel from './ChordAnatomyPanel';
import MethodologyPanel from './MethodologyPanel';
import ScaleTheoryPanel from './ScaleTheoryPanel';

interface Exercise {
  name: string;
  duration: number;
  description: string;
  tempoRange: [number, number];
  phase: number;
}

interface ChordSequence {
  name: string;
  chords: string[];
  scale: string;
  description: string;
  phase: number;
}

const ChordExplorer: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentSequence, setCurrentSequence] = useState<ChordSequence | null>(null);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedChord, setSelectedChord] = useState<{name: string, scale: string, position: number, index: number} | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showScaleTheory, setShowScaleTheory] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const exerciseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Información de las fases
  const phaseInfo = [
    { id: 1, name: "Fundamentos", emoji: "📗", color: "from-green-400 to-blue-500" },
    { id: 2, name: "Exploración", emoji: "📘", color: "from-blue-400 to-purple-500" },
    { id: 3, name: "Desarrollo", emoji: "📕", color: "from-red-400 to-pink-500" },
    { id: 4, name: "Maestría", emoji: "📜", color: "from-yellow-400 to-orange-500" },
    { id: 5, name: "Retos Mentales", emoji: "🔥", color: "from-orange-500 to-red-600" },
    { id: 6, name: "Técnica Extrema", emoji: "💀", color: "from-gray-600 to-black" },
    { id: 7, name: "Transcendencia", emoji: "🏆", color: "from-yellow-300 to-yellow-600" },
    { id: 8, name: "Retos Cerebrales", emoji: "🧠", color: "from-purple-500 to-indigo-600" },
    { id: 9, name: "Sopa Mundial", emoji: "🌍", color: "from-green-500 to-teal-600" },
    { id: 10, name: "Sopa Temporal", emoji: "⏳", color: "from-indigo-500 to-purple-600" },
    { id: 11, name: "Sopa Emocional", emoji: "💫", color: "from-pink-400 to-rose-600" },
    { id: 12, name: "Sopa Extrema", emoji: "🌌", color: "from-purple-600 to-black" }
  ];

  // Ejercicios por fase
  const phaseExercises = {
    1: [
      { name: "Construcción Básica", duration: 15, description: "Acordes básicos con 7ma", tempoRange: [60, 90], phase: 1 },
      { name: "Transiciones Suaves", duration: 20, description: "Conexiones fluidas entre acordes", tempoRange: [70, 100], phase: 1 }
    ],
    2: [
      { name: "Colores Modales", duration: 25, description: "Exploración de modos griegos", tempoRange: [80, 120], phase: 2 },
      { name: "Tensiones Naturales", duration: 30, description: "9nas, 11nas y 13nas", tempoRange: [90, 130], phase: 2 }
    ],
    3: [
      { name: "Sustituciones Avanzadas", duration: 35, description: "Rearmónización y sustituciones", tempoRange: [100, 140], phase: 3 },
      { name: "Análisis Funcional", duration: 40, description: "Comprensión armónica profunda", tempoRange: [110, 150], phase: 3 }
    ],
    4: [
      { name: "Técnicas Virtuosas", duration: 45, description: "Tapping, hybrid picking, wide stretches", tempoRange: [120, 160], phase: 4 },
      { name: "Expresión Avanzada", duration: 50, description: "Musicalidad y técnica combinadas", tempoRange: [130, 170], phase: 4 }
    ],
    5: [
      { name: "Procesamiento Dual", duration: 60, description: "Análisis mientras ejecutas", tempoRange: [80, 140], phase: 5 },
      { name: "Memoria Extrema", duration: 75, description: "Secuencias largas de memoria", tempoRange: [90, 150], phase: 5 }
    ],
    6: [
      { name: "Coordinación Sobrehumana", duration: 90, description: "Técnicas combinadas imposibles", tempoRange: [100, 180], phase: 6 },
      { name: "Resistencia Física", duration: 120, description: "Técnicas extremas sostenidas", tempoRange: [120, 200], phase: 6 }
    ],
    7: [
      { name: "Meditación Musical", duration: 150, description: "Fusión mente-cuerpo-música", tempoRange: [40, 120], phase: 7 },
      { name: "Creatividad Pura", duration: 180, description: "Improvisación transcendental", tempoRange: [60, 140], phase: 7 }
    ],
    8: [
      { name: "Análisis Simultáneo", duration: 45, description: "Verbalizar mientras ejecutas", tempoRange: [80, 140], phase: 8 },
      { name: "Enseñanza en Vivo", duration: 60, description: "Explicar mientras tocas", tempoRange: [90, 150], phase: 8 }
    ],
    9: [
      { name: "Exploración Mundial - Asia", duration: 30, description: "Escalas japonesas, chinas e indias", tempoRange: [70, 120], phase: 9 },
      { name: "Sopa Árabe-Persa", duration: 35, description: "Desierto místico y exotismo", tempoRange: [80, 130], phase: 9 },
      { name: "Tradiciones Europeas", duration: 40, description: "Húngara, gitana, klezmer, celta", tempoRange: [90, 140], phase: 9 },
      { name: "Sopa Mundial Completa", duration: 50, description: "Todo el planeta en una sesión", tempoRange: [100, 150], phase: 9 }
    ],
    10: [
      { name: "Era Medieval", duration: 35, description: "Modos antiguos y cantos gregorianos", tempoRange: [60, 100], phase: 10 },
      { name: "Renacimiento Musical", duration: 40, description: "Polifonía y armonía temprana", tempoRange: [70, 110], phase: 10 },
      { name: "Era Romántica", duration: 45, description: "Cromatismo y expresión extrema", tempoRange: [80, 120], phase: 10 },
      { name: "Futuro Musical", duration: 50, description: "Escalas experimentales del mañana", tempoRange: [90, 160], phase: 10 }
    ],
    11: [
      { name: "Paisaje de Alegría", duration: 30, description: "Escalas luminosas y optimistas", tempoRange: [100, 140], phase: 11 },
      { name: "Valle de Melancolía", duration: 35, description: "Escalas menores y nostálgicas", tempoRange: [60, 100], phase: 11 },
      { name: "Montaña de Drama", duration: 40, description: "Escalas exóticas y tensas", tempoRange: [80, 130], phase: 11 },
      { name: "Océano de Misterio", duration: 45, description: "Escalas místicas y etéreas", tempoRange: [70, 110], phase: 11 }
    ],
    12: [
      { name: "Caos Controlado", duration: 60, description: "Todas las escalas mezcladas", tempoRange: [120, 180], phase: 12 },
      { name: "Tormenta Armónica", duration: 75, description: "Cambios extremos de escala", tempoRange: [140, 200], phase: 12 },
      { name: "Singularidad Musical", duration: 90, description: "Límites de la armonía humana", tempoRange: [160, 220], phase: 12 },
      { name: "Transcendencia Total", duration: 120, description: "Más allá de la música conocida", tempoRange: [40, 240], phase: 12 }
    ]
  };

  // Secuencias de acordes por fase
  const phaseSequences = {
    1: [
      { name: "Progresión Básica I", chords: ["Cmaj7", "Am7", "Dm7", "G7"], scale: "Mayor", description: "Progresión ii-V-I clásica en Do mayor", phase: 1 },
      { name: "Progresión Básica II", chords: ["Fmaj7", "Em7", "Am7", "Dm7"], scale: "Mayor", description: "Movimiento descendente por grados", phase: 1 }
    ],
    2: [
      { name: "Exploración Dórica", chords: ["Dm7", "Em7", "Fmaj7", "G7"], scale: "Dórico", description: "Sonoridad dórica con 6ta mayor", phase: 2 },
      { name: "Colores Lidios", chords: ["Fmaj7#11", "Cmaj7", "G7", "Am7"], scale: "Lidio", description: "4ta aumentada característica", phase: 2 }
    ],
    3: [
      { name: "Sustituciones Tritonales", chords: ["Cmaj7", "Db7", "Cmaj7", "G7alt"], scale: "Alterada", description: "Sustituciones avanzadas", phase: 3 },
      { name: "Rearmónización Compleja", chords: ["Cmaj9#11", "Am9", "Dm9", "G13"], scale: "Mayor", description: "Tensiones y extensiones", phase: 3 }
    ],
    4: [
      { name: "Voicings Extremos", chords: ["Cmaj7#11", "F#m7b5", "B7alt", "Em(maj7)"], scale: "Menor Melódica", description: "Técnica y armonía avanzada", phase: 4 },
      { name: "Politonalidad", chords: ["Cmaj7", "F#maj7", "Cmaj7", "Bbmaj7"], scale: "Politonal", description: "Múltiples centros tonales", phase: 4 }
    ],
    5: [
      { name: "Análisis Mental I", chords: ["Cmaj7", "A7alt", "Dm9", "G13b9"], scale: "Bebop", description: "Analiza función mientras tocas", phase: 5 },
      { name: "Memoria Extrema", chords: ["Cmaj9", "Bm7b5", "E7alt", "Am(maj7)", "D7#11", "G13", "Em7", "A7alt"], scale: "Menor Armónica", description: "Secuencia larga de memoria", phase: 5 }
    ],
    6: [
      { name: "Técnica Imposible I", chords: ["C∞", "∞", "∞maj7#11", "∞7alt"], scale: "Transcendental", description: "Técnicas sobrehumanas", phase: 6 },
      { name: "Coordinación Extrema", chords: ["∞", "C∞", "∞", "G∞"], scale: "Infinita", description: "Límites físicos humanos", phase: 6 }
    ],
    7: [
      { name: "Meditación Pura", chords: ["∞", "∞", "∞", "∞"], scale: "Silencio", description: "Música del alma", phase: 7 },
      { name: "Creatividad Infinita", chords: ["C∞", "∞maj∞", "∞", "∞7∞"], scale: "Transcendental", description: "Más allá de la técnica", phase: 7 }
    ],
    8: [
      { name: "Cerebro Dual", chords: ["Cmaj13#11", "F#7alt", "Bm(maj9)", "E7#9#11"], scale: "Alterada", description: "Procesamiento sobrehumano", phase: 8 },
      { name: "Enseñanza Simultánea", chords: ["Cmaj7", "Am7", "Dm7", "G7"], scale: "Mayor", description: "Explica mientras ejecutas", phase: 8 }
    ],
    9: [
      { name: "Sopa Asiática", chords: ["Hirajoshi", "Kumoi", "In Sen", "Yo"], scale: "Japonesa", description: "Escalas japonesas mezcladas", phase: 9 },
      { name: "Sopa Árabe-Persa", chords: ["Hijaz", "Persa", "Bizantina", "Doble Armónica"], scale: "Árabe", description: "Desierto místico", phase: 9 },
      { name: "Sopa Europea", chords: ["Húngara", "Gitana", "Klezmer", "Celta"], scale: "Húngara", description: "Tradiciones ancestrales", phase: 9 },
      { name: "Sopa Mundial", chords: ["Africana", "Balinesa", "Flamenca", "India Raga"], scale: "Mundial", description: "Todo el planeta", phase: 9 }
    ],
    10: [
      { name: "Sopa Medieval", chords: ["Dórico Antiguo", "Frigio Gregoriano", "Lidio Sacro", "Mixolidio Trovador"], scale: "Medieval", description: "Cantos antiguos", phase: 10 },
      { name: "Sopa Renacentista", chords: ["Polifonía I", "Polifonía II", "Madrigal", "Motete"], scale: "Renacentista", description: "Armonía temprana", phase: 10 },
      { name: "Sopa Romántica", chords: ["Cromática", "Neapolitana", "Aumentada", "Enigmática"], scale: "Romántica", description: "Expresión extrema", phase: 10 },
      { name: "Sopa Futurista", chords: ["Cuántica", "Holográfica", "Dimensional", "Temporal"], scale: "Futura", description: "Música del mañana", phase: 10 }
    ],
    11: [
      { name: "Sopa de Alegría", chords: ["Mayor Brillante", "Lidio Luminoso", "Yo Japonesa", "Africana Festiva"], scale: "Alegre", description: "Pura felicidad", phase: 11 },
      { name: "Sopa Melancólica", chords: ["Menor Natural", "Dórico Nostálgico", "Kumoi Triste", "Klezmer Lamento"], scale: "Melancólica", description: "Lágrimas musicales", phase: 11 },
      { name: "Sopa Dramática", chords: ["Frigio Español", "Húngara Épica", "Alterada Tensa", "Locrio Caótico"], scale: "Dramática", description: "Tensión extrema", phase: 11 },
      { name: "Sopa Mística", chords: ["Enigmática", "Prometheus", "Bizantina Sacra", "In Sen Zen"], scale: "Mística", description: "Misterio profundo", phase: 11 }
    ],
    12: [
      { name: "Caos Total", chords: ["∞Caos", "Ultralocrio", "∞Extrema", "Singularidad"], scale: "Caótica", description: "Límites de la realidad", phase: 12 },
      { name: "Tormenta Cósmica", chords: ["Agujero Negro", "Supernova", "Quasar", "Big Bang"], scale: "Cósmica", description: "Música del universo", phase: 12 },
      { name: "Dimensión Paralela", chords: ["Realidad A", "Realidad B", "Realidad C", "Realidad ∞"], scale: "Multidimensional", description: "Múltiples universos", phase: 12 },
      { name: "Transcendencia Final", chords: ["∞", "∞∞", "∞∞∞", "∞∞∞∞"], scale: "Infinita", description: "Más allá del tiempo", phase: 12 }
    ]
  };

  // Obtener ejercicios de la fase actual
  const getCurrentPhaseExercises = () => {
    return phaseExercises[currentPhase] || [];
  };

  // Obtener secuencias de la fase actual
  const getCurrentPhaseSequences = () => {
    return phaseSequences[currentPhase] || [];
  };

  // Iniciar ejercicio
  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setTimeRemaining(exercise.duration * 60);
    setTempo(exercise.tempoRange[0]);
    
    // Cargar la primera secuencia de la fase
    const sequences = getCurrentPhaseSequences();
    if (sequences.length > 0) {
      setCurrentSequence(sequences[0]);
      setCurrentChordIndex(0);
    }
    
    // Iniciar timer del ejercicio
    if (exerciseTimerRef.current) {
      clearInterval(exerciseTimerRef.current);
    }
    
    exerciseTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setCurrentExercise(null);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Parar ejercicio
  const stopExercise = () => {
    setCurrentExercise(null);
    setIsPlaying(false);
    if (exerciseTimerRef.current) {
      clearInterval(exerciseTimerRef.current);
    }
  };

  // Siguiente secuencia de la fase actual
  const nextPhaseSequence = () => {
    const sequences = getCurrentPhaseSequences();
    if (sequences.length === 0) return;
    
    const currentIndex = sequences.findIndex(seq => seq.name === currentSequence?.name);
    const nextIndex = (currentIndex + 1) % sequences.length;
    setCurrentSequence(sequences[nextIndex]);
    setCurrentChordIndex(0);
  };

  // Control del metrónomo
  useEffect(() => {
    if (isPlaying && currentSequence) {
      const beatInterval = (60 / tempo) * 1000;
      
      intervalRef.current = setInterval(() => {
        setCurrentChordIndex(prev => (prev + 1) % currentSequence.chords.length);
      }, beatInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, tempo, currentSequence]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exerciseTimerRef.current) clearInterval(exerciseTimerRef.current);
    };
  }, []);

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Seleccionar acorde
  const selectChord = (chordName: string, scale: string, position: number, index: number) => {
    setSelectedChord({ name: chordName, scale, position, index });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎸 Explorador de Escalas y Acordes
          </h1>
          <p className="text-gray-300">Domina la armonía moderna con metodología progresiva</p>
        </div>

        {/* Navegación de Fases */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="text-blue-400" size={20} />
            Selecciona tu Fase de Entrenamiento
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {phaseInfo.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  currentPhase === phase.id
                    ? `bg-gradient-to-r ${phase.color} text-white shadow-lg scale-105`
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{phase.emoji}</div>
                <div className="text-xs font-medium">{phase.name}</div>
                <div className="text-xs opacity-75">Fase {phase.id}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Panel de Control Principal */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Ejercicios de la Fase */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" size={18} />
              Ejercicios - Fase {currentPhase}
            </h3>
            <div className="space-y-3">
              {getCurrentPhaseExercises().map((exercise, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{exercise.name}</h4>
                    <span className="text-xs text-gray-400">{exercise.duration}min</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-3">{exercise.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {exercise.tempoRange[0]}-{exercise.tempoRange[1]} BPM
                    </span>
                    <button
                      onClick={() => startExercise(exercise)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium transition-colors"
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secuencia Actual */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Music className="text-green-400" size={18} />
                Secuencia Actual
              </h3>
              <button
                onClick={nextPhaseSequence}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-xs font-medium transition-colors"
              >
                Siguiente de Fase {currentPhase}
              </button>
            </div>
            
            {currentSequence ? (
              <div>
                <div className="mb-4">
                  <h4 className="font-medium text-blue-300">{currentSequence.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{currentSequence.description}</p>
                  <div className="text-xs text-gray-500">
                    Escala: {currentSequence.scale} • Fase {currentSequence.phase}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {currentSequence.chords.map((chord, index) => (
                    <button
                      key={index}
                      onClick={() => selectChord(chord, currentSequence.scale, index + 1, index)}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        index === currentChordIndex && isPlaying
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-105'
                          : selectedChord?.index === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      }`}
                    >
                      <div className="font-bold">{chord}</div>
                      <div className="text-xs opacity-75">Pos. {index + 1}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Music size={48} className="mx-auto mb-4 opacity-50" />
                <p>Selecciona un ejercicio para comenzar</p>
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="space-y-4">
            {/* Estado del Ejercicio */}
            {currentExercise && (
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">{currentExercise.name}</h4>
                  <button
                    onClick={stopExercise}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-xs"
                  >
                    Parar
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>
            )}

            {/* Controles de Reproducción */}
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex justify-center gap-3 mb-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={!currentSequence}
                  className={`p-3 rounded-full transition-colors ${
                    !currentSequence
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : isPlaying
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <button
                  onClick={() => setCurrentChordIndex(0)}
                  disabled={!currentSequence}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 text-white transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              {/* Control de Tempo */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Tempo</span>
                  <span className="text-sm font-bold text-blue-400">{tempo} BPM</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={tempo}
                  onChange={(e) => setTempo(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Metrónomo */}
            <Metronome
              tempo={tempo}
              setTempo={setTempo}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>

        {/* Paneles Informativos */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Botones de Paneles */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className={`flex-1 p-3 rounded-lg transition-colors ${
                showMethodology
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Brain size={18} />
                <span className="text-sm font-medium">Metodología</span>
              </div>
            </button>
            
            <button
              onClick={() => setShowScaleTheory(!showScaleTheory)}
              className={`flex-1 p-3 rounded-lg transition-colors ${
                showScaleTheory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen size={18} />
                <span className="text-sm font-medium">Teoría Musical</span>
              </div>
            </button>
          </div>
        </div>

        {/* Paneles Expandibles */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Panel de Anatomía de Acordes */}
          <ChordAnatomyPanel selectedChord={selectedChord} />

          {/* Panel de Metodología */}
          {showMethodology && (
            <MethodologyPanel currentPhase={currentPhase} />
          )}

          {/* Panel de Teoría Musical */}
          {showScaleTheory && (
            <ScaleTheoryPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;