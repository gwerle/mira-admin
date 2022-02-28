import { GetServerSideProps } from 'next';
import { Flex, Stack, Button } from '@chakra-ui/react';
import { Secret, sign, verify } from 'jsonwebtoken';
import Cookies from 'cookies';

import { Input } from '../components/Input';

export default function SignIn(): JSX.Element {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        p="8"
        borderRadius={8}
        flexDir="column"
        border="1px solid green"
      >
        <Stack spacing={5}>
          <img
            src="https://mira.org.br/wp-content/uploads/2021/05/logotipo-mira-horizontal-01.png"
            alt="Mira Admin"
            width="200px"
            style={{ margin: 'auto' }}
          />
          <Input name="user" type="text" label="Usuário" />

          <Input name="password" type="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="green" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { user, password, logout } = query;
  const { USER_ADMIN, PASSWORD_ADMIN, AUTH_SECRET } = process.env;

  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  if (logout) {
    cookies.set('token', null);
  }

  try {
    verify(token as string, AUTH_SECRET as Secret);

    return {
      redirect: {
        permanent: false,
        destination: 'producers',
      },
    };
  } catch {
    if (user === USER_ADMIN && password === PASSWORD_ADMIN) {
      const generatedToken = sign({}, AUTH_SECRET as string, {
        subject: 'admin',
        expiresIn: '7d',
      });

      const inSevenDays = new Date();
      inSevenDays.setDate(inSevenDays.getDate() + 7);

      cookies.set('token', generatedToken, {
        httpOnly: true,
        expires: inSevenDays,
      });

      return {
        redirect: {
          permanent: false,
          destination: 'producers',
        },
      };
    }
  }

  return {
    props: {},
  };
};
