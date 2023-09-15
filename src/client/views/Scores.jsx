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
    <Flex maxW="80vw" mx="auto" p={4} bg={'red.100'} height="100%">
      {/* ScoresLeftNav */}
      <Box flex="1" maxW="20%" bg="gray.200" p={4} mr={4} alignSelf={"start"} >
        <ScoresLeftNav />
      </Box>

      {/* ScoresContent */}
      <Box flex="1" bg="gray.300" p={4}>
        <ScoresContent />
        {/* <Button onClick={logCurrentScore}>Log Current Score</Button> */}
        {/* <NewScoreForm setCurrentScore={setCurrentScore} setActiveComponent={setActiveComponent} /> */}
      </Box>
    </Flex>
  );
};

export default Scores;