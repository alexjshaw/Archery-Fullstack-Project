import React, { Fragment, useState, useEffect } from "react";
import { Box, Flex, Button } from '@chakra-ui/react';

import ScoresLeftNav from "../components/ScoresLeftNav";
import ScoresContent from "../components/ScoresContent";
import NewScoreForm from "../components/NewScoreForm";

const Scores = () => {
  console.log('Scores Loaded')

  const [currentScore, setCurrentScore] = useState()
  const [activeComponent, setActiveComponent] = useState()

  function logCurrentScore () {
    console.log('currentScore', currentScore)
  }

  return (
    <Flex maxW="80vw" mx="auto" p={4} maxH="100%" alignItems="flex-start" bg={'red.100'} className="Scores Flex">
      {/* ScoresLeftNav */}
      <Box maxW="20%" bg="gray.200" p={4} mr={4}>
        <ScoresLeftNav />
      </Box>

      {/* ScoresContent */}
      <Box flex="1" bg="gray.300" p={4} maxH={"100%"} className="Scores Box">
        <ScoresContent />
        {/* <Button onClick={logCurrentScore}>Log Current Score</Button> */}
        {/* <NewScoreForm setCurrentScore={setCurrentScore} setActiveComponent={setActiveComponent} /> */}
      </Box>
    </Flex>
  );
};

export default Scores;
