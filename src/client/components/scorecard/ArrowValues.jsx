import { Flex, Text, Box } from "@chakra-ui/react";

const ArrowValues = ({ secondBoxRef, totalEnds, arrowValues, styles }) => {
  console.log("ArrowValues");
  return (
    <Box
      flex="1"
      overflowY="auto"
      bg={"gray.100"}
      borderRadius="md"
      ref={secondBoxRef}
      minWidth="210px"
      maxWidth="320px"
      px={2}
      {...styles}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Flex
          p={2}
          width="100%"
          borderBottom={"solid 1px black"}
          justifyContent="center"
        >
          <Flex width="100%" justifyContent={"center"}>
            <Text mx={1} fontSize="md" fontWeight="bold">
              Arrow Values
            </Text>
          </Flex>
        </Flex>
        {Array.from({ length: totalEnds }).map((_, rowIndex) => {
          const currentEnd = arrowValues.slice(
            rowIndex * 6,
            (rowIndex + 1) * 6
          );
          return (
            <Flex
              key={rowIndex}
              p={2}
              width="100%"
              height="55px"
              borderBottom={"solid 1px black"}
              justifyContent="center"
              className="test"
            >
              <Flex
                width="100%"
                justifyContent="space-between"
              >
                {currentEnd.map((arrow, valueIndex) => (
                  <Box
                    key={valueIndex}
                    width="35px"
                    height="35px"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={
                      arrow.arrowScore === null
                        ? "gray.200"
                        : arrow.arrowScore === 0 || arrow.arrowScore === "M"
                        ? "green.500"
                        : arrow.arrowScore === 1 || arrow.arrowScore === 2
                        ? "white"
                        : arrow.arrowScore === 3 || arrow.arrowScore === 4
                        ? "black"
                        : arrow.arrowScore === 5 || arrow.arrowScore === 6
                        ? "blue.500"
                        : arrow.arrowScore === 7 || arrow.arrowScore === 8
                        ? "red"
                        : "yellow"
                    }
                    color={arrow.arrowScore === 3 || arrow.arrowScore === 4 ? "white" : "black"}
                  >
                    <Text fontSize="xl">
                      {arrow.arrowScore === null
                        ? "-"
                        : arrow.arrowScore === 0
                        ? "M"
                        : arrow.isX
                        ? "X"
                        : arrow.arrowScore}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ArrowValues;
