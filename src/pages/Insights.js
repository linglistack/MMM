import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Insights = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Modern Marketing Effectiveness Chart - Single Color Theme
  const marketingEffectivenessOptions = {
    chart: {
      type: 'column',
      height: 400,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: ['Podcast', 'Influencers', 'Search Non-Branded', 'Meta Retargeting', 'Linear TV', 'Mailers'],
      crosshair: {
        width: 1,
        color: 'rgba(14, 165, 233, 0.1)'
      },
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
    yAxis: [{
      title: { 
        text: 'Spend ($k)', 
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
    }, {
      title: { 
        text: 'CPA ($)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      opposite: true,
      labels: { 
        format: '${value}',
        style: {
          fontSize: '11px',
          color: '#6b7280'
        }
      }
    }],
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
      },
      line: {
        marker: {
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
      name: 'Spend',
      data: [27, 10, 45, 32, 18, 8],
      color: '#0ea5e9',
      yAxis: 0
    }, {
      name: 'mCPA',
      data: [52, 22, 38, 45, 62, 28],
      color: '#6b7280',
      yAxis: 1,
      type: 'line'
    }, {
      name: 'CPA',
      data: [44, 21, 35, 42, 58, 25],
      color: '#374151',
      yAxis: 1,
      type: 'line'
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

  // Modern Performance Chart - Single Color Theme
  const performanceByChannelOptions = {
    chart: {
      type: 'bar',
      height: 400,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: [
        'Search Non-Branded',
        'Influencers', 
        'Podcast',
        'Meta Retargeting',
        'Linear TV',
        'Mailers',
        'Search Branded',
        'Meta Prospecting'
      ],
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
        text: 'Performance vs. Share of Spend (%)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
        format: '{value}%',
        style: {
          fontSize: '11px',
          color: '#6b7280'
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: '#e5e7eb',
        zIndex: 4
      }],
      gridLineColor: '#f3f4f6',
      gridLineWidth: 1
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{y}%',
          style: {
            fontWeight: '600',
            fontSize: '11px',
            color: '#374151',
            textOutline: 'none'
          }
        },
        pointPadding: 0.1,
        groupPadding: 0.1,
        borderRadius: 4,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Performance',
      data: [
        { y: 7.6, color: y => y >= 0 ? '#0ea5e9' : '#6b7280' },
        { y: 7.4, color: '#0ea5e9' },
        { y: 5.7, color: '#0ea5e9' },
        { y: 2.9, color: '#0ea5e9' },
        { y: 1.4, color: '#0ea5e9' },
        { y: 0.5, color: '#0ea5e9' },
        { y: -0.2, color: '#6b7280' },
        { y: -25.4, color: '#6b7280' }
      ]
    }],
    credits: { enabled: false },
    legend: { enabled: false },
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

  const todoItems = [
    { text: 'Optimize Meta prospecting campaign targeting', priority: 'high', completed: false },
    { text: 'Increase podcast advertising budget by 15%', priority: 'medium', completed: false },
    { text: 'Review influencer partnership ROI', priority: 'medium', completed: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Insights</h1>
            <p className="text-gray-600">Analyze campaign performance and optimization opportunities</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="ml-2 text-sm text-gray-700">Advanced View</span>
            </label>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total ROAS', value: '4.2x', change: '+12% from last week', positive: true },
            { title: 'Total Spend', value: '$140K', change: '+8% from last week', positive: true },
            { title: 'Conversions', value: '3,245', change: '+15% from last week', positive: true },
            { title: 'Avg. CPA', value: '$43', change: '-5% from last week', positive: true }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-gray-600 mb-3">{metric.title}</div>
                <div className="flex items-center justify-center space-x-1">
                  <svg className={`w-4 h-4 ${metric.positive ? 'text-primary-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.positive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
                  </svg>
                  <span className="text-sm text-gray-600">{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
              
              <div className="space-y-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">Meta prospecting showing significant underperformance (-25.4% vs share of spend)</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">Search non-branded and influencers are top performers with 7.6% and 7.4% overperformance</p>
                </div>
              </div>

              <div className="space-y-3">
                {todoItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.completed ? (
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className={`w-5 h-5 ${item.priority === 'high' ? 'text-red-500' : 'text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.text}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-primary-100 text-primary-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">6 Channels</div>
                  <div className="text-sm text-gray-600">Overperforming</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">2 Channels</div>
                  <div className="text-sm text-gray-600">Underperforming</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="text-sm font-medium text-gray-900 mb-1">Date Range</div>
              <div className="text-sm text-gray-600">Last 7 days (2024-12-15 - 2024-12-21)</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Marketing Effectiveness by Channel</h3>
                <p className="text-sm text-gray-600">Spend vs Cost Per Acquisition across channels</p>
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
              options={marketingEffectivenessOptions}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Performance vs Share of Spend</h3>
                <p className="text-sm text-gray-600">Channel performance relative to budget allocation</p>
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
              options={performanceByChannelOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights; 