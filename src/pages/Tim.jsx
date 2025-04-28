import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function Tim() {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box maxWidth="1440px" p={4} pt={{ base: "80px", md: "60px" }} mx="auto" bg={bgColor} color={textColor}>
      <Heading mb={4}>Tim Sort</Heading>
      <Text>Placeholder for Tim Sort visualization or content.</Text>
    </Box>
  );
}