import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import ChartNarrator from './ChartNarrator';

const OptimizationSuggestions = () => {
  // Sample optimization suggestions data
  const suggestions = [
    {
      channel: 'Search Non-Branded',
      action: 'Increase Budget',
      amount: '+$7,000',
      impact: '+15% ROAS',
      priority: 'High',
      reasoning: 'Consistently high ROI with room for scale'
    },
    {
      channel: 'Influencers',
      action: 'Increase Budget',
      amount: '+$7,000',
      impact: '+12% ROAS',
      priority: 'High',
      reasoning: 'Strong performance at current spend levels'
    },
    {
      channel: 'Meta Prospecting',
      action: 'Decrease Budget',
      amount: '-$5,000',
      impact: '+8% Overall ROAS',
      priority: 'Medium',
      reasoning: 'Underperforming relative to other channels'
    },
    {
      channel: 'Linear TV',
      action: 'Reallocate Budget',
      amount: '-$2,000',
      impact: '+5% ROAS',
      priority: 'Medium',
      reasoning: 'Better opportunities in digital channels'
    }
  ];

  // Narration insights with timing and highlighting
  const optimizationInsights = [
    {
      text: "Let's review the AI-powered optimization suggestions for your marketing budget.",
      duration: 3000,
      highlightArea: {
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%'
      }
    },
    {
      text: "For Search Non-Branded, we recommend increasing the budget by $7,000. This channel has shown consistently high ROI and has room for scale, potentially improving ROAS by 15%.",
      duration: 5000,
      highlightArea: {
        top: '0%',
        left: '0%',
        width: '100%',
        height: '25%'
      }
    },
    {
      text: "Influencers are performing well at current spend levels. We suggest a $7,000 budget increase, which could drive a 12% improvement in ROAS.",
      duration: 5000,
      highlightArea: {
        top: '25%',
        left: '0%',
        width: '100%',
        height: '25%'
      }
    },
    {
      text: "Meta Prospecting is underperforming. We recommend decreasing the budget by $5,000 and reallocating to better-performing channels, which could improve overall ROAS by 8%.",
      duration: 5000,
      highlightArea: {
        top: '50%',
        left: '0%',
        width: '100%',
        height: '25%'
      }
    },
    {
      text: "For Linear TV, consider reallocating $2,000 to digital channels for a potential 5% ROAS improvement.",
      duration: 4000,
      highlightArea: {
        top: '75%',
        left: '0%',
        width: '100%',
        height: '25%'
      }
    }
  ];

  return (
    <Box id="optimization-suggestions" className="relative">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Optimization Suggestions
          <Typography variant="subtitle2" color="text.secondary">
            AI-powered recommendations for budget reallocation
          </Typography>
        </Typography>
        <ChartNarrator
          chartId="optimization-suggestions"
          insights={optimizationInsights}
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {suggestions.map((suggestion, index) => (
          <Card 
            key={index}
            sx={{ 
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 1
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  {suggestion.channel}
                </Typography>
                <Chip
                  label={suggestion.priority}
                  size="small"
                  color={suggestion.priority === 'High' ? 'error' : 'warning'}
                  sx={{ ml: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Chip
                  label={suggestion.action}
                  size="small"
                  color={suggestion.action === 'Increase Budget' ? 'success' : 
                         suggestion.action === 'Decrease Budget' ? 'error' : 'warning'}
                />
                <Typography 
                  variant="body2"
                  color={suggestion.amount.startsWith('+') ? 'success.main' : 'error.main'}
                  fontWeight="600"
                >
                  {suggestion.amount}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.main"
                  fontWeight="600"
                >
                  {suggestion.impact}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                {suggestion.reasoning}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default OptimizationSuggestions; 