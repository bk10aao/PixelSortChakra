import React from "react";
import { Box, Flex, Link, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navLinks = [
    { name: "All", path: "/"},
    { name: "Bubble", path: "/bubble" },
    { name: "Bucket", path: "/bucket" },
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
    <Box
      bg="gray.700"
      px={6}
      py={3}
      top={0}
      width="100%"
      zIndex={10}
      borderBottom="2px"
      borderColor="gray.500"
      boxShadow="md"
    >
      <Flex align="center" justify="space-between" maxW="1600px" mx="auto">
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={3}>
          {navLinks.map((link) => (
            <Link
              as={NavLink}
              key={link.path}
              to={link.path}
              px={3}
              py={2}
              color="white"
              fontWeight="medium"
              rounded="md"
              _hover={{ color: "teal.400", bg: "gray.600" }}
              _activeLink={{ color: "teal.400", fontWeight: "bold", bg: "gray.600" }}
            >
              {link.name}
            </Link>
          ))}
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon boxSize={6} />}
              variant="outline"
              borderColor="gray.500"
              color="white"
              _hover={{ bg: "gray.600", borderColor: "teal.400" }}
              _active={{ bg: "gray.600" }}
              aria-label="Menu"
            />
            <MenuList bg="gray.600" borderColor="gray.500">
              {navLinks.map((link) => (
                <MenuItem
                  as={NavLink}
                  key={link.path}
                  to={link.path}
                  color="white"
                  _hover={{ color: "teal.400", bg: "teal.600" }}
                  _activeLink={{ color: "teal.400", fontWeight: "bold" }}
                  bg="gray.600"
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