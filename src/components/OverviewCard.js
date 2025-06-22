import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const MetricBox = ({ title, value, subtitle }) => (
  <Box sx={{ textAlign: 'center', p: 2 }}>
    <Typography variant="h4" component="div">
      ${typeof value === 'number' ? value.toLocaleString() : value}
      {typeof value === 'number' ? 'k' : ''}
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Box>
);

const OverviewCard = ({ data }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Outcome & ROI
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Baseline Outcome"
            value={data.baselineOutcome / 1000}
            subtitle="0% from last week"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Paid Outcome"
            value={data.paidOutcome / 1000}
            subtitle="-5% from last week"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Total Outcome"
            value={data.totalOutcome / 1000}
            subtitle="-11% from last week"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Total Spend"
            value={data.totalSpend / 1000}
            subtitle="-1% from last week"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Paid ROI"
            value={`${data.paidROI}x`}
            subtitle="0% from last week"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricBox
            title="Blended ROI"
            value={`${data.blendedROI}x`}
            subtitle="-9% from last week"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewCard;
