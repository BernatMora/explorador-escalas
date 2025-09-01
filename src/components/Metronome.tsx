import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MetronomeProps {
  tempo: number;
  setTempo: (tempo: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const Metronome: React.FC<MetronomeProps> = ({ tempo, setTempo, isPlaying, setIsPlaying }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatsPerMeasure] = useState(4);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextNoteTimeRef = useRef(0);
  const lookAhead = 25.0; // Cuántos ms adelante programar el audio
  const scheduleAheadTime = 0.1; // Cuánto tiempo adelante programar (segundos)

  // Inicializar AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Función para crear el sonido del click
  const playClick = (time: number, isAccent: boolean = false) => {
    if (!audioContextRef.current || isMuted) return;

    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Frecuencia más alta para el acento (primer tiempo)
    osc.frequency.value = isAccent ? 1000 : 800;
    
    // Volumen
    gainNode.gain.setValueAtTime(volume * (isAccent ? 1.0 : 0.7), time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.start(time);
    osc.stop(time + 0.1);
  };

  // Programador de audio preciso
  const scheduler = () => {
    if (!audioContextRef.current) return;

    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      const isAccent = currentBeat === 0;
      playClick(nextNoteTimeRef.current, isAccent);
      
      // Calcular el siguiente tiempo
      const secondsPerBeat = 60.0 / tempo;
      nextNoteTimeRef.current += secondsPerBeat;
      
      // Avanzar el beat
      setCurrentBeat((prev) => (prev + 1) % beatsPerMeasure);
    }
  };

  // Control del metrónomo
  useEffect(() => {
    if (isPlaying) {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      nextNoteTimeRef.current = audioContextRef.current?.currentTime || 0;
      intervalRef.current = setInterval(scheduler, lookAhead);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, tempo, currentBeat, volume, isMuted]);

  // Reset beat cuando se para
  useEffect(() => {
    if (!isPlaying) {
      setCurrentBeat(0);
    }
  }, [isPlaying]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700">Metrónomo</h3>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">{tempo} BPM</div>
          {isPlaying && (
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((beat) => (
                <div
                  key={beat}
                  className={`w-2 h-2 rounded-full transition-all duration-100 ${
                    beat === currentBeat
                      ? beat === 0 
                        ? 'bg-red-500 scale-125' 
                        : 'bg-blue-500 scale-125'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
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
          max="200"
          value={tempo}
          onChange={(e) => setTempo(parseInt(e.target.value))}
          className="flex-1"
        />
      </div>

      {/* Control de Volumen */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-1 rounded ${isMuted ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
          }}
          className="flex-1"
        />
        <span className="text-xs text-gray-500 w-8">
          {isMuted ? '0%' : Math.round(volume * 100) + '%'}
        </span>
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

      {/* Información del compás */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        Compás: 4/4 • Tiempo {currentBeat + 1} de {beatsPerMeasure}
        {isPlaying && <span className="ml-2">🎵</span>}
      </div>
    </div>
  );
};

export default Metronome;