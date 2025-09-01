import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Music2, Target, Heart, Users } from 'lucide-react';
import { scaleTheory, getScaleInfo, ScaleInfo } from '../data/scaleTheory';

interface ScaleTheoryPanelProps {
  // No necesitamos props, el panel será independiente
}

const ScaleTheoryPanel: React.FC<ScaleTheoryPanelProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedScaleInfo, setSelectedScaleInfo] = useState<string>('Mayor');

  const currentScale = scaleTheory[selectedScaleInfo];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Básico': 'text-blue-600 bg-blue-100',
      'Intermedio': 'text-green-600 bg-green-100',
      'Avanzado': 'text-orange-600 bg-orange-100',
      'Experto': 'text-red-600 bg-red-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  if (!currentScale) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div 
        className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={24} />
            <div>
              <h3 className="text-lg font-bold">Teoría Musical</h3>
              <p className="text-sm opacity-90">Información detallada de escalas</p>
            </div>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          {/* Selector de Escala - Siempre visible */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona una escala para estudiar:
            </label>
            <select
              value={selectedScaleInfo}
              onChange={(e) => setSelectedScaleInfo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.keys(scaleTheory).map((scale) => (
                <option key={scale} value={scale}>{scaleTheory[scale].name}</option>
              ))}
            </select>
          </div>

          {/* Información Principal */}
          <div className="space-y-6">
            {/* Header de la Escala */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-2xl font-bold text-gray-800">{currentScale.name}</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentScale.difficulty)}`}>
                  {currentScale.difficulty}
                </div>
              </div>
              <p className="text-gray-600">{currentScale.characteristics}</p>
            </div>

            {/* Estructura Musical */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Music2 className="text-blue-600" size={18} />
                    <h5 className="font-semibold text-blue-800">Estructura</h5>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Intervalos:</span>
                      <div className="font-mono text-blue-700 mt-1">{currentScale.intervals}</div>
                    </div>
                    <div>
                      <span className="font-medium">Notas:</span>
                      <div className="font-mono text-blue-700 mt-1">{currentScale.notes}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-green-600" size={18} />
                    <h5 className="font-semibold text-green-800">Acordes Típicos</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentScale.typicalChords.map((chord, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm font-mono"
                      >
                        {chord}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="text-purple-600" size={18} />
                    <h5 className="font-semibold text-purple-800">Emociones</h5>
                  </div>
                  <p className="text-sm text-purple-700">{currentScale.emotions}</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-orange-600" size={18} />
                    <h5 className="font-semibold text-orange-800">Géneros Musicales</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentScale.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-orange-200 text-orange-800 rounded text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Consejos de Práctica */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">💡 Consejos de Práctica</h5>
              <p className="text-sm text-yellow-700">{currentScale.practiceNotes}</p>
            </div>

            {/* Comparación Rápida */}
            <div className="border-t pt-4">
              <h5 className="font-semibold text-gray-800 mb-3">🔄 Comparación con Escalas Relacionadas</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {(() => {
                  const getComparisons = (scale: string) => {
                    const comparisons: Record<string, Array<{name: string, difference: string}>> = {
                      'Mayor': [
                        { name: 'vs. Menor Natural', difference: '3ra, 6ta y 7ma bemol' },
                        { name: 'vs. Lidio', difference: '4ta aumentada (#11)' },
                        { name: 'vs. Mixolidio', difference: '7ma menor (b7)' },
                        { name: 'vs. Dórico', difference: '3ra menor, 7ma menor' }
                      ],
                      'Menor': [
                        { name: 'vs. Mayor', difference: '3ra, 6ta y 7ma bemol' },
                        { name: 'vs. Dórico', difference: '6ta bemol' },
                        { name: 'vs. Frigio', difference: '2da mayor' },
                        { name: 'vs. Menor Armónica', difference: '7ma bemol' }
                      ],
                      'Dórico': [
                        { name: 'vs. Menor Natural', difference: '6ta mayor' },
                        { name: 'vs. Mayor', difference: '3ra menor' },
                        { name: 'vs. Mixolidio', difference: '3ra menor' },
                        { name: 'vs. Frigio', difference: '2da y 6ta mayor' }
                      ],
                      'Frigio': [
                        { name: 'vs. Menor Natural', difference: '2da menor' },
                        { name: 'vs. Dórico', difference: '2da y 6ta menor' },
                        { name: 'vs. Locrio', difference: '5ta justa' },
                        { name: 'vs. Árabe', difference: 'Menos cromática' }
                      ],
                      'Lidio': [
                        { name: 'vs. Mayor', difference: '4ta aumentada (#11)' },
                        { name: 'vs. Mixolidio', difference: '4ta aumentada, 7ma mayor' },
                        { name: 'vs. Tonos Enteros', difference: 'Tiene semitonos' },
                        { name: 'vs. Lidio b7', difference: '7ma mayor' }
                      ],
                      'Mixolidio': [
                        { name: 'vs. Mayor', difference: '7ma menor (b7)' },
                        { name: 'vs. Dórico', difference: '3ra mayor' },
                        { name: 'vs. Lidio', difference: '4ta justa, 7ma menor' },
                        { name: 'vs. Bebop', difference: 'Sin nota cromática' }
                      ],
                      'Locrio': [
                        { name: 'vs. Frigio', difference: '5ta disminuida' },
                        { name: 'vs. Menor Natural', difference: '2da y 5ta menor' },
                        { name: 'vs. Alterada', difference: 'Menos alteraciones' },
                        { name: 'vs. Disminuida', difference: 'No simétrica' }
                      ],
                      'Bebop': [
                        { name: 'vs. Mixolidio', difference: 'Nota cromática añadida' },
                        { name: 'vs. Mayor', difference: '7ma menor + cromática' },
                        { name: 'vs. Blues', difference: 'Más notas, menos blue notes' },
                        { name: 'vs. Alterada', difference: 'Menos alteraciones' }
                      ],
                      'Alterada': [
                        { name: 'vs. Mixolidio', difference: 'Todas las tensiones alteradas' },
                        { name: 'vs. Locrio', difference: 'Más alteraciones disponibles' },
                        { name: 'vs. Disminuida', difference: 'No simétrica' },
                        { name: 'vs. Bebop', difference: 'Máxima alteración' }
                      ],
                      'Tonos Enteros': [
                        { name: 'vs. Lidio', difference: 'Solo tonos enteros' },
                        { name: 'vs. Aumentada', difference: 'Diferente simetría' },
                        { name: 'vs. Mayor', difference: 'Sin semitonos' },
                        { name: 'vs. Alterada', difference: 'Simétrica, flotante' }
                      ],
                      'Disminuida': [
                        { name: 'vs. Cromática', difference: 'Patrón específico T-S' },
                        { name: 'vs. Alterada', difference: 'Simétrica' },
                        { name: 'vs. Locrio', difference: 'Simétrica, más notas' },
                        { name: 'vs. Bebop', difference: 'Patrón simétrico' }
                      ],
                      'Menor Armónica': [
                        { name: 'vs. Menor Natural', difference: '7ma mayor (sensible)' },
                        { name: 'vs. Menor Melódica', difference: '6ta menor' },
                        { name: 'vs. Frigio Dom.', difference: 'Diferente centro tonal' },
                        { name: 'vs. Árabe', difference: 'Menos cromática' }
                      ],
                      'Menor Melódica': [
                        { name: 'vs. Menor Armónica', difference: '6ta mayor' },
                        { name: 'vs. Mayor', difference: '3ra menor' },
                        { name: 'vs. Dórico', difference: '7ma mayor' },
                        { name: 'vs. Lidio', difference: '3ra menor, 4ta justa' }
                      ],
                      'Húngara': [
                        { name: 'vs. Menor Armónica', difference: '4ta aumentada adicional' },
                        { name: 'vs. Árabe', difference: 'Dos 2das aumentadas' },
                        { name: 'vs. Frigio Dom.', difference: 'Más exótica' },
                        { name: 'vs. Gitana', difference: 'Variante específica' }
                      ],
                      'Japonesa': [
                        { name: 'vs. Pentatónica Menor', difference: 'Intervalos únicos' },
                        { name: 'vs. Mayor Pentatónica', difference: 'Carácter menor' },
                        { name: 'vs. Blues', difference: 'Sin blue notes' },
                        { name: 'vs. Menor Natural', difference: 'Solo 5 notas' }
                      ],
                      'Árabe': [
                        { name: 'vs. Frigio Dom.', difference: 'Más cromática' },
                        { name: 'vs. Menor Armónica', difference: 'Más exótica' },
                        { name: 'vs. Húngara', difference: 'Una 2da aumentada' },
                        { name: 'vs. Bizantina', difference: 'Variante regional' }
                      ]
                    };
                    return comparisons[scale] || [];
                  };
                  
                  return getComparisons(selectedScaleInfo).map((comp, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">{comp.name}</div>
                      <div className="text-gray-600">{comp.difference}</div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleTheoryPanel;