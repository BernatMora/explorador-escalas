import React, { useState } from 'react';
import { Music, Hand, Brain, Target, Guitar, Zap, Eye, AlertTriangle, Volume2 } from 'lucide-react';

interface ChordAnatomyPanelProps {
  selectedChord: {
    name: string;
    scale: string;
    position: number;
    index: number;
  } | null;
}

interface ChordInfo {
  notes: string[];
  intervals: string[];
  fingering: string[];
  rightHandTechnique: string;
  leftHandTips: string[];
  commonMistakes: string[];
  practiceNotes: string;
  difficulty: string;
  fretDiagram: number[];
  musicalFunction: string;
  voicingType: string;
  alternativeVoicings: string[];
}

const chordDatabase: Record<string, ChordInfo> = {
  "Cmaj7": {
    notes: ["C", "E", "G", "B"],
    intervals: ["1", "3", "5", "7"],
    fingering: [
      "Traste 8: Índice en 6ª cuerda (C)",
      "Traste 10: Anular en 4ª cuerda (E)", 
      "Traste 9: Medio en 3ª cuerda (G)",
      "Traste 8: Meñique en 1ª cuerda (B)"
    ],
    rightHandTechnique: "Fingerpicking suave con énfasis en la fundamental (C). Usa pulgar para 6ª cuerda, índice-medio-anular para cuerdas agudas.",
    leftHandTips: [
      "Mantén el pulgar centrado detrás del mástil",
      "Curvatura natural de dedos, como sosteniendo una pelota",
      "Presión mínima necesaria para que suenen claras",
      "Muñeca recta, sin doblar hacia arriba o abajo"
    ],
    commonMistakes: [
      "Presionar demasiado fuerte causando tensión",
      "Tocar cuerdas al aire no deseadas (2ª y 5ª)",
      "Pulgar demasiado alto en el mástil",
      "Dedos planos en lugar de curvados"
    ],
    practiceNotes: "Practica el voicing nota por nota primero. Construye: C (fundamental) → E (3ra) → G (5ta) → B (7ma). Escucha cómo cada nota cambia el color del acorde.",
    difficulty: "Intermedio",
    fretDiagram: [8, 0, 9, 10, 0, 8],
    musicalFunction: "Acorde de tónica mayor con 7ma mayor. Estable y luminoso, perfecto para resoluciones.",
    voicingType: "Drop 2 voicing - 7ma en la voz superior",
    alternativeVoicings: ["Cmaj9 (añadir D)", "C6/9 (cambiar B por A y añadir D)", "Cmaj7#11 (añadir F#)"]
  },
  "Am7": {
    notes: ["A", "C", "E", "G"],
    intervals: ["1", "b3", "5", "b7"],
    fingering: [
      "Traste 5: Índice en 6ª cuerda (A)",
      "Traste 5: Medio en 4ª cuerda (C)",
      "Traste 5: Anular en 3ª cuerda (E)", 
      "Traste 5: Meñique en 2ª cuerda (G)"
    ],
    rightHandTechnique: "Arpegio descendente suave. Resalta la 7ma menor (G) para el color característico del acorde menor.",
    leftHandTips: [
      "Posición de cejilla parcial en traste 5",
      "Todos los dedos alineados en el mismo traste",
      "Presión uniforme en todas las cuerdas",
      "Silencia las cuerdas 1ª y 5ª con el índice"
    ],
    commonMistakes: [
      "Cejilla demasiado tensa causando fatiga",
      "No silenciar cuerdas no utilizadas",
      "Presión desigual entre dedos",
      "Posición del pulgar incorrecta"
    ],
    practiceNotes: "Excelente para practicar cejillas parciales. Enfócate en la presión mínima necesaria. La 7ma menor (G) es clave para el sonido.",
    difficulty: "Intermedio",
    fretDiagram: [5, 0, 5, 5, 0, 0],
    musicalFunction: "Acorde de función subdominante menor. Melancólico pero estable.",
    voicingType: "Voicing cerrado con todas las notas en 4 trastes",
    alternativeVoicings: ["Am9 (añadir B)", "Am6 (cambiar G por F#)", "Am(maj7) (cambiar G por G#)"]
  },
  "Fmaj7": {
    notes: ["F", "A", "C", "E"],
    intervals: ["1", "3", "5", "7"],
    fingering: [
      "Traste 1: Cejilla completa con índice",
      "Traste 3: Anular en 4ª cuerda (A)",
      "Traste 2: Medio en 3ª cuerda (C)",
      "Cuerda 1ª al aire silenciada o traste 1 (E)"
    ],
    rightHandTechnique: "Fingerpicking cuidadoso. La cejilla requiere técnica limpia. Evita tocar cuerdas que no suenan claras.",
    leftHandTips: [
      "Cejilla firme pero no excesiva en traste 1",
      "Pulgar bien posicionado detrás del mástil",
      "Dedos curvados para evitar tocar cuerdas adyacentes",
      "Práctica la cejilla por separado primero"
    ],
    commonMistakes: [
      "Cejilla mal ejecutada con notas apagadas",
      "Demasiada presión causando tensión",
      "Pulgar demasiado alto",
      "No practicar la cejilla gradualmente"
    ],
    practiceNotes: "Fundamental para dominar las cejillas. Comienza con cejilla parcial, luego completa. La 7ma mayor (E) da el color brillante.",
    difficulty: "Avanzado",
    fretDiagram: [1, 3, 2, 3, 1, 1],
    musicalFunction: "Acorde de subdominante mayor con 7ma mayor. Luminoso y expansivo.",
    voicingType: "Cejilla completa - voicing fundamental para guitarra",
    alternativeVoicings: ["Fmaj9 (añadir G)", "F6/9 (cambiar E por D y añadir G)", "Fmaj7#11 (añadir B)"]
  },
  "G7": {
    notes: ["G", "B", "D", "F"],
    intervals: ["1", "3", "5", "b7"],
    fingering: [
      "Traste 3: Anular en 6ª cuerda (G)",
      "Traste 2: Índice en 5ª cuerda (B)",
      "Cuerda 4ª al aire (D)",
      "Traste 3: Meñique en 1ª cuerda (F)"
    ],
    rightHandTechnique: "Strumming con énfasis en la 7ma menor (F). Perfecto para ritmos de blues y swing.",
    leftHandTips: [
      "Dedos bien curvados para evitar tocar cuerdas adyacentes",
      "No tocar la 4ª cuerda si no está en el voicing",
      "Transición suave desde otros acordes",
      "Mantén la muñeca relajada"
    ],
    commonMistakes: [
      "Tocar cuerdas que deben estar silenciadas",
      "Presión excesiva en los dedos",
      "Mala transición desde otros acordes",
      "No enfatizar la función dominante"
    ],
    practiceNotes: "Acorde dominante clásico, esencial para el blues y jazz. La 7ma menor (F) crea la tensión que quiere resolver a C.",
    difficulty: "Intermedio",
    fretDiagram: [3, 2, 0, 0, 0, 3],
    musicalFunction: "Dominante clásico. Crea tensión que resuelve naturalmente a Cmaj7.",
    voicingType: "Voicing abierto con cuerdas al aire",
    alternativeVoicings: ["G9 (añadir A)", "G13 (añadir E)", "G7alt (alteraciones diversas)"]
  },
  "Cmaj7#11": {
    notes: ["C", "E", "G", "B", "F#"],
    intervals: ["1", "3", "5", "7", "#11"],
    fingering: [
      "Traste 8: Índice en 6ª cuerda (C)",
      "Traste 9: Medio en 4ª cuerda (E)",
      "Traste 10: Anular en 3ª cuerda (G)",
      "Traste 11: Meñique en 2ª cuerda (F#)",
      "Traste 8: Índice extendido en 1ª cuerda (B)"
    ],
    rightHandTechnique: "Fingerpicking muy delicado. Resalta la #11 (F#) que da el color lidio característico.",
    leftHandTips: [
      "Estiramiento amplio entre dedos",
      "Precisión extrema en cada dedo",
      "Flexibilidad de muñeca necesaria",
      "Práctica lenta para desarrollar memoria muscular"
    ],
    commonMistakes: [
      "Tensión excesiva por el estiramiento",
      "Notas apagadas por mal estiramiento",
      "Forzar la posición sin calentamiento",
      "No resaltar la nota característica (#11)"
    ],
    practiceNotes: "Requiere flexibilidad y precisión extrema. La #11 (F#) es el alma del modo lidio. Practica el estiramiento gradualmente.",
    difficulty: "Experto",
    fretDiagram: [8, 9, 10, 11, 8, 0],
    musicalFunction: "Tónica lidia - sonido etéreo y flotante. La #11 evita la resolución tradicional.",
    voicingType: "Wide voicing con estiramiento extremo",
    alternativeVoicings: ["Cmaj9#11 (añadir D)", "C6/9#11 (cambiar B por A, añadir D)", "Cmaj13#11 (añadir A)"]
  },
  "G7alt": {
    notes: ["G", "B", "Db", "F", "Ab", "Bb"],
    intervals: ["1", "3", "b5/#11", "b7", "b9/#9", "b13"],
    fingering: [
      "Múltiples voicings posibles",
      "Posición alta recomendada (trastes 7-12)",
      "Selecciona 4-5 notas más importantes",
      "Enfócate en b9, #9, #11, b13"
    ],
    rightHandTechnique: "Hybrid picking para resaltar las alteraciones específicas. Cada nota alterada debe sonar clara.",
    leftHandTips: [
      "Voicing selectivo - no todas las notas simultáneas",
      "Posiciones altas del mástil preferibles",
      "Enfócate en las alteraciones más importantes",
      "Transiciones suaves a la resolución"
    ],
    commonMistakes: [
      "Intentar tocar todas las alteraciones a la vez",
      "No resaltar las tensiones alteradas",
      "Voicings demasiado densos",
      "Mala resolución al acorde siguiente"
    ],
    practiceNotes: "Elige 4-5 notas que mejor representen las alteraciones disponibles. Cada alteración crea un color único.",
    difficulty: "Experto",
    fretDiagram: [3, 4, 3, 4, 4, 3],
    musicalFunction: "Dominante alterado - máxima tensión armónica antes de resolver.",
    voicingType: "Voicing selectivo con alteraciones específicas",
    alternativeVoicings: ["G7b9", "G7#9", "G7#11", "G7b13", "G7#5"]
  },
  "Dm7": {
    notes: ["D", "F", "A", "C"],
    intervals: ["1", "b3", "5", "b7"],
    fingering: [
      "Traste 10: Índice en 6ª cuerda (D)",
      "Traste 10: Medio en 4ª cuerda (F)",
      "Traste 10: Anular en 3ª cuerda (A)",
      "Traste 10: Meñique en 2ª cuerda (C)"
    ],
    rightHandTechnique: "Arpegio suave con énfasis en el carácter dórico si está en contexto modal.",
    leftHandTips: [
      "Cejilla parcial en traste 10",
      "Dedos alineados uniformemente",
      "Presión equilibrada",
      "Silencia cuerdas no utilizadas"
    ],
    commonMistakes: [
      "Presión desigual entre dedos",
      "Cejilla demasiado tensa",
      "No silenciar cuerdas adyacentes",
      "Mala transición desde otros acordes"
    ],
    practiceNotes: "Acorde menor clásico. En contexto dórico, la 6ta mayor (B) lo diferencia del menor natural.",
    difficulty: "Intermedio",
    fretDiagram: [10, 0, 10, 10, 0, 0],
    musicalFunction: "Subdominante menor o ii grado. Función de preparación armónica.",
    voicingType: "Voicing cerrado con cejilla parcial",
    alternativeVoicings: ["Dm9 (añadir E)", "Dm6 (añadir B)", "Dm11 (añadir G)"]
  },
  "Em7": {
    notes: ["E", "G", "B", "D"],
    intervals: ["1", "b3", "5", "b7"],
    fingering: [
      "Traste 12: Índice en 6ª cuerda (E)",
      "Traste 12: Medio en 4ª cuerda (G)",
      "Traste 12: Anular en 3ª cuerda (B)",
      "Traste 12: Meñique en 2ª cuerda (D)"
    ],
    rightHandTechnique: "Fingerpicking suave. En contexto frigio, resalta la b2 (F) si está disponible.",
    leftHandTips: [
      "Posición alta del mástil",
      "Cejilla parcial precisa",
      "Dedos bien curvados",
      "Transiciones suaves"
    ],
    commonMistakes: [
      "Tensión por la posición alta",
      "Dedos planos",
      "Mala afinación por presión excesiva",
      "No aprovechar el contexto modal"
    ],
    practiceNotes: "En modo frigio, la b2 (F) crea el color exótico característico. Practica en diferentes posiciones.",
    difficulty: "Intermedio",
    fretDiagram: [12, 0, 12, 12, 0, 0],
    musicalFunction: "iii grado o acorde frigio. Puede tener función de dominante menor.",
    voicingType: "Voicing cerrado en posición alta",
    alternativeVoicings: ["Em7b5 (cambiar B por Bb)", "Em9 (añadir F#)", "Em11 (añadir A)"]
  }
};

