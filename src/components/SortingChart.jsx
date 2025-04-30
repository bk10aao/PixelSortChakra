import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@chakra-ui/react";

const SortingChart = ({ steps, algorithm, isSorted, hgt }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (steps.length === 0 || !steps[0]) 
      return;
    const intervalDuration = 150

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
  }, [steps, algorithm]);

  const data = steps[currentStep]?.map((value, index) => ({
    index: index + 1,
    value,
  })) || [];

  const arrayLength = steps[0]?.length || 10;
  const baseLength = 10;
  const baseBarDuration = 200;
  const minBarDuration = 100;
  const maxBarDuration = 300;
  const barAnimationDuration = Math.max(
    minBarDuration,
    Math.min(maxBarDuration, (baseBarDuration * baseLength) / arrayLength)
  );

  return (
    <Box mt={4}>
      <ResponsiveContainer width="100%" height={hgt}>
        <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={isSorted && currentStep === steps.length - 1 ? "#e53e3e" : "#3182ce"}
            isAnimationActive={true}
            animationDuration={barAnimationDuration}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SortingChart;