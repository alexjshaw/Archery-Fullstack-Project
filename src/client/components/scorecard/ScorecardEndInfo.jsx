import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ScorecardEndInfo = ({
  firstBoxRef,
  totalEnds,
  currentScore,
  currentRound,
  currentSightmarks,
  arrowValues,
}) => {
  console.log("ScorecardEndInfo");

  const [endInfo, setEndInfo] = useState([]);

  useEffect(() => {
    const distances = currentRound.distances;
    let ends = [];

    distances.forEach((distanceObj) => {
      const numOfObjects = distanceObj.numDozens * 2;

      for (let i = 0; i < numOfObjects; i++) {
        ends.push({
          distance: distanceObj.distance,
          distanceType: distanceObj.distanceType,
          targetSize: distanceObj.targetSize,
        });
      }
    });

    ends = ends.map((end) => {
      const matchingSightmark = currentSightmarks.find(
        (sightmark) =>
          sightmark.distance === end.distance &&
          sightmark.distanceType === end.distanceType
      );

      return {
        ...end,
        sightmark: matchingSightmark ? matchingSightmark.sightPosition : null,
      };
    });

    setEndInfo(ends);
  }, [currentRound]);

  return (
    <Box
      flex="1"
      overflowY="auto"
      bg={"gray.100"}
      borderRadius="md"
      ref={firstBoxRef}
      minWidth="240px"
      maxWidth="280px"
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Flex
          p={2}
          width="100%"
          borderBottom={"solid 1px black"}
          justifyContent="center"
        >
          <Flex width="100%" justifyContent={"space-between"}>
            <Flex width="50px" alignItems="center" justifyContent="center">
              <Text mx={1} fontSize="md" fontWeight="bold">
                Distance
              </Text>
            </Flex>
            <Flex width="50px" alignItems="center" justifyContent="center">
              <Text mx={1} fontSize="md" fontWeight="bold">
                Target
              </Text>
            </Flex>
            <Flex width="50px" alignItems="center" justifyContent="center">
              <Text mx={1} fontSize="md" fontWeight="bold">
                Sightmark
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {Array.from({ length: totalEnds }).map((_, rowIndex) => {
          const currentEnd = arrowValues.slice(
            rowIndex * 6,
            (rowIndex + 1) * 6
          );
          const distance = endInfo[rowIndex]?.distance || 0;
          const distanceType = endInfo[rowIndex]?.distanceType;
          const targetSize = endInfo[rowIndex]?.targetSize || 0;
          const sightmark = endInfo[rowIndex]?.sightmark || "-";

          const renderedDistance =
            distanceType === "Metres" ? `${distance}m` : `${distance}yd`;
          const renderedTargetSize = `${targetSize}cm`;
          return (
            <Flex
              key={rowIndex}
              p={2}
              width="100%"
              flex="1"
              borderBottom={"solid 1px black"}
              justifyContent="center"
            >
              <Flex width="100%" justifyContent={"space-between"}>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {renderedDistance}
                  </Text>
                </Flex>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {renderedTargetSize}
                  </Text>
                </Flex>
                <Flex width="50px" alignItems="center" justifyContent="center">
                  <Text mx={1} fontSize="xl">
                    {sightmark}
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

export default ScorecardEndInfo;
