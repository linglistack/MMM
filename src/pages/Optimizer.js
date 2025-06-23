import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartNarrator from '../components/ChartNarrator';
import OptimizationSuggestions from '../components/OptimizationSuggestions';

const Optimizer = () => {
  const [totalBudget, setTotalBudget] = useState(210);
  const [optimizationRunning, setOptimizationRunning] = useState(false);
  const [activeNarrator, setActiveNarrator] = useState(null);

  // Current vs Optimized Allocation
  const allocationData = [
    { channel: 'Search Non-Branded', current: 45, optimized: 52, currentRoi: 2.1, optimizedRoi: 2.4 },
    { channel: 'Influencers', current: 25, optimized: 32, currentRoi: 3.2, optimizedRoi: 3.5 },
    { channel: 'Podcast', current: 20, optimized: 18, currentRoi: 2.8, optimizedRoi: 2.9 },
    { channel: 'Meta Retargeting', current: 15, optimized: 12, currentRoi: 1.8, optimizedRoi: 2.0 },
    { channel: 'Linear TV', current: 10, optimized: 8, currentRoi: 1.5, optimizedRoi: 1.6 },
    { channel: 'Meta Prospecting', current: 8, optimized: 3, currentRoi: 0.9, optimizedRoi: 1.2 }
  ];

  // ROI Curve insights
  const roiCurveInsights = [
    {
      text: "The ROI curve analysis shows diminishing returns as spend increases across channels.",
      duration: 3000,
      highlightArea: {
        top: '30%',
        left: '10%',
        width: '80%',
        height: '40%'
      }
    },
    {
      text: "Search Non-Branded maintains the highest ROI up to $40,000 spend, starting at 3.5x and gradually decreasing to 2.1x.",
      duration: 4000,
      highlightArea: {
        top: '20%',
        left: '20%',
        width: '40%',
        height: '30%'
      }
    },
    {
      text: "Influencers show strong initial performance with 4.2x ROI at low spend levels, but efficiency drops more rapidly after $20,000.",
      duration: 4000,
      highlightArea: {
        top: '10%',
        left: '5%',
        width: '30%',
        height: '40%'
      }
    },
    {
      text: "The optimal allocation point for Search Non-Branded appears to be around $52,000, where it maintains a healthy 2.4x ROI while maximizing absolute returns.",
      duration: 4000,
      highlightArea: {
        top: '30%',
        left: '40%',
        width: '20%',
        height: '30%'
      }
    }
  ];

  // Budget Allocation insights
  const allocationInsights = [
    {
      text: "The optimization suggests significant changes to your current budget allocation across channels.",
      duration: 3000,
      highlightArea: {
        top: '20%',
        left: '10%',
        width: '80%',
        height: '60%'
      }
    },
    {
      text: "Search Non-Branded should receive a 15% increase in budget from $45,000 to $52,000, as it consistently delivers strong ROI even at higher spend levels.",
      duration: 4000,
      highlightArea: {
        top: '20%',
        left: '10%',
        width: '15%',
        height: '60%'
      }
    },
    {
      text: "Influencers show potential for growth, with a recommended 28% budget increase from $25,000 to $32,000, based on their high efficiency at current spend levels.",
      duration: 4000,
      highlightArea: {
        top: '20%',
        left: '20%',
        width: '15%',
        height: '60%'
      }
    },
    {
      text: "Meta Prospecting shows the largest recommended reduction, from $8,000 to $3,000, due to consistently lower ROI compared to other channels.",
      duration: 4000,
      highlightArea: {
        top: '20%',
        left: '75%',
        width: '15%',
        height: '60%'
      }
    }
  ];

  // ROI Curve Chart - Modern Styling
  const roiCurveOptions = {
    chart: {
      type: 'spline',
      height: 500,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      title: { 
        text: 'Budget Allocation ($k)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
        format: '${value}k',
        style: { 
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280'
        }
      },
      lineWidth: 0,
      tickWidth: 0,
      gridLineColor: '#f3f4f6',
      gridLineWidth: 1
    },
    yAxis: {
      title: { 
        text: 'Marginal ROI', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
        format: '{value}x',
        style: {
          fontSize: '11px',
          color: '#6b7280'
        }
      },
      gridLineColor: '#f3f4f6',
      gridLineWidth: 1
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
          radius: 6,
          lineWidth: 2,
          lineColor: '#fff'
        },
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4
          }
        }
      }
    },
    series: [{
      name: 'Search Non-Branded',
      data: [[10, 3.5], [20, 3.2], [30, 2.8], [40, 2.4], [50, 2.1], [60, 1.8], [70, 1.5]],
      color: '#0ea5e9'
    }, {
      name: 'Influencers',
      data: [[5, 4.2], [10, 3.8], [15, 3.5], [20, 3.2], [25, 2.9], [30, 2.6], [35, 2.3]],
      color: '#6b7280'
    }],
    credits: { enabled: false },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemStyle: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#374151'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderWidth: 0,
      borderRadius: 8,
      shadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: 2,
        opacity: 0.1,
        width: 8
      }
    }
  };

  // Budget Allocation Comparison Chart - Modern Styling
  const allocationComparisonOptions = {
    chart: {
      type: 'column',
      height: 500,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: allocationData.map(item => item.channel.replace(' ', '\n')),
      labels: { 
        style: { 
          fontSize: '11px',
          fontWeight: '500',
          color: '#6b7280'
        }
      },
      lineWidth: 0,
      tickWidth: 0
    },
    yAxis: {
      title: { 
        text: 'Budget Allocation ($k)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
        format: '${value}k',
        style: {
          fontSize: '11px',
          color: '#6b7280'
        }
      },
      gridLineColor: '#f3f4f6',
      gridLineWidth: 1
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
        borderRadius: 4,
        groupPadding: 0.1,
        dataLabels: {
          enabled: true,
          format: '${value}k',
          style: {
            fontWeight: '600',
            fontSize: '10px',
            color: '#374151',
            textOutline: 'none'
          }
        }
      }
    },
    series: [{
      name: 'Current Allocation',
      data: allocationData.map(item => item.current),
      color: '#6b7280'
    }, {
      name: 'Optimized Allocation',
      data: allocationData.map(item => item.optimized),
      color: '#0ea5e9'
    }],
    credits: { enabled: false },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      itemStyle: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#374151'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderWidth: 0,
      borderRadius: 8,
      shadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: 2,
        opacity: 0.1,
        width: 8
      }
    }
  };

  // Handle narrator state changes
  const handleNarratorStateChange = (chartId, isPlaying) => {
    if (isPlaying) {
      setActiveNarrator(chartId);
    } else if (activeNarrator === chartId) {
      setActiveNarrator(null);
    }
  };

  const runOptimization = () => {
    setOptimizationRunning(true);
    setTimeout(() => {
      setOptimizationRunning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Optimizer</h1>
            <p className="text-gray-600">Optimize your marketing budget allocation for maximum ROI</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">${totalBudget}K</div>
              <div className="text-sm text-gray-500">Total Budget</div>
            </div>
            <button
              onClick={runOptimization}
              disabled={optimizationRunning}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {optimizationRunning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Optimizing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Run Optimization
                </>
              )}
            </button>
          </div>
        </div>
                {/* Performance Metrics Section */}
                <div className="performance-metrics bg-white rounded-xl mb-6 shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">$2.1M</div>
              <div className="text-sm text-gray-600">Current Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">$2.4M</div>
              <div className="text-sm text-gray-600">Optimized Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">3.2x</div>
              <div className="text-sm text-gray-600">Current ROAS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">3.8x</div>
              <div className="text-sm text-gray-600">Optimized ROAS</div>
            </div>
          </div>
        </div>


        {/* ROI Curves Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ROI Curves by Channel</h2>
          <div id="roi-curves-chart" className="relative">
            <HighchartsReact highcharts={Highcharts} options={roiCurveOptions} />
            <ChartNarrator
              chartId="roi-curves-chart"
              insights={roiCurveInsights}
              onPlayStateChange={(isPlaying) => handleNarratorStateChange('roi-curves', isPlaying)}
            />
          </div>
        </div>

        {/* Budget Allocation Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current vs Optimized Allocation</h2>
          <div id="allocation-chart" className="relative">
            <HighchartsReact highcharts={Highcharts} options={allocationComparisonOptions} />
            <ChartNarrator
              chartId="allocation-chart"
              insights={allocationInsights}
              onPlayStateChange={(isPlaying) => handleNarratorStateChange('allocation', isPlaying)}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <OptimizationSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Optimizer; 