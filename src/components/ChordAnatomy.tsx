import React, { useState } from 'react';
import { Music, Hand, Brain, Target, ChevronDown, ChevronUp, Guitar, Zap } from 'lucide-react';

interface ChordAnatomyProps {
  chordName: string;
  scaleName: string;
  position: number;
}

interface ChordInfo {
  notes: string[];
  fingering: string[];
  rightHandTechnique: string;
  leftHandTips: string[];
  commonMistakes: string[];
  practiceNotes: string;
  difficulty: string;
  fretDiagram: number[];
}

const chordDatabase: Record<string, ChordInfo> = {
  "Cmaj7": {
    notes: ["C", "E", "G", "B"],
    fingering: ["Traste 8: Índice en 6ª", "Traste 10: Anular en 4ª", "Traste 9: Medio en 3ª", "Traste 8: Meñique en 1ª"],
    rightHandTechnique: "Fingerpicking suave, énfasis en la fundamental",
    leftHandTips: ["Mantén el pulgar detrás del mástil", "Curvatura natural de dedos", "Presión mínima necesaria"],
    commonMistakes: ["Presionar demasiado fuerte", "Tocar cuerdas al aire no deseadas"],
    practiceNotes: "Practica el voicing nota por nota, luego como bloque",
    difficulty: "Intermedio",
    fretDiagram: [8, 10, 9, 10, 8, 8]
  },
  "Am7": {
    notes: ["A", "C", "E", "G"],
    fingering: ["Traste 5: Índice en 6ª", "Traste 5: Medio en 4ª", "Traste 5: Anular en 3ª", "Traste 5: Meñique en 2ª"],
    rightHandTechnique: "Arpegio descendente, resalta la 7ma menor",
    leftHandTips: ["Posición de cejilla parcial", "Todos los dedos en el mismo traste"],
    commonMistakes: ["Cejilla demasiado tensa", "No silenciar cuerdas no utilizadas"],
    practiceNotes: "Excelente para practicar cejillas y transiciones",
    difficulty: "Intermedio",
    fretDiagram: [5, 7, 5, 5, 5, 5]
  },
  "Fmaj7": {
    notes: ["F", "A", "C", "E"],
    fingering: ["Traste 1: Cejilla completa", "Traste 3: Anular en 4ª", "Traste 2: Medio en 3ª"],
    rightHandTechnique: "Fingerpicking, cuidado con la cejilla",
    leftHandTips: ["Cejilla firme pero no excesiva", "Pulgar bien posicionado"],
    commonMistakes: ["Cejilla mal ejecutada", "Sonidos apagados"],
    practiceNotes: "Fundamental para dominar las cejillas",
    difficulty: "Avanzado",
    fretDiagram: [1, 3, 2, 3, 1, 1]
  },
  "G7": {
    notes: ["G", "B", "D", "F"],
    fingering: ["Traste 3: Anular en 6ª", "Traste 2: Índice en 5ª", "Traste 3: Meñique en 1ª"],
    rightHandTechnique: "Strumming con énfasis en la 7ma",
    leftHandTips: ["Dedos curvados", "No tocar 4ª cuerda"],
    commonMistakes: ["Tocar cuerdas que deben estar silenciadas"],
    practiceNotes: "Acorde dominante clásico, esencial para el blues",
    difficulty: "Intermedio",
    fretDiagram: [3, 2, 0, 0, 0, 3]
  },
  "Cmaj7#11": {
    notes: ["C", "E", "G", "B", "F#"],
    fingering: ["Traste 8: Índice", "Traste 9: Medio", "Traste 10: Anular", "Traste 11: Meñique"],
    rightHandTechnique: "Fingerpicking delicado, resalta la #11",
    leftHandTips: ["Estiramiento amplio", "Precisión en cada dedo"],
    commonMistakes: ["Tensión excesiva", "Notas apagadas por mal estiramiento"],
    practiceNotes: "Requiere flexibilidad y precisión extrema",
    difficulty: "Experto",
    fretDiagram: [8, 10, 9, 10, 11, 8]
  },
  "G7alt": {
    notes: ["G", "B", "Db", "F", "Ab", "Bb"],
    fingering: ["Múltiples voicings posibles", "Posición alta recomendada"],
    rightHandTechnique: "Hybrid picking para resaltar alteraciones",
    leftHandTips: ["Voicing selectivo", "No todas las notas simultáneas"],
    commonMistakes: ["Intentar tocar todas las alteraciones"],
    practiceNotes: "Elige 4-5 notas que mejor representen las alteraciones",
    difficulty: "Experto",
    fretDiagram: [3, 4, 3, 4, 4, 3]
  }
};

const ChordAnatomy: React.FC<ChordAnatomyProps> = ({ chordName, scaleName, position }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const chordInfo = chordDatabase[chordName] || {
    notes: ["Información", "no", "disponible"],
    fingering: ["Consulta un libro de acordes"],
    rightHandTechnique: "Técnica estándar",
    leftHandTips: ["Mantén buena postura"],
    commonMistakes: ["Consulta un profesor"],
    practiceNotes: "Practica lentamente",
    difficulty: "Variable",
    fretDiagram: [0, 0, 0, 0, 0, 0]
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

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 cursor-pointer hover:from-indigo-100 hover:to-purple-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Guitar size={18} className="text-indigo-600" />
            <span className="font-semibold text-gray-800">{chordName}</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chordInfo.difficulty)}`}>
              {chordInfo.difficulty}
            </div>
          </div>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Notas del Acorde */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Music className="text-blue-600" size={16} />
              <h4 className="font-semibold text-blue-800">Notas del Acorde</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {chordInfo.notes.map((note, index) => (
                <span key={index} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full font-mono font-bold">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Digitación Mano Izquierda */}
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Hand className="text-green-600" size={16} />
              <h4 className="font-semibold text-green-800">Digitación Mano Izquierda</h4>
            </div>
            <ul className="space-y-1 text-sm">
              {chordInfo.fingering.map((finger, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {finger}
                </li>
              ))}
            </ul>
          </div>

          {/* Técnica Mano Derecha */}
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-purple-600" size={16} />
              <h4 className="font-semibold text-purple-800">Técnica Mano Derecha</h4>
            </div>
            <p className="text-sm text-purple-700">{chordInfo.rightHandTechnique}</p>
          </div>

          {/* Consejos y Errores Comunes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-yellow-600" size={16} />
                <h4 className="font-semibold text-yellow-800">Consejos</h4>
              </div>
              <ul className="space-y-1 text-sm">
                {chordInfo.leftHandTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">💡</span>
                    <span className="text-yellow-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="text-red-600" size={16} />
                <h4 className="font-semibold text-red-800">Errores Comunes</h4>
              </div>
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

          {/* Notas de Práctica */}
          <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
            <h4 className="font-semibold text-gray-800 mb-2">📝 Notas de Práctica</h4>
            <p className="text-sm text-gray-700">{chordInfo.practiceNotes}</p>
          </div>

          {/* Diagrama de Trastes Simplificado */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🎸 Posición en Mástil</h4>
            <div className="text-xs text-gray-600 mb-2">Cuerdas: E A D G B E (de grave a agudo)</div>
            <div className="flex gap-1 font-mono text-sm">
              {chordInfo.fretDiagram.map((fret, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-white">
                    {fret === 0 ? 'X' : fret}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{6-index}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              X = No tocar, Números = Traste a presionar
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChordAnatomy;