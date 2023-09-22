import { Flex, Box, Grid, Button } from "@chakra-ui/react";

const ScorecardButtons = ({ handleButtonPress, currentRound }) => {
  return (
    <Flex justifyContent={"center"}>
      {currentRound.type === "Metric" ? (
        <Box maxW="500px" w="100%" border={"solid 2px blue"} bg={"blue.200"}>
          <Grid templateColumns="repeat(6, 1fr)" gap={5}>
            <Button h="50px" onClick={() => handleButtonPress("M")}>
              M
            </Button>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
              <Button
                h="50px"
                onClick={() => handleButtonPress(number)}
                key={number}
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
              >
                {number}
              </Button>
            ))}
            <Button h="50px" onClick={() => handleButtonPress("X")}>
              X
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box
          maxW="500px"
          w="100%"
          border={"solid 2px blue"}
          bg={"blue.200"}
        >
          <Grid templateColumns="repeat(7, 1fr)" gap={5}>
            <Button h="50px" onClick={() => handleButtonPress("M")}>
              M
            </Button>
            {Array.from({ length: 5 }, (_, i) => (i * 2) + 1).map((number) => (
              <Button
                h="50px"
                onClick={() => handleButtonPress(number)}
                key={number}
              >
                {number}
              </Button>
            ))}
            <Button h="50px" onClick={() => handleButtonPress("X")}>
              X
            </Button>
          </Grid>
        </Box>
      )}
    </Flex>
  );
};

export default ScorecardButtons;
