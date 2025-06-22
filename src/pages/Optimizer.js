import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Optimizer = () => {
  const [totalBudget, setTotalBudget] = useState(210);
  const [optimizationRunning, setOptimizationRunning] = useState(false);

  // Current vs Optimized Allocation
  const allocationData = [
    { channel: 'Search Non-Branded', current: 45, optimized: 52, currentRoi: 2.1, optimizedRoi: 2.4 },
    { channel: 'Influencers', current: 25, optimized: 32, currentRoi: 3.2, optimizedRoi: 3.5 },
    { channel: 'Podcast', current: 20, optimized: 18, currentRoi: 2.8, optimizedRoi: 2.9 },
    { channel: 'Meta Retargeting', current: 15, optimized: 12, currentRoi: 1.8, optimizedRoi: 2.0 },
    { channel: 'Linear TV', current: 10, optimized: 8, currentRoi: 1.5, optimizedRoi: 1.6 },
    { channel: 'Meta Prospecting', current: 8, optimized: 3, currentRoi: 0.9, optimizedRoi: 1.2 }
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

        {/* Optimization Suggestions Section */}
        <div className="optimization-suggestions bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Optimization Suggestions</h3>
              <p className="text-sm text-gray-600">AI-powered recommendations for budget reallocation</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Optimized</span>
              <div className="w-3 h-3 bg-gray-500 rounded-full ml-4"></div>
              <span className="text-sm text-gray-600">Current</span>
            </div>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={allocationComparisonOptions}
          />
        </div>

        {/* Budget Recommendations Section */}
        <div className="budget-recommendations grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Recommendations</h3>
            <div className="space-y-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.channel}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">${item.current}K</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="text-xs font-medium text-primary-600">${item.optimized}K</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">ROI:</span>
                        <span className="text-xs text-gray-600">{item.currentRoi}x</span>
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="text-xs font-medium text-primary-600">{item.optimizedRoi}x</span>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.optimized > item.current 
                          ? 'bg-green-100 text-green-800' 
                          : item.optimized < item.current 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.optimized > item.current ? '+' : ''}{item.optimized - item.current}K
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Curves</h3>
            <p className="text-sm text-gray-600 mb-4">Marginal ROI by budget allocation for top channels</p>
            <HighchartsReact
              highcharts={Highcharts}
              options={roiCurveOptions}
            />
          </div>
        </div>

        {/* Performance Metrics Section */}
        <div className="performance-metrics bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
      </div>
    </div>
  );
};

export default Optimizer; 