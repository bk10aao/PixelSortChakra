import React from "react";

import {
    Button,
    FormControl,
    VStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from "@chakra-ui/react";
  
  const NumberGeneratorForm = ({
    value,
    loading,
    onValueChange,
    onSubmit,
  }) => {
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit(e, value);
    };
  
    return (
      <form onSubmit={handleFormSubmit} >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <Slider
              value={value}
              onChange={onValueChange}
              min={1}
              max={100}
              step={1}
              isDisabled={loading}
              w="full"
              >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Generating..."
          >
            Generate Numbers
          </Button>
        </VStack>
      </form>
    );
  };
  
  export default NumberGeneratorForm;