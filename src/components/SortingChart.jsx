import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import "../chart.css";

const SortingChart = ({ steps, isSorted, hgt, totalSteps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);

    if (steps.length === 0 || !steps[0]) {
      return;
    }

    const arrayLength = steps[0]?.length || 10;
    const baseLength = 10;
    const baseBarDuration = 200;
    const minBarDuration = 100;
    const maxBarDuration = 300;
    const barAnimationDuration = Math.max(
      minBarDuration,
      Math.min(maxBarDuration, (baseBarDuration * baseLength) / arrayLength)
    );
    const intervalDuration = barAnimationDuration;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [steps]);

  const data =
    steps[currentStep]?.map((value, index) => ({
      index: index + 1,
      value
    })) || [];

  const isChartSorted = isSorted && currentStep === steps.length - 1;

  const getBarFillColor = () => {
    if (isChartSorted) {
      return "#E53E3E";
    }
    return "#38B2AC";
  };

  return (
    <div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={hgt}>
          <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="chart-tooltip">
                      <p className="chart-tooltip-text">Value: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              data-sorted={isChartSorted.toString()}
              isAnimationActive={false}
              fill={getBarFillColor()}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              activeDot={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="chart-step-text">
        Step: {steps.length > 1 || (steps.length === 1 && isSorted) ? currentStep + 1 : 1} /{" "}
        {steps.length > 1 || (steps.length === 1 && isSorted) ? totalSteps || steps.length : "?"}
      </p>
    </div>
  );
};

SortingChart.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  isSorted: PropTypes.bool.isRequired,
  hgt: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired
};

export default SortingChart;
