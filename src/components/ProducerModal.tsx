/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Input,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BiMap } from 'react-icons/bi';
import { ProducerFormI, ProducerI } from '../@types';
import { PRODUCTION_SYSTEMS } from '../config/constants';
import { createProducer, modifyProducer } from '../services/ProducerService';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editMode: boolean;
  producer?: ProducerI;
};

const multipleProductionSystems = [
  '2_SISTEMAS_PRODUCAO',
  '3_SISTEMAS_PRODUCAO',
];

const ProducerInput = ({ label, type, InputProps }: any): JSX.Element => {
  return (
    <FormControl m="10px" width={300}>
      <FormLabel fontSize="12px" htmlFor={InputProps?.name}>
        {label}
      </FormLabel>
      <Input mr="20px" type={type} size="sm" {...InputProps} />
    </FormControl>
  );
};

export default function ProducerModal({
  isOpen,
  onClose,
  editMode,
  producer,
}: Props): JSX.Element {
  const [markerCoordinates, setMarkerCoordinates] = useState<number[]>([]);
  const { register, handleSubmit, watch, reset, control, setValue } =
    useForm<ProducerFormI>();

  useEffect(() => {
    if (editMode && producer) {
      const {
        farm_name,
        address,
        district,
        city,
        cep,
        phone_number,
        state,
        social_media,
        supply_area,
        production_system_enum,
        production_system,
        egg_type,
        avg_egg_production,
        animals_quantity,
        permission_to_send_info,
        email,
        more_information,
        lat,
        lng,
      } = producer;

      setValue('farmName', farm_name);
      setValue('address', address);
      setValue('district', district);
      setValue('city', city);
      setValue('CEP', cep);
      setValue('phoneNumber', phone_number);
      setValue('state', state);
      setValue('socialMedia', social_media);
      setValue('supplyArea', supply_area);
      setValue('productionSystemEnum', production_system_enum);
      setValue('productionSystem', production_system);
      setValue('eggType', egg_type);
      setValue('avgEggProduction', avg_egg_production);
      setValue('animalsQuantity', animals_quantity);
      setValue(
        'permissionToSendInfo',
        permission_to_send_info ? 'true' : 'false'
      );
      setValue('email', email);
      setValue('moreInformation', more_information);
      setValue('latitude', Number(lat));
      setValue('longitude', Number(lng));
    }
  }, [producer]);

  const Map = useMemo(
    () =>
      dynamic(() => import('./Map'), {
        loading: () => (
          <Flex
            height="100vh"
            width="100vw"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={50} isIndeterminate color="green.300" />
          </Flex>
        ),
        ssr: false,
      }),
    []
  );

  const latValue: number = watch('latitude');
  const lngValue: number = watch('longitude');
  const productionSystemEnumValue = watch('productionSystemEnum');

  useEffect(() => {
    if (multipleProductionSystems.includes(productionSystemEnumValue)) {
      setValue('productionSystem', '');
    } else {
      const systemSelectedLabel = PRODUCTION_SYSTEMS.find(
        item => item.id === productionSystemEnumValue
      );
      setValue('productionSystem', systemSelectedLabel?.label as string);
    }
  }, [productionSystemEnumValue]);

  const handleClickSeeCoordinates = (): void => {
    if (latValue && lngValue) {
      setMarkerCoordinates([latValue, lngValue]);
    }
  };

  const handleClickCloseIcon = (): void => {
    onClose();
    reset();
    setMarkerCoordinates([]);
  };

  const onSubmitForm = async (data: any): Promise<void> => {
    const dataFormatted = {
      ...data,
      lat: Number(data.latitude),
      long: Number(data.longitude),
      cep: Number(data.CEP),
      permissionToSendInfo: data.permissionToSendInfo === 'true',
    };

    if (editMode) {
      try {
        await modifyProducer(producer?.id as number, dataFormatted);
        alert('Modificado com sucesso!');
        window.location.reload();
      } catch (e) {
        alert('Erro ao modificar! Verifique os dados');
      }
    } else {
      try {
        await createProducer(dataFormatted);
        alert('Criado com sucesso!');
        window.location.reload();
      } catch (e) {
        alert('Erro ao criar! Verifique os dados');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClickCloseIcon} size="full">
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <ModalContent>
          <ModalHeader>
            {editMode ? 'Editar Produtor' : 'Adicionar Produtor'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexWrap="wrap">
              <ProducerInput
                label="Nome da granja"
                type="text"
                InputProps={{ ...register('farmName') }}
              />

              <ProducerInput
                label="Endereço"
                type="text"
                InputProps={{ ...register('address') }}
              />

              <ProducerInput
                label="Bairro"
                type="text"
                InputProps={{ ...register('district') }}
              />

              <ProducerInput
                label="Cidade"
                type="text"
                InputProps={{ ...register('city') }}
              />

              <ProducerInput
                label="CEP"
                type="number"
                InputProps={{ ...register('CEP') }}
              />

              <ProducerInput
                label="Telefone"
                type="text"
                InputProps={{ ...register('phoneNumber') }}
              />

              <ProducerInput
                label="Estado"
                type="text"
                InputProps={{ ...register('state') }}
              />

              <ProducerInput
                label="Redes Sociais"
                type="text"
                InputProps={{ ...register('socialMedia') }}
              />

              <ProducerInput
                label="Área de Fornecimento"
                type="text"
                InputProps={{ ...register('supplyArea') }}
              />

              <FormControl width="fit-content" mt="10px">
                <FormLabel fontSize="12px">Sistema de Produção</FormLabel>
                <Select
                  mb="20px"
                  placeholder="Sistema de Produção"
                  size="sm"
                  width="300px"
                  background="gray.100"
                  {...register('productionSystemEnum')}
                >
                  {PRODUCTION_SYSTEMS.map(productionSystem => {
                    return (
                      <option value={productionSystem.id}>
                        {productionSystem.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              <ProducerInput
                label="Sistema de Produção"
                type="text"
                InputProps={{
                  ...register('productionSystem'),
                  disabled: !multipleProductionSystems.includes(
                    productionSystemEnumValue
                  ),
                }}
              />

              <ProducerInput
                label="Tipo de Ovo"
                type="text"
                InputProps={{ ...register('eggType') }}
              />

              <ProducerInput
                label="Média Prod. Ovos"
                type="text"
                InputProps={{ ...register('avgEggProduction') }}
              />

              <ProducerInput
                label="Qtd animais"
                type="text"
                InputProps={{ ...register('animalsQuantity') }}
              />
              <Controller
                control={control}
                name="permissionToSendInfo"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    defaultValue="true"
                    mt="10px"
                    width="300px"
                    onChange={onChange}
                    value={value}
                  >
                    <FormLabel fontSize="12px">
                      Permissão para envio de emails
                    </FormLabel>

                    <HStack spacing="24px">
                      <Radio value="true">Sim</Radio>
                      <Radio value="false">Não</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />

              <ProducerInput
                label="Email"
                type="text"
                InputProps={{ ...register('email') }}
              />

              <ProducerInput
                label="Observações"
                type="text"
                InputProps={{ ...register('moreInformation') }}
              />

              <ProducerInput
                label="Latitude"
                type="number"
                InputProps={{ ...register('latitude'), step: 'any' }}
              />

              <ProducerInput
                label="Longitude"
                type="number"
                InputProps={{ ...register('longitude'), step: 'any' }}
              />
              <div style={{ marginTop: '35px' }}>
                <Tooltip
                  label="Visualizar coordenadas no mapa"
                  aria-label="A tooltip"
                >
                  <IconButton
                    aria-label="Visualizar coordenadas no mapa"
                    size="sm"
                    icon={<BiMap fontSize={18} />}
                    onClick={handleClickSeeCoordinates}
                  />
                </Tooltip>
              </div>
            </Flex>
            <Map markerPosition={markerCoordinates || []} />
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button width="70%" colorScheme="blue" mr={3} type="submit">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
