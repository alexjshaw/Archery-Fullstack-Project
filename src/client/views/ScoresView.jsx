import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  Stack,
  StackDivider,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Alert,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import Scorecard from "../components/scorecard/Scorecard";
import ScorecardNav from "../components/scorecard/ScorecardNav";
import NewScoreForm from "../components/scorecard/NewScoreForm";
import PageLoader from "../components/PageLoader";

const ScoresView = () => {
  console.log('ScoresView')
  const [currentScore, setCurrentScore] = useState(null);
  const [currentScoreId, setCurrentScoreId] = useState(null);
  const [userScores, setUserScores] = useState([]);
  const [roundTypeNames, setRoundTypeNames] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [deletionId, setDeletionId] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    fetchData();
  }, [getAccessTokenSilently, currentScoreId]);

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const getOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [scoresResponse, roundTypeResponse] = await Promise.all([
        fetch("http://localhost:3000/score/currentuser", getOptions),
        fetch("http://localhost:3000/roundtype/search", getOptions),
      ]);

      const scoresData = await scoresResponse.json();
      setUserScores(scoresData.data);

      const roundTypeData = await roundTypeResponse.json();
      setRoundTypeNames(roundTypeData.data);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
    setFetchComplete(true);
  };

  const handleScoreSelection = (id) => {
    setCurrentScoreId(id);
  };

  const handleDeleteScore = (id) => {
    const deleteScore = async (id) => {
      try {
        const token = await getAccessTokenSilently();
        const options = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(
          `http://localhost:3000/score/${id}`,
          options
        );

        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        const result = await response.json();

        if (result.status !== "success") {
          console.error("Failed to delete score:", result);
        } else {
          fetchData();
        }
      } catch (error) {
        console.error(
          "There was a problem with deleting the score:",
          error.message
        );
      }
      setDeletionId(null);
    };
    deleteScore(id);
  };

  let inProgressScores = [];
  let completedScores = [];

  userScores
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .forEach((score) => {
      if (!score.completed && score.visible && inProgressScores.length < 6) {
        inProgressScores.push(score);
      } else if (
        score.completed &&
        score.visible &&
        completedScores.length < 6
      ) {
        completedScores.push(score);
      }
    });

  if (!fetchComplete) {
    return <PageLoader />;
  }

  return (
    <Flex
      maxW="90%"
      mx="auto"
      p={4}
      height="100%"
      flex="1"
      direction={"column"}
      className="Flex 1"
    >
      {currentScoreId ? (
        <Scorecard
          scoreId={currentScoreId}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        />
      ) : (
        <Tabs isFitted variant="line">
          <TabList>
            <Tab>New Score</Tab>
            <Tab>In Progress Scores</Tab>
            <Tab>Completed Scores</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Flex flex="1" mx="auto" justify={"center"}>
                <NewScoreForm />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                flex="1"
                mx="auto"
                wrap={"wrap"}
                gap={4}
                justify={"center"}
                p={4}
              >
                {inProgressScores.map((score) => (
                  <InProgressCard
                    key={score._id}
                    inProgressScore={score}
                    roundTypeNames={roundTypeNames}
                    handleScoreSelection={handleScoreSelection}
                    onOpen={onOpen}
                    setDeletionId={setDeletionId}
                  />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                flex="1"
                mx="auto"
                wrap={"wrap"}
                gap={4}
                justify={"center"}
                p={4}
              >
                {completedScores.map((score) => (
                  <CompletedCard
                    key={score._id}
                    completedScore={score}
                    roundTypeNames={roundTypeNames}
                  />
                ))}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize={"lg"} fontWeight={"bold"}>
              Delete Score
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  setDeletionId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  handleDeleteScore(deletionId);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* <Box flex="1" maxW={"600px"} mx="auto" p={4}>
        {currentScoreId ? (
        <Scorecard scoreId={currentScoreId} currentScore={currentScore} setCurrentScore={setCurrentScore} />
        ) : (
          <NewScoreForm setCurrentScore={setCurrentScore} setCurrentScoreId={setCurrentScoreId} />
        )}
      </Box> */}
    </Flex>
  );
};

const InProgressCard = ({
  inProgressScore,
  roundTypeNames,
  handleScoreSelection,
  onOpen,
  setDeletionId,
}) => {
  const roundTypeName =
    roundTypeNames.find((rt) => rt._id === inProgressScore.roundType)?.name ||
    "";
  const progressPercentage = Math.round(
    (inProgressScore.arrowValues.filter((val) => val.arrowScore !== null)
      .length /
      inProgressScore.arrowValues.length) *
      100
  );
  const lastUpdateDate = new Date(
    inProgressScore.updatedAt
  ).toLocaleDateString();

  return (
    <Card w={"fit-content"} size="lg" variant={"outline"} minW={"180px"}>
      <CardHeader pb={2}>
        <Heading size="md">{roundTypeName}</Heading>
        <Heading size="md">{inProgressScore.bowType}</Heading>
        <Heading size="md">{inProgressScore.scoreType}</Heading>
      </CardHeader>
      <CardBody pt={2}>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size={"sm"} pb={2}>
              Progress
            </Heading>
            <CircularProgress value={progressPercentage} size={"100px"}>
              <CircularProgressLabel>
                {progressPercentage}%
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box>
            <Heading size={"sm"} pb={2}>
              Last Updated
            </Heading>
            <Text>{lastUpdateDate}</Text>
          </Box>
          <Box>
            <Stack>
              <Button onClick={() => handleScoreSelection(inProgressScore._id)}>
                Continue
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onOpen();
                  setDeletionId(inProgressScore._id);
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

const CompletedCard = ({ completedScore, roundTypeNames }) => {
  const roundTypeName =
    roundTypeNames.find((rt) => rt._id === completedScore.roundType)?.name ||
    "";
  const totalScore = completedScore.arrowValues.reduce(
    (sum, val) => sum + (val.arrowScore || 0),
    0
  );
  const arrowAverage = (totalScore / completedScore.arrowValues.length).toFixed(
    1
  );
  const lastUpdateDate = new Date(
    completedScore.updatedAt
  ).toLocaleDateString();

  return (
    <Card w={"fit-content"} size="lg" variant={"outline"} minW={"180px"}>
      <CardHeader pb={2}>
        <Heading size="md">{roundTypeName}</Heading>
        <Heading size="md">{completedScore.bowType}</Heading>
        <Heading size="md">{completedScore.scoreType}</Heading>
      </CardHeader>
      <CardBody pt={2}>
        <Stack divider={<StackDivider />} spacing={4}>
          <Box>
            <Heading size={"sm"} pb={2}>
              Final Score
            </Heading>
            {completedScore.totalScore}
          </Box>
          <Flex justify="center">
            <HStack divider={<StackDivider />} spacing={2}>
              <Box>
                <Heading size="xs">10s</Heading>
                {completedScore.scored10s}
              </Box>
              <Box>
                <Heading size="xs">Xs</Heading>
                {completedScore.scoredXs}
              </Box>
              <Box>
                <Heading size="xs">Avg</Heading>
                {arrowAverage}
              </Box>
            </HStack>
          </Flex>
          <Box>
            <Stack>
              <Button>View</Button>
              <Button>Delete</Button>
            </Stack>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ScoresView;
