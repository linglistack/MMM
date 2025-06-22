import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Slider,
  Chip,
  LinearProgress,
  Divider,
  Switch,
  FormControlLabel,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TargetIcon from '@mui/icons-material/GpsFixed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  borderRadius: 16,
  border: '1px solid #f0f0f0',
  height: '100%',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const GoalCard = ({ title, current, target, unit, color, trend }) => (
  <StyledCard>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TargetIcon sx={{ color: color, mr: 2, fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: color, mb: 1 }}>
          {current}{unit}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Target: {target}{unit}
            </Typography>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={(current / target) * 100}
        sx={{
          height: 8,
          borderRadius: 4,
          mb: 2,
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 4,
          },
          backgroundColor: '#f5f5f5'
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {Math.round((current / target) * 100)}% Complete
            </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 20, mr: 1 }} />
          ) : trend === 'down' ? (
            <TrendingDownIcon sx={{ color: '#f44336', fontSize: 20, mr: 1 }} />
          ) : null}
          <Chip 
            label={current >= target ? 'Achieved' : 'In Progress'} 
            size="small"
            color={current >= target ? 'success' : 'primary'}
          />
        </Box>
      </Box>
    </CardContent>
  </StyledCard>
);

const Goals = () => {
  const [roasTarget, setRoasTarget] = useState(4.2);
  const [showQuarterly, setShowQuarterly] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Goals Achievement Chart - Modern Styling
  const goalsAchievementOptions = {
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
      categories: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
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
        text: 'Achievement (%)', 
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
        value: 100,
        width: 2,
        color: '#e5e7eb',
        dashStyle: 'dash',
        zIndex: 4
      }],
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
      name: 'Target Achievement',
      data: [
        { y: 95, color: '#0ea5e9' },
        { y: 108, color: '#0ea5e9' },
        { y: 112, color: '#0ea5e9' },
        { y: 87, color: '#6b7280' }
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

  // Monthly Progress Chart - Modern Styling
  const monthlyProgressOptions = {
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      plotLines: [{
        value: roasTarget,
        width: 2,
        color: '#0ea5e9',
        dashStyle: 'dash',
        zIndex: 4,
        label: {
          text: `Target: ${roasTarget}x`,
          style: {
            fontWeight: '600',
            fontSize: '11px',
            color: '#0ea5e9'
          }
        }
      }],
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
      name: 'Actual ROAS',
      data: [3.8, 4.1, 3.9, 4.3, 4.5, 4.2, 4.4, 4.6, 4.1, 4.0, 3.9, 4.2],
      color: '#0ea5e9'
    }, {
      name: 'Rolling Average',
      data: [3.8, 3.95, 3.93, 4.03, 4.14, 4.15, 4.20, 4.25, 4.20, 4.15, 4.10, 4.12],
      color: '#6b7280',
      dashStyle: 'shortdot'
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

  const goalData = [
    { title: 'Revenue Goal', current: 2850, target: 3000, unit: 'k', progress: 95, trend: 'up', status: 'on-track' },
    { title: 'ROAS Goal', current: 4.2, target: 4.5, unit: 'x', progress: 93, trend: 'up', status: 'on-track' },
    { title: 'Customer Acquisition', current: 1240, target: 1500, unit: '', progress: 83, trend: 'up', status: 'behind' },
    { title: 'Conversion Rate', current: 3.8, target: 4.0, unit: '%', progress: 95, trend: 'up', status: 'on-track' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Goals & Targets</h1>
            <p className="text-gray-600">Track progress towards your marketing and business objectives</p>
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

        {/* Goal Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {goalData.map((goal, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    goal.status === 'on-track' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {goal.status === 'on-track' ? 'On Track' : 'Behind'}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{goal.title}</h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {goal.current}{goal.unit}
                </div>
                <div className="text-sm text-gray-500">
                  Target: {goal.target}{goal.unit}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROAS Target Control */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">ROAS Target Configuration</h3>
              <p className="text-sm text-gray-600">Adjust your return on ad spend target for optimization</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">{roasTarget}x</div>
              <div className="text-sm text-gray-500">Current Target</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ROAS Target: {roasTarget}x
              </label>
              <input
                type="range"
                min="2.0"
                max="6.0"
                step="0.1"
                value={roasTarget}
                onChange={(e) => setRoasTarget(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((roasTarget - 2.0) / 4.0) * 100}%, #e5e7eb ${((roasTarget - 2.0) / 4.0) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2.0x</span>
                <span>4.0x</span>
                <span>6.0x</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">4.2x</div>
                <div className="text-sm text-gray-600">Current ROAS</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">93%</div>
                <div className="text-sm text-gray-600">Target Achievement</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">+0.3x</div>
                <div className="text-sm text-gray-600">Gap to Target</div>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Status Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Goal Status Summary</h3>
                <p className="text-sm text-gray-600 mt-1">Overview of all goal achievements and progress</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showQuarterly}
                    onChange={(e) => setShowQuarterly(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show Quarterly View</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">On Track Goals</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">Revenue Goal</span>
                    </div>
                    <span className="text-sm text-primary-600 font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">ROAS Goal</span>
                    </div>
                    <span className="text-sm text-primary-600 font-medium">93%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">Conversion Rate</span>
                    </div>
                    <span className="text-sm text-primary-600 font-medium">95%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Needs Attention</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-gray-900">Customer Acquisition</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">83%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Quarterly Achievement</h3>
                <p className="text-sm text-gray-600">Goal achievement percentage by quarter</p>
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
              options={goalsAchievementOptions}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Monthly ROAS Progress</h3>
                <p className="text-sm text-gray-600">Track ROAS performance against target throughout the year</p>
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
              options={monthlyProgressOptions}
            />
          </div>
        </div>

        {/* Goal Insights */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Insights</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Revenue goal on track for achievement</p>
                <p className="text-sm text-gray-600">Current performance at 95% with strong Q3 momentum</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">ROAS consistently above 4.0x</p>
                <p className="text-sm text-gray-600">Maintain current optimization strategies to reach 4.5x target</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Customer acquisition needs attention</p>
                <p className="text-sm text-gray-600">Consider increasing budget allocation to acquisition channels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals; 