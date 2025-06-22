import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MarketingEffectiveness = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 200
    },
    title: {
      text: null
    },
    xAxis: {
      categories: ['podcast', 'influencers'],
      title: {
        text: null
      }
    },
    yAxis: [{
      title: {
        text: 'Spend ($k)'
      },
      labels: {
        format: '${value}k'
      }
    }, {
      title: {
        text: 'CPA ($)'
      },
      opposite: true
    }],
    series: [{
      name: 'Spend',
      data: [27, 10],
      color: '#9575cd'
    }, {
      name: 'mCPA',
      data: [52, 22],
      yAxis: 1,
      color: '#ef5350'
    }, {
      name: 'CPA',
      data: [44, 21],
      yAxis: 1,
      color: '#4fc3f7'
    }],
    legend: {
      align: 'right',
      verticalAlign: 'top'
    },
    credits: {
      enabled: false
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Marketing Effectiveness</Typography>
        <Button variant="outlined" size="small">Download Data</Button>
      </Box>
      <Typography variant="subtitle2" gutterBottom>
        Spend Channels
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        * Performance bars show conversions per thousand spent (higher is better)
      </Typography>
    </Box>
  );
};

export default MarketingEffectiveness;
