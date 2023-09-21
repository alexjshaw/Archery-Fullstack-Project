import { Box, Grid, GridItem, Heading, Text, useBreakpointValue, useColorModeValue  } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons'

const features = [
  {
    title: 'Record Your Scores',
    description: 'Our easy to use scorecard allows you to quickly and easily record every arrow you shoot, with instant feedback on group location, average shot position, and more.',
  },
  {
    title: 'Keep track of your progress',
    description: "Our system automatically tracks your handicap and score history so at the touch of a button you can get a complete picture of your progression.",
  },
  {
    title: 'Compete in Leagues',
    description: "Whether it's through your club or with archers from all around the world, you can easily set up virtual leagues to challenge yourself against others.",
  },
  {
    title: 'Shoot Against Your Friends',
    description: "Fancy some competition? We've got you covered. Share scores with your friends and when you shoot you'll see their score be revealed as you progress through your own round.",
  },
];

const HomeContent = () => {
  const gridTemplateColumns = useBreakpointValue({ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' });
  const hoverBackgroundColor = useColorModeValue('gray.100', 'gray.700'); // Adjust the color based on your color mode

  return (
    <Box p="4" >
      <Heading as="h1" size="lg" mb="4">
      Just a Few of Our Features
      </Heading>
      <Grid templateColumns={gridTemplateColumns} gap="8" maxW="56em" mx="auto">
        {features.map((feature, index) => (
          <GridItem key={index}>
            <Box
              p="4"
              mx="auto"
              borderRadius="xl"
              _hover={{ bg: hoverBackgroundColor }}
              maxW="24em"
            >
              <Text color="blue.500" as="b">
                <LinkIcon color="blue.600" /> {feature.title}
              </Text>
              <Text>{feature.description}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeContent;