import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Forecaster = () => {
  const [forecastPeriod, setForecastPeriod] = useState('3 months');
  const [budgetIncrease, setBudgetIncrease] = useState(0);

  // Revenue Forecast Chart - Modern Styling
  const revenueForecastOptions = {
    chart: {
      type: 'line',
      height: 500,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      labels: { 
        style: { 
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280'
        }
      },
      lineWidth: 0,
      tickWidth: 0,
      plotLines: [{
        value: 5.5, // Current month
        width: 2,
        color: '#6b7280',
        dashStyle: 'dash',
        label: {
          text: 'Current',
          style: { 
            fontWeight: '600',
            fontSize: '11px',
            color: '#374151'
          }
        }
      }]
    },
    yAxis: {
      title: { 
        text: 'Revenue ($k)', 
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
      line: {
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
      name: 'Historical Revenue',
      data: [580, 620, 590, 640, 680, 720, null, null, null, null, null, null],
      color: '#6b7280'
    }, {
      name: 'Forecasted Revenue',
      data: [null, null, null, null, null, 720, 750, 780, 810, 840, 870, 900],
      color: '#0ea5e9',
      dashStyle: 'dash'
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

  // Channel Forecast Chart - Modern Styling
  const channelForecastOptions = {
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
      categories: ['Current', 'Next Month', 'Month +2', 'Month +3'],
      labels: { 
        style: { 
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280'
        }
      },
      lineWidth: 0,
      tickWidth: 0
    },
    yAxis: {
      title: { 
        text: 'Revenue Contribution ($k)', 
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
      gridLineWidth: 1,
      stackLabels: {
        enabled: true,
        style: { 
          fontWeight: '600',
          fontSize: '11px',
          color: '#374151'
        }
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        pointPadding: 0.1,
        borderWidth: 0,
        borderRadius: 2,
        groupPadding: 0.1,
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Search Non-Branded',
      data: [120, 125, 130, 135],
      color: '#0ea5e9'
    }, {
      name: 'Other Channels',
      data: [255, 263, 272, 280],
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

  // Scenario Analysis Data
  const scenarios = [
    { name: 'Conservative', revenue: 2850, roi: 2.8, confidence: 85, change: '-5%' },
    { name: 'Base Case', revenue: 3200, roi: 3.1, confidence: 70, change: '+8%' },
    { name: 'Optimistic', revenue: 3650, roi: 3.5, confidence: 55, change: '+22%' },
    { name: 'Aggressive', revenue: 4100, roi: 3.8, confidence: 40, change: '+37%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Forecaster</h1>
            <p className="text-gray-600">Predict future performance and plan your marketing strategy</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
              <option value="12 months">12 Months</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Forecast
            </button>
          </div>
        </div>

        {/* Forecast Chart Section */}
        <div className="forecast-chart bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Forecast</h3>
              <p className="text-sm text-gray-600">Historical data and predicted revenue trends</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Historical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Forecast</span>
              </div>
            </div>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={revenueForecastOptions}
          />
        </div>

        {/* Forecast Metrics Section */}
        <div className="forecast-metrics grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +12%
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Projected Growth</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">25%</div>
            <div className="text-sm text-gray-500">Next 3 months</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                $900K
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Forecasted Revenue</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">$900K</div>
            <div className="text-sm text-gray-500">Month 12</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                4.5x
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Expected ROAS</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.5x</div>
            <div className="text-sm text-gray-500">Optimized</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                1,450
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">New Customers</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">1,450</div>
            <div className="text-sm text-gray-500">Projected</div>
          </div>
        </div>

        {/* Scenario Analysis Section */}
        <div className="scenario-analysis bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Channel Forecast</h3>
              <p className="text-sm text-gray-600">Revenue contribution by channel over time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Search Non-Branded</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Other Channels</span>
              </div>
            </div>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={channelForecastOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Forecaster; 