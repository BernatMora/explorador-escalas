import React, { useState } from 'react';
import { BookOpen, Target, Brain, Zap, Clock, Award, ChevronDown, ChevronUp, AlertTriangle, Music, Hand, Eye, Heart } from 'lucide-react';

interface MethodologyPanelProps {
  currentPhase: number;
}

const MethodologyPanel: React.FC<MethodologyPanelProps> = ({ currentPhase }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const phaseMethodology = {
    1: {
      title: "Fundamentos Sólidos",
      description: "Construcción gradual de acordes y comprensión básica de la armonía funcional",
      warmup: "5-10 min: Escalas mayores y menores en posición abierta, estiramientos de dedos, ejercicios cromáticos simples",
      approach: "Construye cada acorde nota por nota. Primero la tríada, luego añade la 7ma, después las tensiones. Enfócate en la limpieza de cada nota antes de pasar al siguiente acorde.",
      detailedApproach: [
        "Comienza con acordes en posición abierta",
        "Practica cada acorde por separado durante 2-3 minutos",
        "Añade tensiones progresivamente (7ma, 9na, 11na, 13na)",
        "Conecta acordes con movimientos mínimos de dedos",
        "Usa metrónomo desde el primer día"
      ],
      techniques: ["Fingerpicking básico", "Posiciones abiertas", "Transiciones suaves", "Construcción de acordes"],
      detailedTechniques: {
        "Fingerpicking básico": "Pulgar en cuerdas graves (6ª, 5ª, 4ª), índice en 3ª, medio en 2ª, anular en 1ª. Movimientos alternados y fluidos.",
        "Posiciones abiertas": "Acordes en los primeros 5 trastes. Aprovecha cuerdas al aire para sonoridad completa.",
        "Transiciones suaves": "Identifica dedos que pueden quedarse fijos entre acordes. Mueve solo los dedos necesarios.",
        "Construcción de acordes": "Fundamental → 3ra → 5ta → 7ma → tensiones. Escucha cómo cada nota cambia el color."
      },
      goals: ["Limpieza en cada nota", "Transiciones fluidas", "Memorización de posiciones", "Tempo constante 60-90 BPM"],
      evaluation: ["Todas las notas suenan claras", "Cambios sin pausas", "Tempo constante sin acelerar", "Reconoces cada acorde por oído"],
      timePerExercise: "15-20 minutos por secuencia",
      practiceFrequency: "Diario, 2-3 sesiones de 45-60 minutos",
      commonMistakes: [
        "Presionar demasiado fuerte las cuerdas",
        "Acelerar inconscientemente",
        "No escuchar cada nota individualmente",
        "Saltar tensiones sin dominar la base"
      ],
      practicalTips: [
        "Graba tu práctica para detectar errores",
        "Practica con ojos cerrados para desarrollar memoria muscular",
        "Usa diferentes dinámicas (forte, piano, crescendo)",
        "Practica tanto con metrónomo como sin él"
      ]
    },
    2: {
      title: "Exploración Sonora",
      description: "Descubrimiento de colores armónicos únicos de cada modo y desarrollo del oído armónico",
      warmup: "10-15 min: Escalas modales completas, ejercicios de intervalos, armonización de escalas",
      approach: "Enfócate en el color único de cada modo. Identifica las notas características que definen cada sonoridad. Practica modulaciones suaves entre modos relacionados.",
      detailedApproach: [
        "Estudia cada modo por separado durante una semana",
        "Identifica la nota característica de cada modo",
        "Practica progresiones que resalten el color modal",
        "Compara modos similares para entender diferencias",
        "Improvisa melodías que enfaticen el carácter modal"
      ],
      techniques: ["Voicings modales", "Movimiento cromático", "Tensiones naturales", "Modulación modal"],
      detailedTechniques: {
        "Voicings modales": "Acordes que resaltan las notas características: #11 en Lidio, b7 en Mixolidio, b2 en Frigio.",
        "Movimiento cromático": "Conexiones suaves entre acordes usando semitonos. Especialmente útil con acordes disminuidos de paso.",
        "Tensiones naturales": "9nas, 11nas y 13nas que surgen naturalmente de cada escala sin crear disonancias.",
        "Modulación modal": "Cambio de modo manteniendo el mismo centro tonal, o cambio de centro manteniendo el modo."
      },
      goals: ["Identificar colores modales", "Fluidez cromática", "Expresividad armónica", "Modulación consciente"],
      evaluation: ["Reconoces cada modo por oído", "Movimientos cromáticos fluidos", "Expresión musical clara", "Modulas intencionalmente"],
      timePerExercise: "25-30 minutos por secuencia",
      practiceFrequency: "Diario, enfoque en calidad sonora más que velocidad",
      commonMistakes: [
        "Confundir modos similares (Dórico vs Menor natural)",
        "No resaltar las notas características",
        "Tocar demasiado rápido sin escuchar",
        "Ignorar el contexto armónico"
      ],
      practicalTips: [
        "Canta las notas características mientras tocas",
        "Practica con backing tracks en diferentes modos",
        "Analiza canciones famosas que usen cada modo",
        "Compón pequeñas progresiones en cada modo"
      ]
    },
    3: {
      title: "Desarrollo Avanzado",
      description: "Rearmónización sofisticada, sustituciones complejas y desarrollo de velocidad controlada",
      warmup: "15-20 min: Escalas alteradas, ejercicios de sustitución tritonal, patrones cromáticos avanzados",
      approach: "Análisis funcional mientras ejecutas. Entiende por qué cada sustitución funciona. Desarrolla velocidad sin sacrificar precisión armónica.",
      detailedApproach: [
        "Analiza cada progresión funcionalmente antes de tocar",
        "Practica sustituciones una por una",
        "Desarrolla patrones de digitación para saltos amplios",
        "Integra análisis teórico con ejecución práctica",
        "Aumenta tempo gradualmente manteniendo precisión"
      ],
      techniques: ["Sustituciones tritonales", "Rearmónización", "Saltos de posición", "Análisis funcional"],
      detailedTechniques: {
        "Sustituciones tritonales": "Reemplazar V7 por bII7. Ejemplo: G7 → Db7 en tonalidad de C. Mantiene la tensión de resolución.",
        "Rearmónización": "Cambiar la armonía manteniendo la melodía. Usar acordes más complejos, modulaciones, sustituciones cromáticas.",
        "Saltos de posición": "Movimientos de 5+ trastes entre acordes. Requiere visualización del mástil y memoria muscular precisa.",
        "Análisis funcional": "Identificar la función de cada acorde: tónica, subdominante, dominante, y sus sustitutos."
      },
      goals: ["Dominio de sustituciones", "Análisis en tiempo real", "Velocidad controlada", "Rearmónización creativa"],
      evaluation: ["Explicas cada sustitución", "Ejecutas sin errores a tempo", "Improvisas variaciones", "Analizas mientras tocas"],
      timePerExercise: "35-40 minutos por secuencia",
      practiceFrequency: "5-6 días por semana, con día de descanso",
      commonMistakes: [
        "Usar sustituciones sin entender su función",
        "Acelerar perdiendo precisión armónica",
        "Saltos de posición imprecisos",
        "Análisis teórico desconectado de la práctica"
      ],
      practicalTips: [
        "Practica sustituciones en diferentes tonalidades",
        "Usa software de análisis armónico",
        "Estudia rearmónizaciones de standards de jazz",
        "Graba improvisaciones para analizar después"
      ]
    },
    4: {
      title: "Maestría Técnica",
      description: "Técnicas virtuosas, coordinación extrema y expresión musical avanzada",
      warmup: "20-25 min: Técnicas específicas (tapping, hybrid picking), ejercicios de coordinación, estiramientos avanzados",
      approach: "Perfección técnica y musical simultánea. Cada técnica debe servir a la expresión musical, no ser un fin en sí misma.",
      detailedApproach: [
        "Domina cada técnica por separado antes de combinar",
        "Integra técnicas avanzadas en contexto musical",
        "Desarrolla tu voz personal usando estas herramientas",
        "Mantén la musicalidad como prioridad máxima",
        "Practica técnicas en diferentes contextos armónicos"
      ],
      techniques: ["Tapping", "Hybrid picking", "Wide stretches", "Politonalidad"],
      detailedTechniques: {
        "Tapping": "Técnica de mano derecha en el mástil. Combina con legato de mano izquierda. Útil para arpejos amplios y melodías rápidas.",
        "Hybrid picking": "Combinación de púa y dedos. Permite texturas complejas y voicings imposibles solo con púa o solo con dedos.",
        "Wide stretches": "Extensiones de mano izquierda de 5+ trastes. Requiere flexibilidad y fuerza específica. Esencial para voicings modernos.",
        "Politonalidad": "Superposición de múltiples centros tonales. Crea tensiones armónicas sofisticadas y colores únicos."
      },
      goals: ["Técnica impecable", "Musicalidad avanzada", "Creatividad personal", "Expresión única"],
      evaluation: ["Técnica perfecta", "Expresión personal clara", "Capacidad de enseñar", "Creatividad compositiva"],
      timePerExercise: "45-50 minutos por secuencia",
      practiceFrequency: "Diario, con descansos programados para evitar lesiones",
      commonMistakes: [
        "Priorizar técnica sobre musicalidad",
        "Tensión excesiva causando lesiones",
        "Usar técnicas complejas innecesariamente",
        "No desarrollar voz personal"
      ],
      practicalTips: [
        "Filma tu técnica para detectar tensiones",
        "Practica técnicas en tempo muy lento",
        "Estudia maestros de cada técnica específica",
        "Compón piezas que requieran estas técnicas"
      ]
    },
    5: {
      title: "Retos Mentales",
      description: "Desafíos cognitivos extremos que requieren procesamiento mental sobrehumano",
      warmup: "25-30 min: Ejercicios mentales (análisis sin tocar), escalas en múltiples tonalidades, ejercicios de memoria",
      approach: "Procesamiento multi-tarea consciente. Desarrolla capacidad de análisis simultáneo mientras mantienes ejecución perfecta.",
      detailedApproach: [
        "Desarrolla análisis teórico instantáneo",
        "Practica procesamiento de múltiples tareas",
        "Fortalece memoria musical a corto y largo plazo",
        "Desarrolla resistencia mental extrema",
        "Integra verbalización con ejecución"
      ],
      techniques: ["Análisis simultáneo", "Modulación mental", "Memoria fotográfica", "Procesamiento dual"],
      detailedTechniques: {
        "Análisis simultáneo": "Identificar función armónica, grado, tensiones y sustituciones mientras ejecutas. Requiere automatización técnica total.",
        "Modulación mental": "Procesar cambios de tonalidad en tiempo real. Calcular nuevos grados y funciones instantáneamente.",
        "Memoria fotográfica": "Memorización perfecta de secuencias largas. Visualización mental del mástil y progresiones.",
        "Procesamiento dual": "Mantener dos realidades mentales simultáneas (ej: tocar en Dm pensando en Gm)."
      },
      goals: ["Procesamiento mental extremo", "Resistencia cognitiva", "Análisis instantáneo", "Multitarea perfecta"],
      evaluation: ["Análisis perfecto mientras ejecutas", "Sin fatiga mental", "Enseñas mientras tocas", "Memoria perfecta"],
      timePerExercise: "60-75 minutos por secuencia",
      practiceFrequency: "4-5 días, con descanso mental obligatorio",
      warnings: ["Puede causar fatiga mental extrema", "Requiere descansos frecuentes", "Solo para músicos con base sólida"],
      commonMistakes: [
        "Forzar el procesamiento mental",
        "No tomar descansos adecuados",
        "Sacrificar ejecución por análisis",
        "Sobrecarga cognitiva"
      ],
      practicalTips: [
        "Comienza con secuencias cortas",
        "Practica análisis sin tocar primero",
        "Usa técnicas de meditación para concentración",
        "Descansa 10 minutos cada 30 de práctica"
      ]
    },
    6: {
      title: "Técnica Extrema",
      description: "Combinaciones técnicas que desafían los límites físicos humanos",
      warmup: "30-40 min: Preparación física extrema, estiramientos específicos, ejercicios de coordinación imposible",
      approach: "Construcción gradual de técnicas combinadas. Cada combinación debe dominarse por separado antes de integrar.",
      detailedApproach: [
        "Calentamiento físico extremo obligatorio",
        "Dominio individual de cada técnica",
        "Integración gradual de combinaciones",
        "Monitoreo constante de tensión muscular",
        "Desarrollo de resistencia física específica"
      ],
      techniques: ["Tapping + Hybrid", "Bends + Tapping", "Técnicas simultáneas", "Coordinación sobrehumana"],
      detailedTechniques: {
        "Tapping + Hybrid": "Tapping con mano derecha mientras hybrid picking con púa y dedos. Requiere independencia total de dedos.",
        "Bends + Tapping": "Bends con mano izquierda mientras tapping con derecha. Coordinación extrema y fuerza específica.",
        "Técnicas simultáneas": "Múltiples técnicas avanzadas al mismo tiempo. Desafía límites de coordinación humana.",
        "Coordinación sobrehumana": "Movimientos independientes de cada dedo en ambas manos simultáneamente."
      },
      goals: ["Coordinación sobrehumana", "Resistencia física", "Precisión absoluta", "Técnicas imposibles"],
      evaluation: ["Ejecutas técnicas imposibles", "Sin tensión muscular", "Creatividad técnica", "Resistencia extrema"],
      timePerExercise: "90-120 minutos por secuencia",
      practiceFrequency: "3-4 días, recuperación obligatoria",
      warnings: ["Riesgo de lesión grave", "Requiere supervisión médica", "Calentamiento extremo necesario", "Solo para atletas musicales"],
      commonMistakes: [
        "Saltar el calentamiento",
        "Forzar técnicas sin preparación",
        "Ignorar señales de dolor",
        "Practicar con tensión excesiva"
      ],
      practicalTips: [
        "Consulta fisioterapeuta especializado",
        "Usa técnicas de relajación muscular",
        "Filma en cámara lenta para análisis",
        "Desarrolla rutinas de recuperación"
      ]
    },
    7: {
      title: "Transcendencia Musical",
      description: "Fusión total entre músico y música, trascendiendo la técnica pura",
      warmup: "Meditación musical profunda, conexión espiritual con el instrumento, preparación mental y física completa",
      approach: "Estado meditativo profundo donde la técnica se vuelve invisible y solo queda la expresión pura del alma musical.",
      detailedApproach: [
        "Entra en estado meditativo antes de tocar",
        "Conecta espiritualmente con cada nota",
        "Trasciende la técnica consciente",
        "Expresa tu esencia musical más profunda",
        "Fusiona mente, cuerpo y música en uno"
      ],
      techniques: ["Meditación musical", "Conexión espiritual", "Creatividad pura", "Transcendencia técnica"],
      detailedTechniques: {
        "Meditación musical": "Estado alterado de conciencia donde la música fluye sin esfuerzo consciente. Requiere años de preparación.",
        "Conexión espiritual": "Relación íntima con el instrumento donde se vuelve extensión del alma. Comunicación directa.",
        "Creatividad pura": "Improvisación que surge del inconsciente musical. Sin filtros mentales o técnicos.",
        "Transcendencia técnica": "La técnica se vuelve invisible, automática, permitiendo expresión pura sin limitaciones."
      },
      goals: ["Transcendencia técnica", "Expresión pura", "Maestría total", "Inspiración divina"],
      evaluation: ["Fusión mente-cuerpo-música", "Creatividad ilimitada", "Inspiración a otros", "Maestría transcendental"],
      timePerExercise: "150+ minutos, sin límite temporal",
      practiceFrequency: "Cuando el espíritu lo demande, sin forzar",
      warnings: ["Experiencia transformadora", "Solo para maestros realizados", "Puede cambiar tu percepción de la realidad"],
      commonMistakes: [
        "Forzar el estado transcendental",
        "Mantener ego técnico",
        "Buscar resultados específicos",
        "No estar preparado espiritualmente"
      ],
      practicalTips: [
        "Practica meditación diaria",
        "Desarrolla humildad musical profunda",
        "Estudia filosofías musicales orientales",
        "Busca maestros espirituales de la música"
      ]
    },
    8: {
      title: "Retos Cerebrales",
      description: "Capacidad mental sobrehumana aplicada a la música",
      warmup: "Ejercicios cognitivos complejos, análisis teórico sin instrumento, ejercicios de memoria extrema",
      approach: "Procesamiento mental extremo que desafía los límites de la cognición humana aplicada a la música.",
      detailedApproach: [
        "Desarrolla capacidad de procesamiento múltiple",
        "Fortalece memoria musical sobrehumana",
        "Integra análisis teórico con ejecución perfecta",
        "Desarrolla capacidad pedagógica simultánea",
        "Trasciende limitaciones cognitivas normales"
      ],
      techniques: ["Análisis en vivo", "Transposición dual", "Memoria perfecta", "Enseñanza simultánea"],
      detailedTechniques: {
        "Análisis en vivo": "Análisis funcional completo mientras ejecutas perfectamente. Verbalización de cada función armónica en tiempo real.",
        "Transposición dual": "Procesamiento simultáneo de dos tonalidades diferentes. Tocar en una, pensar en otra.",
        "Memoria perfecta": "Memorización instantánea de secuencias largas con recall perfecto. Memoria fotográfica musical.",
        "Enseñanza simultánea": "Explicar conceptos complejos mientras ejecutas técnicas avanzadas. Multitarea pedagógica extrema."
      },
      goals: ["Capacidad mental sobrehumana", "Procesamiento multi-tarea", "Resistencia cognitiva extrema", "Genialidad musical"],
      evaluation: ["Análisis perfecto en tiempo real", "Memoria fotográfica", "Enseñanza mientras ejecutas", "Procesamiento sobrehumano"],
      timePerExercise: "45-120 minutos según ejercicio",
      practiceFrequency: "2-3 días, descanso mental obligatorio",
      warnings: ["Sobrecarga cognitiva extrema", "Solo para genios musicales", "Puede causar agotamiento mental severo"],
      commonMistakes: [
        "Subestimar la demanda cognitiva",
        "No tomar descansos mentales",
        "Forzar capacidades no desarrolladas",
        "Ignorar límites cognitivos personales"
      ],
      practicalTips: [
        "Desarrolla técnicas de concentración extrema",
        "Practica ejercicios cognitivos diarios",
        "Usa suplementos para función cerebral",
        "Consulta neurocientíficos especializados"
      ]
    }
  };

  const currentMethodology = phaseMethodology[currentPhase] || phaseMethodology[1];

  const sections = [
    { id: 'overview', title: 'Visión General', icon: BookOpen },
    { id: 'approach', title: 'Metodología', icon: Target },
    { id: 'techniques', title: 'Técnicas', icon: Zap },
    { id: 'evaluation', title: 'Evaluación', icon: Award },
    { id: 'schedule', title: 'Programación', icon: Clock },
    { id: 'tips', title: 'Consejos', icon: Brain }
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
                <h4 className="font-semibold text-blue-800 mb-2">📋 Descripción de la Fase</h4>
                <p className="text-blue-700">{currentMethodology.description}</p>
              </div>
              
              {currentMethodology.warnings && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={18} />
                    <h4 className="font-semibold text-red-800">⚠️ Advertencias Importantes</h4>
                  </div>
                  <ul className="space-y-1">
                    {currentMethodology.warnings.map((warning, index) => (
                      <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                        <span className="text-red-500 mt-1">🚨</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Objetivos Principales</h4>
                <ul className="space-y-2">
                  {currentMethodology.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="text-green-600 mt-1" size={16} />
                      <span className="text-green-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeSection === 'approach' && (
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">🔥 Calentamiento Específico</h4>
                <p className="text-orange-700">{currentMethodology.warmup}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Enfoque de Práctica</h4>
                <p className="text-purple-700 mb-3">{currentMethodology.approach}</p>
                
                <h5 className="font-medium text-purple-800 mb-2">📝 Pasos Detallados:</h5>
                <ol className="list-decimal list-inside space-y-1 text-sm text-purple-700">
                  {currentMethodology.detailedApproach.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {activeSection === 'techniques' && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-3">⚡ Técnicas Principales</h4>
                <div className="grid gap-3">
                  {currentMethodology.techniques.map((technique, index) => (
                    <div key={index} className="p-3 bg-yellow-100 rounded border-l-4 border-yellow-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="text-yellow-600" size={16} />
                        <span className="text-yellow-800 font-medium">{technique}</span>
                      </div>
                      {currentMethodology.detailedTechniques && currentMethodology.detailedTechniques[technique] && (
                        <p className="text-yellow-700 text-sm">{currentMethodology.detailedTechniques[technique]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'evaluation' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-3">🎯 Objetivos de Dominio</h4>
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
                <h4 className="font-semibold text-green-800 mb-3">✅ Criterios de Evaluación</h4>
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
                    <h4 className="font-semibold text-blue-800">⏱️ Duración por Ejercicio</h4>
                  </div>
                  <p className="text-blue-700 font-medium">{currentMethodology.timePerExercise}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="text-purple-600" size={18} />
                    <h4 className="font-semibold text-purple-800">📅 Frecuencia Recomendada</h4>
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

          {activeSection === 'tips' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-3">❌ Errores Comunes</h4>
                <ul className="space-y-2">
                  {currentMethodology.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span className="text-red-700 text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">💡 Consejos Prácticos</h4>
                <ul className="space-y-2">
                  {currentMethodology.practicalTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✅</span>
                      <span className="text-green-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🎯 Recordatorio Importante</h4>
                <p className="text-yellow-700 text-sm">
                  La calidad siempre es más importante que la velocidad. Domina cada fase completamente antes de avanzar a la siguiente.
                  {currentPhase >= 5 && " En fases extremas, la seguridad mental y física es prioritaria."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodologyPanel;