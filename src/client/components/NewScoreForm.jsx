import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  RadioGroup,
  Radio,
  Input,
  Textarea,
  Button,
  VStack,
  Stack,
} from "@chakra-ui/react";
import PageLoader from "../components/PageLoader";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "../context/AuthContext";

const NewScoreForm = ({ setCurrentScore, setCurrentScoreId }) => {
  const user = useContext(AuthContext);
  const [roundTypes, setRoundTypes] = useState([]);
  const [bowTypes, setBowTypes] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [archerProfiles, setArcherProfiles] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      const getOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [roundTypesResponse, archerProfileResponse, equipmentNamesResponse] = await Promise.all([
        fetch("http://localhost:3000/roundtype/search", getOptions),
        fetch("http://localhost:3000/archerprofile", getOptions),
        fetch("http://localhost:3000/equipment", getOptions)
      ]);

      const roundTypesData = await roundTypesResponse.json();
      setRoundTypes(roundTypesData.data);

      const archerProfileData = await archerProfileResponse.json();
      setArcherProfiles(archerProfileData.data);
      const bowTypes = archerProfileData.data.map((profile) => profile.bowType);
      setBowTypes(bowTypes);

      const equipmentData = await equipmentNamesResponse.json();
      setEquipment(equipmentData.data);
    };

    fetchData();
  }, []);

  const createScore = async (values) => {
    try {
      const token = await getAccessTokenSilently();
      const roundTypeResponse = await fetch(`http://localhost:3000/roundtype/${values.roundType}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!roundTypeResponse.ok) {
        throw new Error("Failed to fetch round type");
      }

      const roundTypeData = await roundTypeResponse.json();

      const totalArrows = roundTypeData.data.totalDozens * 12;

      const arrowValues = Array.from({ length: totalArrows }).map((_, index) => ({
        arrowNumber: index + 1,
        arrowScore: null,
        isX: false,
      }));

      const scoreResponse = await fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          arrowValues
        })
      });

      if (!scoreResponse.ok) {
        throw new Error("Failed to create score");
      }

      const scoreData = await scoreResponse.json();

      setCurrentScore(scoreData.data);
      setCurrentScoreId(scoreData.data._id);

    } catch (error) {
      console.error("There was a problem with the createScore function:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      roundType: "",
      bowType: "",
      equipment: "",
      scoreType: "",
      location: "",
      weather: "",
      notes: "",
      archerProfile: "",
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true);

      try {
        await createScore(values);
      } catch (error) {
        throw new Error(error.message);
      }
      formik.setSubmitting(false);
    },
  });

  return (
    <Box border={"1px"} borderColor={"gray.200"} mb={4} p={4} boxShadow="lg" minW={"400px"} maxW={"600px"}>
      <Heading size={"lg"} mb={4} textAlign="center">
        Start a New Score
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} alignItems="center">
          {/* Round - Select - Required */}
          <FormControl isRequired>
            <FormLabel>Round</FormLabel>
            <Select
              name="roundType"
              onChange={formik.handleChange}
              value={formik.values.roundType}
            >
              <option value="" label="Select option" />
              {roundTypes.map((roundType, index) => (
                <option key={roundType._id} value={roundType._id}>
                  {roundType.name}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Bow Type - Radio - Required */}
          <FormControl isRequired>
            <FormLabel>Bow Type</FormLabel>
            <Select
              name="bowType"
              onChange={(event) => {
                const val = event.target.value;
                formik.setFieldValue("archerProfile", val);
                const selectedBowType = archerProfiles.find(
                  (profile) => profile._id === val
                )?.bowType;
                formik.setFieldValue("bowType", selectedBowType || "");
                formik.setFieldValue("equipment", "");
              }}
              value={formik.values.archerProfile}
            >
              <option value="" label="Select option" />
              {archerProfiles.map((profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.bowType}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Equipment - Select - Required */}
          <FormControl isRequired>
            <FormLabel>Equipment</FormLabel>
            <Select
              name="equipment"
              onChange={formik.handleChange}
              value={formik.values.equipment}
            >
              <option value="" label="Select equipment" />
              {equipment
                .filter(
                  (equip) =>
                    equip.bowType.toLowerCase() ===
                    formik.values.bowType.toLowerCase()
                )
                .map((equip) => (
                  <option key={equip._id} value={equip._id}>
                    {equip.equipmentName}
                  </option>
                ))}
            </Select>
          </FormControl>

          {/* Round Type - Radio - Required */}
          <FormControl isRequired>
            <FormLabel>Round Type</FormLabel>
            <Select
              name="scoreType"
              onChange={(event) =>
                formik.setFieldValue("scoreType", event.target.value)
              }
              value={formik.values.scoreType}
            >
              <option value="" label="Select option" />
              <option value="Practice">Practice</option>
              <option value="Competition">Competition</option>
              <option value="Head to Head">Head to Head</option>
              <option value="League">League</option>
            </Select>
          </FormControl>

          {/* Location - Input - Optional */}
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
          </FormControl>

          {/* Weather - Input - Optional */}
          <FormControl>
            <FormLabel>Weather</FormLabel>
            <Input
              name="weather"
              onChange={formik.handleChange}
              value={formik.values.weather}
            />
          </FormControl>

          {/* Notes - Textarea - Optional */}
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea
              name="notes"
              onChange={formik.handleChange}
              value={formik.values.notes}
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            colorScheme="teal"
            size="lg"
            width="100%"
          >
            Start Score
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default NewScoreForm;
