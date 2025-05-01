import { useState, useEffect } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Text } from "@chakra-ui/react";

const SortingChart = ({ steps, algorithm, isSorted, hgt, totalSteps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Debug incoming props
  useEffect(() => {
    console.log(`SortingChart (${algorithm}) props:`, { steps, totalSteps, currentStep, isSorted });
  }, [steps, totalSteps, currentStep, isSorted, algorithm]);

  useEffect(() => {
    // Reset currentStep when steps change
    setCurrentStep(0);

    if (steps.length === 0 || !steps[0]) {
      return;
    }

    // Calculate interval duration to sync with bar animation
    const arrayLength = steps[0]?.length || 10;
    const baseLength = 10;
    const baseBarDuration = 200;
    const minBarDuration = 100;
    const maxBarDuration = 300;
    const barAnimationDuration = Math.max(
      minBarDuration,
      Math.min(maxBarDuration, (baseBarDuration * baseLength) / arrayLength)
    );
    const intervalDuration = barAnimationDuration; // Sync with animation

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

  // Ensure data is valid
  const data = steps[currentStep]?.map((value, index) => ({
    index: index + 1,
    value,
  })) || [];

  return (
    <Box>
      <Box borderRadius="md" px={1} pt={4} pb={3} borderWidth={0}>
        <ResponsiveContainer width="100%" height={hgt}>
          <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Box p={2} bg="gray.700" borderRadius="md" border="0px">
                      <Text color="white">Value: {payload[0].value}</Text>
                    </Box>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill={isSorted && currentStep === steps.length - 1 ? "#E53E3E" : "#38B2AC"}
              isAnimationActive={true}
              animationDuration={
                Math.max(
                  100,
                  Math.min(300, (200 * 10) / (steps[0]?.length || 10))
                )
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Text color="white" fontSize="sm" mt={2} textAlign="center">
        Step: {steps.length > 1 || (steps.length === 1 && isSorted) ? currentStep + 1 : 1} /{" "}
        {steps.length > 1 || (steps.length === 1 && isSorted) ? (totalSteps || steps.length) : "?"}
      </Text>
    </Box>
  );
};

export default SortingChart;