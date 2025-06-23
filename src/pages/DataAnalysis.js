import React, { useState, useEffect, useRef } from 'react';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';

const tableData = [
  { group: 'Not Opted In', subgroup: 'Control', reach: 3527, conversions: 13, cr: '0.37%', revenue: 875.24, ccr: '0.37%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'Not Opted In', subgroup: 'Conversion Targeting', reach: 11077, conversions: 72, cr: '0.65%', revenue: 2260.74, ccr: '0.37%', lift: '43.29%', spend: 1813.78, aaRevenue: 978.77, aaROAS: '0.53963' },
  { group: 'Not Opted In', subgroup: 'R&F Targeting', reach: 10877, conversions: 45, cr: '0.41%', revenue: 2675.42, ccr: '0.37%', lift: '10.91%', spend: 1805.84, aaRevenue: 291.86, aaROAS: '0.16162' },
  { group: 'Opted In', subgroup: 'Control', reach: 1211, conversions: 31, cr: '2.56%', revenue: 1487.63, ccr: '2.56%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'Opted In', subgroup: 'Conversion Targeting', reach: 3800, conversions: 93, cr: '2.45%', revenue: 4419.24, ccr: '2.56%', lift: '-4.60%', spend: 622.22, aaRevenue: -203.14, aaROAS: '-0.3265' },
  { group: 'Opted In', subgroup: 'R&F Targeting', reach: 3645, conversions: 94, cr: '2.58%', revenue: 4014.66, ccr: '2.56%', lift: '0.74%', spend: 605.16, aaRevenue: 29.59, aaROAS: '0.0489' },
  { group: 'All Customers', subgroup: 'Control', reach: 4738, conversions: 44, cr: '0.93%', revenue: 2362.87, ccr: '0.93%', lift: '0.00%', spend: 0.00, aaRevenue: 0.00, aaROAS: '0.00000' },
  { group: 'All Customers', subgroup: 'Conversion Targeting', reach: 14877, conversions: 165, cr: '1.11%', revenue: 6679.98, ccr: '0.93%', lift: '16.27%', spend: 2436.00, aaRevenue: 1086.73, aaROAS: '0.44611' },
  { group: 'All Customers', subgroup: 'R&F Targeting', reach: 14522, conversions: 139, cr: '0.96%', revenue: 6690.08, ccr: '0.93%', lift: '2.98%', spend: 2411.00, aaRevenue: 199.25, aaROAS: '0.08264' },
];

const groupedData = tableData.reduce((acc, row) => {
  if (!acc[row.group]) {
    acc[row.group] = [];
  }
  acc[row.group].push(row);
  return acc;
}, {});

const insights = [
    {
        text: "Why We Ran This Test. We wanted to see if Facebook ads—specifically Conversion Targeting and Reach & Frequency Targeting—could actually drive more conversions and revenue compared to doing nothing (our control group). Also, we were curious: Would people who aren't getting our emails respond better to ads?",
        highlight: { type: 'card', id: 'purpose' }
    },
    {
        text: "What We Thought Might Happen. Conversion targeting would do better than R&F targeting. People not opted into email would be more impacted by ads—they're not already hearing from us, so Facebook could make a bigger difference.",
        highlight: { type: 'card', id: 'hypothesis' }
    },
    {
        text: "How We Set It Up. We split customers into 3 groups: Control (no ads), Conversion Targeting, and R&F Targeting. We also broke them down by email opt-in status—to see if that changed results. Key things we looked at: conversions, revenue, lift vs. control, and ROAS.",
        highlight: { type: 'card', id: 'design' }
    },
    {
        text: "Now let's look at the results for all customers. Conversion Targeting worked best, with a 16% lift in conversions.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And a solid ROAS of point-four-five.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "R&F was weaker, showing a small 3% lift.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'R&F Targeting', column: 'Lift %' }
    },
    {
        text: "And a low ROAS of just point-zero-eight.",
        highlight: { type: 'cell', group: 'All Customers', subgroup: 'R&F Targeting', column: 'aaROAS' }
    },
    {
        text: "For non-email opted-in customers, this group saw the biggest impact. Conversion Targeting had an impressive 43% lift.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And a strong ROAS of point-five-four.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "Even R&F worked okay here with an 11% lift.",
        highlight: { type: 'cell', group: 'Not Opted In', subgroup: 'R&F Targeting', column: 'Lift %' }
    },
    {
        text: "However, for customers already on our email list, ads didn't really help. In fact, Conversion Targeting had negative lift and negative ROAS.",
        highlight: { type: 'group', name: 'Opted In' }
    },
    {
        text: "Conversion Targeting had negative lift.",
        highlight: { type: 'cell', group: 'Opted In', subgroup: 'Conversion Targeting', column: 'Lift %' }
    },
    {
        text: "And negative ROAS, showing this was actually wasteful spending.",
        highlight: { type: 'cell', group: 'Opted In', subgroup: 'Conversion Targeting', column: 'aaROAS' }
    },
    {
        text: "So what this tells us is that targeting people not getting our emails is where Facebook ads shine. If someone's already engaged via email, adding Facebook doesn't add much, and might even be wasteful.",
        highlight: { type: 'group', name: 'Not Opted In' }
    },
    {
        text: "This means Conversion Targeting is the clear winner—more efficient and more impactful. R&F isn't worth the spend unless we have extra budget and a specific goal, like awareness.",
        highlight: { type: 'col', name: 'aaROAS' }
    },
];

const DataAnalysis = () => {
  const headers = ['Subgroup', 'Reach', 'Conversions', 'CR', 'Revenue', 'CCR', 'Lift %', 'Spend', 'aaRevenue', 'aaROAS'];
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const tableRef = useRef(null);
  const { isReady: isSpeechReady, getPremiumVoice } = useSpeechSynthesis();

  const currentInsight = isPlaying ? insights[highlightedIndex] : null;
  const currentHighlight = currentInsight?.highlight;

  useEffect(() => {
    if (isPlaying && currentInsight && isSpeechReady) {
      const utterance = new SpeechSynthesisUtterance(currentInsight.text);
      const premiumVoice = getPremiumVoice();
      
      if (premiumVoice) {
        utterance.voice = premiumVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1;
      } else {
        // Fallback to default voice settings if no premium voice is found
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
      }
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      utterance.onend = () => {
        if (highlightedIndex < insights.length - 1) {
          setTimeout(() => setHighlightedIndex(prev => prev + 1), 1000);
        } else {
          setIsPlaying(false);
        }
      };
    } else {
      window.speechSynthesis.cancel();
    }
    return () => window.speechSynthesis.cancel();
  }, [isPlaying, highlightedIndex, isSpeechReady]);

  const handlePlay = () => {
    setHighlightedIndex(0);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    window.speechSynthesis.cancel();
  };

  const handleNext = () => {
    setHighlightedIndex((prevIndex) => (prevIndex + 1) % insights.length);
    window.speechSynthesis.cancel(); // Stop current speech and let useEffect trigger the new one
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lift Analysis Report</h1>
        <div className="flex items-center space-x-2">
            {!isPlaying ? (
              <button onClick={handlePlay} className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 border border-primary-200 transition-colors flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Play Insights</span>
              </button>
            ) : (
              <>
                <button onClick={handleNext} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Next Insight ({highlightedIndex + 1}/{insights.length})</span>
                </button>
                <button onClick={handleStop} className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </>
            )}
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Export CSV</button>
        </div>
      </div>
      
      {/* Insight Card */}
      {currentInsight && (
          <div className="absolute top-24 right-6 w-full max-w-sm bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Insight #{highlightedIndex + 1}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{currentInsight.text}</p>
          </div>
      )}

      {/* Experiment Setup Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'purpose', title: 'Purpose', content: 'To evaluate the effectiveness of two Facebook targeting strategies—Conversion Targeting vs. Reach & Frequency (R&F) Targeting—in driving incremental conversions and revenue compared to a control group with no ads.' },
          { id: 'hypothesis', title: 'Hypothesis', content: 'Facebook ads, especially Conversion Targeting, will lift conversions and revenue vs. control. Customers who are not engaged via email (non-opted-in) will be more responsive to paid social campaigns.' },
          { id: 'design', title: 'Design & Considerations', content: 'Randomized controlled test with 3 groups: Control, Conversion Targeting, R&F Targeting. Segmented by email opt-in status to understand interaction between email marketing and paid social. Metrics tracked: Conversion Rate (CR), Incremental Lift, Spend, Revenue, ROAS.' },
        ].map(item => {
            const isHighlighted = isPlaying && currentHighlight?.type === 'card' && currentHighlight.id === item.id;
            const isDimmed = isPlaying && (!isHighlighted || currentHighlight?.type !== 'card');

            return (
                <div key={item.id} className={`bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ${isHighlighted ? 'ring-2 ring-primary-500 scale-105' : ''} ${isDimmed ? 'opacity-30' : ''}`}>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.content}</p>
                </div>
            )
        })}
      </div>

      <div className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-300 ${isPlaying && currentHighlight?.type === 'card' ? 'opacity-30' : ''}`} ref={tableRef}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3 px-4 rounded-l-lg">Group</th>
                {headers.map(header => {
                  const isColHighlighted = currentHighlight?.type === 'col' && currentHighlight?.name === header;
                  const isDimmed = isPlaying && currentHighlight?.type === 'col' && !isColHighlighted;
                  return <th key={header} scope="col" className={`py-3 px-4 transition-all duration-300 ${isColHighlighted ? 'bg-primary-100' : ''} ${isDimmed ? 'opacity-30' : ''}`}>{header}</th>
                })}
                <th scope="col" className="py-3 px-4 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([group, rows]) => (
                <React.Fragment key={group}>
                  {rows.map((row, rowIndex) => {
                    const isRowHighlighted = currentHighlight?.type === 'row' && currentHighlight?.group === group && currentHighlight?.subgroup === row.subgroup;
                    const isGroupHighlighted = currentHighlight?.type === 'group' && currentHighlight?.name === group;
                    const isCellHighlighted = currentHighlight?.type === 'cell' && 
                      currentHighlight?.group === group && 
                      currentHighlight?.subgroup === row.subgroup;
                    const isFocus = isRowHighlighted || isGroupHighlighted || isCellHighlighted;
                    const isDimmed = isPlaying && !isFocus && currentHighlight?.type !== 'col';

                    return (
                      <tr className={`border-b border-gray-200 ${rowIndex === 0 ? 'border-t-4 border-primary-200' : ''} transition-all duration-300 ${isFocus ? 'bg-primary-50' : ''} ${isDimmed ? 'opacity-30' : 'hover:bg-gray-50'}`} key={row.subgroup}>
                        {rowIndex === 0 && <td rowSpan={rows.length} className="py-4 px-4 align-top font-bold text-gray-800 border-r border-gray-200">{group}</td>}
                        {headers.map(header => {
                            const isColHighlighted = currentHighlight?.type === 'col' && currentHighlight?.name === header;
                            const isCellHighlighted = currentHighlight?.type === 'cell' && 
                              currentHighlight?.group === group && 
                              currentHighlight?.subgroup === row.subgroup && 
                              currentHighlight?.column === header;
                            const isCellDimmed = isPlaying && currentHighlight?.type === 'col' && !isColHighlighted;
                            const value = row[header.toLowerCase().replace(/[^a-z0-9]/gi, '')];
                            
                            let displayValue = value;
                            if (typeof value === 'number') {
                                displayValue = value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                                if (['revenue', 'spend', 'aarevenue'].includes(header.toLowerCase().replace(/[^a-z0-9]/gi, ''))) {
                                    displayValue = `$${displayValue}`;
                                }
                            }
                            
                            const cellClasses = `py-3 px-4 transition-all duration-300 ${isColHighlighted || isCellHighlighted ? 'bg-primary-100' : ''} ${isCellDimmed ? 'opacity-30' : ''}`;
                            const liftClasses = `font-medium ${row.lift.startsWith('-') ? 'text-red-500' : 'text-green-600'}`;
                            const aaRevenueClasses = `font-medium ${row.aaRevenue < 0 ? 'text-red-500' : 'text-gray-800'}`;
                            const aaRoasClasses = `font-medium ${parseFloat(row.aaROAS) < 0 ? 'text-red-500' : 'text-gray-800'}`;

                            if (header === 'Lift %') return <td className={`${cellClasses} ${liftClasses}`}>{row.lift}</td>;
                            if (header === 'aaRevenue') return <td className={`${cellClasses} ${aaRevenueClasses}`}>${row.aaRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>;
                            if (header === 'aaROAS') return <td className={`${cellClasses} ${aaRoasClasses}`}>{parseFloat(row.aaROAS).toFixed(5)}</td>;
                            if (header === 'Subgroup') return <td className={cellClasses}>{row.subgroup}</td>;
                            if (['Reach', 'Conversions'].includes(header)) return <td className={cellClasses}>{row[header.toLowerCase()].toLocaleString()}</td>;
                            if (['Revenue', 'Spend'].includes(header)) return <td className={cellClasses}>${row[header.toLowerCase()].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>;

                            return <td className={cellClasses}>{row[header.toLowerCase().replace(/[^a-z0-9]/gi, '')]}</td>;
                        })}
                        <td className="py-3 px-4"></td>
                      </tr>
                    )
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis; 