import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { Secret, verify } from 'jsonwebtoken';
import { Table, Tbody, Td, Th, Thead, Tr, Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { getProducers } from '../services/ProducerService';
import { ProducerI } from '../@types';
import TableItem from '../components/TableItem';

type Props = {
  producers: ProducerI[];
};

const usedKeys = [
  { id: 'id', label: 'Id' },
  { id: 'farm_name', label: 'Nome' },
  { id: 'district', label: 'Bairro' },
  { id: 'city', label: 'Cidade' },
  { id: 'email', label: 'Email' },
  { id: 'avg_egg_production', label: 'Prod. ovos' },
  { id: 'animals_quantity', label: 'Qt animais' },
  { id: 'social_media', label: 'Redes Sociais' },
  { id: 'production_system_enum', label: 'Camada mapa' },
  { id: 'production_system', label: 'Sist. Produção' },
  { id: 'phone_number', label: 'Telefone' },
  { id: 'egg_type', label: 'Tipo de ovo' },
  { id: 'permission_to_send_info', label: 'Permissão' },
];

export default function Producers({ producers }: Props): JSX.Element {
  return (
    <>
      <Header />
      <Flex mt="20px">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {usedKeys.map(key => {
                return <Th p="5px">{key.label}</Th>;
              })}
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {producers.map(producer => {
              return (
                <Tr key={producer.id}>
                  {usedKeys.map(key => {
                    return (
                      <Td
                        p="5px"
                        fontSize="12px"
                        maxWidth="200px"
                        key={`${producer.id}${key.id}`}
                      >
                        {key.id === 'permission_to_send_info'
                          ? String(producer[key.id])
                          : producer[key.id as keyof ProducerI]}
                      </Td>
                    );
                  })}
                  <TableItem producer={producer} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const { AUTH_SECRET } = process.env;

  if (!token) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  try {
    verify(token as string, AUTH_SECRET as Secret);
  } catch {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  const producersResponse = await getProducers();

  return {
    props: {
      producers: producersResponse.data,
    },
  };
};
