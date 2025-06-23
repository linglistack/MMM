import { useState, useEffect } from 'react';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setIsReady(true);
      }
    };

    // Voices are loaded asynchronously
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    
    // Check if voices are already loaded
    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
        setVoices(initialVoices);
        setIsReady(true);
    }

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  const getPremiumVoice = () => {
    if (!isReady) return null;

    const premiumVoicesPriority = [
      // High-quality macOS voices
      'Samantha',
      'Victoria',
      'Daniel',
      // High-quality Windows voices
      'Microsoft Zira Desktop - English (United States)',
      'Microsoft David Desktop - English (United States)',
      // Google's high-quality voices often included in Chrome
      'Google US English',
    ];

    for (const voiceName of premiumVoicesPriority) {
      const voice = voices.find(v => v.name === voiceName && v.lang.startsWith('en'));
      if (voice) {
        return voice;
      }
    }
    
    // Fallback to any US English voice
    return voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en')) || null;
  };

  return { isReady, getPremiumVoice };
};

export default useSpeechSynthesis; 