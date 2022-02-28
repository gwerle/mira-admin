/* eslint-disable no-alert */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { removeProducer } from '../services/ProducerService';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  producerId: number;
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  producerId,
}: Props): JSX.Element {
  const handleDeleteButtonClick = async (): Promise<void> => {
    try {
      await removeProducer(producerId as number);
      alert('Removido com sucesso!');
      window.location.reload();
    } catch (e) {
      alert('Erro ao remover! Verifique os dados');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmação</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <Text>
              Tem certeza que deseja remover esse produtor? Essa ação será
              irreversível
            </Text>
          </div>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => handleDeleteButtonClick()}
          >
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
