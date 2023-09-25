import { Flex, Box, Grid, Button } from "@chakra-ui/react";

const ScorecardButtons = ({ handleButtonPress, currentRound }) => {
  return (
    <Flex justifyContent={"center"}>
      {currentRound.type === "Metric" ? (
        <Box maxW="500px" w="100%" borderRadius="lg" bg={"gray.100"} p="2">
          <Grid templateColumns="repeat(6, 1fr)" gap={5}>
            <Button h="50px" onClick={() => handleButtonPress("M")} bg="green.500" variant="unstyled">
              M
            </Button>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
              <Button
                h="50px"
                onClick={() => handleButtonPress(number)}
                key={number}
                bg={
                  number === 1
                    ? "white"
                    : number === 2
                    ? "white"
                    : number === 3 || number === 4
                    ? "black"
                    : "blue.500"
                }
                variant="unstyled"
                color={number === 3 || number === 4 ? "white" : "black"}
              >
                {number}
              </Button>
            ))}
          </Grid>
          <Grid templateColumns="repeat(6, 1fr)" gap={5} mt={2}>
            {Array.from({ length: 5 }, (_, i) => i + 6).map((number) => (
              <Button
                h="50px"
                onClick={() => handleButtonPress(number)}
                key={number}
                bg={number === 6 ? "blue.500" : number === 9 || number === 10 ? "yellow" : "red"}
                variant="unstyled"
              >
                {number}
              </Button>
            ))}
            <Button h="50px" onClick={() => handleButtonPress("X")} bg="yellow" variant="unstyled">
              X
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box maxW="500px" w="100%" border={"solid 2px blue"} bg={"blue.200"}>
          <Grid templateColumns="repeat(7, 1fr)" gap={5}>
            <Button h="50px" onClick={() => handleButtonPress("M")} bg="green.500" variant="unstyled">
              M
            </Button>
            {Array.from({ length: 5 }, (_, i) => i * 2 + 1).map((number) => (
              <Button
                h="50px"
                onClick={() => handleButtonPress(number)}
                key={number}
                bg={
                  number === 1
                    ? "white"
                    : number === 3
                    ? "black"
                    : number === 5
                    ? "blue.500"
                    : number === 7
                    ? "red"
                    : "yellow"
                }
                variant="unstyled"
                color={number === 3 ? "white" : "black"}
              >
                {number}
              </Button>
            ))}
            <Button h="50px" onClick={() => handleButtonPress("X")} bg="yellow" variant="unstyled">
              X
            </Button>
          </Grid>
        </Box>
      )}
    </Flex>
  );
};

export default ScorecardButtons;
