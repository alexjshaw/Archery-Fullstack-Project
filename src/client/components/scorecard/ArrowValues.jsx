import { Flex, Text, Box } from "@chakra-ui/react";

const ArrowValues = ({ firstBoxRef, totalEnds, arrowValues }) => {

  return (
    <Box
    flex="1"
    overflowY="auto"
    bg={"gray.100"}
    borderRadius="md"
    ref={firstBoxRef}
    minWidth="210px"
    maxWidth="320px"
    sx={{
      "::-webkit-scrollbar": {
        display: "none",
      },
    }}
  >
    <Flex direction="column" alignItems="center" justifyContent="center">
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
            flex="1"
            borderBottom={"solid 1px black"}
            justifyContent="center" // Center the 180px wide area
          >
            <Flex
              width="100%"
              justifyContent="space-between" // Evenly spread the columns
            >
              {currentEnd.map((arrow, valueIndex) => (
                <Flex
                  key={valueIndex}
                  width="35px" // Width for each column (180px / 6)
                  alignItems="center"
                  justifyContent="center"
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
                </Flex>
              ))}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  </Box>
  )
}

export default ArrowValues