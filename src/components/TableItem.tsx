import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ProducerI } from '../@types';
import ConfirmationModal from './ConfirmationModal';
import ProducerModal from './ProducerModal';

type Props = {
  producer: ProducerI;
};

export default function TableItem({ producer }: Props): JSX.Element {
  const [openProducer, setOpenProducer] = useState<ProducerI | null>(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleClickEditButton = (): void => {
    onOpen();
    setOpenProducer(producer);
  };

  const handleClickCloseEditModal = (): void => {
    onClose();
    setOpenProducer(null);
  };

  return (
    <>
      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiMoreVertical />}
            variant="outline"
            size="sm"
          />
          <MenuList>
            <MenuItem
              icon={<MdEdit fontSize="15" />}
              onClick={handleClickEditButton}
            >
              Editar
            </MenuItem>

            <MenuItem
              icon={<MdDelete fontSize="15" />}
              onClick={() => setDeleteConfirmationOpen(true)}
            >
              Deletar
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
      <ProducerModal
        isOpen={isOpen}
        onClose={handleClickCloseEditModal}
        editMode
        producer={openProducer as ProducerI}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        producerId={openProducer?.id as number}
      />
    </>
  );
}
