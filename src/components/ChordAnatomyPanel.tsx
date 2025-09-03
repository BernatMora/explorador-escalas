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
  detailedExplanation: string;
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
    alternativeVoicings: ["Cmaj9 (añadir D)", "C6/9 (cambiar B por A y añadir D)", "Cmaj7#11 (añadir F#)"],
    detailedExplanation: "El Cmaj7 es un acorde de cuatro notas que combina la tríada mayor de C (C-E-G) con la séptima mayor (B). Esta séptima mayor crea una sonoridad sofisticada y estable, muy diferente a la séptima menor de los acordes dominantes."
  },
  "Cmaj9": {
    notes: ["C", "E", "G", "B", "D"],
    intervals: ["1", "3", "5", "7", "9"],
    fingering: [
      "Traste 8: Índice en 6ª cuerda (C)",
      "Traste 10: Anular en 4ª cuerda (E)",
      "Traste 10: Meñique en 3ª cuerda (D)",
      "Traste 9: Medio en 2ª cuerda (B)"
    ],
    rightHandTechnique: "Fingerpicking delicado resaltando la 9na (D) que añade color y apertura al acorde mayor básico.",
    leftHandTips: [
      "Estiramiento moderado entre dedos",
      "La 9na (D) debe sonar clara en la 3ª cuerda",
      "Mantén la presión uniforme",
      "Practica la transición desde Cmaj7"
    ],
    commonMistakes: [
      "No resaltar la 9na añadida",
      "Confundir con add9 (sin la 7ma)",
      "Tensión por el estiramiento",
      "Tocar cuerdas no deseadas"
    ],
    practiceNotes: "La 9na (D) añade apertura y modernidad al acorde mayor. Compara con Cmaj7 para escuchar la diferencia que hace la 9na.",
    difficulty: "Intermedio",
    fretDiagram: [8, 0, 10, 10, 9, 0],
    musicalFunction: "Tónica mayor extendida. La 9na añade color sin perder estabilidad.",
    voicingType: "Acorde extendido con 9na natural",
    alternativeVoicings: ["Cadd9 (sin la 7ma)", "Cmaj13 (añadir A)", "Cmaj9#11 (añadir F#)"],
    detailedExplanation: "El Cmaj9 extiende el Cmaj7 añadiendo la novena (D). Esta tensión natural de la escala mayor añade apertura y modernidad sin crear disonancia, siendo muy usado en jazz y música contemporánea."
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
    alternativeVoicings: ["Dm9 (añadir E)", "Dm6 (añadir B)", "Dm11 (añadir G)"],
    detailedExplanation: "El Dm7 combina la tríada menor de D (D-F-A) con la séptima menor (C). Es fundamental en progresiones ii-V-I y tiene un carácter melancólico pero no tan dramático como un acorde menor natural."
  },
  "Dm9": {
    notes: ["D", "F", "A", "C", "E"],
    intervals: ["1", "b3", "5", "b7", "9"],
    fingering: [
      "Traste 10: Índice en 6ª cuerda (D)",
      "Traste 10: Medio en 4ª cuerda (F)",
      "Traste 12: Anular en 3ª cuerda (E)",
      "Traste 10: Meñique en 2ª cuerda (C)"
    ],
    rightHandTechnique: "Fingerpicking que resalta la 9na (E) añadida, creando más apertura en el acorde menor.",
    leftHandTips: [
      "Estiramiento moderado para la 9na",
      "La 9na debe sonar clara",
      "Mantén la base del Dm7",
      "Transición suave desde Dm7"
    ],
    commonMistakes: [
      "No resaltar la 9na añadida",
      "Tensión por el estiramiento",
      "Confundir con Dm(add9)",
      "Mala digitación de la 9na"
    ],
    practiceNotes: "La 9na (E) añade apertura al acorde menor básico. Muy usado en jazz y R&B para suavizar la dureza del acorde menor.",
    difficulty: "Intermedio",
    fretDiagram: [10, 0, 12, 10, 0, 0],
    musicalFunction: "Subdominante menor extendido. La 9na suaviza el carácter menor.",
    voicingType: "Acorde menor extendido con 9na natural",
    alternativeVoicings: ["Dm11 (añadir G)", "Dm6/9 (cambiar C por B, añadir E)", "Dm13 (añadir B)"],
    detailedExplanation: "El Dm9 extiende el Dm7 con la novena (E). Esta tensión natural suaviza el carácter menor y añade sofisticación, siendo muy popular en jazz, R&B y neo-soul."
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
    alternativeVoicings: ["Em7b5 (cambiar B por Bb)", "Em9 (añadir F#)", "Em11 (añadir A)"],
    detailedExplanation: "El Em7 es el iii grado en tonalidad mayor. En contexto frigio, adquiere un carácter español/árabe distintivo, especialmente cuando se enfatiza la segunda menor."
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
    alternativeVoicings: ["Fmaj9 (añadir G)", "F6/9 (cambiar E por D y añadir G)", "Fmaj7#11 (añadir B)"],
    detailedExplanation: "El Fmaj7 es el IV grado con séptima mayor. La cejilla en el primer traste lo hace técnicamente desafiante pero es fundamental para el repertorio de guitarra jazz y clásica."
  },
  "Fmaj9": {
    notes: ["F", "A", "C", "E", "G"],
    intervals: ["1", "3", "5", "7", "9"],
    fingering: [
      "Traste 1: Cejilla con índice",
      "Traste 3: Anular en 4ª cuerda (A)",
      "Traste 3: Meñique en 3ª cuerda (G)",
      "Traste 2: Medio en 2ª cuerda (E)"
    ],
    rightHandTechnique: "Fingerpicking delicado con cejilla. Resalta la 9na (G) que añade apertura al acorde.",
    leftHandTips: [
      "Cejilla parcial más fácil que completa",
      "La 9na debe sonar clara",
      "Estiramiento controlado",
      "Practica desde Fmaj7"
    ],
    commonMistakes: [
      "Cejilla demasiado tensa",
      "No resaltar la 9na",
      "Confundir con Fadd9",
      "Mala transición desde otros acordes"
    ],
    practiceNotes: "La 9na (G) añade apertura y modernidad. Compara con Fmaj7 para escuchar la diferencia.",
    difficulty: "Avanzado",
    fretDiagram: [1, 3, 3, 2, 0, 0],
    musicalFunction: "Subdominante mayor extendido. La 9na añade color contemporáneo.",
    voicingType: "Acorde extendido con cejilla",
    alternativeVoicings: ["F6/9 (cambiar E por D)", "Fmaj13 (añadir D)", "Fmaj9#11 (añadir B)"],
    detailedExplanation: "El Fmaj9 combina la dificultad técnica de la cejilla con la sofisticación armónica de la novena, siendo muy usado en bossa nova y jazz contemporáneo."
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
    alternativeVoicings: ["G9 (añadir A)", "G13 (añadir E)", "G7alt (alteraciones diversas)"],
    detailedExplanation: "El G7 es el V grado dominante por excelencia. La séptima menor crea el tritono con la tercera que genera la tensión característica que busca resolución."
  },
  "G9": {
    notes: ["G", "B", "D", "F", "A"],
    intervals: ["1", "3", "5", "b7", "9"],
    fingering: [
      "Traste 3: Índice en 6ª cuerda (G)",
      "Traste 5: Anular en 5ª cuerda (A)",
      "Traste 4: Medio en 4ª cuerda (F)",
      "Traste 3: Meñique en 2ª cuerda (B)"
    ],
    rightHandTechnique: "Fingerpicking que resalta la 9na (A) añadida al dominante básico.",
    leftHandTips: [
      "Estiramiento moderado entre trastes",
      "La 9na debe sonar clara",
      "Mantén la función dominante",
      "Practica desde G7"
    ],
    commonMistakes: [
      "No resaltar la 9na",
      "Tensión por el estiramiento",
      "Perder la función dominante",
      "Mala digitación"
    ],
    practiceNotes: "La 9na (A) añade color al dominante sin perder su función. Muy usado en blues y jazz.",
    difficulty: "Intermedio",
    fretDiagram: [3, 5, 4, 0, 3, 0],
    musicalFunction: "Dominante extendido. La 9na añade color manteniendo la tensión.",
    voicingType: "Dominante extendido con 9na natural",
    alternativeVoicings: ["G13 (añadir E)", "G7sus4 (cambiar B por C)", "G7alt (alteraciones)"],
    detailedExplanation: "El G9 extiende el G7 con la novena natural (A). Mantiene toda la función dominante mientras añade sofisticación armónica, siendo fundamental en el blues y jazz."
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
    alternativeVoicings: ["Am9 (añadir B)", "Am6 (cambiar G por F#)", "Am(maj7) (cambiar G por G#)"],
    detailedExplanation: "El Am7 es el vi grado en tonalidad mayor y i grado en menor. Su sonoridad melancólica pero estable lo hace perfecto para baladas y progresiones emotivas."
  },
  "Am9": {
    notes: ["A", "C", "E", "G", "B"],
    intervals: ["1", "b3", "5", "b7", "9"],
    fingering: [
      "Traste 5: Índice en 6ª cuerda (A)",
      "Traste 5: Medio en 4ª cuerda (C)",
      "Traste 7: Anular en 3ª cuerda (B)",
      "Traste 5: Meñique en 2ª cuerda (G)"
    ],
    rightHandTechnique: "Fingerpicking que resalta la 9na (B) añadida, suavizando el carácter menor.",
    leftHandTips: [
      "Estiramiento moderado para la 9na",
      "Mantén la base del Am7",
      "La 9na debe sonar clara",
      "Transición suave desde Am7"
    ],
    commonMistakes: [
      "No resaltar la 9na añadida",
      "Tensión por el estiramiento",
      "Confundir con Am(add9)",
      "Mala digitación de la 9na"
    ],
    practiceNotes: "La 9na (B) suaviza el carácter menor y añade apertura. Muy usado en neo-soul y R&B.",
    difficulty: "Intermedio",
    fretDiagram: [5, 0, 7, 5, 0, 0],
    musicalFunction: "Subdominante menor extendido. La 9na suaviza la melancolía.",
    voicingType: "Acorde menor extendido con 9na natural",
    alternativeVoicings: ["Am11 (añadir D)", "Am6/9 (cambiar G por F#, añadir B)", "Am13 (añadir F#)"],
    detailedExplanation: "El Am9 añade la novena (B) al Am7, creando una sonoridad más suave y contemporánea. Es fundamental en géneros como neo-soul, R&B y jazz moderno."
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
    alternativeVoicings: ["Cmaj9#11 (añadir D)", "C6/9#11 (cambiar B por A, añadir D)", "Cmaj13#11 (añadir A)"],
    detailedExplanation: "El Cmaj7#11 incorpora la cuarta aumentada (F#) del modo lidio, creando una sonoridad etérea y flotante. Es muy usado en música de películas y jazz modal para crear ambientes mágicos."
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
    alternativeVoicings: ["G7b9", "G7#9", "G7#11", "G7b13", "G7#5"],
    detailedExplanation: "El G7alt contiene todas las alteraciones posibles de un dominante: b9, #9, #11, b13. Crea máxima tensión armónica y es fundamental en el jazz moderno para resoluciones dramáticas."
  },
  "∞": {
    notes: ["Silencio"],
    intervals: ["∞"],
    fingering: ["No tocar - silencio meditativo"],
    rightHandTechnique: "Silencio total. El espacio entre notas es tan importante como las notas mismas.",
    leftHandTips: ["Relajación completa", "Preparación mental para la siguiente nota", "Conexión espiritual con el silencio"],
    commonMistakes: ["Llenar el silencio innecesariamente", "No valorar el espacio musical", "Tensión durante el silencio"],
    practiceNotes: "En la fase transcendental, el silencio es tan importante como las notas. Úsalo para conectar con la esencia musical.",
    difficulty: "Transcendental",
    fretDiagram: [0, 0, 0, 0, 0, 0],
    musicalFunction: "Espacio musical transcendental. Permite que la música respire y se expanda.",
    voicingType: "Silencio meditativo",
    alternativeVoicings: ["Diferentes duraciones de silencio", "Silencios con respiración consciente"],
    detailedExplanation: "El símbolo ∞ representa el silencio transcendental en la música. No es ausencia, sino presencia consciente del espacio musical que permite que las notas anteriores resuenen en el alma del oyente."
  }
};

