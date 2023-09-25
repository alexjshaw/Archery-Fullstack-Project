import { Flex, Box, Grid, Button, Text } from "@chakra-ui/react";

const ScorecardTotals = ({ currentScore, styles }) => {
  const validArrowCount = currentScore.arrowValues.filter(
    (arrow) => arrow.arrowScore !== null
  ).length;

  const average =
  validArrowCount > 0
    ? (currentScore.totalScore / validArrowCount).toFixed(2)
    : 0;

  return (
    <Box {...styles} maxWidth="500px" width="100%" mx="auto" >
      <Flex justifyContent="space-between" py={2}>
        <Text flex="1" fontSize="lg" fontWeight="bold">Total</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">10+X</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">X</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">Average</Text>
      </Flex>
      <Flex justifyContent="space-between" py={2}>
        <Text flex="1" fontSize="lg">{currentScore.totalScore}</Text>
        <Text flex="1" fontSize="lg">{currentScore.scored10s}</Text>
        <Text flex="1" fontSize="lg">{currentScore.scoredXs}</Text>
        <Text flex="1" fontSize="lg">{average}</Text>
      </Flex>
    </Box>
  )
}

export default ScorecardTotals
