import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, Star, Music, Play, Pause, Lock, Unlock } from 'lucide-react';
import ScaleTheoryPanel from './ScaleTheoryPanel';
import Metronome from './Metronome';
import { getScaleInfo } from '../data/scaleTheory';

const ChordExplorer = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [tempo, setTempo] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseActive, setIsExerciseActive] = useState(false);

  // Definir qué secuencias corresponden a cada fase
  const phaseSequences = {
    1: [0, 1], // Secuencias 1-2: Básicas e intermedias
    2: [2, 3], // Secuencias 3-4: Exploración sonora
    3: [4, 5], // Secuencias 5-6: Fluidez y velocidad
    4: [6, 7, 8, 9], // Secuencias 7-10: Aplicación musical avanzada
    5: [10, 11], // Secuencias 11-12: Retos mentales extremos
    6: [12, 13], // Secuencias 13-14: Técnica imposible
    7: [14] // Secuencia 15: Transcendencia total
  };

  const chordSequences = [
    {
      name: "Secuencia 1 - Mayor/Dórico/Bebop",
      chords: ["Cmaj9", "Dm11", "G13", "Em7b5", "Am9", "F#m7b5", "Bm7b5", "E7alt", "Fmaj7#11", "C6/9"],
      scales: ["Mayor", "Dórico", "Bebop", "Locrio", "Menor Natural", "Menor Armónica", "Locrio", "Alterada", "Lidio", "Mayor"],
      difficulty: "Intermedio",
      positions: ["VIII", "V", "III", "VII", "V", "II", "VII", "VII", "I", "III"],
      phase: 1,
      tempoRange: [60, 80]
    },
    {
      name: "Secuencia 2 - Frigio/Húngara/Japonesa",
      chords: ["Dm(maj7)", "Bb7#11", "F#dim7", "Cmaj7#5", "Ab7b5", "Gm6/9", "D7#9#11", "Em7add11", "A7sus4b9", "Dm9"],
      scales: ["Menor Melódica", "Lidio", "Disminuida", "Tonos Enteros", "Frigio", "Dórico", "Húngara", "Japonesa", "Frigio", "Menor Natural"],
      difficulty: "Intermedio",
      positions: ["V", "VI", "II", "III", "IV", "III", "V", "VII", "V", "V"],
      phase: 1,
      tempoRange: [60, 90]
    },
    {
      name: "Secuencia 3 - Alterada/Bebop/Mixolidio",
      chords: ["G7#5#9", "Cmaj9#11", "Am7b5", "D7b9b13", "Gm(maj9)", "C13", "F7#11", "Bm7b5", "Em9", "A7alt"],
      scales: ["Alterada", "Lidio", "Locrio", "Frigio", "Menor Melódica", "Mixolidio", "Bebop", "Menor Armónica", "Dórico", "Alterada"],
      difficulty: "Avanzado",
      positions: ["III", "VIII", "V", "X", "III", "VIII", "I", "VII", "VII", "V"],
      phase: 2,
      tempoRange: [70, 100]
    },
    {
      name: "Secuencia 4 - Drop 2 Avanzada",
      chords: ["Fmaj13#11", "Dm9/F", "G7#5b9", "Em7b5/G", "Am(maj9)", "F#m7b5/A", "B7alt/D#", "Em11b5", "A7b13#9", "Dm(maj7)"],
      scales: ["Lidio", "Dórico", "Alterada", "Locrio", "Menor Melódica", "Menor Armónica", "Alterada", "Locrio", "Alterada", "Menor Melódica"],
      difficulty: "Avanzado",
      positions: ["I", "I", "III", "III", "V", "V", "VII", "VII", "V", "V"],
      phase: 2,
      tempoRange: [80, 110]
    },
    {
      name: "Secuencia 5 - Híbrido Picking Complex",
      chords: ["C7#11/G", "Am7b5add11", "D7alt/C", "Gm(maj7)/D", "C13b9", "F7#11b13", "Bm7b5/F", "E7#9b13", "Am6/9b5", "Dm(maj13)"],
      scales: ["Lidio", "Locrio", "Alterada", "Menor Melódica", "Mixolidio", "Lidio", "Locrio", "Alterada", "Menor Natural", "Menor Melódica"],
      difficulty: "Avanzado",
      positions: ["III", "V", "III", "V", "VIII", "I", "VII", "VII", "V", "V"],
      phase: 3,
      tempoRange: [90, 130]
    },
    {
      name: "Secuencia 6 - Tapping & Extended Range",
      chords: ["Em11addb9", "A7#9b13sus4", "Dm(maj7)add11", "G13b5b9", "Cmaj9#11/E", "F#m7b5addb13", "B7alt/A", "Em7b5add#9", "Am(maj9)b6", "D7#11b13"],
      scales: ["Frigio", "Alterada", "Menor Melódica", "Alterada", "Lidio", "Locrio", "Alterada", "Locrio", "Menor Armónica", "Alterada"],
      difficulty: "Experto",
      positions: ["XII", "V", "X", "III", "VIII", "II", "VII", "VII", "V", "X"],
      phase: 3,
      tempoRange: [100, 150]
    },
    {
      name: "Secuencia 7 - Wide Interval Voicings",
      chords: ["Fmaj7b5add9", "Dm7b5b9add11", "G7#5b9add#11", "Cmaj7add#9#11", "Am7addb13b9", "D7altadd#4", "Gm(maj7)add#5", "C7b5addb9#11", "Fmaj9b6add#4", "Bb13b5add#9"],
      scales: ["Lidio", "Locrio", "Alterada", "Lidio", "Menor Natural", "Alterada", "Menor Melódica", "Alterada", "Lidio", "Mixolidio"],
      difficulty: "Experto",
      positions: ["I", "V", "III", "VIII", "V", "X", "III", "VIII", "I", "VI"],
      phase: 4,
      tempoRange: [110, 160]
    },
    {
      name: "Secuencia 8 - Quartal/Quintal Stack",
      chords: ["Dm11/A", "G7sus4addb9#11", "Cm(maj7)sus4add#5", "F13sus2add#4", "Bm7b5sus4addb13", "E7altsus4add#9", "Am7sus4addb6b9", "D7susb2add#5#11", "Gm(maj9)sus4", "C13sus4b5add#9"],
      scales: ["Dórico", "Mixolidio", "Menor Melódica", "Lidio", "Locrio", "Alterada", "Menor Natural", "Alterada", "Menor Melódica", "Mixolidio"],
      difficulty: "Experto",
      positions: ["V", "III", "III", "I", "VII", "VII", "V", "X", "III", "VIII"],
      phase: 4,
      tempoRange: [120, 170]
    },
    {
      name: "Secuencia 9 - Extended Technique Master",
      chords: ["Em7b5b9/D", "A7#5#9#11/C#", "Dm(maj13)/C", "G7b5b9#11/F", "Cmaj9#11/B", "F#m7b5#11/E", "B7altb13/A", "Em(maj7)#5/D#", "Am9b13/G", "D7#9#11b13/C"],
      scales: ["Locrio", "Alterada", "Menor Melódica", "Alterada", "Lidio", "Locrio", "Alterada", "Menor Melódica", "Menor Natural", "Alterada"],
      difficulty: "Virtuoso",
      positions: ["VII", "IV", "VIII", "I", "VII", "II", "VII", "XI", "III", "X"],
      phase: 4,
      tempoRange: [130, 180]
    },
    {
      name: "Secuencia 10 - Ultimate Guitar Challenge",
      chords: ["Fm(maj7)#11/Eb", "Bb7b5#9add#11/Ab", "Ebmaj9b6/D", "Am7b5b13/G", "D7#5#9#11/C", "Gm(maj9)#11/F", "C7altb13add#4/Bb", "Fm7b5#9/Eb", "Bb13b5#11/Ab", "Ebmaj7#5b9/D"],
      scales: ["Menor Armónica", "Alterada", "Lidio", "Locrio", "Alterada", "Menor Melódica", "Alterada", "Locrio", "Mixolidio", "Lidio"],
      difficulty: "Virtuoso",
      positions: ["VI", "VI", "VI", "III", "VIII", "III", "VI", "VI", "VI", "VI"],
      phase: 4,
      tempoRange: [140, 200]
    },
    // NUEVAS SECUENCIAS EXTREMAS
    {
      name: "Secuencia 11 - Modulación Constante",
      chords: ["C#m(maj7)#11/B", "F7altb13/Eb", "Bbmaj9#5/A", "Dm7b5b9/C", "G#7#9#11/F#", "Cmaj13b5/B", "F#m(maj9)/E", "B7altb13/A", "Em7#11b13/D", "A7#5b9/G"],
      scales: ["Menor Melódica", "Alterada", "Lidio", "Locrio", "Alterada", "Lidio", "Menor Melódica", "Alterada", "Locrio", "Alterada"],
      difficulty: "Demencial",
      positions: ["IX", "VI", "VI", "V", "IV", "VII", "VII", "VII", "VII", "V"],
      phase: 5,
      tempoRange: [150, 220],
      specialTechnique: "Modulación cada 2 acordes + Saltos de posición extremos"
    },
    {
      name: "Secuencia 12 - Polirritmo Armónico",
      chords: ["Fm(maj13)#11/D#", "Bb7#5b9add#4/G#", "Ebmaj7b6#11/C#", "Am7b5#9b13/F#", "D7altb13add#5/B", "Gm(maj7)#5/E", "C7b5#9#11/A", "Fm7#11b13/D", "Bb13altb5/G", "Ebmaj9#5b13/C"],
      scales: ["Menor Armónica", "Alterada", "Lidio", "Locrio", "Alterada", "Menor Melódica", "Alterada", "Dórico", "Alterada", "Lidio"],
      difficulty: "Demencial",
      positions: ["VI", "IV", "XI", "II", "VII", "III", "V", "X", "III", "VIII"],
      phase: 5,
      tempoRange: [160, 240],
      specialTechnique: "Ritmo 7/8 + Voicings imposibles + Cambios de afinación mental"
    },
    {
      name: "Secuencia 13 - Microtonalidad Simulada",
      chords: ["C7#9b13add#4/B", "F#m(maj7)b5#11/E", "Bb7altb9add#5/Ab", "Ebmaj13#5b9/D", "G#m7b5#9b13/F#", "C#7alt#11b5/B", "Fmaj7#5b13add#9/E", "Bm(maj9)b5#11/A", "E7#5#9b13add#4/D", "Am(maj13)#5b9/G"],
      scales: ["Alterada", "Menor Armónica", "Alterada", "Lidio", "Locrio", "Alterada", "Lidio", "Menor Melódica", "Alterada", "Menor Armónica"],
      difficulty: "Imposible",
      positions: ["VII", "VII", "VI", "VI", "IV", "VII", "I", "V", "VII", "III"],
      phase: 6,
      tempoRange: [180, 260],
      specialTechnique: "Bends microtonales + Tapping a 3 manos + Preparación mental extrema"
    },
    {
      name: "Secuencia 14 - Caos Controlado",
      chords: ["Db7#5#9#11b13/C", "Gmaj7#5b9add#4/F#", "Cm(maj13)b5#11/Bb", "F#7altb9add#5/E", "Bmaj9#11b13/A#", "Em7b5#9add#4/D", "A7#5altb13/G#", "Dm(maj7)#5b9/C#", "G#7#9#11b5/F#", "Cmaj13altb5/B"],
      scales: ["Alterada", "Lidio", "Menor Armónica", "Alterada", "Lidio", "Locrio", "Alterada", "Menor Melódica", "Alterada", "Lidio"],
      difficulty: "Imposible",
      positions: ["I", "II", "III", "V", "VII", "VII", "IV", "V", "IV", "VII"],
      phase: 6,
      tempoRange: [200, 280],
      specialTechnique: "Cambio de posición cada acorde + Técnicas simultáneas + Memoria fotográfica"
    },
    {
      name: "Secuencia 15 - Transcendencia Musical",
      chords: ["F#m(maj9)#11b13/E#", "B7#5altb9add#4/A#", "Emaj13#5b9/D#", "A#m7b5#9#11/G#", "D#7altb13add#5/C#", "G#m(maj7)#5b9/F#", "C#7#9#11b5add#4/B", "F#maj9altb13/E#", "Bm(maj13)#5b9/A#", "E7#5#9#11b13/D#"],
      scales: ["Menor Melódica", "Alterada", "Lidio", "Locrio", "Alterada", "Menor Armónica", "Alterada", "Lidio", "Menor Melódica", "Alterada"],
      difficulty: "Transcendental",
      positions: ["II", "VII", "IV", "VI", "VI", "II", "IV", "II", "VII", "IV"],
      phase: 7,
      tempoRange: [220, 300],
      specialTechnique: "Ejecución ciega + Improvisación simultánea + Canto de intervalos + Meditación activa"
    }
  ];

  const exercises = {
    1: {
      title: "FASE 1: Construcción Gradual",
      description: "Familiarízate con tensiones básicas usando las primeras secuencias",
      exercises: [
        { 
          name: "Acordes Base + Una Tensión", 
          duration: "15 min", 
          sequence: 0,
          instructions: "Toca la Secuencia 1 a 60 BPM. Enfócate en la limpieza de cada acorde.",
          targetTempo: 60
        },
        { 
          name: "Cadenas de Inversiones", 
          duration: "10 min", 
          sequence: 1,
          instructions: "Usa la Secuencia 2. Practica las inversiones cambiando el bajo.",
          targetTempo: 70
        }
      ]
    },
    2: {
      title: "FASE 2: Exploración Sonora",
      description: "Descubre el carácter de cada escala con secuencias intermedias",
      exercises: [
        { 
          name: "Pintura Sonora - Alterada", 
          duration: "10 min", 
          sequence: 2,
          instructions: "Secuencia 3 a 70 BPM. Escucha las tensiones alteradas y su resolución.",
          targetTempo: 70
        },
        { 
          name: "Pintura Sonora - Drop 2", 
          duration: "10 min", 
          sequence: 3,
          instructions: "Secuencia 4 a 80 BPM. Siente la sonoridad de los drop 2 voicings.",
          targetTempo: 80
        },
        { 
          name: "Comparación Directa", 
          duration: "15 min", 
          sequence: 2,
          instructions: "Alterna entre Secuencias 3 y 4. Compara los colores armónicos.",
          targetTempo: 75
        }
      ]
    },
    3: {
      title: "FASE 3: Fluidez y Velocidad",
      description: "Automatiza las posiciones con secuencias avanzadas",
      exercises: [
        { 
          name: "Secuencias Rápidas", 
          duration: "20 min", 
          sequence: 4,
          instructions: "Secuencia 5 (Hybrid Picking). Empieza a 90 BPM, sube hasta 130 BPM.",
          targetTempo: 110
        },
        { 
          name: "Técnica Extendida", 
          duration: "15 min", 
          sequence: 5,
          instructions: "Secuencia 6 (Tapping). Usa técnicas avanzadas. 100-150 BPM.",
          targetTempo: 125
        }
      ]
    },
    4: {
      title: "FASE 4: Aplicación Musical",
      description: "Usa los acordes en contexto musical con secuencias expertas",
      exercises: [
        { 
          name: "Reharmonización Creativa", 
          duration: "25 min", 
          sequence: 6,
          instructions: "Secuencia 7 (Wide Voicings). Crea variaciones armónicas. 110-160 BPM.",
          targetTempo: 135
        },
        { 
          name: "Quartal Harmony", 
          duration: "20 min", 
          sequence: 7,
          instructions: "Secuencia 8 (Quartal). Explora armonía por cuartas. 120-170 BPM.",
          targetTempo: 145
        },
        { 
          name: "Técnica Virtuosa", 
          duration: "30 min", 
          sequence: 8,
          instructions: "Secuencia 9 (Extended Technique). Técnicas avanzadas. 130-180 BPM.",
          targetTempo: 155
        },
        { 
          name: "Desafío Final", 
          duration: "35 min", 
          sequence: 9,
          instructions: "Secuencia 10 (Ultimate Challenge). ¡El reto máximo! 140-200 BPM.",
          targetTempo: 170
        }
      ]
    },
    5: {
      title: "FASE 5: Retos Mentales Extremos",
      description: "Modulaciones constantes y cambios de escala que desafían tu comprensión armónica",
      exercises: [
        { 
          name: "Modulación Cada 2 Acordes", 
          duration: "45 min", 
          sequence: 10,
          instructions: "Secuencia 11. Cambia de centro tonal cada 2 acordes. Memoriza las modulaciones.",
          targetTempo: 150,
          mentalChallenge: "Identifica la nueva tonalidad en tiempo real"
        },
        { 
          name: "Polirritmo Armónico 7/8", 
          duration: "40 min", 
          sequence: 11,
          instructions: "Secuencia 12 en compás 7/8. Mantén el patrón rítmico mientras cambias voicings.",
          targetTempo: 160,
          mentalChallenge: "Coordina ritmo irregular con armonía compleja"
        },
        { 
          name: "Improvisación Sobre Caos", 
          duration: "50 min", 
          sequence: 10,
          instructions: "Improvisa melodías sobre Secuencia 11. Cada nota debe justificar la escala.",
          targetTempo: 140,
          mentalChallenge: "Improvisa coherentemente sobre modulaciones extremas"
        }
      ]
    },
    6: {
      title: "FASE 6: Técnica Imposible",
      description: "Combinaciones de técnicas que parecen físicamente imposibles",
      exercises: [
        { 
          name: "Tapping + Hybrid + Bends", 
          duration: "60 min", 
          sequence: 12,
          instructions: "Secuencia 13. Tapping con mano derecha, hybrid picking, bends microtonales simultáneos.",
          targetTempo: 180,
          mentalChallenge: "Coordina 3 técnicas avanzadas simultáneamente"
        },
        { 
          name: "Cambio de Posición Extremo", 
          duration: "55 min", 
          sequence: 13,
          instructions: "Secuencia 14. Cada acorde en posición diferente. Saltos de 5+ trastes.",
          targetTempo: 200,
          mentalChallenge: "Navegación instantánea del mástil completo"
        },
        { 
          name: "Ejecución Ciega Total", 
          duration: "70 min", 
          sequence: 12,
          instructions: "Secuencia 13 con ojos cerrados. Solo guíate por el tacto y el oído.",
          targetTempo: 160,
          mentalChallenge: "Ejecución perfecta sin referencia visual"
        }
      ]
    },
    7: {
      title: "FASE 7: Transcendencia Musical",
      description: "El nivel final. Maestría absoluta que trasciende la técnica",
      exercises: [
        { 
          name: "Meditación Armónica", 
          duration: "90 min", 
          sequence: 14,
          instructions: "Secuencia 15. Toca mientras meditas. Cada acorde debe ser una experiencia espiritual.",
          targetTempo: 220,
          mentalChallenge: "Fusión total entre mente, cuerpo y música"
        },
        { 
          name: "Improvisación Transcendental", 
          duration: "120 min", 
          sequence: 14,
          instructions: "Crea música nueva usando Secuencia 15 como base. Trasciende las reglas.",
          targetTempo: 250,
          mentalChallenge: "Creatividad pura sin limitaciones técnicas"
        },
        { 
          name: "Enseñanza Simultánea", 
          duration: "150 min", 
          sequence: 14,
          instructions: "Toca Secuencia 15 mientras explicas la teoría a un estudiante imaginario.",
          targetTempo: 280,
          mentalChallenge: "Ejecución perfecta + enseñanza + análisis teórico simultáneo"
        }
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

  // Timer para ejercicios
  useEffect(() => {
    let interval;
    if (isExerciseActive) {
      interval = setInterval(() => {
        setExerciseTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseActive]);

  const startExercise = (phaseNum, exerciseIndex) => {
    const exercise = exercises[phaseNum].exercises[exerciseIndex];
    setActiveExercise({ phase: phaseNum, index: exerciseIndex });
    setCurrentSequence(exercise.sequence);
    setTempo(exercise.targetTempo);
    setExerciseTimer(0);
    setIsExerciseActive(true);
    setIsPlaying(true);
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setIsExerciseActive(false);
    setIsPlaying(false);
    setExerciseTimer(0);
  };

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

  const isPhaseUnlocked = (phase) => {
    if (phase === 1) return true;
    const previousPhase = phase - 1;
    return getPhaseProgress(previousPhase) >= 75; // 75% para desbloquear siguiente fase
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            {[1, 2, 3, 4].map(phase => {
              const unlocked = isPhaseUnlocked(phase);
              return (
                <button
                  key={phase}
                  onClick={() => unlocked && setCurrentPhase(phase)}
                  disabled={!unlocked}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    currentPhase === phase
                      ? 'bg-blue-600 text-white shadow-md'
                      : unlocked
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  {unlocked ? <Unlock size={16} /> : <Lock size={16} />}
                  Fase {phase}
                  <div className="text-xs mt-1">
                    {getPhaseProgress(phase)}%
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ejercicio Activo */}
        {activeExercise && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  🎯 Ejercicio Activo: {exercises[activeExercise.phase].exercises[activeExercise.index].name}
                </h3>
                <p className="opacity-90">
                  {exercises[activeExercise.phase].exercises[activeExercise.index].instructions}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{formatTime(exerciseTimer)}</div>
                <div className="text-sm opacity-75">
                  Meta: {exercises[activeExercise.phase].exercises[activeExercise.index].duration}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={stopExercise}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                Terminar Ejercicio
              </button>
              <button
                onClick={() => toggleExercise(activeExercise.phase, activeExercise.index)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Marcar Completado
              </button>
            </div>
          </div>
        )}

        {/* Contenido Principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Panel Principal de Ejercicios */}
          <div className="lg:col-span-2 space-y-6">
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
                {exercises[currentPhase].exercises.map((exercise, index) => {
                  const isActive = activeExercise?.phase === currentPhase && activeExercise?.index === index;
                  const isCompleted = isExerciseCompleted(currentPhase, index);
                  
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : isCompleted
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleExercise(currentPhase, index)}
                            className={`p-2 rounded-full ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                            } transition-colors`}
                          >
                            <Check size={16} />
                          </button>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">Duración: {exercise.duration}</p>
                            <p className="text-xs text-blue-600">{exercise.instructions}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isCompleted && <Star className="text-yellow-500 fill-current" size={20} />}
                          <button
                            onClick={() => startExercise(currentPhase, index)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              isActive
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isActive ? 'En Curso' : 'Iniciar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Información de Desbloqueo */}
              {currentPhase < 4 && getPhaseProgress(currentPhase) < 75 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔓 Desbloquear Siguiente Fase</h4>
                  <p className="text-sm text-yellow-700">
                    Completa al menos 75% de los ejercicios de esta fase para desbloquear la Fase {currentPhase + 1}.
                    Progreso actual: {getPhaseProgress(currentPhase)}%
                  </p>
                </div>
              )}
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
                  </div>
                </div>
                
                {/* Alertas de dificultad */}
                {chordSequences[currentSequence].difficulty === 'Virtuoso' && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-700 mt-2">
                    🎸 <strong>Nivel Virtuoso:</strong> Requiere técnicas avanzadas como tapping, wide stretches y hybrid picking. ¡Calienta bien antes de intentar!
                  </div>
                )}
                {chordSequences[currentSequence].difficulty === 'Experto' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mt-2">
                    🔥 <strong>Nivel Experto:</strong> Voicings complejos con saltos de posición. Usa todas las técnicas de digitación disponibles.
                  </div>
                )}
              </div>
              
              {/* Grid de Acordes - Más grande en el área principal */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6 max-h-80 overflow-y-auto">
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
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const phaseSeqs = phaseSequences[currentPhase] || [];
                    const currentIndex = phaseSeqs.indexOf(currentSequence);
                    const nextIndex = (currentIndex + 1) % phaseSeqs.length;
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
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Panel de Teoría Musical */}
            <ScaleTheoryPanel />
            
            {/* Metrónomo */}
            <Metronome 
              tempo={tempo}
              setTempo={setTempo}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
            
            {/* Progreso General */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Progreso General</h3>
              
              <div className="space-y-3">
                {[1, 2, 3, 4].map(phase => {
                  const progress = getPhaseProgress(phase);
                  const unlocked = isPhaseUnlocked(phase);
                  return (
                    <div key={phase} className={unlocked ? '' : 'opacity-50'}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          {unlocked ? <Unlock size={14} /> : <Lock size={14} />}
                          Fase {phase}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            unlocked 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : 'bg-gray-400'
                          }`}
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
                  ¡Completa 75% de cada fase para desbloquear la siguiente!
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
                <div>• Mantén tempo lento (60-80 BPM) para apreciar cada sonido</div>
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
                <div>• Incrementa gradualmente el tempo (90-150 BPM)</div>
              </>
            )}
            {currentPhase === 4 && (
              <>
                <div>• Reharmoniza canciones que ya conozcas</div>
                <div>• Experimenta con diferentes contextos armónicos</div>
                <div>• Crea tus propias progresiones mezclando escalas</div>
                <div>• Domina técnicas virtuosas (110-200 BPM)</div>
              </>
            )}
          </div>

          {/* Secuencias de la Fase Actual */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">🎼 Secuencias de esta Fase</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {phaseSequences[currentPhase]?.map(seqIndex => {
                const seq = chordSequences[seqIndex];
                return (
                  <div 
                    key={seqIndex}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      currentSequence === seqIndex
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentSequence(seqIndex)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-800">{seq.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(seq.difficulty)}`}>
                        {seq.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Tempo: {seq.tempoRange[0]}-{seq.tempoRange[1]} BPM
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guía de Dificultad */}
          <div className="border-t pt-4 mt-4">
            <h4 className="font-semibold text-gray-800 mb-3">🎯 Sistema de Progresión</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <div className="font-semibold text-green-700 mb-1">📗 Fase 1</div>
                <div className="text-green-600">Construcción gradual. Tensiones básicas (9, 11, 13). Tempo 60-90 BPM.</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="font-semibold text-orange-700 mb-1">📘 Fase 2</div>
                <div className="text-orange-600">Exploración sonora. Drop voicings, colores armónicos. Tempo 70-110 BPM.</div>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="font-semibold text-red-700 mb-1">📕 Fase 3</div>
                <div className="text-red-600">Fluidez y velocidad. Técnicas avanzadas, hybrid picking. Tempo 90-150 BPM.</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <div className="font-semibold text-purple-700 mb-1">📜 Fase 4</div>
                <div className="text-purple-600">Aplicación musical. Técnicas virtuosas, tapping. Tempo 110-200 BPM.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordExplorer;