import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

const ScoresContent = () => {
  const [arrowValues, setArrowValues] = useState([...Array(16)].map(() => Array(6).fill(null)));

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
    <Flex direction="column" className='ScoresContent Flex' mb={4} maxH={"100%"}>
      {/* Scrollable container for arrow values */}
      <Box flex="1" mb={4} overflowY="auto" className="Arrow Value Box" >
        {arrowValues.map((row, rowIndex) => (
          <Flex key={rowIndex} mb={2} border="1px solid black" p={2}>
            {row.map((value, valueIndex) => (
              <Text key={valueIndex} mx={1} fontSize="xl">
                {value || '-'}
              </Text>
            ))}
          </Flex>
        ))}
      </Box>

      {/* Buttons to Enter Arrow Values */}
      <Flex wrap="wrap" spacing={2} className="Arrow Entry Flex">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
          <Button key={number} onClick={() => handleButtonPress(number)}>
            {number}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default ScoresContent;