const ChordAnatomyPanel: React.FC<ChordAnatomyPanelProps> = ({ selectedChord }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'technique' | 'theory' | 'practice'>('notes');

  if (!selectedChord) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ minHeight: '600px', maxHeight: '600px' }}>
        <div className="p-6 text-center text-gray-500 flex flex-col justify-center h-full">
          <Guitar size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Anatomía de Acordes</h3>
          <p className="text-sm">Haz clic en cualquier acorde para ver su información detallada</p>
          <div className="mt-4 text-xs text-gray-400">
            <p>• Notas y digitaciones específicas</p>
            <p>• Técnicas de mano derecha e izquierda</p>
            <p>• Teoría musical aplicada</p>
            <p>• Consejos de práctica personalizados</p>
          </div>
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
    alternativeVoicings: ["Consulta recursos adicionales"],
    detailedExplanation: "Este acorde no tiene información detallada disponible en la base de datos actual."
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Intermedio': 'text-blue-600 bg-blue-100',
      'Avanzado': 'text-green-600 bg-green-100',
      'Experto': 'text-orange-600 bg-orange-100',
      'Virtuoso': 'text-purple-600 bg-purple-100',
      'Transcendental': 'text-yellow-700 bg-yellow-100'
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ minHeight: '600px', maxHeight: '600px' }}>
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Guitar size={18} />
            <h3 className="text-base font-bold">{selectedChord.name}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20`}>
            {chordInfo.difficulty}
          </div>
        </div>
        <div className="text-xs opacity-90">
          Escala: {selectedChord.scale} • Pos: {selectedChord.position} • #{selectedChord.index + 1}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ height: '500px' }}>
        <div className="p-3 space-y-3">
          {activeTab === 'notes' && (
            <div className="space-y-3">
              {/* Explicación Detallada */}
              <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-800 mb-2 text-sm">🎼 ¿Qué es este acorde?</h4>
                <p className="text-xs text-indigo-700 leading-relaxed">{chordInfo.detailedExplanation}</p>
              </div>

              {/* Notas del Acorde */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 text-sm">
                  <Music size={14} />
                  Notas del Acorde
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {chordInfo.notes.map((note, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-100 rounded">
                      <span className="font-mono font-bold text-blue-800">{note}</span>
                      <span className="text-xs text-blue-600 bg-blue-200 px-2 py-1 rounded-full">
                        {chordInfo.intervals[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagrama de Trastes Mejorado */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">🎸 Diagrama de Trastes</h4>
                <div className="text-center mb-2">
                  <div className="text-xs text-gray-600 mb-1">Cuerdas: E A D G B E (grave → agudo)</div>
                  <div className="grid grid-cols-6 gap-1 max-w-xs mx-auto">
                    {chordInfo.fretDiagram.map((fret, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center font-bold text-sm ${
                          fret === 0 ? 'border-red-300 bg-red-50 text-red-600' : 'border-blue-300 bg-blue-50 text-blue-700'
                        }`}>
                          {fret === 0 ? 'X' : fret}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{6-index}ª</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    X = No tocar • Números = Traste a presionar
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technique' && (
            <div className="space-y-3">
              {/* Digitación Mano Izquierda */}
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2 text-sm">
                  <Hand size={14} />
                  Digitación Mano Izquierda
                </h4>
                <div className="space-y-2">
                  {chordInfo.fingering.map((finger, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-green-100 rounded">
                      <span className="w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-xs text-green-700 flex-1">{finger}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Técnica Mano Derecha */}
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2 text-sm">
                  <Zap size={14} />
                  Técnica Mano Derecha
                </h4>
                <p className="text-xs text-purple-700 leading-relaxed">{chordInfo.rightHandTechnique}</p>
              </div>

              {/* Consejos Técnicos */}
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2 text-sm">
                  <Target size={14} />
                  Consejos Técnicos
                </h4>
                <div className="space-y-1">
                  {chordInfo.leftHandTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 text-xs">💡</span>
                      <span className="text-xs text-yellow-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errores Comunes */}
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle size={14} />
                  Errores Comunes
                </h4>
                <div className="space-y-1">
                  {chordInfo.commonMistakes.map((mistake, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 text-xs">⚠️</span>
                      <span className="text-xs text-red-700">{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="space-y-3">
              {/* Función Musical */}
              <div className="p-3 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2 text-sm">
                  <Brain size={14} />
                  Función Musical
                </h4>
                <p className="text-xs text-indigo-700 leading-relaxed">{chordInfo.musicalFunction}</p>
              </div>

              {/* Tipo de Voicing */}
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-800 mb-2 text-sm">🎼 Tipo de Voicing</h4>
                <p className="text-xs text-teal-700 leading-relaxed">{chordInfo.voicingType}</p>
              </div>

              {/* Voicings Alternativos */}
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2 text-sm">🔄 Voicings Alternativos</h4>
                <div className="space-y-1">
                  {chordInfo.alternativeVoicings.map((voicing, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-orange-100 rounded">
                      <span className="text-orange-500 mt-1 text-xs">•</span>
                      <span className="text-xs text-orange-700">{voicing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contexto en la Escala */}
              <div className="p-3 bg-pink-50 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2 text-sm">📊 Contexto en {selectedChord.scale}</h4>
                <p className="text-xs text-pink-700 leading-relaxed">
                  {selectedChord.scale === 'Mayor' && 'Acorde diatónico de la escala mayor. Función tonal clara y estable, perfecto para establecer el centro tonal.'}
                  {selectedChord.scale === 'Menor' && 'Acorde de la escala menor natural. Sonoridad melancólica y emotiva, fundamental en baladas y música introspectiva.'}
                  {selectedChord.scale === 'Dórico' && 'Modo dórico - menor con 6ta mayor. Color folk y celta distintivo, más luminoso que el menor natural.'}
                  {selectedChord.scale === 'Frigio' && 'Modo frigio - menor con 2da menor. Sonoridad española/árabe exótica, muy dramática y pasional.'}
                  {selectedChord.scale === 'Lidio' && 'Modo lidio - mayor con 4ta aumentada. Sonoridad etérea y flotante, muy usado en música de películas.'}
                  {selectedChord.scale === 'Mixolidio' && 'Modo mixolidio - mayor con 7ma menor. Perfecto para dominantes, fundamental en blues y rock.'}
                  {selectedChord.scale === 'Locrio' && 'Modo locrio - menor con 5ta disminuida. Muy inestable, usado para crear tensión extrema.'}
                  {selectedChord.scale === 'Alterada' && 'Escala alterada - máxima tensión armónica disponible. Todas las tensiones alteradas para resoluciones dramáticas.'}
                  {!['Mayor', 'Menor', 'Dórico', 'Frigio', 'Lidio', 'Mixolidio', 'Locrio', 'Alterada'].includes(selectedChord.scale) && 
                   'Escala especializada con características únicas que aporta colores armónicos específicos al contexto musical.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-3">
              {/* Notas de Práctica */}
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                  <Target size={14} />
                  Notas de Práctica Específicas
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">{chordInfo.practiceNotes}</p>
              </div>

              {/* Ejercicios Específicos */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm">🎯 Ejercicios Paso a Paso</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-blue-100 rounded">
                    <span className="text-blue-600 font-bold text-xs mt-0.5">1.</span>
                    <span className="text-xs text-blue-700">Toca cada nota del acorde por separado, escucha su función específica</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-blue-100 rounded">
                    <span className="text-blue-600 font-bold text-xs mt-0.5">2.</span>
                    <span className="text-xs text-blue-700">Practica la digitación sin tocar, solo memoria muscular y visualización</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-blue-100 rounded">
                    <span className="text-blue-600 font-bold text-xs mt-0.5">3.</span>
                    <span className="text-xs text-blue-700">Alterna entre este acorde y su resolución natural más común</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-blue-100 rounded">
                    <span className="text-blue-600 font-bold text-xs mt-0.5">4.</span>
                    <span className="text-xs text-blue-700">Practica con diferentes dinámicas (forte, piano, crescendo, diminuendo)</span>
                  </div>
                </div>
              </div>

              {/* Progresión de Dificultad */}
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 text-sm">📈 Progresión de Dominio</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-green-100 rounded">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-700"><strong>Nivel 1:</strong> Acorde estático, tempo 60 BPM, enfoque en limpieza</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-100 rounded">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs text-yellow-700"><strong>Nivel 2:</strong> Transiciones suaves, tempo 80 BPM, conexiones fluidas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-100 rounded">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-xs text-orange-700"><strong>Nivel 3:</strong> Tempo 100+ BPM, integración en progresiones</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-100 rounded">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-xs text-red-700"><strong>Nivel 4:</strong> Tempo libre, improvisación, expresión musical</span>
                  </div>
                </div>
              </div>

              {/* Tiempo de Práctica Recomendado */}
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2 text-sm">⏰ Programación de Práctica</h4>
                <div className="space-y-2 text-xs text-purple-700">
                  <div className="p-2 bg-purple-100 rounded">
                    <p><strong>Principiante:</strong> 5-10 minutos diarios, enfoque en digitación correcta</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded">
                    <p><strong>Intermedio:</strong> 3-5 minutos por sesión, integración en progresiones</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded">
                    <p><strong>Avanzado:</strong> Uso contextual en improvisación y composición</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChordAnatomyPanel;