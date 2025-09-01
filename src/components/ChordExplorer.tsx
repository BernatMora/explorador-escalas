import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, Star, Music, Play, Pause } from 'lucide-react';
import ScaleTheoryPanel from './ScaleTheoryPanel';
import Metronome from './Metronome';
import { getScaleInfo } from '../data/scaleTheory';

const ChordExplorer = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [tempo, setTempo] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({});

  const chordSequences = [
    {
      name: "Secuencia 1 - Mayor/Dórico/Bebop",
      chords: ["Cmaj9", "Dm11", "G13", "Em7b5", "Am9", "F#m7b5", "Bm7b5", "E7alt", "Fmaj7#11", "C6/9"],
      scales: ["Mayor", "Dórico", "Bebop", "Locrio", "Menor Natural", "Menor Armónica", "Locrio", "Alterada", "Lidio", "Mayor"],
      difficulty: "Intermedio",
      positions: ["VIII", "V", "III", "VII", "V", "II", "VII", "VII", "I", "III"]
    },
    {
      name: "Secuencia 2 - Frigio/Húngara/Japonesa",
      chords: ["Dm(maj7)", "Bb7#11", "F#dim7", "Cmaj7#5", "Ab7b5", "Gm6/9", "D7#9#11", "Em7add11", "A7sus4b9", "Dm9"],
      scales: ["Menor Melódica", "Lidio b7", "Disminuida", "Tonos Enteros", "Frigio", "Dórico", "Húngara", "Japonesa", "Frigio", "Menor Natural"],
      difficulty: "Intermedio",
      positions: ["V", "VI", "II", "III", "IV", "III", "V", "VII", "V", "V"]
    },
    {
      name: "Secuencia 3 - Alterada/Bebop/Mixolidio",
      chords: ["G7#5#9", "Cmaj9#11", "Am7b5", "D7b9b13", "Gm(maj9)", "C13", "F7#11", "Bm7b5", "Em9", "A7alt"],
      scales: ["Alterada", "Lidio", "Locrio", "Frigio Dom.", "Menor Melódica", "Mixolidio", "Bebop", "Menor Armónica", "Dórico", "Alterada"],
      difficulty: "Intermedio",
      positions: ["III", "VIII", "V", "X", "III", "VIII", "I", "VII", "VII", "V"]
    },
    {
      name: "Secuencia 4 - Drop 2 Avanzada",
      chords: ["Fmaj13#11", "Dm9/F", "G7#5b9", "Em7b5/G", "Am(maj9)", "F#m7b5/A", "B7alt/D#", "Em11b5", "A7b13#9", "Dm(maj7)"],
      scales: ["Lidio", "Dórico/3ra", "Alterada", "Locrio/3ra", "Menor Melódica", "Menor Arm./3ra", "Alterada/3ra", "Locrio", "Alterada", "Menor Melódica"],
      difficulty: "Avanzado",
      positions: ["I", "I", "III", "III", "V", "V", "VII", "VII", "V", "V"]
    },
    {
      name: "Secuencia 5 - Híbrido Picking Complex",
      chords: ["C7#11/G", "Am7b5add11", "D7alt/C", "Gm(maj7)/D", "C13b9", "F7#11b13", "Bm7b5/F", "E7#9b13", "Am6/9b5", "Dm(maj13)"],
      scales: ["Lidio b7/5ta", "Locrio Add11", "Alterada/b7", "Menor Mel./5ta", "Mixo b9", "Lidio b7b13", "Locrio/b5", "Alterada", "Menor b5", "Menor Melódica"],
      difficulty: "Avanzado",
      positions: ["III", "V", "III", "V", "VIII", "I", "VII", "VII", "V", "V"]
    },
    {
      name: "Secuencia 6 - Tapping & Extended Range",
      chords: ["Em11addb9", "A7#9b13sus4", "Dm(maj7)add11", "G13b5b9", "Cmaj9#11/E", "F#m7b5addb13", "B7alt/A", "Em7b5add#9", "Am(maj9)b6", "D7#11b13"],
      scales: ["Frigio Add11", "Alterada Sus", "Menor Mel. Add11", "Alterada b5", "Lidio/3ra", "Locrio b13", "Alterada/b7", "Locrio #9", "Menor Harm. b6", "Alterada"],
      difficulty: "Experto",
      positions: ["XII", "V", "X", "III", "VIII", "II", "VII", "VII", "V", "X"]
    },
    {
      name: "Secuencia 7 - Wide Interval Voicings",
      chords: ["Fmaj7b5add9", "Dm7b5b9add11", "G7#5b9add#11", "Cmaj7add#9#11", "Am7addb13b9", "D7altadd#4", "Gm(maj7)add#5", "C7b5addb9#11", "Fmaj9b6add#4", "Bb13b5add#9"],
      scales: ["Lidio b5", "Locrio b9 Add", "Alterada Add", "Lidio Add #9", "Menor Add b13", "Alterada #4", "Menor Mel. #5", "Alterada b5", "Lidio b6", "Mixo b5 Add"],
      difficulty: "Experto",
      positions: ["I", "V", "III", "VIII", "V", "X", "III", "VIII", "I", "VI"]
    },
    {
      name: "Secuencia 8 - Quartal/Quintal Stack",
      chords: ["Dm11/A", "G7sus4addb9#11", "Cm(maj7)sus4add#5", "F13sus2add#4", "Bm7b5sus4addb13", "E7altsus4add#9", "Am7sus4addb6b9", "D7susb2add#5#11", "Gm(maj9)sus4", "C13sus4b5add#9"],
      scales: ["Dórico Sus", "Mixolidio Sus Alt", "Menor Mel. Sus", "Lidio Sus2", "Locrio Sus b13", "Alterada Sus", "Menor Sus b6", "Alterada Sus b2", "Menor Mel. Sus", "Mixo Sus b5"],
      difficulty: "Experto",
      positions: ["V", "III", "III", "I", "VII", "VII", "V", "X", "III", "VIII"]
    },
    {
      name: "Secuencia 9 - Extended Technique Master",
      chords: ["Em7b5b9/D", "A7#5#9#11/C#", "Dm(maj13)/C", "G7b5b9#11/F", "Cmaj9#11/B", "F#m7b5#11/E", "B7altb13/A", "Em(maj7)#5/D#", "Am9b13/G", "D7#9#11b13/C"],
      scales: ["Locrio/b7", "Alterada/#5", "Menor Mel./b7", "Alterada/b7", "Lidio/7ma", "Locrio #11/b6", "Alterada b13/b7", "Menor Mel. #5/#7", "Menor b13/b7", "Alterada Total/b7"],
      difficulty: "Virtuoso",
      positions: ["VII", "IV", "VIII", "I", "VII", "II", "VII", "XI", "III", "X"]
    },
    {
      name: "Secuencia 10 - Ultimate Guitar Challenge",
      chords: ["Fm(maj7)#11/Eb", "Bb7b5#9add#11/Ab", "Ebmaj9b6/D", "Am7b5b13/G", "D7#5#9#11/C", "Gm(maj9)#11/F", "C7altb13add#4/Bb", "Fm7b5#9/Eb", "Bb13b5#11/Ab", "Ebmaj7#5b9/D"],
      scales: ["Menor Harm. #11/b6", "Alterada b5/b6", "Lidio b6/b7", "Locrio b13/b7", "Alterada Total/b7", "Menor Mel. #11/b7", "Alt b13 #4/b7", "Locrio #9/b6", "Mixo b5 #11/b7", "Lidio #5/b7"],
      difficulty: "Virtuoso",
      positions: ["VI", "VI", "VI", "III", "VIII", "III", "VI", "VI", "VI", "VI"]
    }
  ];

  const exercises = {
    1: {
      title: "FASE 1: Construcción Gradual",
      description: "Familiarízate con tensiones básicas",
      exercises: [
        { name: "Acordes Base + Una Tensión", duration: "15 min", completed: false },
        { name: "Cadenas de Inversiones", duration: "10 min", completed: false }
      ]
    },
    2: {
      title: "FASE 2: Exploración Sonora",
      description: "Descubre el carácter de cada escala",
      exercises: [
        { name: "Pintura Sonora - Alterada", duration: "10 min", completed: false },
        { name: "Pintura Sonora - Húngara", duration: "10 min", completed: false },
        { name: "Pintura Sonora - Tonos Enteros", duration: "10 min", completed: false },
        { name: "Comparación Directa", duration: "15 min", completed: false }
      ]
    },
    3: {
      title: "FASE 3: Fluidez y Velocidad",
      description: "Automatiza las posiciones",
      exercises: [
        { name: "Secuencias Rápidas", duration: "20 min", completed: false },
        { name: "Chord Substitution Game", duration: "15 min", completed: false }
      ]
    },
    4: {
      title: "FASE 4: Aplicación Musical",
      description: "Usa los acordes en contexto musical",
      exercises: [
        { name: "Reharmonización Creativa", duration: "25 min", completed: false },
        { name: "Improvisación Guiada", duration: "20 min", completed: false }
      ]
    }
  };

  // Persistir progreso en localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('chordExplorerProgress');
    if (savedProgress) {
      setCompletedExercises(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chordExplorerProgress', JSON.stringify(completedExercises));
  }, [completedExercises]);

  const toggleExercise = (phase, exerciseIndex) => {
    const key = `${phase}-${exerciseIndex}`;
    setCompletedExercises(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const isExerciseCompleted = (phase, exerciseIndex) => {
    return completedExercises.includes(`${phase}-${exerciseIndex}`);
  };

  const getPhaseProgress = (phase) => {
    const totalExercises = exercises[phase].exercises.length;
    const completed = exercises[phase].exercises.filter((_, index) => 
      isExerciseCompleted(phase, index)
    ).length;
    return Math.round((completed / totalExercises) * 100);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Intermedio': 'text-green-600 bg-green-100',
      'Avanzado': 'text-orange-600 bg-orange-100',
      'Experto': 'text-red-600 bg-red-100',
      'Virtuoso': 'text-purple-600 bg-purple-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  const ChordCard = ({ chord, scale, index, isActive, difficulty, position }) => (
    <div className={`p-3 rounded-lg border-2 transition-all duration-300 ${
      isActive 
        ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="text-center">
        <div className="text-lg font-bold text-gray-800 mb-1 leading-tight">{chord}</div>
        <div className="text-xs text-gray-500 mb-1">{scale}</div>
        <div className="text-xs text-blue-600 font-medium">Pos: {position}</div>
        <div className="text-xs text-gray-400">#{index + 1}</div>
      </div>
      {/* Tooltip con información de la escala */}
      <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white p-3 rounded-lg shadow-lg -top-2 left-full ml-2 w-64 text-xs">
        {(() => {
          const scaleInfo = getScaleInfo(scale);
          return scaleInfo ? (
            <div>
              <div className="font-semibold mb-1">{scaleInfo.name}</div>
              <div className="mb-1">Intervalos: {scaleInfo.intervals}</div>
              <div className="text-gray-300">{scaleInfo.characteristics}</div>
            </div>
          ) : (
            <div>Información no disponible</div>
          );
        })()}
      </div>
    </div>
  );

  const MetronomeControl = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">Metrónomo</h3>
        <div className="text-2xl font-bold text-blue-600">{tempo} BPM</div>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-2 rounded-full ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <input
          type="range"
          min="40"
          max="160"
          value={tempo}
          onChange={(e) => setTempo(parseInt(e.target.value))}
          className="flex-1"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => setTempo(60)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Lento (60)
        </button>
        <button
          onClick={() => setTempo(100)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Medio (100)
        </button>
        <button
          onClick={() => setTempo(140)}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Rápido (140)
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎸 Explorador de Acordes Avanzados
          </h1>
          <p className="text-gray-600 text-lg">
            Domina tensiones complejas y escalas exóticas con ejercicios progresivos
          </p>
        </div>

        {/* Navegación de Fases */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-xl shadow-lg p-2">
            {[1, 2, 3, 4].map(phase => (
              <button
                key={phase}
                onClick={() => setCurrentPhase(phase)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentPhase === phase
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Fase {phase}
                <div className="text-xs mt-1">
                  {getPhaseProgress(phase)}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Panel Principal de Ejercicios */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {exercises[currentPhase].title}
                </h2>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Progreso</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {getPhaseProgress(currentPhase)}%
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{exercises[currentPhase].description}</p>
              
              <div className="space-y-4">
                {exercises[currentPhase].exercises.map((exercise, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isExerciseCompleted(currentPhase, index)
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleExercise(currentPhase, index)}
                          className={`p-2 rounded-full ${
                            isExerciseCompleted(currentPhase, index)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          } transition-colors`}
                        >
                          <Check size={16} />
                        </button>
                        <div>
                          <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                          <p className="text-sm text-gray-500">Duración: {exercise.duration}</p>
                        </div>
                      </div>
                      {isExerciseCompleted(currentPhase, index) && (
                        <Star className="text-yellow-500 fill-current" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Panel de Teoría Musical */}
            <ScaleTheoryPanel />
            
            {/* Metrónomo */}
            <MetronomeControl />
            
            {/* Secuencias de Acordes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Secuencias de Práctica</h3>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <select
                    value={currentSequence}
                    onChange={(e) => setCurrentSequence(parseInt(e.target.value))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {chordSequences.map((seq, index) => (
                      <option key={index} value={index}>{seq.name}</option>
                    ))}
                  </select>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chordSequences[currentSequence].difficulty)}`}>
                    {chordSequences[currentSequence].difficulty}
                  </div>
                </div>
                
                {/* Información adicional */}
                {chordSequences[currentSequence].difficulty === 'Virtuoso' && (
                  <div className="p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700 mb-2">
                    🎸 <strong>Nivel Virtuoso:</strong> Requiere técnicas avanzadas como tapping, wide stretches y hybrid picking. ¡Calienta bien antes de intentar!
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Experto' && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 mb-2">
                    🔥 <strong>Nivel Experto:</strong> Voicings complejos con saltos de posición. Usa todas las técnicas de digitación disponibles.
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Avanzado' && (
                  <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700 mb-2">
                    📈 <strong>Nivel Avanzado:</strong> Drop voicings e inversiones. Perfecto para expandir tu vocabulario armónico.
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-1 mb-4 max-h-96 overflow-y-auto">
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
                    {/* Tooltip con información de la escala */}
                    <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white p-3 rounded-lg shadow-lg -top-2 left-full ml-2 w-64 text-xs">
                      {(() => {
                        const scaleInfo = getScaleInfo(chordSequences[currentSequence].scales[index]);
                        return scaleInfo ? (
                          <div>
                            <div className="font-semibold mb-1">{scaleInfo.name}</div>
                            <div className="mb-1">Intervalos: {scaleInfo.intervals}</div>
                            <div className="text-gray-300">{scaleInfo.characteristics}</div>
                          </div>
                        ) : (
                          <div>Información no disponible</div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentSequence((prev) => (prev + 1) % chordSequences.length)}
                  className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <RotateCcw size={14} />
                  Siguiente
                </button>
                
                <button
                  onClick={() => {
                    const expertSequences = chordSequences.filter(seq => 
                      seq.difficulty === 'Experto' || seq.difficulty === 'Virtuoso'
                    );
                    const randomExpert = expertSequences[Math.floor(Math.random() * expertSequences.length)];
                    const expertIndex = chordSequences.findIndex(seq => seq === randomExpert);
                    setCurrentSequence(expertIndex);
                  }}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  🔥 Desafío
                </button>
              </div>
            </div>
            
            {/* Progreso General */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Progreso General</h3>
              
              <div className="space-y-3">
                {[1, 2, 3, 4].map(phase => {
                  const progress = getPhaseProgress(phase);
                  return (
                    <div key={phase}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fase {phase}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{width: `${progress}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-700">
                  Ejercicios completados: {completedExercises.length}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  ¡Sigue practicando para desbloquear nuevos sonidos!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips según la fase */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Consejos para la Fase {currentPhase}</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            {currentPhase === 1 && (
              <>
                <div>• Toca cada acorde en 3 posiciones diferentes del mástil</div>
                <div>• Escucha el cambio de color que aporta cada tensión</div>
                <div>• Mantén tempo lento (60 BPM) para apreciar cada sonido</div>
                <div>• Practica las inversiones con movimientos fluidos</div>
              </>
            )}
            {currentPhase === 2 && (
              <>
                <div>• Deja resonar cada acorde para escuchar su carácter</div>
                <div>• Pregúntate qué emociones evoca cada escala</div>
                <div>• Busca el sabor étnico en escalas húngaras y árabes</div>
                <div>• Compara directamente acordes de diferentes escalas</div>
              </>
            )}
            {currentPhase === 3 && (
              <>
                <div>• No pares aunque te equivoques - mantén el flujo</div>
                <div>• Busca la posición más cercana para el siguiente acorde</div>
                <div>• Graba tu progreso para autoevaluarte</div>
                <div>• Incrementa gradualmente el tempo</div>
              </>
            )}
            {currentPhase === 4 && (
              <>
                <div>• Reharmoniza canciones que ya conozcas</div>
                <div>• Experimenta con diferentes contextos armónicos</div>
                <div>• Crea tus propias progresiones mezclando escalas</div>
                <div>• Graba improvisaciones usando los acordes nuevos</div>
              </>
            )}
          </div>

          {/* Guía de Dificultad */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">🎯 Guía de Niveles de Dificultad</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-semibold text-green-700 mb-1">📗 Intermedio</div>
                <div className="text-green-600">Tensiones básicas (9, 11, 13). Posiciones cómodas. Ideal para empezar.</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="font-semibold text-orange-700 mb-1">📘 Avanzado</div>
                <div className="text-orange-600">Drop voicings, inversiones, saltos de posición. Requiere digitación sólida.</div>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="font-semibold text-red-700 mb-1">📕 Experto</div>
                <div className="text-red-600">Wide stretches, hybrid picking, posiciones complejas. Para guitarristas experimentados.</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <div className="font-semibold text-purple-700 mb-1">📜 Virtuoso</div>
                <div className="text-purple-600">Tapping, técnica extendida, saltos extremos. Límites de la guitarra.</div>
              </div>
            </div>
          </div>

          {/* Desafíos Especiales */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-3">🏆 Desafíos Especiales Desbloqueados</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded">
                <div className="font-semibold text-purple-700">🎸 Desafío Técnica Extendida</div>
                <div className="text-purple-600 text-xs mt-1">Secuencia 9: Tapping, wide stretches y posiciones extremas del mástil</div>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded">
                <div className="font-semibold text-red-700">🔥 Desafío Quartal</div>
                <div className="text-red-600 text-xs mt-1">Secuencia 8: Armonía por cuartas con suspensiones complejas</div>
              </div>
              <div className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 border border-indigo-200 rounded">
                <div className="font-semibold text-indigo-700">⚡ Desafío Híbrido</div>
                <div className="text-indigo-600 text-xs mt-1">Secuencia 5: Hybrid picking con voicings complejos</div>
              </div>
            </div>
          </div>

          {/* Consejos Técnicos para Guitarra */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-3">🎸 Consejos Técnicos Específicos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-blue-700">Digitación Avanzada:</div>
                <div className="text-gray-600 text-xs">
                  • Usa el pulgar para notas graves en la 6ta cuerda<br/>
                  • Practica stretches de 5+ trastes gradualmente<br/>
                  • Mute cuerdas que no suenan con dedos libres<br/>
                  • Hybrid picking (púa + dedos) para arpeggios complejos
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-green-700">Posiciones y Voicings:</div>
                <div className="text-gray-600 text-xs">
                  • Los números romanos indican el traste base<br/>
                  • Drop 2 voicings: baja la 2da nota más aguda una octava<br/>
                  • Inversiones: experimenta con diferentes bajos<br/>
                  • Wide voicings: separa las notas por el mástil
                </div>
              </div>
            </div>
            
            {/* Teoría de la Escala Actual */}
            <div className="border-t pt-4 mt-4">
              <h4 className="font-semibold text-gray-800 mb-3">📚 Escala en Foco</h4>
              {(() => {
                const currentScaleInfo = getScaleInfo(chordSequences[currentSequence].scales[0]);
                return currentScaleInfo ? (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-indigo-800">{currentScaleInfo.name}</h5>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(currentScaleInfo.difficulty)}`}>
                        {currentScaleInfo.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-indigo-700 mb-2">{currentScaleInfo.characteristics}</div>
                    <div className="text-xs text-indigo-600">
                      <strong>Emociones:</strong> {currentScaleInfo.emotions}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    Información teórica no disponible para esta escala
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;