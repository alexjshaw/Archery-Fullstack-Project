return (
  <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
      <Box w="180px" textAlign="left">
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Box>
      <Link as={ReactRouterLink} to="/">
        <Image src={logo} alt="Archery App Logo" maxH="40px" />
      </Link>
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
          <Link as={ReactRouterLink} to="/dashboard">Dashboard</Link>
          <Link as={ReactRouterLink} to="/scores">Scores</Link>
          <Link as={ReactRouterLink} to="/stats">Stats</Link>
          <Link as={ReactRouterLink} to="/profile">Profile</Link>
          <Link as={ReactRouterLink} to="/friends">Friends</Link>
        </Stack>
      </Box>
    )}
  </Box>
);
