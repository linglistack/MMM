import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Reporter = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last30days');
  const [selectedChannels, setSelectedChannels] = useState(['all']);

  // Performance vs Spend Chart - Single Color Theme
  const performanceVsSpendOptions = {
    chart: {
      type: 'scatter',
      height: 400,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
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
      gridLineWidth: 1,
      lineWidth: 0,
      tickWidth: 0
    },
    yAxis: {
      title: { 
        text: 'ROAS', 
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
      scatter: {
        marker: {
          radius: 8,
          lineWidth: 2,
          lineColor: '#fff'
        },
        states: {
          hover: {
            marker: {
              radius: 12
            }
          }
        }
      }
    },
    series: [{
      name: 'Channels',
      data: [
        { x: 45, y: 4.2, name: 'Search Non-Branded', color: '#0ea5e9' },
        { x: 32, y: 3.8, name: 'Meta Retargeting', color: '#0ea5e9' },
        { x: 27, y: 5.1, name: 'Podcast', color: '#0ea5e9' },
        { x: 18, y: 3.5, name: 'Linear TV', color: '#6b7280' },
        { x: 10, y: 6.2, name: 'Influencers', color: '#0ea5e9' },
        { x: 8, y: 2.8, name: 'Mailers', color: '#6b7280' }
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
      },
      pointFormat: '<b>{point.name}</b><br/>Spend: ${point.x}k<br/>ROAS: {point.y}x'
    }
  };

  // Attribution Model Chart - Single Color Theme
  const attributionModelOptions = {
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
      categories: ['Search Non-Branded', 'Meta Retargeting', 'Podcast', 'Influencers', 'Linear TV', 'Mailers'],
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
        text: 'Attribution (%)', 
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
          format: '{y}%',
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
      name: 'First Touch',
      data: [28, 22, 18, 15, 12, 5],
      color: '#0ea5e9'
    }, {
      name: 'Last Touch',
      data: [32, 25, 16, 12, 10, 5],
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

  const channelData = [
    { channel: 'Search Non-Branded', spend: 45000, conversions: 892, cpa: 50.45, roas: 4.2, impressions: 2450000 },
    { channel: 'Meta Retargeting', spend: 32000, conversions: 645, cpa: 49.61, roas: 3.8, impressions: 1890000 },
    { channel: 'Podcast', spend: 27000, conversions: 432, cpa: 62.50, roas: 5.1, impressions: 850000 },
    { channel: 'Influencers', spend: 10000, conversions: 198, cpa: 50.51, roas: 6.2, impressions: 450000 },
    { channel: 'Linear TV', spend: 18000, conversions: 285, cpa: 63.16, roas: 3.5, impressions: 1200000 },
    { channel: 'Mailers', spend: 8000, conversions: 156, cpa: 51.28, roas: 2.8, impressions: 320000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Reporter</h1>
            <p className="text-gray-600">Generate comprehensive marketing reports and insights</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Report Summary Section */}
        <div className="report-summary bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Report Summary</h3>
              <p className="text-sm text-gray-600">Key findings and performance overview</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">$588K</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.2x</div>
              <div className="text-sm text-gray-600">Average ROAS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">3,245</div>
              <div className="text-sm text-gray-600">Conversions</div>
            </div>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="data-visualization bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Data Visualization</h3>
              <p className="text-sm text-gray-600">Performance charts and metrics</p>
            </div>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={performanceVsSpendOptions}
          />
        </div>

        {/* Key Findings Section */}
        <div className="key-findings bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Search Non-Branded is the top performing channel</p>
                <p className="text-sm text-gray-600">ROAS of 6.8x with strong conversion rates</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Meta Prospecting needs optimization</p>
                <p className="text-sm text-gray-600">Low ROAS of 2.1x, consider budget reallocation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Overall performance is strong</p>
                <p className="text-sm text-gray-600">6 out of 8 channels exceeding targets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporter; 