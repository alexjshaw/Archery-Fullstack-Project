import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import React from "react";

const ScoresLeftNav = () => {
  // Your ScoresLeftNav component code here
  return (
    <VStack spacing={4} align="center" w="100%">
      <Button width="100%" py={3}>Temp 1</Button>
      <Button width="100%" py={3}>Temp 2</Button>
      <Button width="100%" whiteSpace="normal" height="auto" py={3}>Temp 3 button with longer text</Button>
    </VStack>
  );
};

export default ScoresLeftNav
