import React, { useState } from 'react';
import { BookOpen, Target, Brain, Zap, Clock, Award, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

interface MethodologyPanelProps {
  currentPhase: number;
}

const MethodologyPanel: React.FC<MethodologyPanelProps> = ({ currentPhase }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const phaseMethodology = {
    1: {
      title: "Fundamentos Sólidos",
      description: "Construcción gradual de acordes y comprensión básica",
      warmup: "5-10 min de escalas básicas y estiramientos",
      approach: "Nota por nota, luego como bloque completo",
      techniques: ["Fingerpicking básico", "Posiciones abiertas", "Transiciones suaves"],
      goals: ["Limpieza en cada nota", "Transiciones fluidas", "Memorización de posiciones"],
      evaluation: ["Todas las notas suenan claras", "Cambios sin pausas", "Tempo constante"],
      timePerExercise: "15-20 minutos",
      practiceFrequency: "Diario, 2-3 sesiones"
    },
    2: {
      title: "Exploración Sonora",
      description: "Descubrimiento de colores armónicos y modos",
      warmup: "10-15 min incluyendo escalas modales",
      approach: "Enfoque en el color único de cada modo",
      techniques: ["Voicings modales", "Movimiento cromático", "Tensiones naturales"],
      goals: ["Identificar colores modales", "Fluidez cromática", "Expresividad armónica"],
      evaluation: ["Reconoces cada modo por oído", "Movimientos cromáticos fluidos", "Expresión musical clara"],
      timePerExercise: "25-30 minutos",
      practiceFrequency: "Diario, enfoque en calidad sonora"
    },
    3: {
      title: "Desarrollo Avanzado",
      description: "Rearmónización y técnicas de sustitución",
      warmup: "15-20 min con escalas alteradas",
      approach: "Análisis funcional mientras ejecutas",
      techniques: ["Sustituciones tritonales", "Rearmónización", "Saltos de posición"],
      goals: ["Dominio de sustituciones", "Análisis en tiempo real", "Velocidad controlada"],
      evaluation: ["Explicas cada sustitución", "Ejecutas sin errores a tempo", "Improvisas variaciones"],
      timePerExercise: "35-40 minutos",
      practiceFrequency: "5-6 días por semana"
    },
    4: {
      title: "Maestría Técnica",
      description: "Técnicas virtuosas y dominio total",
      warmup: "20-25 min con técnicas específicas",
      approach: "Perfección técnica y musical simultánea",
      techniques: ["Tapping", "Hybrid picking", "Wide stretches", "Politonalidad"],
      goals: ["Técnica impecable", "Musicalidad avanzada", "Creatividad personal"],
      evaluation: ["Técnica perfecta", "Expresión personal", "Capacidad de enseñar"],
      timePerExercise: "45-50 minutos",
      practiceFrequency: "Diario, con descansos programados"
    },
    5: {
      title: "Retos Mentales",
      description: "Desafíos cognitivos extremos",
      warmup: "25-30 min + ejercicios mentales",
      approach: "Procesamiento multi-tarea consciente",
      techniques: ["Análisis simultáneo", "Modulación mental", "Memoria fotográfica"],
      goals: ["Procesamiento mental extremo", "Resistencia cognitiva", "Análisis instantáneo"],
      evaluation: ["Análisis perfecto mientras ejecutas", "Sin fatiga mental", "Enseñas mientras tocas"],
      timePerExercise: "60-75 minutos",
      practiceFrequency: "4-5 días, con descanso mental",
      warnings: ["Puede causar fatiga mental", "Requiere descansos frecuentes"]
    },
    6: {
      title: "Técnica Extrema",
      description: "Combinaciones técnicas imposibles",
      warmup: "30-40 min de preparación física",
      approach: "Construcción gradual de técnicas combinadas",
      techniques: ["Tapping + Hybrid", "Bends + Tapping", "Técnicas simultáneas"],
      goals: ["Coordinación sobrehumana", "Resistencia física", "Precisión absoluta"],
      evaluation: ["Ejecutas técnicas imposibles", "Sin tensión muscular", "Creatividad técnica"],
      timePerExercise: "90-120 minutos",
      practiceFrequency: "3-4 días, recuperación obligatoria",
      warnings: ["Riesgo de lesión", "Requiere supervisión", "Calentamiento extremo necesario"]
    },
    7: {
      title: "Transcendencia Musical",
      description: "Fusión total entre músico y música",
      warmup: "Meditación + preparación física completa",
      approach: "Estado meditativo profundo",
      techniques: ["Meditación musical", "Conexión espiritual", "Creatividad pura"],
      goals: ["Transcendencia técnica", "Expresión pura", "Maestría total"],
      evaluation: ["Fusión mente-cuerpo-música", "Creatividad ilimitada", "Inspiración a otros"],
      timePerExercise: "150+ minutos",
      practiceFrequency: "Cuando el espíritu lo demande",
      warnings: ["Experiencia transformadora", "Solo para maestros"]
    },
    8: {
      title: "Retos Cerebrales",
      description: "Capacidad mental sobrehumana",
      warmup: "Ejercicios cognitivos + preparación musical",
      approach: "Procesamiento mental extremo",
      techniques: ["Análisis en vivo", "Transposición dual", "Memoria perfecta", "Enseñanza simultánea"],
      goals: ["Capacidad mental sobrehumana", "Procesamiento multi-tarea", "Resistencia cognitiva extrema"],
      evaluation: ["Análisis perfecto en tiempo real", "Memoria fotográfica", "Enseñanza mientras ejecutas"],
      timePerExercise: "45-120 minutos",
      practiceFrequency: "2-3 días, descanso mental obligatorio",
      warnings: ["Sobrecarga cognitiva extrema", "Solo para genios musicales"]
    }
  };

  const currentMethodology = phaseMethodology[currentPhase] || phaseMethodology[1];

  const sections = [
    { id: 'overview', title: 'Visión General', icon: BookOpen },
    { id: 'approach', title: 'Metodología', icon: Target },
    { id: 'techniques', title: 'Técnicas', icon: Zap },
    { id: 'evaluation', title: 'Evaluación', icon: Award },
    { id: 'schedule', title: 'Programación', icon: Clock }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="flex items-center gap-3">
          <Brain size={24} />
          <div>
            <h3 className="text-lg font-bold">Metodología de Práctica</h3>
            <p className="text-sm opacity-90">Fase {currentPhase}: {currentMethodology.title}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Navegación de Secciones */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon size={16} />
              {section.title}
            </button>
          ))}
        </div>

        {/* Contenido de Secciones */}
        <div className="space-y-4">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Descripción de la Fase</h4>
                <p className="text-blue-700">{currentMethodology.description}</p>
              </div>
              
              {currentMethodology.warnings && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={18} />
                    <h4 className="font-semibold text-red-800">Advertencias Importantes</h4>
                  </div>
                  <ul className="space-y-1">
                    {currentMethodology.warnings.map((warning, index) => (
                      <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                        <span className="text-red-500 mt-1">⚠️</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeSection === 'approach' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🔥 Calentamiento</h4>
                <p className="text-green-700">{currentMethodology.warmup}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Enfoque de Práctica</h4>
                <p className="text-purple-700">{currentMethodology.approach}</p>
              </div>
            </div>
          )}

          {activeSection === 'techniques' && (
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-3">⚡ Técnicas Principales</h4>
              <div className="grid gap-2">
                {currentMethodology.techniques.map((technique, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-yellow-100 rounded">
                    <Zap className="text-yellow-600" size={16} />
                    <span className="text-yellow-800 font-medium">{technique}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'evaluation' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-3">🎯 Objetivos de la Fase</h4>
                <ul className="space-y-2">
                  {currentMethodology.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="text-indigo-600 mt-1" size={16} />
                      <span className="text-indigo-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">✅ Criterios de Dominio</h4>
                <ul className="space-y-2">
                  {currentMethodology.evaluation.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="text-green-600 mt-1" size={16} />
                      <span className="text-green-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-600" size={18} />
                    <h4 className="font-semibold text-blue-800">Duración por Ejercicio</h4>
                  </div>
                  <p className="text-blue-700 font-medium">{currentMethodology.timePerExercise}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-purple-600" size={18} />
                    <h4 className="font-semibold text-purple-800">Frecuencia</h4>
                  </div>
                  <p className="text-purple-700 font-medium">{currentMethodology.practiceFrequency}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Consejos de Programación</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Mantén sesiones regulares pero no fuerces si hay fatiga</li>
                  <li>• Alterna entre ejercicios técnicos y musicales</li>
                  <li>• Registra tu progreso diariamente</li>
                  <li>• Descansa adecuadamente entre sesiones intensas</li>
                  {currentPhase >= 5 && <li>• ⚠️ Incluye descansos mentales obligatorios</li>}
                  {currentPhase >= 6 && <li>• 🏥 Considera supervisión profesional</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodologyPanel;