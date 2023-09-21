import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import ScorecardValues from "./ScorecardValues";
import ScorecardButtons from "./ScorecardButtons";
import PageLoader from "../PageLoader";

const Scorecard = ({ scoreId, currentScore, setCurrentScore }) => {
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
    <Flex direction="column" className="ScoresContent" mb={4} height="100%" justifyItems={"center"} gap={4} >
      <ScorecardValues arrowValues={currentScore.arrowValues} currentScore={currentScore} />
      <ScorecardButtons handleButtonPress={handleButtonPress} />
    </Flex>
  );
};

export default Scorecard;
