import React, { useState, useEffect } from 'react';
import Insights from './pages/Insights';
import Goals from './pages/Goals';
import Forecaster from './pages/Forecaster';
import Optimizer from './pages/Optimizer';
import DataAnalysis from './pages/DataAnalysis';
import Reporter from './pages/Reporter';
import RefreshTracker from './pages/RefreshTracker';
import Configure from './pages/Configure';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentKPI, setCurrentKPI] = useState('Total Revenue (aggregate)');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const [optimizationStatus, setOptimizationStatus] = useState(null);
  const [optimizationState, setOptimizationState] = useState({
    isActive: false,
    phase: 'idle', // 'analyzing', 'options'
    steps: [],
    progress: 0,
    issueId: null,
    options: [],
    chatMessages: [],
  });
  const [userInput, setUserInput] = useState('');

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
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'dataAnalysis', 'reporter', 'refreshTracker', 'configure'];
    const currentPage = pageNames[selectedTab];
    
    const elementCounts = {
      insights: 7,  // 7 elements: key-metrics-grid, insights-section, performance-summary, marketing-effectiveness-chart.chart-container, performance-vs-spend-chart.chart-container, todo-items, header-section
      goals: 3,
      forecaster: 3,
      optimizer: 3,
      dataAnalysis: 3,
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

  const getHighlightInfo = (index) => {
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'dataAnalysis', 'reporter', 'refreshTracker', 'configure'];
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
          ],
          optimizationOptions: [
            { title: 'Aggressive ROAS Push', description: 'Reallocate 20% of budget from lowest ROAS channels to the top 2 performers.' },
            { title: 'Balanced Growth', description: 'Increase budget by 5% for all channels with ROAS above 3.0, funded by a 10% cut from underperformers.' },
            { title: 'Cost Reduction Focus', description: 'Cut spend by 15% on the 3 channels with the highest CPA.' }
          ]
        },
        {
          label: 'Insights & Recommendations',
          insights: [
            'Meta prospecting underperforming, ROAS only 2.1x, recommend optimizing targeting',
            'Search non-branded and Influencers performing best, ROAS reaching 6.8x and 5.2x respectively',
            'Need to focus on budget allocation across channels, optimize low-performing channel investment'
          ],
          optimizationOptions: [
            { title: 'Reallocate Meta Budget', description: 'Cut Meta prospecting budget by 50% and reallocate to Search and Influencers.' },
            { title: 'Optimize Meta Targeting', description: 'Launch A/B test on Meta prospecting with new audience segments.' },
            { title: 'Scale Top Performers', description: 'Increase Search non-branded and Influencer budgets by 25% each.' }
          ]
        },
        {
          label: 'Performance Summary',
          insights: [
            '6 channels exceeding expectations, representing 75% of total channels',
            '2 channels need optimization, mainly Meta prospecting and Linear TV',
            'Overall marketing effectiveness is good, recommend maintaining current strategy direction'
          ],
          optimizationOptions: [
            { title: 'Fix Underperformers', description: 'Initiate a deep-dive analysis into Meta & Linear TV campaigns.' },
            { title: 'Double Down on Winners', description: 'Pause Meta & Linear TV, and move their entire budget to the top 3 channels.' },
            { title: 'Incremental Adjustments', description: 'Reduce budget for the 2 underperforming channels by 10% and re-distribute evenly to others.' }
          ]
        },
        {
          label: 'Marketing Effectiveness Chart',
          insights: [
            'Visual comparison of marketing effectiveness across channels',
            'Helps identify best and worst performing channels',
            'Supports data-driven budget allocation decisions'
          ],
          optimizationOptions: [
            { title: 'Automated Reallocation', description: 'Automatically adjust channel budgets based on the effectiveness curve.' },
            { title: 'Generate Custom Report', description: 'Create a new report focusing on the bottom 3 channels.' },
            { title: 'Update Chart Parameters', description: 'Change chart visualization to CPA vs. Conversion Volume.' }
          ]
        },
        {
          label: 'Performance vs Spend Chart',
          insights: [
            'Shows relationship between channel performance and budget allocation',
            'Identifies if budget allocation is reasonable, discovers optimization opportunities',
            'Provides data support for budget reallocation'
          ],
          optimizationOptions: [
            { title: 'Optimize Spend Efficiency', description: 'Shift 15% of budget from high-spend, low-performance channels to high-performers.' },
            { title: 'Test New Spend Levels', description: 'Model a scenario with a 20% overall budget increase, allocated to highest potential channels.' },
            { title: 'Consolidate Budget', description: 'Merge budgets of the two smallest channels into the next largest one.' }
          ]
        },
        {
          label: 'To-Do Items',
          insights: [
            'Optimize Meta prospecting campaign targeting, target ROAS improvement to 3.5x',
            'Increase podcast ad budget by 15%, current performance is excellent',
            'Review influencer collaboration ROI, ensure return on investment'
          ],
          optimizationOptions: [
            { title: 'Auto-Complete Top Item', description: 'Automatically execute the optimization for Meta prospecting campaign.' },
            { title: 'Snooze All Items', description: 'Postpone all To-Do items by one week and send a reminder.' },
            { title: 'Assign to Team Member', description: 'Create task in project management tool and assign all items to the marketing lead.' }
          ]
        },
        {
          label: 'Page Header',
          insights: [
            'Marketing Insights page overview',
            'Analyze campaign performance and optimization opportunities',
            'Provide data-driven marketing recommendations'
          ],
          optimizationOptions: [
            { title: 'Schedule Strategy Review', description: 'Send a calendar invite to the marketing team for a full strategy review.' },
            { title: 'Export Summary PDF', description: 'Generate a PDF summary of all insights and recommendations on this page.' },
            { title: 'Refresh Page Data', description: 'Trigger a manual refresh of all data sources for this page.' }
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
          ],
          optimizationOptions: [
            { title: 'Adjust Revenue Goal', description: 'Increase monthly revenue target by 2% to $612K for next cycle.' },
            { title: 'Set New CPA Goal', description: 'Establish a new, more aggressive CPA goal based on recent performance.' },
            { title: 'Maintain Current Goals', description: 'Keep all goals unchanged for the next quarter to ensure stability.' }
          ]
        },
        {
          label: 'Progress Tracking',
          insights: [
            'Q1 target completion rate 95%, Q2 completion rate 108%, Q3 completion rate 112%',
            'Q4 target completion rate 87%, need to focus on year-end performance',
            'Overall trend is positive, recommend maintaining current execution strategy'
          ],
          optimizationOptions: [
            { title: 'Launch Q4 Sprint', description: 'Allocate a 10% budget bonus to top channels to boost Q4 performance.' },
            { title: 'Analyze Q4 Dip', description: 'Create a detailed report on factors contributing to the Q4 performance dip.' },
            { title: 'Re-forecast Year-End', description: 'Run the forecaster to project a new, more realistic year-end result.' }
          ]
        },
        {
          label: 'Goal Details',
          insights: [
            'Detailed goal setting information and breakdown metrics',
            'Quarterly goal completion comparison analysis',
            'Goal-related KPI monitoring and alerts'
          ],
          optimizationOptions: [
            { title: 'Refine Goal KPIs', description: 'Add a secondary KPI for "Customer Lifetime Value" to the goal details.' },
            { title: 'Automate Goal Alerts', description: 'Set up automated email alerts for any goal pacing below 90%.' },
            { title: 'Update Goal Timeline', description: 'Extend the timeline for the current goals by one month.' }
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
          ],
          optimizationOptions: [
            { title: 'Improve Forecast Model', description: 'Incorporate external factors like competitor spend into the forecast model.' },
            { title: 'Extend Forecast Horizon', description: 'Extend the forecast projection from 3 months to 6 months.' },
            { title: 'Stress-Test Forecast', description: 'Run a scenario analysis assuming a 15% market downturn.' }
          ]
        },
        {
          label: 'Forecast Metrics',
          insights: [
            'Key forecast metrics display: revenue, conversion rate, CPA',
            'Forecast accuracy assessment: historical forecast error <5%',
            'Forecast model performance: machine learning algorithm optimization'
          ],
          optimizationOptions: [
            { title: 'Tune ML Model', description: 'Retrain the forecasting machine learning model with the latest quarterly data.' },
            { title: 'Add New Metric', description: 'Include "Market Share" as a new primary metric in the forecast.' },
            { title: 'Set Accuracy Alert', description: 'Create an alert if the forecast accuracy drops below 90%.' }
          ]
        },
        {
          label: 'Scenario Analysis',
          insights: [
            'Optimistic scenario: revenue growth 15%, ROAS improvement to 4.8x',
            'Conservative scenario: revenue growth 5%, ROAS maintained at 4.2x',
            'Risk factors: economic environment, increased competition, rising costs'
          ],
          optimizationOptions: [
            { title: 'Develop Risk Plan', description: 'Create a formal contingency plan based on the identified risk factors.' },
            { title: 'Fund Optimistic Scenario', description: 'Model the budget requirements needed to achieve the optimistic scenario.' },
            { title: 'Share Scenarios', description: 'Export all scenarios to a presentation format for stakeholder review.' }
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
          ],
          optimizationOptions: [
            { title: 'Apply All Suggestions', description: 'Automatically execute all three optimization suggestions.' },
            { title: 'Apply Budget Changes Only', description: 'Execute only the budget reallocation for Meta and Search.' },
            { title: 'Ignore Suggestions', description: 'Dismiss all current suggestions and archive them.' }
          ]
        },
        {
          label: 'Budget Recommendations',
          insights: [
            'Smart budget allocation recommendations: reallocate based on ROAS performance',
            'ROI optimization suggestions: focus on high ROAS channels',
            'Cost control strategy: optimize low-performing channels, improve overall efficiency'
          ],
          optimizationOptions: [
            { title: 'Execute Smart Allocation', description: 'Apply the smart budget allocation recommendations across all channels.' },
            { title: 'Model ROI Impact', description: 'Run a simulation to see the projected impact of the ROI optimization suggestions.' },
            { title: 'Export Budget Plan', description: 'Export the recommended budget changes to a CSV file.' }
          ]
        },
        {
          label: 'Performance Metrics',
          insights: [
            'Key performance metrics monitoring: ROAS, CPA, conversion rate',
            'Performance trend analysis: channel performance change trends',
            'Optimization effectiveness evaluation: before and after optimization comparison'
          ],
          optimizationOptions: [
            { title: 'Enhance Trend Analysis', description: 'Add anomaly detection to the performance trend analysis.' },
            { title: 'Set Performance Alerts', description: 'Create alerts if any channel\'s ROAS drops by more than 10% week-over-week.' },
            { title: 'Compare to Last Period', description: 'Generate a side-by-side performance comparison against the previous month.' }
          ]
        }
      ],
      dataAnalysis: [
        {
          label: 'Data Summary',
          insights: ['Key data distributions', 'Outlier identification', 'Missing value analysis'],
          optimizationOptions: [{ title: 'Clean Data', description: 'Automatically handle outliers and missing values.' }]
        },
        {
          label: 'Correlation Matrix',
          insights: ['Identify highly correlated variables', 'Understand feature relationships', 'Inform feature selection'],
          optimizationOptions: [{ title: 'Reduce Collinearity', description: 'Run PCA to reduce highly correlated features.' }]
        },
        {
          label: 'Time Series Analysis',
          insights: ['Decompose trends and seasonality', 'Forecast future values', 'Detect anomalies'],
          optimizationOptions: [{ title: 'Improve Forecast Model', description: 'Add exogenous variables to the time series model.' }]
        }
      ],
      reporter: [
        {
          label: 'Report Summary',
          insights: [
            'Key findings: 6 channels exceeding expectations',
            'Important metrics overview: Total ROAS 4.2x, Total spend $140K',
            'Trend analysis results: overall performance is positive, recommend maintaining strategy'
          ],
          optimizationOptions: [
            { title: 'Generate Full Report', description: 'Create a detailed PDF report including all charts and data tables.' },
            { title: 'Email Summary', description: 'Send an email with the report summary to key stakeholders.' },
            { title: 'Schedule Weekly Report', description: 'Set up a recurring weekly report to be sent every Monday.' }
          ]
        },
        {
          label: 'Data Visualization',
          insights: [
            'Intuitive data chart display: channel performance comparison',
            'Interactive data exploration: supports multi-dimensional analysis',
            'Multi-dimensional data analysis: time, channel, target audience'
          ],
          optimizationOptions: [
            { title: 'Create New Dashboard', description: 'Build a new dashboard focused exclusively on data visualizations.' },
            { title: 'Add Drill-Downs', description: 'Enable drill-down functionality on all charts for deeper analysis.' },
            { title: 'Change Color Palette', description: 'Switch the data visualization to a different, high-contrast color palette.' }
          ]
        },
        {
          label: 'Key Findings',
          insights: [
            'Important business insights: Meta prospecting needs optimization',
            'Action recommendations: increase efficient channel budget, optimize inefficient channels',
            'Risk alerts: monitor rising cost trends, control CPA'
          ],
          optimizationOptions: [
            { title: 'Convert to To-Do Items', description: 'Automatically create To-Do items from the action recommendations.' },
            { title: 'Acknowledge All Findings', description: 'Mark all key findings as "read" and archive them.' },
            { title: 'Request Deeper Analysis', description: 'Request a follow-up analysis on the Meta prospecting issue.' }
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
          ],
          optimizationOptions: [
            { title: 'Increase Refresh Rate', description: 'Change the automatic refresh frequency to every 5 minutes.' },
            { title: 'Force Manual Refresh', description: 'Trigger an immediate manual refresh of all data sources now.' },
            { title: 'Pause Automatic Refreshes', description: 'Temporarily disable all automatic data refreshes for 1 hour.' }
          ]
        },
        {
          label: 'Tracking Metrics',
          insights: [
            'Data quality metrics: completeness 99.8%, accuracy 99.5%',
            'Refresh success rate: 99.9%, exceptions <0.1%',
            'Performance monitoring metrics: response time <2 seconds, availability 99.9%'
          ],
          optimizationOptions: [
            { title: 'Run Data Audit', description: 'Initiate a full data quality and accuracy audit, which may take up to 30 minutes.' },
            { title: 'Improve API Response Time', description: 'Switch to a higher-tier API plan for faster response times.' },
            { title: 'Set Up Status Page', description: 'Create a public-facing status page for system performance metrics.' }
          ]
        },
        {
          label: 'Update History',
          insights: [
            'Historical update records: no major exceptions in past 30 days',
            'Update frequency analysis: average 15.2 minute intervals',
            'Exception records: only 1 network delay, auto-recovered'
          ],
          optimizationOptions: [
            { title: 'Export Update Logs', description: 'Export the complete update history for the last 90 days to a CSV file.' },
            { title: 'Clear Old Logs', description: 'Archive all update logs older than 30 days to improve performance.' },
            { title: 'Analyze Network Delay', description: 'Generate a detailed incident report on the recorded network delay.' }
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
          ],
          optimizationOptions: [
            { title: 'Enable Dark Mode', description: 'Switch the entire user interface to its dark theme.' },
            { title: 'Add New Data Source', description: 'Open the wizard to connect a new data source, like Google Analytics 4.' },
            { title: 'Reset to Default Layout', description: 'Reset the dashboard layout for all pages to the default configuration.' }
          ]
        },
        {
          label: 'Configuration Options',
          insights: [
            'Detailed configuration parameters: API keys, data permissions, integration settings',
            'Advanced settings options: custom calculations, alert rules, export formats',
            'Configuration validation and testing: connection testing, data validation, performance checks'
          ],
          optimizationOptions: [
            { title: 'Validate All Integrations', description: 'Run a health check on all connected APIs and data integrations.' },
            { title: 'Enable Advanced Mode', description: 'Unlock advanced settings options for power users.' },
            { title: 'Manage User Permissions', description: 'Go to the user management screen to adjust data permissions.' }
          ]
        },
        {
          label: 'System Status',
          insights: [
            'System operation status: normal, all services online',
            'Connection status monitoring: stable data source connections',
            'System health checks: good performance metrics, no exceptions'
          ],
          optimizationOptions: [
            { title: 'Run Full System Diagnostic', description: 'Initiate a comprehensive system health and performance diagnostic.' },
            { title: 'Subscribe to Status Updates', description: 'Subscribe to email notifications for any system status changes.' },
            { title: 'View System Architecture', description: 'Open a diagram showing the current system architecture and data flow.' }
          ]
        }
      ]
    };

    const pageData = insightsData[currentPage] || insightsData.insights;
    return pageData[index] || pageData[0];
  };

  const getSelectorForIndex = (index) => {
    if (index === null) return null;
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'dataAnalysis', 'reporter', 'refreshTracker', 'configure'];
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
      dataAnalysis: ['.data-summary', '.correlation-matrix', '.time-series-analysis'],
      reporter: ['.report-summary', '.data-visualization', '.key-findings'],
      refreshTracker: ['.refresh-status', '.tracking-metrics', '.update-history'],
      configure: ['.settings-panel', '.configuration-options', '.system-status']
    };
    const pageSelectors = selectors[currentPage] || selectors.insights;
    return pageSelectors[index];
  };

  // Get current focused component selector
  const getCurrentFocusedSelector = () => {
    if (highlightedElement === null) return null;
    
    const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'dataAnalysis', 'reporter', 'refreshTracker', 'configure'];
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
      dataAnalysis: ['.data-summary', '.correlation-matrix', '.time-series-analysis'],
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
      const pageNames = ['insights', 'goals', 'forecaster', 'optimizer', 'dataAnalysis', 'reporter', 'refreshTracker', 'configure'];
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
        dataAnalysis: ['.data-summary', '.correlation-matrix', '.time-series-analysis'],
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
        '.data-summary', '.correlation-matrix', '.time-series-analysis',
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

  // Handle optimization action
  const handleOptimize = () => {
    if (highlightedElement === null) return;

    const { label, optimizationOptions } = getHighlightInfo(highlightedElement);

    const initialSteps = [
      { id: 1, title: 'Initialize analysis agent', status: 'in-progress', description: 'Agent connecting to backend services...', timestamp: new Date() },
      { id: 2, title: 'Analyzing performance data', status: 'pending', description: null, timestamp: null },
      { id: 3, title: 'Generating optimization scenarios', status: 'pending', description: null, timestamp: null },
      { id: 4, title: 'Finalizing recommendations', status: 'pending', description: null, timestamp: null },
    ];

    const initialAgentMessage = { 
      id: Date.now(), 
      sender: 'agent', 
      text: "Starting analysis... I'll keep you updated here. Feel free to ask any questions while I work." 
    };

    setOptimizationState({
      isActive: true,
      phase: 'analyzing',
      steps: initialSteps,
      progress: 0,
      issueId: (Math.random() * 1e9).toFixed(0),
      options: [],
      chatMessages: [initialAgentMessage],
    });

    setTimeout(() => {
      setOptimizationState(prev => ({
        ...prev,
        progress: 25,
        steps: prev.steps.map(s => 
          s.id === 1 ? { ...s, status: 'completed', description: 'Agent successfully initialized.' } : 
          s.id === 2 ? { ...s, status: 'in-progress', description: `Analyzing historical data for ${label}...`, timestamp: new Date() } : s
        ),
      }));
    }, 1000);

    setTimeout(() => {
      setOptimizationState(prev => ({
        ...prev,
        progress: 50,
        steps: prev.steps.map(s => 
          s.id === 2 ? { ...s, status: 'completed', description: `Analysis of ${label} complete.` } : 
          s.id === 3 ? { ...s, status: 'in-progress', description: 'Modeling potential outcomes and ROI for 3 scenarios...', timestamp: new Date() } : s
        ),
      }));
    }, 2500);

    setTimeout(() => {
      setOptimizationState(prev => ({
        ...prev,
        progress: 75,
        steps: prev.steps.map(s => 
          s.id === 3 ? { ...s, status: 'completed', description: 'Scenario modeling complete.' } : 
          s.id === 4 ? { ...s, status: 'in-progress', description: 'Compiling and ranking recommendations...', timestamp: new Date() } : s
        ),
      }));
    }, 4000);
    
    setTimeout(() => {
      const agentUpdate = { id: Date.now(), sender: 'agent', text: 'Analysis complete! The following optimization options are now available.' };
      setOptimizationState(prev => ({
        ...prev,
        progress: 100,
        phase: 'options',
        steps: prev.steps.map(s => ({ ...s, status: 'completed', description: 'Recommendations are ready.' })),
        options: optimizationOptions,
        chatMessages: [...prev.chatMessages, agentUpdate]
      }));
    }, 5000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text: userInput.trim(),
    };

    setOptimizationState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, newUserMessage]
    }));
    
    const currentInput = userInput;
    setUserInput('');

    // Simulate agent response
    setTimeout(() => {
        const currentStep = optimizationState.steps.find(s => s.status === 'in-progress');
        const agentResponseText = currentStep 
            ? `That's a good question. I'm currently working on: "${currentStep.title}". I'll have more details for you once the analysis is complete.`
            : "I'm finalizing the analysis. The results will be ready shortly.";

        const agentResponse = {
            id: Date.now() + 1,
            sender: 'agent',
            text: agentResponseText,
        };
      
        setOptimizationState(prev => ({
            ...prev,
            chatMessages: [...prev.chatMessages, agentResponse]
        }));
    }, 1000);
  };

  const handleSelectOption = (option) => {
    const selector = getSelectorForIndex(highlightedElement);
    const element = selector ? document.querySelector(selector) : null;
    let position = { top: 100, left: 40 }; // Default position in case element not found

    if (element) {
      const rect = element.getBoundingClientRect();
      position = {
        top: rect.top,
        left: rect.left,
      };
    }

    setOptimizationStatus({
      message: `Successfully applied: "${option.title}"`,
      timestamp: new Date().toLocaleTimeString(),
      position: position,
    });

    setOptimizationState({ isActive: false, phase: 'idle', steps: [], progress: 0, issueId: null, options: [] });

    setTimeout(() => {
      setOptimizationStatus(null);
    }, 4000);
  };

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
      text: 'Data Analysis', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), 
      component: <DataAnalysis /> 
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
                    <div className="space-y-1 mb-4">
                      {getHighlightInfo(highlightedElement).insights.map((insight, index) => (
                        <p key={index} className="text-xs text-gray-600 leading-relaxed">
                          • {insight}
                        </p>
                      ))}
                    </div>
                    
                    {/* Optimization section */}
                    <div className="border-t border-gray-200 pt-3">
                      <h4 className="text-xs font-medium text-gray-900 mb-2">Quick Actions</h4>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        Run an analysis to generate optimization options.
                      </p>
                      <button
                        onClick={handleOptimize}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Analyze for Optimizations</span>
                      </button>
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
              
              {/* Optimization Progress Panel */}
              {optimizationState.isActive && (
                <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
                  <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-3xl text-sm animate-fade-in relative">
                    <button 
                      onClick={() => setOptimizationState(prev => ({...prev, isActive: false}))}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex gap-6 h-full">
                      {/* Left Column: Steps & Options */}
                      <div className="w-1/2 flex flex-col">
                        <h3 className="text-lg font-sans font-bold text-primary-600 mb-4">
                          {optimizationState.phase === 'options' 
                            ? '> ANALYSIS COMPLETE: Choose an optimization' 
                            : '> ANALYZING SESSION STARTED'}
                        </h3>
                        <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 mb-4 font-sans text-xs">
                          <span className="text-gray-500">Issue ID:</span>
                          <span className="text-primary-600 font-semibold">{optimizationState.issueId}</span>
                          <span className="text-gray-500">Status:</span>
                          <span className="text-primary-600 font-semibold">
                            {optimizationState.phase === 'options' ? 'COMPLETE - Awaiting Action' : 'ANALYZING'}
                          </span>
                        </div>

                        <div className="flex-1 mt-2 pr-2 overflow-y-auto">
                          <div className={`space-y-3 font-mono transition-opacity duration-500 ${optimizationState.phase === 'options' ? 'opacity-50' : 'opacity-100'}`}>
                            {optimizationState.steps.map(step => (
                              <div key={step.id}>
                                <div className="flex items-center space-x-3">
                                  {step.status === 'completed' && <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                  {step.status === 'in-progress' && <svg className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                  {step.status === 'pending' && <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                  <span className="font-bold font-sans">{step.title}</span>
                                  {step.timestamp && <span className="text-gray-400 font-sans text-xs">{step.timestamp.toLocaleTimeString()}</span>}
                                </div>
                                {step.description && <p className="pl-7 text-gray-600 font-sans text-xs">{step.description}</p>}
                              </div>
                            ))}
                          </div>

                          {optimizationState.phase === 'options' && (
                            <div className="mt-6">
                              <p className="font-sans text-xs text-gray-500 mb-4 border-t border-gray-200 pt-4">Select one of the following options to apply.</p>
                              <div className="space-y-3">
                                {optimizationState.options.map((option, index) => (
                                  <button 
                                    key={index}
                                    onClick={() => handleSelectOption(option)}
                                    className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 transition-all duration-200 group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-sans font-bold text-blue-500 group-hover:text-blue-600">{option.title}</h4>
                                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                    <p className="font-sans text-xs text-gray-600 mt-1">{option.description}</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {optimizationState.phase === 'analyzing' && (
                          <div className="mt-auto pt-4">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${optimizationState.progress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column: Chat */}
                      <div className="w-1/2 flex flex-col border-l border-gray-200 pl-6">
                        <h4 className="text-md font-sans font-bold text-gray-700 mb-4">Conversational Agent</h4>
                        <div className="flex-1 p-2 overflow-y-auto space-y-4 bg-gray-50 rounded-lg">
                          {optimizationState.chatMessages.map(msg => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.sender === 'agent' && <div className="w-7 h-7 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>}
                              <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input 
                              type="text" 
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              placeholder="Ask a question..."
                              className="flex-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                            />
                            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Send</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
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

      {/* Optimization status notification */}
      {optimizationStatus && (
        <div 
          className="fixed bg-green-50 border border-green-200 rounded-lg shadow-lg px-4 py-3 z-[100] pointer-events-auto max-w-sm animate-fade-in"
          style={{
            top: `${optimizationStatus.position.top}px`,
            left: `${optimizationStatus.position.left}px`,
            transform: 'translateY(-110%)',
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                {optimizationStatus.message}
              </p>
              <p className="text-xs text-green-600 mt-1">
                Applied at {optimizationStatus.timestamp}
              </p>
            </div>
            <button
              onClick={() => setOptimizationStatus(null)}
              className="flex-shrink-0 text-green-400 hover:text-green-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 