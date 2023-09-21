import { useState, useRef, useEffect } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import ArrowValues from "./ArrowValues";
import ScorecardRunningStats from "./ScorecardRunningStats";
import ScorecardEndInfo from "./ScorecardEndInfo";

const ScorecardValues = ({ arrowValues, currentScore }) => {
  console.log('ScorecardValues')
  const totalEnds = arrowValues.length / 6;

  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);

  let isSyncingFirstScroll = false;
  let isSyncingSecondScroll = false;

  useEffect(() => {
    const handleFirstScroll = () => {
      if (!isSyncingFirstScroll) {
        isSyncingSecondScroll = true;
        secondBoxRef.current.scrollTop = firstBoxRef.current.scrollTop;
      }
      isSyncingFirstScroll = false;
    };

    const handleSecondScroll = () => {
      if (!isSyncingSecondScroll) {
        isSyncingFirstScroll = true;
        firstBoxRef.current.scrollTop = secondBoxRef.current.scrollTop;
      }
      isSyncingSecondScroll = false;
    };

    firstBoxRef.current.addEventListener("scroll", handleFirstScroll);
    secondBoxRef.current.addEventListener("scroll", handleSecondScroll);

    return () => {
      // Cleanup event listeners on unmount
      if (firstBoxRef.current) {
        firstBoxRef.current.removeEventListener("scroll", handleFirstScroll);
      }
      if (secondBoxRef.current) {
        secondBoxRef.current.removeEventListener("scroll", handleSecondScroll);
      }
    };
  }, []);

  return (
    <Flex
      direction="row"
      w="100%"
      justifyContent="center"
      overflowY="auto"
      gap={6}
    >
      <ScorecardEndInfo firstBoxRef={firstBoxRef} totalEnds={totalEnds} currentScore={currentScore} />
      {/* <Box
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
      </Box> */}
      <ArrowValues firstBoxRef={firstBoxRef} totalEnds={totalEnds} arrowValues={arrowValues} />

      {/* <Box
        flex="1"
        overflowY="auto"
        bg={"gray.100"}
        borderRadius="md"
        ref={secondBoxRef}
        minWidth="200px"
        maxWidth="260px"
        scrollbarGutter="stable"
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
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
            const average = allNull 
            ? "-" 
            : parseFloat((sum / 6).toFixed(2))

            return (
              <Flex
                key={rowIndex}
                p={2}
                width="100%"
                flex="1"
                borderBottom={"solid 1px black"}
                justifyContent="center" // Center the 200px wide area
              >
                <Flex
                  width="100%" // Set width for the container
                  justifyContent="space-between" // Evenly spread the columns
                >
                  <Flex
                    width="50px" // Width for each column (200px / 4)
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text mx={1} fontSize="xl">
                      {sum}
                    </Text>
                  </Flex>
                  <Flex
                    width="50px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text mx={1} fontSize="xl">
                      {tensCount}
                    </Text>
                  </Flex>
                  <Flex
                    width="50px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text mx={1} fontSize="xl">
                      {xCount}
                    </Text>
                  </Flex>
                  <Flex
                    width="50px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text mx={1} fontSize="xl">
                      {average}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Box> */}
      <ScorecardRunningStats secondBoxRef={secondBoxRef} totalEnds={totalEnds} arrowValues={arrowValues} />

    </Flex>
  );
}

export default ScorecardValues