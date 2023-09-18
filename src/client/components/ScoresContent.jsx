import {
  Box,
  Button,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

const ScoresContent = ({ scoreId, currentScore, setCurrentScore }) => {
  console.log("ScoresContent loaded");
  const [fetchComplete, setFetchComplete] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `http://localhost:3000/score/?_id=${scoreId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const result = await response.json();

        if (result.status === "success") {
          const fetchedScore = result.data[0];
          setCurrentScore(fetchedScore);
        } else {
          console.error("Failed to fetch scores:", result);
        }
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
      setFetchComplete(true);
    };

    if (!currentScore || currentScore._id !== scoreId) {
      fetchScore();
    } else {
      setFetchComplete(true);
    }
  }, [scoreId]);

  const handleButtonPress = async (value) => {
    const updatedScore = { ...currentScore };
    const nullIndex = updatedScore.arrowValues.findIndex(
      (arrow) => arrow.arrowScore === null
    );

    if (nullIndex !== -1) {
      const arrowValue = value === "M" ? 0 : value === "X" ? 10 : value;
      updatedScore.arrowValues[nullIndex].arrowScore = arrowValue;
      updatedScore.arrowValues[nullIndex].isX = value === "X";

      updatedScore.totalScore += arrowValue;

      if (arrowValue === 10) {
        updatedScore.scored10s += 1;
      }

      if (value === "X") {
        updatedScore.scoredXs += 1;
      }
    }

    const scoredArrows = updatedScore.arrowValues.filter(
      (arrow) => arrow.arrowScore !== null
    );
    if (scoredArrows.length === currentScore.arrowValues.length) {
      updatedScore.completed = true;
    }

    setCurrentScore(updatedScore);

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `http://localhost:3000/score/${updatedScore._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedScore),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const result = await response.json();

      if (result.status !== "success") {
        console.error("Failed to update score:", result);
      }
    } catch (error) {
      console.error(
        "There was a problem with the PUT operation:",
        error.message
      );
    }
  };

  if (!fetchComplete) {
    return <PageLoader />;
  }

  return (
    <Flex
      direction="column"
      className="ScoresContent"
      mb={4}
      height="100%"
      gap={4}
    >
      <ArrowValues arrowValues={currentScore.arrowValues} />
      {/* <ScoreTotals currentScore={currentScore} /> */}
      <ArrowButtons handleButtonPress={handleButtonPress} />
    </Flex>
  );
};

const ScoreTotals = ({ currentScore }) => {
  return (
    <Flex border={"solid 2px blue"} bg={"blue.200"}>
      {!currentScore ? "No Current Score" : `${currentScore._id}`}
    </Flex>
  );
};

const ScoreInfo = () => {
  return (
    <Accordion allowToggle bg={"blue.50"}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              View Round Details
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Here are some more details about the round.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              View Score Stats
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Here are some more stats about your score.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const ArrowValues = ({ arrowValues }) => {
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
      firstBoxRef.current.removeEventListener("scroll", handleFirstScroll);
      secondBoxRef.current.removeEventListener("scroll", handleSecondScroll);
    };
  }, []);

  return (
    <Flex
      direction="row"
      flex="1"
      mb={4}
      overflowY="auto"
      gap={6}
      borderRadius="md"
    >
      <Box
        flex="1"
        overflowY="auto"
        bg={"gray.100"}
        borderRadius="md"
        ref={firstBoxRef}
        minWidth="200px"
        // maxWidth="240px"
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
                flex="1"
                borderBottom={"solid 1px black"}
                justifyContent="center" // Center the 180px wide area
              >
                <Flex
                  width="180px" // Set width for the container
                  justifyContent="space-between" // Evenly spread the columns
                >
                  {currentEnd.map((arrow, valueIndex) => (
                    <Flex
                      key={valueIndex}
                      width="30px" // Width for each column (180px / 6)
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

      <Box
        flex="1"
        overflowY="auto"
        bg={"gray.100"}
        borderRadius="md"
        ref={secondBoxRef}
        minWidth="220px"
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
            const average = allNull ? "-" : (sum / 6).toFixed(2);

            return (
              <Flex
                key={rowIndex}
                p={2}
                flex="1"
                borderBottom={"solid 1px black"}
                justifyContent="center" // Center the 200px wide area
              >
                <Flex
                  width="200px" // Set width for the container
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
      </Box>
    </Flex>
  );
};

const ArrowButtons = ({ handleButtonPress }) => {
  return (
    <Flex wrap="wrap" spacing={2} border={"solid 2px blue"} bg={"blue.200"}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
        <Button key={number} onClick={() => handleButtonPress(number)}>
          {number}
        </Button>
      ))}
      <Button onClick={() => handleButtonPress("M")}>M</Button>
      <Button onClick={() => handleButtonPress("X")}>X</Button>
    </Flex>
  );
};

export default ScoresContent;
