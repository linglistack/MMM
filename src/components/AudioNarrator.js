import React, { useState, useRef } from 'react';

const AudioNarrator = ({ insights, isHeaderButton }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  
  const narrationSections = [
    {
      id: 'key-metrics-grid',
      text: (() => {
        const roas = insights.metrics.find(m => m.title === 'Total ROAS');
        const cac = insights.metrics.find(m => m.title === 'CAC');
        if (roas.positive && cac.positive) {
          return "Overall marketing efficiency is improving with better ROAS and lower customer acquisition costs.";
        } else if (!roas.positive && !cac.positive) {
          return "Marketing efficiency needs attention as both ROAS and acquisition costs are trending unfavorably.";
        } else {
          return "Mixed performance in marketing efficiency metrics requires balanced optimization.";
        }
      })()
    },
    {
      id: 'insights-section',
      text: (() => {
        const urgentTodos = insights.todoItems.filter(todo => !todo.completed && todo.priority === 'high');
        return `Key actions needed: ${urgentTodos.length > 0 ? 
          urgentTodos[0].text : 'Maintain current optimization efforts'}.`;
      })()
    },
    {
      id: 'performance-summary',
      text: (() => {
        const topChannel = insights.channelPerformance.reduce((a, b) => a.performance > b.performance ? a : b);
        const bottomChannel = insights.channelPerformance.reduce((a, b) => a.performance < b.performance ? a : b);
        return `Focus on scaling ${topChannel.name} which shows strong potential, while optimizing ${bottomChannel.name} which needs improvement.`;
      })()
    },
    {
      id: 'marketing-effectiveness-chart',
      text: (() => {
        const channels = insights.channelPerformance;
        const effectiveChannels = channels.filter(c => c.performance > 2).length;
        const ineffectiveChannels = channels.filter(c => c.performance < 0).length;
        return `Marketing effectiveness analysis shows ${effectiveChannels} channels exceeding targets and ${ineffectiveChannels} channels requiring optimization. Focus on replicating successful strategies from top performers.`;
      })()
    },
    {
      id: 'performance-vs-spend-chart',
      text: (() => {
        const channels = insights.channelPerformance;
        const highSpendLowPerf = channels.find(c => c.spendShare > 20 && c.performance < 0);
        const lowSpendHighPerf = channels.find(c => c.spendShare < 15 && c.performance > 5);
        
        let recommendation = '';
        if (highSpendLowPerf) {
          recommendation = `Consider reallocating budget from ${highSpendLowPerf.name} which has high spend but underperforms.`;
        }
        if (lowSpendHighPerf) {
          recommendation += ` Opportunity to scale ${lowSpendHighPerf.name} which performs well with limited budget.`;
        }
        
        return `Analyzing spend efficiency across channels. ${recommendation}`;
      })()
    }
  ];

  const toggleBlurOverlay = (show) => {
    const overlay = document.querySelector('.blur-overlay');
    if (show) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
  };

  const highlightSection = (sectionId) => {
    if (currentSection) {
      document.querySelector(`.${currentSection}`).classList.remove('focus-mode');
      document.querySelector(`.${currentSection} .narrator-controls`)?.remove();
    }
    
    const section = document.querySelector(`.${sectionId}`);
    if (section) {
      toggleBlurOverlay(true);
      section.classList.add('focus-mode');
      
      // Create and add narrator controls
      const controls = document.createElement('div');
      controls.className = 'narrator-controls';
      controls.innerHTML = `
        <div class="flex flex-row items-center gap-2">
          <button
            class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out"
            title="${isPlaying ? 'Stop narration' : 'Continue narration'}"
          >
            ${isPlaying ? 
              `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>` :
              `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>`
            }
          </button>
          <span class="text-sm text-gray-600 bg-white px-2 py-1 rounded-lg shadow-sm">
            Section ${narrationSections.findIndex(s => s.id === sectionId) + 1} of ${narrationSections.length}
          </span>
        </div>
      `;
      
      controls.querySelector('button').addEventListener('click', () => {
        if (isPlaying) {
          handleStop();
        } else {
          handlePlay();
        }
      });
      
      section.appendChild(controls);
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setCurrentSection(sectionId);
    }
  };

  const cleanup = () => {
    setIsPlaying(false);
    toggleBlurOverlay(false);
    if (currentSection) {
      document.querySelector(`.${currentSection}`).classList.remove('focus-mode');
      document.querySelector(`.${currentSection} .narrator-controls`)?.remove();
      setCurrentSection(null);
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    let currentIndex = 0;

    const speakSection = () => {
      if (currentIndex >= narrationSections.length) {
        cleanup();
        return;
      }

      const section = narrationSections[currentIndex];
      highlightSection(section.id);

      const utterance = new SpeechSynthesisUtterance(section.text);
      utterance.rate = 1.1;
      utterance.pitch = 1;

      utterance.onend = () => {
        currentIndex++;
        if (currentIndex < narrationSections.length) {
          setTimeout(speakSection, 500); // 0.5s pause between sections
        } else {
          setTimeout(cleanup, 1000);
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    try {
      speakSection();
    } catch (error) {
      console.error('Speech synthesis error:', error);
      cleanup();
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    cleanup();
  };

  return (
    <>
      <div className="blur-overlay"></div>
      {/* Floating stop button when playing */}
      {isPlaying && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleStop}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-150 ease-in-out"
            title="Stop narration"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Stop Narration</span>
          </button>
        </div>
      )}
      
      {/* Header button */}
      <button
        onClick={handlePlay}
        className={`flex items-center space-x-2 ${
          isHeaderButton 
            ? "px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            : "fixed top-4 right-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg"
        } transition-all duration-150 ease-in-out ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Listen to insights and recommendations"
        disabled={isPlaying}
      >
        <svg className={`w-5 h-5 ${isHeaderButton ? 'text-gray-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          {!isHeaderButton && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
        </svg>
        <span>Play Insights</span>
      </button>
    </>
  );
};

export default AudioNarrator; 