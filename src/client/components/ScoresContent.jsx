import { Box, Button, Flex, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import { useState } from "react";

const ScoresContent = () => {
  const [arrowValues, setArrowValues] = useState(
    [...Array(16)].map(() => Array(6).fill(null))
  );

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
    <Flex
      direction="column"
      className="ScoresContent"
      mb={4}
      height="100%"
      gap={4}
    >
      {/* Scrollable container for arrow values */}
      <ArrowValues />
      <ScoreStats />
      {/* Buttons to Enter Arrow Values */}
      <ArrowButtons />
    </Flex>
  );
};

const ScoreStats = () => {
  return (
    <Accordion allowToggle bg={"blue.50"}>
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
  )
}

const ArrowValues = () => {
  const [arrowValues, setArrowValues] = useState(
    [...Array(16)].map(() => Array(6).fill(null))
  );
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

const ArrowButtons = () => {

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
    </Flex>
  );
};

export default ScoresContent;
