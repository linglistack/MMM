import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RefreshTracker = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(4);

  // Daily Refresh Activity Chart - Single Color Theme
  const dailyRefreshOptions = {
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        text: 'Refresh Count', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
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
      name: 'Successful Refreshes',
      data: [24, 23, 24, 22, 24, 18, 16],
      color: '#0ea5e9'
    }, {
      name: 'Failed Refreshes',
      data: [1, 2, 0, 3, 1, 2, 1],
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

  // Data Freshness Chart - Single Color Theme
  const dataFreshnessOptions = {
    chart: {
      type: 'line',
      height: 400,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
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
        text: 'Data Age (hours)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      labels: { 
        format: '{value}h',
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
      name: 'Google Ads',
      data: [0.5, 4.2, 8.1, 12.3, 16.0, 20.2, 24.1],
      color: '#0ea5e9'
    }, {
      name: 'Facebook Ads',
      data: [1.2, 4.8, 8.5, 12.1, 16.3, 20.0, 24.2],
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

  const refreshData = [
    { source: 'Google Ads', lastRefresh: '2 minutes ago', status: 'success', nextRefresh: 'in 2 hours', dataAge: '2m' },
    { source: 'Facebook Ads', lastRefresh: '5 minutes ago', status: 'success', nextRefresh: 'in 1 hour 55m', dataAge: '5m' },
    { source: 'TikTok Ads', lastRefresh: '15 minutes ago', status: 'warning', nextRefresh: 'in 1 hour 45m', dataAge: '15m' },
    { source: 'LinkedIn Ads', lastRefresh: '8 minutes ago', status: 'success', nextRefresh: 'in 1 hour 52m', dataAge: '8m' },
    { source: 'Twitter Ads', lastRefresh: '2 hours ago', status: 'error', nextRefresh: 'Retry in 30m', dataAge: '2h' },
    { source: 'Pinterest Ads', lastRefresh: '12 minutes ago', status: 'success', nextRefresh: 'in 1 hour 48m', dataAge: '12m' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Refresh Tracker</h1>
            <p className="text-gray-600">Monitor data refresh status and track update history</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Now
            </button>
          </div>
        </div>

        {/* Refresh Status Section */}
        <div className="refresh-status bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Refresh Status</h3>
              <p className="text-sm text-gray-600">Current data refresh status and last update time</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">2 min ago</div>
              <div className="text-sm text-gray-600">Last Update</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">15 min</div>
              <div className="text-sm text-gray-600">Refresh Interval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Tracking Metrics Section */}
        <div className="tracking-metrics bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Tracking Metrics</h3>
              <p className="text-sm text-gray-600">Data quality and performance metrics</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">99.8%</div>
              <div className="text-sm text-gray-600">Data Completeness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">99.5%</div>
              <div className="text-sm text-gray-600">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">&lt;2s</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* Update History Section */}
        <div className="update-history bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Update History</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Data refresh completed successfully</p>
                  <p className="text-sm text-gray-600">2024-01-15 14:30:00</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Data refresh completed successfully</p>
                  <p className="text-sm text-gray-600">2024-01-15 14:15:00</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">17 min ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Data refresh completed successfully</p>
                  <p className="text-sm text-gray-600">2024-01-15 14:00:00</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">32 min ago</span>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Sources', value: '6', status: 'Connected', icon: 'database' },
            { title: 'Last Refresh', value: '2m', status: 'ago', icon: 'clock' },
            { title: 'Success Rate', value: '94%', status: 'Last 24h', icon: 'check' },
            { title: 'Data Freshness', value: '5m', status: 'Average age', icon: 'refresh' }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600">{metric.title}</div>
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {metric.icon === 'database' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />}
                    {metric.icon === 'clock' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {metric.icon === 'check' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {metric.icon === 'refresh' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />}
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.status}</div>
            </div>
          ))}
        </div>

        {/* Refresh Schedule Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Refresh Schedule</h3>
              <p className="text-sm text-gray-600">Configure automatic data refresh intervals</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{refreshInterval}h</div>
              <div className="text-sm text-gray-500">Current Interval</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Interval: {refreshInterval} hours
              </label>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((refreshInterval - 1) / 23) * 100}%, #e5e7eb ${((refreshInterval - 1) / 23) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1h</span>
                <span>12h</span>
                <span>24h</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Next scheduled refresh: {new Date(Date.now() + refreshInterval * 60 * 60 * 1000).toLocaleTimeString()}
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                Update Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Data Sources Status Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Data Sources Status</h3>
                <p className="text-sm text-gray-600 mt-1">Real-time status of all connected data sources</p>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Refresh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Refresh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refreshData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{row.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'success' ? 'bg-primary-100 text-primary-800' :
                        row.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {row.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.lastRefresh}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.dataAge}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.nextRefresh}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-700 mr-3">Refresh</button>
                      <button className="text-gray-600 hover:text-gray-700">Configure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Daily Refresh Activity</h3>
                <p className="text-sm text-gray-600">Success and failure rates for data refresh operations</p>
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
              options={dailyRefreshOptions}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Data Freshness Trends</h3>
                <p className="text-sm text-gray-600">Track data age across different sources throughout the day</p>
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
              options={dataFreshnessOptions}
            />
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">98.5%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1.2s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-sm text-gray-600">Successful Refreshes Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefreshTracker; 