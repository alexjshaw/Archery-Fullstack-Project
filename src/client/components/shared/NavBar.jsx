import {
  Box,
  Flex,
  IconButton,
  Image,
  Stack,
  HStack,
  useColorModeValue,
  useDisclosure,
  Link
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon
} from "@chakra-ui/icons";
import logo from "../../assets/logo-no-background.png";
import LoginButton from "../Login";
import LogoutButton from "../Logout";
import SignupButton from "../Signup";
import { useContext } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";



const NavBar = () => {
  console.log("NavBar Loaded");
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
      <Box w="180px" textAlign="left" display={{ md: 'none' }}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Box>
        <HStack spacing={8} alignItems={'center'}>
          <Link as={ReactRouterLink} to="/" onClick={onClose}>
            <Image src={logo} alt="Archery App Logo" maxH="40px" />
          </Link>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={ReactRouterLink} to="/dashboard">Dashboard</Link>
            <Link as={ReactRouterLink} to="/scorecard">Scores</Link>
            <Link as={ReactRouterLink} to="/stats">Stats</Link>
            <Link as={ReactRouterLink} to="/profile">Profile</Link>
            <Link as={ReactRouterLink} to="/friends">Friends</Link>
          </HStack>
        </HStack>
        <Box w="180px" textAlign="right">
          {!isAuthenticated ? (
            <>
              <LoginButton />
              <SignupButton />
            </>
          ) : (
            <LogoutButton />
          )}
        </Box>
      </Flex>
  
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <Link as={ReactRouterLink} to="/dashboard" onClick={onClose}>Dashboard</Link>
            <Link as={ReactRouterLink} to="/scores" onClick={onClose}>Scores</Link>
            <Link as={ReactRouterLink} to="/stats" onClick={onClose}>Stats</Link>
            <Link as={ReactRouterLink} to="/profile" onClick={onClose}>Profile</Link>
            <Link as={ReactRouterLink} to="/friends" onClick={onClose}>Friends</Link>
          </Stack>
        </Box>
      )}
    </Box>
  );
  
};

export default NavBar;