import React, { useState, useEffect, useRef } from 'react';

const ChartNarrator = ({ 
  chartId, 
  insights,
  highlightAreas = [],
  onPlayStateChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  const stopNarration = () => {
    if (audioRef.current) {
      window.speechSynthesis.cancel();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPlaying(false);
    setCurrentInsightIndex(0);
    onPlayStateChange && onPlayStateChange(false);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const speakInsight = (index) => {
    if (index >= insights.length) {
      stopNarration();
      return;
    }

    const insight = insights[index];
    const utterance = new SpeechSynthesisUtterance(insight.text);
    
    // Get available voices and select the best one
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      ['Samantha', 'Alex', 'Karen'].includes(voice.name) || 
      (voice.lang === 'en-US' && voice.localService)
    ) || voices.find(voice => voice.lang.startsWith('en-')) || voices[0];
    
    // Configure voice parameters
    utterance.voice = preferredVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    
    // Add slight pauses at punctuation
    utterance.text = insight.text.replace(/([.,!?])/g, '$1 ');

    // Handle highlighting
    if (insight.highlightArea) {
      const chart = document.querySelector(`#${chartId}`);
      if (chart) {
        // Remove previous highlights
        chart.querySelectorAll('.highlight-overlay').forEach(el => el.remove());
        
        // Add new highlight
        const overlay = document.createElement('div');
        overlay.className = 'highlight-overlay';
        overlay.style.position = 'absolute';
        overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        overlay.style.border = '2px solid rgba(59, 130, 246, 0.5)';
        overlay.style.borderRadius = '4px';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = 'all 0.3s ease';
        
        // Position overlay based on highlight area
        Object.assign(overlay.style, insight.highlightArea);
        
        chart.style.position = 'relative';
        chart.appendChild(overlay);
      }
    }

    utterance.onend = () => {
      // Wait for specified duration before moving to next insight
      timeoutRef.current = setTimeout(() => {
        setCurrentInsightIndex(index + 1);
        speakInsight(index + 1);
      }, insight.duration || 800);
    };

    audioRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlayStateChange && onPlayStateChange(true);
    speakInsight(0);
  };

  const handleStop = () => {
    stopNarration();
  };

  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={isPlaying ? handleStop : handlePlay}
        className={`flex items-center space-x-2 ${
          isPlaying 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-indigo-600 hover:bg-indigo-700'
        } text-white px-3 py-1.5 rounded-lg shadow-sm transition-all duration-150 ease-in-out text-sm`}
        title={isPlaying ? "Stop narration" : "Play insights"}
      >
        {isPlaying ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Stop</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            <span>Play Insights</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChartNarrator; 