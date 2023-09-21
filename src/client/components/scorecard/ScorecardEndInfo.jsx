import { Flex, Text, Box } from "@chakra-ui/react";

const ScorecardEndInfo = ({ firstBoxRef, totalEnds, currentScore }) => {
  console.log('ScorecardEndInfo')
  console.log(currentScore)
  return (
    <Box
      flex="1"
      overflowY="auto"
      bg={"gray.100"}
      borderRadius="md"
      ref={firstBoxRef}
      minWidth="200px"
      maxWidth="260px"
      scrollbarGutter="stable"
    >
      <Flex direction="column" alignItems="center" justifyContent="center">

      </Flex>
    </Box>
  );
};

export default ScorecardEndInfo;
