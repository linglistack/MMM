import React, { useState, useEffect } from 'react';
import Insights from './pages/Insights';
import Goals from './pages/Goals';
import Forecaster from './pages/Forecaster';
import Optimizer from './pages/Optimizer';
import Reporter from './pages/Reporter';
import RefreshTracker from './pages/RefreshTracker';
import Configure from './pages/Configure';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentKPI, setCurrentKPI] = useState('Total Revenue (aggregate)');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState(null);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      setHighlightedElement(null);
      // When starting focus mode, delay setting the first highlighted element
      setTimeout(() => {
        setHighlightedElement(0);
      }, 100);
    }
  };

  const nextHighlight = () => {
    // Dynamically determine key element count based on current page
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'reporter', 'refreshTracker', 'configure'];
    const currentPage = pageNames[selectedTab];
    
    const elementCounts = {
      insights: 7,  // 7 elements: key-metrics-grid, insights-section, performance-summary, marketing-effectiveness-chart.chart-container, performance-vs-spend-chart.chart-container, todo-items, header-section
      goals: 3,
      forecaster: 3,
      optimizer: 3,
      reporter: 3,
      refreshTracker: 3,
      configure: 3
    };
    
    const maxElements = elementCounts[currentPage] || 7;
    
    if (highlightedElement === null) {
      setHighlightedElement(0);
    } else {
      const nextIndex = (highlightedElement + 1) % maxElements;
      setHighlightedElement(nextIndex);
    }
  };

  // Get highlighted element label and insights - based on actual components
  const getHighlightInfo = (index) => {
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'reporter', 'refreshTracker', 'configure'];
    const currentPage = pageNames[selectedTab];
    
    const insightsData = {
      insights: [
        {
          label: 'Key Metrics Cards',
          insights: [
            'Total ROAS reached 4.2x, excellent performance, 8% above target',
            'Total spend $140K, up 8% YoY, budget utilization is reasonable',
            'Conversions 3,245, up 15%, conversion rate continues to improve',
            'Average CPA $43, down 5%, good cost control'
          ]
        },
        {
          label: 'Insights & Recommendations',
          insights: [
            'Meta prospecting underperforming, ROAS only 2.1x, recommend optimizing targeting',
            'Search non-branded and Influencers performing best, ROAS reaching 6.8x and 5.2x respectively',
            'Need to focus on budget allocation across channels, optimize low-performing channel investment'
          ]
        },
        {
          label: 'Performance Summary',
          insights: [
            '6 channels exceeding expectations, representing 75% of total channels',
            '2 channels need optimization, mainly Meta prospecting and Linear TV',
            'Overall marketing effectiveness is good, recommend maintaining current strategy direction'
          ]
        },
        {
          label: 'Marketing Effectiveness Chart',
          insights: [
            'Visual comparison of marketing effectiveness across channels',
            'Helps identify best and worst performing channels',
            'Supports data-driven budget allocation decisions'
          ]
        },
        {
          label: 'Performance vs Spend Chart',
          insights: [
            'Shows relationship between channel performance and budget allocation',
            'Identifies if budget allocation is reasonable, discovers optimization opportunities',
            'Provides data support for budget reallocation'
          ]
        },
        {
          label: 'To-Do Items',
          insights: [
            'Optimize Meta prospecting campaign targeting, target ROAS improvement to 3.5x',
            'Increase podcast ad budget by 15%, current performance is excellent',
            'Review influencer collaboration ROI, ensure return on investment'
          ]
        },
        {
          label: 'Page Header',
          insights: [
            'Marketing Insights page overview',
            'Analyze campaign performance and optimization opportunities',
            'Provide data-driven marketing recommendations'
          ]
        }
      ],
      goals: [
        {
          label: 'Goals Overview',
          insights: [
            'Current ROAS target 4.2x, actual achievement 4.2x, target completion rate 100%',
            'Monthly revenue target $600K, actual $588K, completion rate 98%',
            'Customer acquisition target 1,200, actual 1,245, exceeded by 3.8%'
          ]
        },
        {
          label: 'Progress Tracking',
          insights: [
            'Q1 target completion rate 95%, Q2 completion rate 108%, Q3 completion rate 112%',
            'Q4 target completion rate 87%, need to focus on year-end performance',
            'Overall trend is positive, recommend maintaining current execution strategy'
          ]
        },
        {
          label: 'Goal Details',
          insights: [
            'Detailed goal setting information and breakdown metrics',
            'Quarterly goal completion comparison analysis',
            'Goal-related KPI monitoring and alerts'
          ]
        }
      ],
      forecaster: [
        {
          label: 'Forecast Chart',
          insights: [
            'Trend prediction based on historical data, accuracy reaching 92%',
            'Future 3-month revenue forecast growth 8-12%',
            'Seasonal pattern recognition, Q4 is peak sales season'
          ]
        },
        {
          label: 'Forecast Metrics',
          insights: [
            'Key forecast metrics display: revenue, conversion rate, CPA',
            'Forecast accuracy assessment: historical forecast error <5%',
            'Forecast model performance: machine learning algorithm optimization'
          ]
        },
        {
          label: 'Scenario Analysis',
          insights: [
            'Optimistic scenario: revenue growth 15%, ROAS improvement to 4.8x',
            'Conservative scenario: revenue growth 5%, ROAS maintained at 4.2x',
            'Risk factors: economic environment, increased competition, rising costs'
          ]
        }
      ],
      optimizer: [
        {
          label: 'Optimization Suggestions',
          insights: [
            'Recommend reducing Meta prospecting budget by 30%, reallocate',
            'Increase Search non-branded budget by 25%, excellent performance',
            'Optimize Influencers channel, improve ROAS to 6.0x'
          ]
        },
        {
          label: 'Budget Recommendations',
          insights: [
            'Smart budget allocation recommendations: reallocate based on ROAS performance',
            'ROI optimization suggestions: focus on high ROAS channels',
            'Cost control strategy: optimize low-performing channels, improve overall efficiency'
          ]
        },
        {
          label: 'Performance Metrics',
          insights: [
            'Key performance metrics monitoring: ROAS, CPA, conversion rate',
            'Performance trend analysis: channel performance change trends',
            'Optimization effectiveness evaluation: before and after optimization comparison'
          ]
        }
      ],
      reporter: [
        {
          label: 'Report Summary',
          insights: [
            'Key findings: 6 channels exceeding expectations',
            'Important metrics overview: Total ROAS 4.2x, Total spend $140K',
            'Trend analysis results: overall performance is positive, recommend maintaining strategy'
          ]
        },
        {
          label: 'Data Visualization',
          insights: [
            'Intuitive data chart display: channel performance comparison',
            'Interactive data exploration: supports multi-dimensional analysis',
            'Multi-dimensional data analysis: time, channel, target audience'
          ]
        },
        {
          label: 'Key Findings',
          insights: [
            'Important business insights: Meta prospecting needs optimization',
            'Action recommendations: increase efficient channel budget, optimize inefficient channels',
            'Risk alerts: monitor rising cost trends, control CPA'
          ]
        }
      ],
      refreshTracker: [
        {
          label: 'Refresh Status',
          insights: [
            'Data refresh status monitoring: real-time updates, delay <5 minutes',
            'Last update time: 2024-01-15 14:30:00',
            'Refresh frequency setting: auto-refresh every 15 minutes'
          ]
        },
        {
          label: 'Tracking Metrics',
          insights: [
            'Data quality metrics: completeness 99.8%, accuracy 99.5%',
            'Refresh success rate: 99.9%, exceptions <0.1%',
            'Performance monitoring metrics: response time <2 seconds, availability 99.9%'
          ]
        },
        {
          label: 'Update History',
          insights: [
            'Historical update records: no major exceptions in past 30 days',
            'Update frequency analysis: average 15.2 minute intervals',
            'Exception records: only 1 network delay, auto-recovered'
          ]
        }
      ],
      configure: [
        {
          label: 'Settings Panel',
          insights: [
            'System configuration options: data sources, refresh frequency, notification settings',
            'User preference settings: interface theme, language, timezone',
            'Personalization configuration: dashboard layout, KPI selection'
          ]
        },
        {
          label: 'Configuration Options',
          insights: [
            'Detailed configuration parameters: API keys, data permissions, integration settings',
            'Advanced settings options: custom calculations, alert rules, export formats',
            'Configuration validation and testing: connection testing, data validation, performance checks'
          ]
        },
        {
          label: 'System Status',
          insights: [
            'System operation status: normal, all services online',
            'Connection status monitoring: stable data source connections',
            'System health checks: good performance metrics, no exceptions'
          ]
        }
      ]
    };

    const pageData = insightsData[currentPage] || insightsData.insights;
    return pageData[index] || pageData[0];
  };

  // Get current focused component selector
  const getCurrentFocusedSelector = () => {
    if (highlightedElement === null) return null;
    
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'reporter', 'refreshTracker', 'configure'];
    const currentPage = pageNames[selectedTab];
    
    const selectors = {
      insights: [
        '.key-metrics-grid',
        '.insights-section', 
        '.performance-summary',
        '.marketing-effectiveness-chart.chart-container',
        '.performance-vs-spend-chart.chart-container',
        '.todo-items',
        '.header-section'
      ],
      goals: ['.goals-overview', '.progress-tracking', '.goal-details'],
      forecaster: ['.forecast-chart', '.forecast-metrics', '.scenario-analysis'],
      optimizer: ['.optimization-suggestions', '.budget-recommendations', '.performance-metrics'],
      reporter: ['.report-summary', '.data-visualization', '.key-findings'],
      refreshTracker: ['.refresh-status', '.tracking-metrics', '.update-history'],
      configure: ['.settings-panel', '.configuration-options', '.system-status']
    };
    
    const pageSelectors = selectors[currentPage] || selectors.insights;
    return pageSelectors[highlightedElement];
  };

  // Apply focus mode CSS classes
  useEffect(() => {
    if (focusMode && highlightedElement !== null) {
      const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'reporter', 'refreshTracker', 'configure'];
      const currentPage = pageNames[selectedTab];
      
      const selectors = {
        insights: [
          '.key-metrics-grid',
          '.insights-section', 
          '.performance-summary',
          '.marketing-effectiveness-chart.chart-container',
          '.performance-vs-spend-chart.chart-container',
          '.todo-items',
          '.header-section'
        ],
        goals: ['.goals-overview', '.progress-tracking', '.goal-details'],
        forecaster: ['.forecast-chart', '.forecast-metrics', '.scenario-analysis'],
        optimizer: ['.optimization-suggestions', '.budget-recommendations', '.performance-metrics'],
        reporter: ['.report-summary', '.data-visualization', '.key-findings'],
        refreshTracker: ['.refresh-status', '.tracking-metrics', '.update-history'],
        configure: ['.settings-panel', '.configuration-options', '.system-status']
      };
      
      const pageSelectors = selectors[currentPage] || selectors.insights;
      
      // Hide all components
      pageSelectors.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
          if (index === highlightedElement) {
            // Show current focused component
            element.style.filter = 'none';
            element.style.opacity = '1';
            element.style.pointerEvents = 'auto';
            
            // Auto-scroll to focused component
            setTimeout(() => {
              const mainContent = document.querySelector('main');
              if (mainContent) {
                const headerHeight = 80; // Fixed header height
                const elementTop = element.offsetTop;
                
                // Scroll to element position, leave some top space
                mainContent.scrollTo({
                  top: elementTop - headerHeight - 20,
                  behavior: 'smooth'
                });
              }
            }, 100); // Short delay to ensure styles are applied
          } else {
            // Hide other components
            element.style.filter = 'blur(8px)';
            element.style.opacity = '0.3';
            element.style.pointerEvents = 'none';
          }
        }
      });
    } else {
      // Restore all components when exiting focus mode
      const allSelectors = [
        '.key-metrics-grid', '.insights-section', '.performance-summary',
        '.marketing-effectiveness-chart.chart-container', '.performance-vs-spend-chart.chart-container',
        '.todo-items', '.header-section', '.goals-overview', '.progress-tracking', '.goal-details',
        '.forecast-chart', '.forecast-metrics', '.scenario-analysis',
        '.optimization-suggestions', '.budget-recommendations', '.performance-metrics',
        '.report-summary', '.data-visualization', '.key-findings',
        '.refresh-status', '.tracking-metrics', '.update-history',
        '.settings-panel', '.configuration-options', '.system-status'
      ];
      
      allSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          element.style.filter = 'none';
          element.style.opacity = '1';
          element.style.pointerEvents = 'auto';
        }
      });
    }
  }, [focusMode, highlightedElement, selectedTab]);

  const menuItems = [
    { 
      text: 'Insights', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ), 
      component: <Insights /> 
    },
    { 
      text: 'Goals', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ), 
      component: <Goals /> 
    },
    { 
      text: 'Forecaster', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ), 
      component: <Forecaster /> 
    },
    { 
      text: 'Optimizer', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ), 
      component: <Optimizer /> 
    },
    { 
      text: 'Reporter', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), 
      component: <Reporter /> 
    },
    { 
      text: 'Refresh Tracker', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ), 
      component: <RefreshTracker /> 
    },
    { 
      text: 'Configure', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      component: <Configure /> 
    },
  ];

  const kpiOptions = [
    'Amazon Geo (disabled)',
    'Walmart Geo (disabled)', 
    'Frozen Dashboard - KPI (disabled)',
    'DTC Subscriptions',
    'Walmart Revenue',
    'Amazon Revenue',
    'Total Revenue (aggregate)',
    'Acquisitions (disabled)',
    'Total Sales (disabled)'
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Navigation */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900">RevoSense</span>
        </div>

        {/* Current KPI Selector */}
        <div className="px-6 py-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current KPI:
          </label>
          <select
            value={currentKPI}
            onChange={(e) => setCurrentKPI(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white text-sm"
          >
            {kpiOptions.map((option) => (
              <option 
                key={option} 
                value={option}
                disabled={option.includes('disabled')}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                selectedTab === index
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className={`mr-3 ${selectedTab === index ? 'text-primary-600' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              {item.text}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                Current client: demo
              </div>
              
              <span className="text-sm text-gray-600">Cynthia@revosense.com</span>
              
              {/* Focus Mode Button */}
              <button
                onClick={toggleFocusMode}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  focusMode 
                    ? 'bg-primary-100 text-primary-700 border border-primary-200 shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
                title="Focus Mode - Highlight important data"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {focusMode ? 'Exit Focus' : 'Focus Mode'}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Account Settings
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto relative">
          {/* Focus Mode Overlay */}
          {focusMode && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              {/* Insights card - positioned on the right side of the page */}
              {highlightedElement !== null && (
                <div className="absolute pointer-events-auto z-20 top-20 right-4 max-w-sm">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {getHighlightInfo(highlightedElement).label}
                    </h3>
                    <div className="space-y-1">
                      {getHighlightInfo(highlightedElement).insights.map((insight, index) => (
                        <p key={index} className="text-xs text-gray-600 leading-relaxed">
                          • {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Control buttons - fixed in top-right corner */}
              <div className="fixed top-4 right-4 z-[60] pointer-events-auto">
                <button
                  onClick={nextHighlight}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{highlightedElement !== null ? 'Next Key Data' : 'Start Focus'}</span>
                </button>
                
                <button
                  onClick={toggleFocusMode}
                  className="ml-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Status indicator - fixed in bottom-left corner */}
              {highlightedElement !== null && (
                <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 z-[60] pointer-events-auto">
                  <p className="text-sm text-gray-600">
                    Current Focus: <span className="font-medium text-primary-600">Key Data #{highlightedElement + 1}</span>
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Original Content with Highlight Overlay */}
          <div className={focusMode ? 'relative' : ''}>
            {menuItems[selectedTab]?.component}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App; 