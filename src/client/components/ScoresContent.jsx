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

const ScoresContent = ({ scoreId, currentScore, setCurrentScore }) => {
  console.log('ScoresContent loaded')

  const [fetchComplete, setFetchComplete] = useState(false);
  const [arrowValues, setArrowValues] = useState(
    [...Array(16)].map(() => Array(6).fill(null))
  );
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
          await setCurrentScore(...result.data);
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

  const handleButtonPress = (value) => {
    let newValues = [...arrowValues];
    for (let i = 0; i < newValues.length; i++) {
      const nullIndex = newValues[i].indexOf(null);
      if (nullIndex !== -1) {
        newValues[i][nullIndex] = value;
        break;
      }
    }
    setArrowValues(newValues);
  };

  const testFunction = () => {
    console.log("currentScore", currentScore);
    console.log('arrowValues', arrowValues)
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
      <ArrowValues arrowValues={arrowValues} />
      {/* <ScoreTotals currentScore={currentScore} /> */}
      <ArrowButtons arrowValues={arrowValues} setArrowValues={setArrowValues} />
      <Button onClick={testFunction}>TEST</Button>
    </Flex>
  );
};

const ScoreTotals = ({currentScore}) => {
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
  return (
    <Flex
      direction="column"
      flex="1"
      mb={4}
      overflowY="auto"
      border={"solid 2px red"}
      bg={"blue.100"}
    >
      {arrowValues.map((row, rowIndex) => (
        <Flex key={rowIndex} mb={2} border="1px solid black" p={2} flex="1">
          {row.map((value, valueIndex) => (
            <Text key={valueIndex} mx={1} fontSize="xl">
              {value || "-"}
            </Text>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

const ArrowButtons = ({ arrowValues, setArrowValues }) => {
  const handleButtonPress = (value) => {
    let newValues = [...arrowValues];
    for (let i = 0; i < newValues.length; i++) {
      const nullIndex = newValues[i].indexOf(null);
      if (nullIndex !== -1) {
        newValues[i][nullIndex] = value;
        break;
      }
    }
    setArrowValues(newValues);
  };
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