const ChordAnatomyPanel: React.FC<ChordAnatomyPanelProps> = ({ selectedChord }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'technique' | 'theory' | 'practice'>('notes');

  if (!selectedChord) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
        <div className="text-center text-gray-500">
          <Guitar size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Anatomía de Acordes</h3>
          <p className="text-sm">Haz clic en cualquier acorde para ver su información detallada</p>
        </div>
      </div>
    );
  }

  const chordInfo = chordDatabase[selectedChord.name] || {
    notes: ["Información", "no", "disponible"],
    intervals: ["?", "?", "?"],
    fingering: ["Consulta un libro de acordes"],
    rightHandTechnique: "Técnica estándar",
    leftHandTips: ["Mantén buena postura"],
    commonMistakes: ["Consulta un profesor"],
    practiceNotes: "Practica lentamente",
    difficulty: "Variable",
    fretDiagram: [0, 0, 0, 0, 0, 0],
    musicalFunction: "Función no especificada",
    voicingType: "Voicing estándar",
    alternativeVoicings: ["Consulta recursos adicionales"]
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Intermedio': 'text-blue-600 bg-blue-100',
      'Avanzado': 'text-green-600 bg-green-100',
      'Experto': 'text-orange-600 bg-orange-100',
      'Virtuoso': 'text-purple-600 bg-purple-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  const tabs = [
    { id: 'notes', label: 'Notas', icon: Music },
    { id: 'technique', label: 'Técnica', icon: Hand },
    { id: 'theory', label: 'Teoría', icon: Brain },
    { id: 'practice', label: 'Práctica', icon: Target }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-fit">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Guitar size={20} />
            <h3 className="text-lg font-bold">{selectedChord.name}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20`}>
            {chordInfo.difficulty}
          </div>
        </div>
        <div className="text-sm opacity-90">
          Escala: {selectedChord.scale} • Posición: {selectedChord.position} • #{selectedChord.index + 1}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Notas del Acorde */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Music size={16} />
                Notas del Acorde
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {chordInfo.notes.map((note, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full font-mono font-bold">
                      {note}
                    </span>
                    <span className="text-xs text-blue-600 mt-1">
                      {chordInfo.intervals[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagrama de Trastes */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🎸 Diagrama de Trastes</h4>
              <div className="text-xs text-gray-600 mb-2">Cuerdas: E A D G B E (de grave a agudo)</div>
              <div className="flex gap-1 font-mono text-sm justify-center">
                {chordInfo.fretDiagram.map((fret, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 border-2 rounded flex items-center justify-center font-bold ${
                      fret === 0 ? 'border-red-300 bg-red-50 text-red-600' : 'border-blue-300 bg-blue-50 text-blue-700'
                    }`}>
                      {fret === 0 ? 'X' : fret}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{6-index}ª</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                X = No tocar • Números = Traste a presionar
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technique' && (
          <div className="space-y-4">
            {/* Digitación Mano Izquierda */}
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Hand size={16} />
                Digitación Mano Izquierda
              </h4>
              <ul className="space-y-2 text-sm">
                {chordInfo.fingering.map((finger, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                    <span className="text-green-700">{finger}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Técnica Mano Derecha */}
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Zap size={16} />
                Técnica Mano Derecha
              </h4>
              <p className="text-sm text-purple-700">{chordInfo.rightHandTechnique}</p>
            </div>

            {/* Consejos Técnicos */}
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <Target size={16} />
                Consejos Técnicos
              </h4>
              <ul className="space-y-1 text-sm">
                {chordInfo.leftHandTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">💡</span>
                    <span className="text-yellow-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Errores Comunes */}
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} />
                Errores Comunes
              </h4>
              <ul className="space-y-1 text-sm">
                {chordInfo.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">⚠️</span>
                    <span className="text-red-700">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-4">
            {/* Función Musical */}
            <div className="p-3 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                <Brain size={16} />
                Función Musical
              </h4>
              <p className="text-sm text-indigo-700">{chordInfo.musicalFunction}</p>
            </div>

            {/* Tipo de Voicing */}
            <div className="p-3 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-2">🎼 Tipo de Voicing</h4>
              <p className="text-sm text-teal-700">{chordInfo.voicingType}</p>
            </div>

            {/* Voicings Alternativos */}
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">🔄 Voicings Alternativos</h4>
              <ul className="space-y-1 text-sm">
                {chordInfo.alternativeVoicings.map((voicing, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-orange-700">{voicing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contexto en la Escala */}
            <div className="p-3 bg-pink-50 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">📊 Contexto en {selectedChord.scale}</h4>
              <p className="text-sm text-pink-700">
                {selectedChord.scale === 'Mayor' && 'Acorde diatónico de la escala mayor. Función tonal clara.'}
                {selectedChord.scale === 'Menor' && 'Acorde de la escala menor natural. Sonoridad melancólica.'}
                {selectedChord.scale === 'Dórico' && 'Modo dórico - menor con 6ta mayor. Color folk y celta.'}
                {selectedChord.scale === 'Frigio' && 'Modo frigio - menor con 2da menor. Sonoridad española/árabe.'}
                {selectedChord.scale === 'Lidio' && 'Modo lidio - mayor con 4ta aumentada. Sonoridad etérea.'}
                {selectedChord.scale === 'Mixolidio' && 'Modo mixolidio - mayor con 7ma menor. Perfecto para dominantes.'}
                {selectedChord.scale === 'Locrio' && 'Modo locrio - menor con 5ta disminuida. Muy inestable.'}
                {selectedChord.scale === 'Alterada' && 'Escala alterada - máxima tensión armónica disponible.'}
                {!['Mayor', 'Menor', 'Dórico', 'Frigio', 'Lidio', 'Mixolidio', 'Locrio', 'Alterada'].includes(selectedChord.scale) && 
                 'Escala especializada con características únicas.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-4">
            {/* Notas de Práctica */}
            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Target size={16} />
                Notas de Práctica
              </h4>
              <p className="text-sm text-gray-700">{chordInfo.practiceNotes}</p>
            </div>

            {/* Ejercicios Específicos */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Ejercicios Específicos</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">1.</span>
                  <span>Toca cada nota del acorde por separado, escucha su función</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">2.</span>
                  <span>Practica la digitación sin tocar, solo memoria muscular</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">3.</span>
                  <span>Alterna entre este acorde y su resolución natural</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">4.</span>
                  <span>Practica con diferentes dinámicas (forte, piano)</span>
                </li>
              </ul>
            </div>

            {/* Progresión de Dificultad */}
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📈 Progresión de Dificultad</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-700">Nivel 1: Acorde estático, tempo lento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-700">Nivel 2: Transiciones suaves a otros acordes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-orange-700">Nivel 3: Tempo medio con metrónomo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-700">Nivel 4: Tempo rápido, improvisación</span>
                </div>
              </div>
            </div>

            {/* Tiempo de Práctica Recomendado */}
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">⏰ Tiempo de Práctica</h4>
              <div className="text-sm text-purple-700">
                <p className="mb-2"><strong>Principiante:</strong> 5-10 minutos diarios</p>
                <p className="mb-2"><strong>Intermedio:</strong> 3-5 minutos por sesión</p>
                <p><strong>Avanzado:</strong> Integración en progresiones complejas</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChordAnatomyPanel;