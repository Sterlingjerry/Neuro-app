import React, { useState, useEffect, useRef } from 'react'; // Ensure useState, useEffect, useRef are imported

const BreathingExercisePage = () => {
  const [duration, setDuration] = useState(60); // Default to 60 seconds
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause
  const [instruction, setInstruction] = useState('Get Ready...');
  const intervalRef = useRef(null);

  // Breathing pattern (seconds)
  const inhaleDuration = 4;
  const holdDuration = 4;
  const exhaleDuration = 6;
  const pauseDuration = 2;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Cycle phases
            let nextPhase = '';
            let nextInstruction = '';
            let newDuration = 0;

            if (phase === 'inhale') {
              nextPhase = 'hold';
              nextInstruction = 'Hold Breath';
              newDuration = holdDuration;
            } else if (phase === 'hold') {
              nextPhase = 'exhale';
              nextInstruction = 'Exhale';
              newDuration = exhaleDuration;
            } else if (phase === 'exhale') {
              nextPhase = 'pause';
              nextInstruction = 'Pause';
              newDuration = pauseDuration;
            } else if (phase === 'pause') {
              nextPhase = 'inhale';
              nextInstruction = 'Inhale';
              newDuration = inhaleDuration;
            }

            setPhase(nextPhase);
            setInstruction(nextInstruction);
            return newDuration;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, phase]);

  const startExercise = () => {
    setTimer(inhaleDuration);
    setPhase('inhale');
    setInstruction('Inhale');
    setIsRunning(true);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setTimer(duration); // Reset timer to initial duration setting
    setPhase('inhale');
    setInstruction('Get Ready...');
  };

  const resetExercise = () => {
    stopExercise();
    setDuration(60); // Reset duration to default
    setTimer(60);
  };

  // Dynamic circle size for visual effect
  const circleSize = phase === 'inhale' ? 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96' :
                     phase === 'exhale' ? 'w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80' :
                     'w-56 h-56 md:w-72 md:h-72 lg:w-88 lg:h-88';

  const circleColor = phase === 'inhale' ? 'bg-blue-500' :
                      phase === 'exhale' ? 'bg-indigo-500' :
                      'bg-purple-500';

  const transitionDurationStyle = {
    transitionDuration: phase === 'inhale' ? `${inhaleDuration}s` :
                        phase === 'exhale' ? `${exhaleDuration}s` :
                        '0.5s',
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center min-h-[60vh] border border-gray-200">
      <h2 className="text-3xl font-bold font-montserrat text-brand-blue mb-6">Guided Breathing Exercise</h2>
      <p className="text-lg font-montserrat text-brand-black/80 mb-8 max-w-2xl mx-auto">
        Follow the visual guide to practice deep breathing and calm your mind.
      </p>

      <div className="relative flex items-center justify-center mb-8">
        <div
          className={`rounded-full ${circleColor} flex items-center justify-center text-white text-3xl font-bold transition-all ease-in-out shadow-xl ${circleSize}`}
          style={transitionDurationStyle}
        >
          {isRunning ? timer : instruction === 'Get Ready...' ? 'Start' : instruction}
        </div>
      </div>

      <p className="text-2xl font-semibold font-montserrat text-brand-black mb-6">
        {instruction}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {!isRunning ? (
          <button
            onClick={startExercise}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 active:bg-green-800 transition duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Start Breathing
          </button>
        ) : (
          <button
            onClick={stopExercise}
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 active:bg-red-800 transition duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            Stop Exercise
          </button>
        )}
        <button
          onClick={resetExercise}
          className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 active:bg-gray-800 transition duration-300 shadow-lg transform hover:-translate-y-0.5"
        >
          Reset
        </button>
      </div>

      <div className="mt-8 text-gray-700">
        <p className="font-medium font-montserrat text-brand-black/80">Breathing Pattern: Inhale {inhaleDuration}s, Hold {holdDuration}s, Exhale {exhaleDuration}s, Pause {pauseDuration}s</p>
      </div>
    </div>
  );
};

export default BreathingExercisePage;