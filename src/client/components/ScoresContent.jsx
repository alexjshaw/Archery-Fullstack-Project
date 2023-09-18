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
import { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

const ScoresContent = ({
  scoreId,
  currentScore,
  setCurrentScore,
  totalArrows,
}) => {
  console.log("ScoresContent loaded");
  const totalEnds = 2;

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
          const fetchedScore = result.data[0]; // Assuming result.data is an array
          if (
            !fetchedScore.arrowValues ||
            fetchedScore.arrowValues.length === 0
          ) {
            fetchedScore.arrowValues = [...Array(totalEnds * 6)].map(
              (_, index) => ({
                arrowNumber: index + 1,
                arrowScore: null,
                isX: false,
              })
            );
          }
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
        updatedScore.scored10s += 1;
        updatedScore.scoredXs += 1;
      }
    }

    const scoredArrows = updatedScore.arrowValues.filter(
      (arrow) => arrow.arrowScore !== null
    );
    if (scoredArrows.length === totalArrows) {
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

  const testFunction = () => {
    console.log("currentScore", currentScore);
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
      <ArrowValues
        arrowValues={currentScore.arrowValues}
        totalEnds={totalEnds}
      />
      {/* <ScoreTotals currentScore={currentScore} /> */}
      <ArrowButtons handleButtonPress={handleButtonPress} />
      <Button onClick={testFunction}>TEST</Button>
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

const ArrowValues = ({ arrowValues, totalEnds }) => {
  return (
    <Flex
      direction="column"
      flex="1"
      mb={4}
      overflowY="auto"
      border={"solid 2px red"}
      bg={"blue.100"}
    >
      {Array.from({ length: totalEnds }).map((_, rowIndex) => (
        <Flex key={rowIndex} mb={2} border="1px solid black" p={2} flex="1">
          {arrowValues
            .slice(rowIndex * 6, (rowIndex + 1) * 6)
            .map((arrow, valueIndex) => (
              <Text key={valueIndex} mx={1} fontSize="xl">
                {arrow.arrowScore === null
                  ? "-"
                  : arrow.isX
                  ? "X"
                  : arrow.arrowScore}
              </Text>
            ))}
        </Flex>
      ))}
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
