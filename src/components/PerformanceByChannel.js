import React from 'react';
import { Box, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PerformanceByChannel = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 300
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'search_non_branded',
        'influencers',
        'podcast',
        'meta_retargeting',
        'linear_tv',
        'mailers',
        'search_branded',
        'meta_prospecting'
      ]
    },
    yAxis: {
      title: {
        text: 'Performance vs. Share of Spend (%)'
      },
      labels: {
        format: '{value}%'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{y}%'
        }
      }
    },
    series: [{
      name: 'Overperformance',
      data: [7.6, 7.4, 5.7, 2.9, 1.4, 0.5, null, null],
      color: '#4caf50'
    }, {
      name: 'Underperformance',
      data: [null, null, null, null, null, null, -0.2, -25.4],
      color: '#f44336'
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Performance by Channel
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Overperformance
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            vs. share of spend
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: 'right' }}>
          <Typography variant="subtitle1" gutterBottom>
            Underperformance
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            vs. share of spend
          </Typography>
        </Box>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

export default PerformanceByChannel;
