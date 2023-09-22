import { useState, useRef, useEffect } from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import ArrowValues from "./ArrowValues";
import ScorecardRunningStats from "./ScorecardRunningStats";
import ScorecardEndInfo from "./ScorecardEndInfo";

const ScorecardValues = ({ arrowValues, currentScore, currentRound, currentSightmarks }) => {
  console.log('ScorecardValues')
  const totalEnds = arrowValues.length / 6;

  const firstBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  const thirdBoxRef = useRef(null)

  let isSyncingFirstScroll = false;
  let isSyncingSecondScroll = false;
  let isSyncingThirdScroll = false;

  useEffect(() => {
    const handleFirstScroll = () => {
      if (!isSyncingFirstScroll) {
        isSyncingSecondScroll = true;
        isSyncingThirdScroll = true;
        secondBoxRef.current.scrollTop = firstBoxRef.current.scrollTop;
        thirdBoxRef.current.scrollTop = firstBoxRef.current.scrollTop;
      }
      isSyncingFirstScroll = false;
    };

    const handleSecondScroll = () => {
      if (!isSyncingSecondScroll) {
        isSyncingFirstScroll = true;
        isSyncingThirdScroll = true;
        firstBoxRef.current.scrollTop = secondBoxRef.current.scrollTop;
        thirdBoxRef.current.scrollTop = secondBoxRef.current.scrollTop;
      }
      isSyncingSecondScroll = false;
    };

    const handleThirdScroll=() => {
      if (!isSyncingThirdScroll) {
        isSyncingFirstScroll = true;
        isSyncingSecondScroll = true;
        firstBoxRef.current.scrollTop = thirdBoxRef.current.scrollTop;
        secondBoxRef.current.scrollTop = thirdBoxRef.current.scrollTop;
      }
      isSyncingThirdScroll = false
    }

    firstBoxRef.current.addEventListener("scroll", handleFirstScroll);
    secondBoxRef.current.addEventListener("scroll", handleSecondScroll);
    thirdBoxRef.current.addEventListener("scroll", handleThirdScroll)

    return () => {
      // Cleanup event listeners on unmount
      if (firstBoxRef.current) {
        firstBoxRef.current.removeEventListener("scroll", handleFirstScroll);
      }
      if (secondBoxRef.current) {
        secondBoxRef.current.removeEventListener("scroll", handleSecondScroll);
      }
      if (thirdBoxRef.current) {
        thirdBoxRef.current.removeEventListener("scroll", handleThirdScroll)
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
      <ScorecardEndInfo firstBoxRef={firstBoxRef} totalEnds={totalEnds} currentScore={currentScore} currentRound={currentRound} currentSightmarks={currentSightmarks} arrowValues={arrowValues} />

      <ArrowValues secondBoxRef={secondBoxRef} totalEnds={totalEnds} arrowValues={arrowValues} />

      <ScorecardRunningStats thirdBoxRef={thirdBoxRef} totalEnds={totalEnds} arrowValues={arrowValues} />

    </Flex>
  );
}

export default ScorecardValues