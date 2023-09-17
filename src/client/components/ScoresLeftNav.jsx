import { Box, Button, Flex, Text, VStack, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import React from "react";

const ScoresLeftNav = ({ userScores, onScoreSelect }) => {
  const filterAndSortScores = (completed) => {
    return userScores
      .filter((score) => score.completed === completed)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 3);
  };

  const renderScoreButtons = (scores) => {
    return scores.length > 0 ? (
      scores.map((score) => (
        <Button
          key={score._id}
          onClick={() => handleButtonClick(score._id)}
          width="100%"
          whiteSpace="normal"
          height="auto"
          py={3}
        >
          <VStack spacing={1} align="center">
            <Text>{score.scoreType}</Text>
            <Text fontSize="sm">
              {new Date(score.updatedAt).toLocaleDateString()}
            </Text>
          </VStack>
        </Button>
      ))
    ) : (
      <Text>No Scores Available</Text>
    );
  };

  const handleButtonClick = (id) => {
    console.log(id);
    onScoreSelect(id);
  };

  const sections = [
    { title: "Active Scores", scores: filterAndSortScores(false) },
    { title: "Recent Scores", scores: filterAndSortScores(true) },
  ];

return (
  <VStack spacing={4} align="center" w="100%">
    <Button width="100%" whiteSpace="normal" height="auto" py={3} onClick={() => handleButtonClick(null)}>
      New Score
    </Button>
    <Accordion allowToggle width="100%">
      {sections.map((section) => (
        <AccordionItem key={section.title}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center">
                {section.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {renderScoreButtons(section.scores)}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </VStack>
);

};

export default ScoresLeftNav;
