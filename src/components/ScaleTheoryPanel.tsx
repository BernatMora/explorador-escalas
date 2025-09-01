import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Music2, Target, Heart, Users } from 'lucide-react';
import { scaleTheory, getScaleInfo, ScaleInfo } from '../data/scaleTheory';

interface ScaleTheoryPanelProps {
  selectedScale?: string;
}

const ScaleTheoryPanel: React.FC<ScaleTheoryPanelProps> = ({ selectedScale }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedScaleInfo, setSelectedScaleInfo] = useState<string>('Mayor');

  const currentScale = selectedScale ? getScaleInfo(selectedScale) : scaleTheory[selectedScaleInfo];

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
          {/* Selector de Escala */}
          {!selectedScale && (
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
          )}

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {selectedScaleInfo === 'Mayor' && (
                  <>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Menor Natural</div>
                      <div className="text-gray-600">3ra, 6ta y 7ma bemol</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Lidio</div>
                      <div className="text-gray-600">4ta aumentada (#11)</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Mixolidio</div>
                      <div className="text-gray-600">7ma menor (b7)</div>
                    </div>
                  </>
                )}
                {selectedScaleInfo === 'Alterada' && (
                  <>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Mixolidio</div>
                      <div className="text-gray-600">Todas las tensiones alteradas</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Frigio Dom.</div>
                      <div className="text-gray-600">5ta disminuida adicional</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">vs. Locrio</div>
                      <div className="text-gray-600">Más alteraciones disponibles</div>
                    </div>
                  </>
                )}
                {(selectedScaleInfo !== 'Mayor' && selectedScaleInfo !== 'Alterada') && (
                  <div className="p-2 bg-gray-50 rounded col-span-3 text-center">
                    <div className="text-gray-600">Selecciona Mayor o Alterada para ver comparaciones</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleTheoryPanel;