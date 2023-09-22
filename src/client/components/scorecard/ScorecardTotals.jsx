import { Flex, Box, Grid, Button, Text } from "@chakra-ui/react";

const ScorecardTotals = ({ currentScore }) => {
  return (
    <Box maxWidth="500px" width="100%" mx="auto" border="1px solid black">
      <Flex justifyContent="space-between" borderBottom="1px solid black" py={2}>
        <Text flex="1" fontSize="lg" fontWeight="bold">Total</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">10+X</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">X</Text>
        <Text flex="1" fontSize="lg" fontWeight="bold">Average</Text>
      </Flex>
      <Flex justifyContent="space-between" py={2}>
        <Text flex="1" fontSize="lg">{currentScore.totalScore}</Text>
        <Text flex="1" fontSize="lg">{currentScore.scored10s}</Text>
        <Text flex="1" fontSize="lg">{currentScore.scoredXs}</Text>
        <Text flex="1" fontSize="lg">{currentScore.handicap}</Text>
      </Flex>
    </Box>
  )
}

export default ScorecardTotals

/*
    <Flex justifyContent="center" direction="column" alignItems="center" border={"solid 1px black"} maxW="500px">
      <Flex  w="100%" justifyContent="space-between"  >
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            Total
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            10+X
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            X
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            Average
          </Text>
        </Flex>
      </Flex>
      <Flex maxW="500px" w="100%" justifyContent="space-between" >
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            Total
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            10+X
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            X
          </Text>
        </Flex>
        <Flex width="75px" alignItems="center" justifyContent="center">
          <Text mx={1} fontSize="lg" fontWeight="bold">
            Average
          </Text>
        </Flex>
      </Flex>
    </Flex>
*/