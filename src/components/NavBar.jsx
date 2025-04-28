import { Box, Flex, Link, useColorModeValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const activeLinkColor = useColorModeValue("teal.500", "teal.300");

  const navLinks = [
    { name: "All", path: "/"},
    { name: "Bubble", path: "/bubble" },
    { name: "Heap", path: "/heap" },
    { name: "Insertion", path: "/insertion" },
    { name: "Intro", path: "/intro" },
    { name: "Merge", path: "/merge" },
    { name: "Pancake", path: "/pancake" },
    { name: "Quick", path: "/quick" },
    { name: "Radix", path: "/radix" },
    { name: "Selection", path: "/selection" },
    { name: "Shell", path: "/shell" },
    { name: "Tim", path: "/tim" },
  ];

  return (
    <Box bg={bgColor} px={4} py={2} top={0} width="100%" zIndex={10}>
      <Flex align="center" justify="space-between" maxW="1440px" mx="auto">
        <Flex display={{ base: "none", md: "flex" }} align="center">
          {navLinks.map((link) => (
            <Link
              as={NavLink}
              key={link.path}
              to={link.path}
              px={3}
              py={2}
              color={textColor}
              fontWeight="medium"
              _hover={{ color: activeLinkColor }}
              _activeLink={{ color: activeLinkColor, fontWeight: "bold" }}
            >
              {link.name}
            </Link>
          ))}
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Menu" />
            <MenuList bg={bgColor}>
              {navLinks.map((link) => (
                <MenuItem
                  as={NavLink}
                  key={link.path}
                  to={link.path}
                  color={textColor}
                  _hover={{ color: activeLinkColor, bg: useColorModeValue("gray.200", "gray.700") }}
                >
                  {link.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;