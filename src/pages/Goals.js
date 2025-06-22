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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
          Marketing Goals & KPIs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your marketing objectives and key performance indicators
        </Typography>
      </Box>

      {/* Goals Overview Section */}
      <div className="goals-overview">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <GoalCard
              title="ROAS Target"
              current={4.2}
              target={4.2}
              unit="x"
              color="#0ea5e9"
              trend="up"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GoalCard
              title="Monthly Revenue"
              current={588}
              target={600}
              unit="K"
              color="#10b981"
              trend="up"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GoalCard
              title="Customer Acquisition"
              current={1245}
              target={1200}
              unit=""
              color="#f59e0b"
              trend="up"
            />
          </Grid>
        </Grid>
      </div>

      {/* Progress Tracking Section */}
      <div className="progress-tracking">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 3 }}>
                  Quarterly Goals Achievement
                </Typography>
                <HighchartsReact highcharts={Highcharts} options={goalsAchievementOptions} />
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} lg={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 3 }}>
                  Monthly Progress Tracking
                </Typography>
                <HighchartsReact highcharts={Highcharts} options={monthlyProgressOptions} />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </div>

      {/* Goal Details Section */}
      <div className="goal-details">
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 3 }}>
              Goal Management & Settings
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#374151', mb: 2 }}>
                ROAS Target Adjustment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Target: {roasTarget}x
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setRoasTarget(4.5)}
                  sx={{ ml: 'auto' }}
                >
                  Increase to 4.5x
                </Button>
              </Box>
              <Slider
                value={roasTarget}
                onChange={(e, newValue) => setRoasTarget(newValue)}
                min={2}
                max={8}
                step={0.1}
                marks={[
                  { value: 2, label: '2x' },
                  { value: 4, label: '4x' },
                  { value: 6, label: '6x' },
                  { value: 8, label: '8x' }
                ]}
                sx={{
                  '& .MuiSlider-track': {
                    backgroundColor: '#0ea5e9',
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#0ea5e9',
                  }
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#374151', mb: 2 }}>
                Goal Notifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email Alerts"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Dashboard Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Weekly Reports"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Goal Milestone Alerts"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{
                  backgroundColor: '#0ea5e9',
                  '&:hover': { backgroundColor: '#0284c7' }
                }}
              >
                Export Goals Report
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: '#0ea5e9', color: '#0ea5e9' }}
              >
                Share Goals
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: '#0ea5e9', color: '#0ea5e9' }}
              >
                Reset to Defaults
              </Button>
            </Box>
          </CardContent>
        </StyledCard>
      </div>
    </Container>
  );
};

export default Goals; 