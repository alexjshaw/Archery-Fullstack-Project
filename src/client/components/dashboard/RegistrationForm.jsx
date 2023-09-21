import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  CheckboxGroup,
  Stack,
  Checkbox,
  Center,
  VStack,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";

const updateProfile = async (values, token) => {
  try {
    const response = await fetch('http://localhost:3000/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        club: values.club
      })
    });

    if (!response.ok) {
      alert(`Failed to update profile: ${response.statusText}`);
      return null;
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    alert(`Failed to update profile: ${error}`);
    return null;
  }
};

const postToArcherProfile = async (bowType, token) => {
  try {
    await fetch('http://localhost:3000/archerprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bowType })
    });
  } catch (error) {
    console.error(`Failed to post to archerprofile: ${error}`);
  }
};

const postToEquipment = async (bowType, token) => {
  try {
    await fetch('http://localhost:3000/equipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bowType, equipmentName: `My ${bowType}` })
    });
  } catch (error) {
    console.error(`Failed to post to equipment: ${error}`);
  }
};

const RegistrationForm = ({setIsProfileComplete, currentUser}) => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { updateProfileComplete } = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      firstName: currentUser.profile.firstName || "",
      lastName: currentUser.profile.lastName || "",
      bio: currentUser.profile.bio || "",
      club: currentUser.profile.club || "",
      Compound: false,
      Recurve: false,
      Barebow: false,
      Traditional: false
    },
    onSubmit: async (values) => {
      const anyChecked = ["Compound", "Recurve", "Barebow", "Traditional"].some(
        (name) => values[name]
      );

      if (!anyChecked) {
        alert("Please select at least one bow type.");
        return;
      }

      const token = await getAccessTokenSilently();

      const updatedProfile = await updateProfile(values, token);

      for (const bowType of ["Compound", "Recurve", "Barebow", "Traditional"]) {
        if (values[bowType]) {
          await postToArcherProfile(bowType, token);
          await postToEquipment(bowType, token);
        }
      }

      if (updatedProfile) {
        updateProfileComplete(true)
        localStorage.setItem('profileComplete', true)
      }

      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      maxWidth={"600px"}
      p={6}
      m="10px auto"
    >
      <Heading w={"100%"} size={"lg"} mb={4} textAlign="center">
        Create User Profile
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} alignItems="center">
          <FormControl isRequired>
            <FormLabel>First Name:</FormLabel>
            <Input
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last Name:</FormLabel>
            <Input
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio:</FormLabel>
            <Textarea
              name="bio"
              onChange={formik.handleChange}
              value={formik.values.bio}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Club:</FormLabel>
            <Input
              name="club"
              onChange={formik.handleChange}
              value={formik.values.club}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Which Bow Types do you shoot?</FormLabel>
              <Center w={"100%"}>
                <Stack
                  spacing={{ base: 1, md: 12 }}
                  direction={{ base: "column", md: "row" }}
                  display={"flex"}
                  justifyContent={"center"}
                >
              <Checkbox name="Compound" onChange={formik.handleChange} isChecked={formik.values.rememberMe}>Compound</Checkbox>
              <Checkbox name="Recurve" onChange={formik.handleChange} isChecked={formik.values.rememberMe}>Recurve</Checkbox>
              <Checkbox name="Barebow" onChange={formik.handleChange} isChecked={formik.values.rememberMe}>Barebow</Checkbox>
              <Checkbox name="Traditional" onChange={formik.handleChange} isChecked={formik.values.rememberMe}>Traditional</Checkbox>
                </Stack>
              </Center>
          </FormControl>
          <Button type="submit" m={4}>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
