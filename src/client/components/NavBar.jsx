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
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
// import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { persistentIsAuthenticated } = useAuth()
  const { isAuthenticated } = useAuth0();

  const buttonProps = {
    as: "a",
    display: { base: "inline-flex" },
    fontSize: "sm",
    maxW: "150px",
    fontWeight: 600,
    color: "white",
    bg: "pink.400",
    href: "#",
    _hover: {
      bg: "pink.300",
    },
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.600")} px={4}>
        <LoginButton>Login</LoginButton>
        <LogoutButton>Logout</LogoutButton>
        <Button colorScheme="teal" onClick={() => navigate('/scores')}>
          View Scores
        </Button>
        <Button colorScheme="teal" onClick={() => navigate('/dashboard')}>
          View Dashboard
        </Button>
      </Box>
    </>
  );
};

export default NavBar;
