import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Insights = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Helper function to generate insights and recommendations
  const generateChannelInsights = (channel, performance, spend) => {
    const getPerformanceLevel = (perf) => {
      if (perf >= 5) return 'exceptional';
      if (perf >= 2) return 'good';
      if (perf >= 0) return 'moderate';
      if (perf >= -5) return 'concerning';
      return 'critical';
    };

    const getSpendShare = (channelSpend) => {
      const totalSpend = 140; // Sum of all channel spends
      return (channelSpend / totalSpend) * 100;
    };

    const insights = {
      'Search Non-Branded': {
        exceptional: {
          insight: `Overperforming by ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share of total spend`,
          todo: `Increase daily budget by 25% and expand to 3-4 new keyword clusters with similar performance patterns`
        },
        good: {
          insight: `Strong performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% spend share`,
          todo: `Test expanding match types on top 10 converting keywords and increase bids by 15%`
        },
        moderate: {
          insight: `Stable performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% of budget`,
          todo: `Optimize bids on keywords with quality score >7 and maintain current position`
        },
        concerning: {
          insight: `Underperforming at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% spend share`,
          todo: `Reduce bids by 20% on keywords with CPA >130% of target and quality score <6`
        },
        critical: {
          insight: `Critical performance at ${performance.toFixed(1)}% while using ${getSpendShare(spend).toFixed(1)}% of budget`,
          todo: `Pause keywords with zero conversions in past 30 days and reduce budget by 50%`
        }
      },
      'Meta Retargeting': {
        exceptional: {
          insight: `Leading channel at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% budget allocation`,
          todo: `Increase frequency caps by 50% for audiences with >3% CTR and expand lookalikes`
        },
        good: {
          insight: `Strong results at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% of spend`,
          todo: `Create new lookalike audiences from top 5% converters and increase budget 25%`
        },
        moderate: {
          insight: `Steady performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
          todo: `Optimize audience targeting for segments with >2% conversion rate`
        },
        concerning: {
          insight: `Below target at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% spend share`,
          todo: `Reduce frequency on audiences with CTR <0.8% and refresh creative`
        },
        critical: {
          insight: `Significant issues at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% of budget`,
          todo: `Pause bottom 30% of audiences by conversion rate and reduce spend by 60%`
        }
      },
      'Influencers': {
        exceptional: {
          insight: `Top performing at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% of total spend`,
          todo: `Increase investment by 30% in creators with engagement rate >5%`
        },
        good: {
          insight: `Strong creator ROI at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% budget`,
          todo: `Expand partnerships with creators showing >3% conversion rate`
        },
        moderate: {
          insight: `Stable performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
          todo: `Optimize content mix for creators with >2% engagement rate`
        },
        concerning: {
          insight: `Underdelivering at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% allocation`,
          todo: `Review creators with <1% conversion rate and reduce their budgets by 40%`
        },
        critical: {
          insight: `Critical performance at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% of spend`,
          todo: `Pause creators with negative ROI and rebuild selection criteria`
        }
      },
      'Podcast': {
        exceptional: {
          insight: `Outstanding at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% spend share`,
          todo: `Lock in premium slots on shows with >2x average conversion rate`
        },
        good: {
          insight: `Strong show performance at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Increase investment by 20% in shows with >4% engagement rate`
        },
        moderate: {
          insight: `Steady results at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% of budget`,
          todo: `Maintain current mix and test new ad placements in top shows`
        },
        concerning: {
          insight: `Below target at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% allocation`,
          todo: `Cut bottom 20% of shows by ROI and reallocate to top performers`
        },
        critical: {
          insight: `Severe underperformance at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Pause shows with negative ROI and reduce overall spend by 50%`
        }
      },
      'Linear TV': {
        exceptional: {
          insight: `Exceptional TV ROI at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
          todo: `Increase primetime slots by 30% and expand to similar programming`
        },
        good: {
          insight: `Strong TV metrics at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% budget`,
          todo: `Boost investment in dayparts with >1.5x average response rate`
        },
        moderate: {
          insight: `Stable TV performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Optimize current daypart mix based on response rate data`
        },
        concerning: {
          insight: `Underperforming at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
          todo: `Cut bottom 25% of timeslots and shift to better performing dayparts`
        },
        critical: {
          insight: `Critical TV metrics at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Reduce TV spend by 60% and focus only on proven timeslots`
        }
      },
      'Mailers': {
        exceptional: {
          insight: `Top mailer ROI at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% allocation`,
          todo: `Increase circulation by 40% for segments with >3% response rate`
        },
        good: {
          insight: `Strong mail metrics at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Expand to similar segments with expected >2% response rate`
        },
        moderate: {
          insight: `Steady mail performance at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Test new creative variants with current top segments`
        },
        concerning: {
          insight: `Below target at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
          todo: `Reduce circulation by 30% for segments with <1% response rate`
        },
        critical: {
          insight: `Poor mail performance at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
          todo: `Stop circulation to bottom 50% segments and rebuild lists`
        }
      }
    };

    const defaultInsights = {
      exceptional: {
        insight: `Outstanding ROI at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% of total spend`,
        todo: `Increase investment by 30% and expand to similar opportunities`
      },
      good: {
        insight: `Strong performance at +${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}% of budget`,
        todo: `Scale up gradually with 20% budget increase in top segments`
      },
      moderate: {
        insight: `Stable results at +${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% allocation`,
        todo: `Maintain current approach and test incremental improvements`
      },
      concerning: {
        insight: `Underperforming at ${performance.toFixed(1)}% with ${getSpendShare(spend).toFixed(1)}% share`,
        todo: `Reduce spend by 25% and optimize targeting criteria`
      },
      critical: {
        insight: `Critical performance at ${performance.toFixed(1)}% using ${getSpendShare(spend).toFixed(1)}%`,
        todo: `Cut budget by 50% and reevaluate channel strategy`
      }
    };

    const performanceLevel = getPerformanceLevel(performance);
    const channelInsight = insights[channel] || defaultInsights;
    
    console.log('Performance Insight Selected:', {
      channel,
      performance,
      performanceLevel,
      spendShare: getSpendShare(spend).toFixed(1) + '%',
      isDefault: !insights[channel]
    });
    
    return channelInsight[performanceLevel];
  };

  const generateMarketingEffectivenessInsights = (channel, spend, mCPA, CPA) => {
    const getEfficiencyLevel = (cpa, mcpa) => {
      const difference = ((mcpa - cpa) / mcpa) * 100;
      if (difference >= 15) return 'highly_efficient';
      if (difference >= 5) return 'efficient';
      if (difference >= -5) return 'neutral';
      if (difference >= -15) return 'inefficient';
      return 'highly_inefficient';
    };

    const getSpendLevel = (channelSpend) => {
      // Assuming total spend is the sum of all channel spends
      const totalSpend = 140; // Sum of [27, 10, 45, 32, 18, 8]
      const spendShare = (channelSpend / totalSpend) * 100;
      
      if (spendShare >= 25) return 'very_high';
      if (spendShare >= 15) return 'high';
      if (spendShare >= 10) return 'medium';
      if (spendShare >= 5) return 'low';
      return 'very_low';
    };

    const efficiencyLevel = getEfficiencyLevel(CPA, mCPA);
    const spendLevel = getSpendLevel(spend);
    
    console.log('Debug Info:', {
      channel,
      spend,
      mCPA,
      CPA,
      efficiencyLevel,
      spendLevel
    });

    const insights = {
      'Search Non-Branded': {
        highly_efficient: {
          very_high: {
            insight: `CPA $${CPA} is ${Math.round(((mCPA - CPA) / mCPA) * 100)}% below target $${mCPA} with high spend of $${spend}k`,
            todo: `Increase daily budget by 20% and expand to 3-4 new keyword clusters with similar intent patterns`
          },
          high: {
            insight: `Strong ROI with CPA $${CPA} vs target $${mCPA} and good scale at $${spend}k spend`,
            todo: `Test expanding match types on top 10 converting keywords and increase bids by 15%`
          },
          medium: {
            insight: `Excellent CPA efficiency of $${CPA} vs $${mCPA} target at moderate spend`,
            todo: `Add 20-30 new keywords based on top converter search term report analysis`
          },
          low: {
            insight: `CPA outperforming at $${CPA} vs $${mCPA} target despite low $${spend}k spend`,
            todo: `Increase bids 10% on keywords with conversion rate >3% and quality score >7`
          },
          very_low: {
            insight: `Strong initial performance with $${CPA} CPA vs $${mCPA} target`,
            todo: `Double daily budget on ad groups with CTR >5% and average position better than 2.5`
          }
        },
        efficient: {
          very_high: {
            insight: `Good efficiency with $${CPA} CPA at high $${spend}k spend level`,
            todo: `Review search terms for new negative keywords and optimize ad copy with >4% CTR`
          },
          high: {
            insight: `Solid CPA of $${CPA} with healthy $${spend}k spend`,
            todo: `A/B test expanded text ads on top 5 converting keywords`
          },
          medium: {
            insight: `CPA of $${CPA} performing well at $${spend}k spend`,
            todo: `Implement automated bidding on keywords with >50 conversions/month`
          },
          low: {
            insight: `Good CPA efficiency at $${CPA} with room to scale from $${spend}k`,
            todo: `Create 3 new ad groups based on top performing keyword themes`
          },
          very_low: {
            insight: `Promising $${CPA} CPA at initial $${spend}k spend level`,
            todo: `Expand match types gradually while maintaining quality score >6`
          }
        },
        neutral: {
          very_high: {
            insight: `CPA at $${CPA} near target with significant $${spend}k spend`,
            todo: `Audit keywords with CPA >120% of target and reduce bids by 20%`
          },
          high: {
            insight: `Average performance with $${CPA} CPA at $${spend}k spend`,
            todo: `Optimize landing pages for keywords with bounce rate >65%`
          },
          medium: {
            insight: `CPA holding at $${CPA} with moderate spend`,
            todo: `Test responsive search ads in top 3 ad groups by spend`
          },
          low: {
            insight: `Standard performance at $${CPA} CPA with $${spend}k investment`,
            todo: `Implement broader match types on keywords with >2% conversion rate`
          },
          very_low: {
            insight: `Limited data with $${CPA} CPA at $${spend}k spend`,
            todo: `Add 10-15 exact match keywords from competitor analysis`
          }
        },
        inefficient: {
          very_high: {
            insight: `CPA elevated at $${CPA} with concerning $${spend}k spend level`,
            todo: `Pause all keywords with CPA >150% of target and quality score <5`
          },
          high: {
            insight: `Underperforming with $${CPA} CPA at high spend`,
            todo: `Reduce bids by 30% on keywords with conversion rate <1%`
          },
          medium: {
            insight: `Poor efficiency with $${CPA} CPA vs $${mCPA} target`,
            todo: `Move poor performers to exact match and add negative keyword list`
          },
          low: {
            insight: `Struggling to hit targets with $${CPA} CPA`,
            todo: `Pause keywords with zero conversions in past 30 days`
          },
          very_low: {
            insight: `Poor initial performance with $${CPA} CPA`,
            todo: `Restrict to exact match only and rebuild keyword list`
          }
        },
        highly_inefficient: {
          very_high: {
            insight: `Critical: $${CPA} CPA severely above $${mCPA} target at high spend`,
            todo: `Immediately reduce budget by 50% and pause bottom 40% of keywords by ROI`
          },
          high: {
            insight: `Severe performance issues with $${CPA} CPA at $${spend}k spend`,
            todo: `Pause all broad match keywords and reduce campaign daily budgets by 60%`
          },
          medium: {
            insight: `Major efficiency problems with $${CPA} vs $${mCPA} target`,
            todo: `Keep only top 20 converting keywords and rebuild campaign structure`
          },
          low: {
            insight: `Very poor performance with $${CPA} CPA despite low spend`,
            todo: `Pause campaign and audit all keywords, targeting, and landing pages`
          },
          very_low: {
            insight: `Critical performance issues with $${CPA} CPA at start`,
            todo: `Stop campaign and revise entire keyword strategy and targeting`
          }
        }
      },
      'Meta Retargeting': {
        highly_efficient: {
          very_high: {
            insight: `Exceptional $${CPA} CPA with ${Math.round(((mCPA - CPA) / mCPA) * 100)}% below target at $${spend}k spend`,
            todo: `Increase frequency caps by 50% for audiences with >3% CTR and expand lookalikes`
          },
          high: {
            insight: `Strong performance with $${CPA} CPA and good scale`,
            todo: `Create new lookalike audiences from top 5% of converters and increase budgets 25%`
          },
          medium: {
            insight: `Excellent $${CPA} CPA with efficient audience targeting`,
            todo: `Expand retargeting window to 45 days for high-intent visitors`
          },
          low: {
            insight: `Great $${CPA} CPA efficiency at current spend level`,
            todo: `Test value-based lookalikes and increase daily budgets by 30%`
          },
          very_low: {
            insight: `Outstanding initial $${CPA} CPA vs $${mCPA} target`,
            todo: `Double budget for audiences with ROAS >300% and expand placements`
          }
        },
        efficient: {
          very_high: {
            insight: `Solid $${CPA} CPA at high $${spend}k spend level`,
            todo: `Optimize placement targeting to exclude bottom 20% by CTR`
          },
          high: {
            insight: `Good performance with $${CPA} CPA at scale`,
            todo: `Create custom audiences based on top 25% time-on-site visitors`
          },
          medium: {
            insight: `Effective $${CPA} CPA with current audience mix`,
            todo: `Test dynamic creative optimization for top-performing audiences`
          },
          low: {
            insight: `Promising $${CPA} CPA with room for growth`,
            todo: `Implement broad audience expansion with 1% lookalike audiences`
          },
          very_low: {
            insight: `Good early results with $${CPA} CPA`,
            todo: `Add cart abandoners audience with 14-day window`
          }
        },
        neutral: {
          very_high: {
            insight: `Mixed results with $${CPA} CPA at high spend`,
            todo: `Reduce frequency on audiences with CTR <0.8% and adjust creative rotation`
          },
          high: {
            insight: `Average $${CPA} CPA performance needs attention`,
            todo: `Implement audience exclusions for users inactive >30 days`
          },
          medium: {
            insight: `Standard $${CPA} CPA with current targeting`,
            todo: `Test new ad formats and refresh creative for aged audiences`
          },
          low: {
            insight: `Basic performance at $${CPA} CPA`,
            todo: `Segment audience by engagement level and adjust bids accordingly`
          },
          very_low: {
            insight: `Limited data with current $${CPA} CPA`,
            todo: `Build initial remarketing lists with 7-day visitors`
          }
        },
        inefficient: {
          very_high: {
            insight: `Concerning $${CPA} CPA with high $${spend}k spend`,
            todo: `Reduce budget by 40% on audiences with CPA >130% of target`
          },
          high: {
            insight: `Poor ROI with $${CPA} CPA at current scale`,
            todo: `Narrow audience targeting and implement strict frequency caps`
          },
          medium: {
            insight: `Underperforming with $${CPA} CPA vs target`,
            todo: `Pause bottom 30% of audiences by conversion rate`
          },
          low: {
            insight: `Weak $${CPA} CPA performance`,
            todo: `Rebuild audience segments based on recent purchasers only`
          },
          very_low: {
            insight: `Poor initial $${CPA} CPA results`,
            todo: `Restrict to high-intent audiences and review pixel setup`
          }
        },
        highly_inefficient: {
          very_high: {
            insight: `Critical: $${CPA} CPA severely above target with high spend`,
            todo: `Pause all but top converting audience segments and reduce daily spend by 70%`
          },
          high: {
            insight: `Major issues with $${CPA} CPA at scale`,
            todo: `Stop expansion audiences and focus only on recent purchasers`
          },
          medium: {
            insight: `Severe performance issues with $${CPA} CPA`,
            todo: `Pause campaign and audit audience quality and creative relevance`
          },
          low: {
            insight: `Very poor $${CPA} CPA despite low spend`,
            todo: `Rebuild entire audience strategy with focus on high-intent signals`
          },
          very_low: {
            insight: `Critical performance with $${CPA} CPA`,
            todo: `Stop campaign and verify tracking setup and audience definitions`
          }
        }
      }
    };

    const defaultInsights = {
      highly_efficient: {
        very_high: {
          insight: 'Outstanding performance at scale',
          todo: 'Lock in current advantages'
        },
        high: {
          insight: 'Strong performance with room to grow',
          todo: 'Plan strategic expansion'
        },
        medium: {
          insight: 'Excellent efficiency metrics',
          todo: 'Scale successful elements'
        },
        low: {
          insight: 'High potential identified',
          todo: 'Increase investment gradually'
        },
        very_low: {
          insight: 'Promising early results',
          todo: 'Develop scaling strategy'
        }
      },
      efficient: {
        very_high: {
          insight: 'Good performance at volume',
          todo: 'Optimize current mix'
        },
        high: {
          insight: 'Solid results at scale',
          todo: 'Expand successful areas'
        },
        medium: {
          insight: 'Effective performance',
          todo: 'Test new opportunities'
        },
        low: {
          insight: 'Promising metrics',
          todo: 'Identify growth areas'
        },
        very_low: {
          insight: 'Good initial performance',
          todo: 'Plan careful expansion'
        }
      },
      neutral: {
        very_high: {
          insight: 'Mixed results at high spend',
          todo: 'Review overall strategy'
        },
        high: {
          insight: 'Average performance',
          todo: 'Optimize key elements'
        },
        medium: {
          insight: 'Standard metrics',
          todo: 'Test improvements'
        },
        low: {
          insight: 'Basic performance',
          todo: 'Monitor effectiveness'
        },
        very_low: {
          insight: 'Limited data available',
          todo: 'Continue tracking'
        }
      },
      inefficient: {
        very_high: {
          insight: 'Efficiency declining',
          todo: 'Audit performance'
        },
        high: {
          insight: 'ROI concerns',
          todo: 'Reduce waste'
        },
        medium: {
          insight: 'Below target metrics',
          todo: 'Revise strategy'
        },
        low: {
          insight: 'Weak performance',
          todo: 'Evaluate approach'
        },
        very_low: {
          insight: 'Poor results',
          todo: 'Reassess strategy'
        }
      },
      highly_inefficient: {
        very_high: {
          insight: 'Critical efficiency issues',
          todo: 'Consider major reductions'
        },
        high: {
          insight: 'Major performance problems',
          todo: 'Pause underperformers'
        },
        medium: {
          insight: 'Severe ROI issues',
          todo: 'Review entire program'
        },
        low: {
          insight: 'Very poor metrics',
          todo: 'Consider suspension'
        },
        very_low: {
          insight: 'Program failing',
          todo: 'Halt investment'
        }
      }
    };

    const channelInsight = insights[channel] || defaultInsights;
    const result = channelInsight[efficiencyLevel][spendLevel];
    
    console.log('Selected Insight:', {
      channel,
      efficiencyLevel,
      spendLevel,
      result,
      isDefault: !insights[channel]
    });
    
    return result;
  };

  // Modern Marketing Effectiveness Chart - Single Color Theme
  const marketingEffectivenessOptions = {
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
      categories: ['Podcast', 'Influencers', 'Search Non-Branded', 'Meta Retargeting', 'Linear TV', 'Mailers'],
      crosshair: {
        width: 1,
        color: 'rgba(14, 165, 233, 0.1)'
      },
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
    yAxis: [{
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
      gridLineWidth: 1
    }, {
      title: { 
        text: 'CPA ($)', 
        style: { 
          fontWeight: '600',
          fontSize: '13px',
          color: '#374151'
        }
      },
      opposite: true,
      labels: { 
        format: '${value}',
        style: {
          fontSize: '11px',
          color: '#6b7280'
        }
      }
    }],
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
        borderRadius: 4,
        groupPadding: 0.1,
        dataLabels: {
          enabled: true,
          format: '${value}k',
          style: {
            fontWeight: '600',
            fontSize: '10px',
            color: '#374151',
            textOutline: 'none'
          }
        }
      },
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
      name: 'Spend',
      data: [27, 10, 45, 32, 18, 8],
      color: '#0ea5e9',
      yAxis: 0
    }, {
      name: 'mCPA',
      data: [52, 22, 38, 45, 62, 28],
      color: '#6b7280',
      yAxis: 1,
      type: 'line'
    }, {
      name: 'CPA',
      data: [44, 21, 35, 42, 58, 25],
      color: '#374151',
      yAxis: 1,
      type: 'line'
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
      },
      useHTML: true,
      formatter: function() {
        const point = this.points[0];  // First point for spend
        const mCPAPoint = this.points[1];  // Second point for mCPA
        const CPAPoint = this.points[2];  // Third point for CPA
        
        const channelInsight = generateMarketingEffectivenessInsights(
          point.category,
          point.y,  // spend
          mCPAPoint.y,  // mCPA
          CPAPoint.y    // CPA
        );
        
        return `
          <div style="min-width: 280px; padding: 8px;">
            <div style="font-weight: 600; font-size: 14px; color: #374151; margin-bottom: 8px;">
              ${point.category}
            </div>
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #6b7280; font-size: 12px;">Spend</span>
                <span style="color: #0ea5e9; font-weight: 500; font-size: 12px;">
                  $${point.y}k
                </span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #6b7280; font-size: 12px;">mCPA</span>
                <span style="color: #6b7280; font-weight: 500; font-size: 12px;">
                  $${mCPAPoint.y}
                </span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280; font-size: 12px;">CPA</span>
                <span style="color: #374151; font-weight: 500; font-size: 12px;">
                  $${CPAPoint.y}
                </span>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; margin: 8px 0;"></div>
            <div style="margin-bottom: 8px;">
              <div style="font-weight: 500; font-size: 12px; color: #374151; margin-bottom: 4px;">
                Insight
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${channelInsight.insight}
              </div>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 12px; color: #374151; margin-bottom: 4px;">
                Recommended Action
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${channelInsight.todo}
              </div>
            </div>
          </div>
        `;
      },
      shared: true
    }
  };

  // Modern Performance Chart - Single Color Theme
  const performanceByChannelOptions = {
    chart: {
      type: 'bar',
      height: 400,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: { text: null },
    xAxis: {
      categories: [
        'Search Non-Branded',
        'Influencers', 
        'Podcast',
        'Meta Retargeting',
        'Linear TV',
        'Mailers',
        'Search Branded',
        'Meta Prospecting'
      ],
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
        text: 'Performance vs. Share of Spend (%)', 
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
        value: 0,
        width: 2,
        color: '#e5e7eb',
        zIndex: 4
      }],
      gridLineColor: '#f3f4f6',
      gridLineWidth: 1
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: '{y}%',
          style: {
            fontWeight: '600',
            fontSize: '11px',
            color: '#374151',
            textOutline: 'none'
          }
        },
        pointPadding: 0.1,
        groupPadding: 0.1,
        borderRadius: 4,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Performance',
      data: [
        { y: 7.6, color: y => y >= 0 ? '#0ea5e9' : '#6b7280' },
        { y: 7.4, color: '#0ea5e9' },
        { y: 5.7, color: '#0ea5e9' },
        { y: 2.9, color: '#0ea5e9' },
        { y: 1.4, color: '#0ea5e9' },
        { y: 0.5, color: '#0ea5e9' },
        { y: -0.2, color: '#6b7280' },
        { y: -25.4, color: '#6b7280' }
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
      useHTML: true,
      formatter: function() {
        const point = this.point;
        const channelInsight = generateChannelInsights(
          point.category,
          point.y,  // performance
          point.spend || 0  // spend (add this to your data points)
        );
        
        const performanceColor = point.y >= 0 ? '#0ea5e9' : '#6b7280';
        
        return `
          <div style="min-width: 280px; padding: 8px;">
            <div style="font-weight: 600; font-size: 14px; color: #374151; margin-bottom: 8px;">
              ${point.category}
            </div>
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="color: #6b7280; font-size: 12px;">Performance vs Target</span>
                <span style="color: ${performanceColor}; font-weight: 500; font-size: 12px;">
                  ${point.y >= 0 ? '+' : ''}${point.y.toFixed(1)}%
                </span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280; font-size: 12px;">Share of Spend</span>
                <span style="color: #374151; font-weight: 500; font-size: 12px;">
                  ${((point.spend || 0) / 140 * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; margin: 8px 0;"></div>
            <div style="margin-bottom: 8px;">
              <div style="font-weight: 500; font-size: 12px; color: #374151; margin-bottom: 4px;">
                Insight
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${channelInsight.insight}
              </div>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 12px; color: #374151; margin-bottom: 4px;">
                Recommended Action
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${channelInsight.todo}
              </div>
            </div>
          </div>
        `;
      }
    }
  };

  const todoItems = [
    { text: 'Optimize Meta prospecting campaign targeting', priority: 'high', completed: false },
    { text: 'Increase podcast advertising budget by 15%', priority: 'medium', completed: false },
    { text: 'Review influencer partnership ROI', priority: 'medium', completed: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Insights</h1>
            <p className="text-gray-600">Analyze campaign performance and optimization opportunities</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
              />
              <span className="ml-2 text-sm text-gray-700">Advanced View</span>
            </label>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total ROAS', value: '4.2x', change: '+12% from last week', positive: true },
            { title: 'Total Spend', value: '$140K', change: '+8% from last week', positive: true },
            { title: 'Conversions', value: '3,245', change: '+15% from last week', positive: true },
            { title: 'Avg. CPA', value: '$43', change: '-5% from last week', positive: true }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-gray-600 mb-3">{metric.title}</div>
                <div className="flex items-center justify-center space-x-1">
                  <svg className={`w-4 h-4 ${metric.positive ? 'text-primary-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.positive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
                  </svg>
                  <span className="text-sm text-gray-600">{metric.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights & Recommendations</h3>
              
              <div className="space-y-3 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">Meta prospecting showing significant underperformance (-25.4% vs share of spend)</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">Search non-branded and influencers are top performers with 7.6% and 7.4% overperformance</p>
                </div>
              </div>

              <div className="space-y-3">
                {todoItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.completed ? (
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className={`w-5 h-5 ${item.priority === 'high' ? 'text-red-500' : 'text-primary-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.text}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-primary-100 text-primary-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">6 Channels</div>
                  <div className="text-sm text-gray-600">Overperforming</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">2 Channels</div>
                  <div className="text-sm text-gray-600">Underperforming</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="text-sm font-medium text-gray-900 mb-1">Date Range</div>
              <div className="text-sm text-gray-600">Last 7 days (2024-12-15 - 2024-12-21)</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Marketing Effectiveness by Channel</h3>
                <p className="text-sm text-gray-600">Spend vs Cost Per Acquisition across channels</p>
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
              options={marketingEffectivenessOptions}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Performance vs Share of Spend</h3>
                <p className="text-sm text-gray-600">Channel performance relative to budget allocation</p>
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
              options={performanceByChannelOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights; 