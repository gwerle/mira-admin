import { Flex, Text, Button, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ProducerModal from './ProducerModal';

export function Header(): JSX.Element {
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleLogout = (): void => {
    router.push({ pathname: '/', query: { logout: true } });
  };

  return (
    <>
      <Flex
        w="100%"
        as="header"
        h="20"
        mx="auto"
        mt="4"
        px="6"
        align="center"
        justifyContent="space-between"
      >
        <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight">
          mira
          <Text as="span" color="green.500" ml={1}>
            .
          </Text>
        </Text>
        {/* <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.800"
        position="relative"
        bg="gray.200"
        borderRadius="full"
      >
        <Input
          variant="unstyled"
          pr="4"
          mr="4"
          placeholder="Buscar produtor"
          _placeholder={{ color: 'gray.400' }}
        />

        <Icon as={RiSearchLine} fontSize="20" />
      </Flex> */}

        <Flex>
          <Button mr="20px" colorScheme="green" onClick={onOpen}>
            Adicionar Produtor
          </Button>

          <Button onClick={() => handleLogout()}>Sair</Button>
        </Flex>
      </Flex>
      <ProducerModal isOpen={isOpen} onClose={onClose} editMode={false} />
    </>
  );
}
