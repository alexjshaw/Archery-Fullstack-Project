import { Flex, Text, Box } from "@chakra-ui/react";

const ScorecardRunningStats = ({ thirdBoxRef, totalEnds, arrowValues }) => {
  console.log('ScorecardRunningStats')
  return (
    <Box
      flex="1"
      overflowY="auto"
      bg={"gray.100"}
      borderRadius="md"
      ref={thirdBoxRef}
      minWidth="200px"
      maxWidth="280px"
    >
      <Flex direction="column" alignItems="center" justifyContent="center">
      <Flex
    p={2}
    width="100%"
    borderBottom={"solid 1px black"}
    justifyContent="center"
  >
    <Flex width="100%" justifyContent={"space-between"}>
      <Flex width="50px" alignItems="center" justifyContent="center">
        <Text mx={1} fontSize="md" fontWeight="bold">
          Total
        </Text>
      </Flex>
      <Flex width="50px" alignItems="center" justifyContent="center">
        <Text mx={1} fontSize="md" fontWeight="bold">
          10+X
        </Text>
      </Flex>
      <Flex width="50px" alignItems="center" justifyContent="center">
        <Text mx={1} fontSize="md" fontWeight="bold">
          X
        </Text>
      </Flex>
      <Flex width="50px" alignItems="center" justifyContent="center">
        <Text mx={1} fontSize="md" fontWeight="bold">
          Avg
        </Text>
      </Flex>
    </Flex>
  </Flex>
        {Array.from({ length: totalEnds }).map((_, rowIndex) => {
          const currentEnd = arrowValues.slice(
            rowIndex * 6,
            (rowIndex + 1) * 6
          );
          const allNull = currentEnd.every(
            (arrow) => arrow.arrowScore === null
          );
          const sum = allNull
            ? "-"
            : currentEnd.reduce(
                (acc, arrow) => acc + (arrow.arrowScore || 0),
                0
              );
          const tensCount = allNull
            ? "-"
            : currentEnd.filter((arrow) => arrow.arrowScore === 10).length;
          const xCount = allNull
            ? "-"
            : currentEnd.filter((arrow) => arrow.isX).length;
          const average = allNull ? "-" : parseFloat((sum / 6).toFixed(2));

          return (
            <Flex
              key={rowIndex}
              p={2}
              width="100%"
              flex="1"
              borderBottom={"solid 1px black"}
              justifyContent="center"
            >
              <Flex
                width="100%"
                justifyContent="space-between"
              >
                <Flex
                  width="50px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text mx={1} fontSize="xl">
                    {sum}
                  </Text>
                </Flex>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {tensCount}
                  </Text>
                </Flex>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {xCount}
                  </Text>
                </Flex>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {average}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ScorecardRunningStats;
