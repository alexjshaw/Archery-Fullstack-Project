import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Image,
  Stack,
  HStack,
  Collapse,
  Icon,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  LinkBox,
  LinkOverlay,
  Link
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import logo from "../assets/logo-no-background.png";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import SignupButton from "./Signup";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
// import { useAuth } from "../utils/AuthContext";
import { Link as ReactRouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

// navBar background gray.600

// const Links = ["Dashboard", "Scores", "History", "Profile"];
const Links = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Scores", route: "/scores" },
  { label: "History", route: "/history" },
  { label: "Profile", route: "/profile" },
];

const NavLink = (props) => {
  const { children, route } = props;

  return (
    <Box
      color={"gray.200"}
      as={Link}
      to={route}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200"),
      }}
    >
      {children}
    </Box>
  );
};

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
            <Link as={ReactRouterLink} to="/scores">Scores</Link>
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

/*
return (
    <Flex as="nav" align="center" justify="space-between" padding="1.5rem" bg="blue.500" color="white">
      <Link as={Link} to="/">
        <Image src={logo} alt="Archery App Logo" maxH="40px" />
      </Link>
  
      <HStack spacing={4}>
        <Link as={Link} to="/dashboard">Dashboard</Link>
        <Link as={Link} to="/scores">Scores</Link>
        <Link as={Link} to="/stats">Stats</Link>
        <Link as={Link} to="/profile">Profile</Link>
        <Link as={Link} to="/friends">Friends</Link>
      </HStack>
  
      <Box>
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
  );
*/