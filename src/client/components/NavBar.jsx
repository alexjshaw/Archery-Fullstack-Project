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

  return (
    <Box bg={useColorModeValue("gray.600")} px={4}>
      {isAuthenticated ? (
        <LogoutButton isLoading={isLoading}>Logout</LogoutButton>
      ) : (
        <LoginButton isLoading={isLoading}>Login</LoginButton>
      )}

      <Button
        colorScheme="teal"
        onClick={() => navigate("/scores")}
        isDisabled={location.pathname === "/scores"}
      >
        View Scores
      </Button>
      <Button
        colorScheme="teal"
        onClick={() => navigate("/dashboard")}
        isDisabled={location.pathname === "/dashboard"}
      >
        View Dashboard
      </Button>
      <Button
        colorScheme="teal"
        onClick={() => navigate("/")}
        isDisabled={location.pathname === "/"}
      >
        Home
      </Button>
    </Box>
  );
};

export default NavBar;
