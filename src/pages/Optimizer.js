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
            <p className="text-gray-600">Optimize your marketing spend allocation to maximize ROI and achieve business objectives</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={runOptimization}
              disabled={optimizationRunning}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50"
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

        {/* Optimization Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Optimization Parameters</h3>
              <p className="text-sm text-gray-600">Configure budget constraints and optimization goals</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">${totalBudget}k</div>
              <div className="text-sm text-gray-500">Total Budget</div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget: ${totalBudget}k
              </label>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                    value={totalBudget}
                onChange={(e) => setTotalBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((totalBudget - 100) / 400) * 100}%, #e5e7eb ${((totalBudget - 100) / 400) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$100k</span>
                <span>$300k</span>
                <span>$500k</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">3.32x</div>
                <div className="text-sm text-gray-600">Predicted ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">+18%</div>
                <div className="text-sm text-gray-600">ROI Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">$697k</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Results Alert */}
        {optimizationRunning && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-800">Optimization in Progress</p>
                <p className="text-sm text-blue-700">Analyzing budget allocation scenarios and calculating optimal distribution...</p>
              </div>
            </div>
          </div>
        )}

        {/* Allocation Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Channel Allocation Comparison</h3>
                <p className="text-sm text-gray-600 mt-1">Current vs optimized budget allocation across marketing channels</p>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current ROI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized ROI</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allocationData.map((row, index) => {
                  const change = row.optimized - row.current;
                  const changePercent = ((change / row.current) * 100).toFixed(1);
                      return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{row.channel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${row.current}k</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${row.optimized}k</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          change > 0 ? 'bg-primary-100 text-primary-800' :
                          change < 0 ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {change > 0 ? '+' : ''}{change}k ({changePercent}%)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{row.currentRoi}x</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{row.optimizedRoi}x</div>
                      </td>
                    </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">ROI Curves by Channel</h3>
                <p className="text-sm text-gray-600">Marginal return on investment curves showing diminishing returns</p>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={roiCurveOptions}
              />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Budget Allocation Comparison</h3>
                <p className="text-sm text-gray-600">Current vs optimized budget distribution across all channels</p>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
            </div>
              <HighchartsReact
                highcharts={Highcharts}
              options={allocationComparisonOptions}
              />
          </div>
        </div>

        {/* Optimization Insights */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Insights</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Search Non-Branded shows highest potential</p>
                <p className="text-sm text-gray-600">Increase allocation by $7k to capture additional high-ROI opportunities</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Meta Prospecting is underperforming</p>
                <p className="text-sm text-gray-600">Reduce budget by $5k and reallocate to higher-performing channels</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Overall ROI improvement of 18%</p>
                <p className="text-sm text-gray-600">Expected total revenue increase of $126k with optimized allocation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimizer; 