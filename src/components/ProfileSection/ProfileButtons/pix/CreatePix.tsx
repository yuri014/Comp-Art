import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ModalProvider } from '@context/modal';
import Input from '@components/Input';
import { IPixInput } from '@interfaces/Profile';
import CAButton from '@styles/components/button';
import pixSchema from '@validations/pix';
import { CreatePixContainer } from './styles';

const CREATE_PIX = gql`
  mutation CreatePix($pix: InputPix!) {
    createPix(pix: $pix)
  }
`;

interface CreatePixProps {
  pix: IPixInput;
}

const CreatePix: React.FC<CreatePixProps> = ({ pix }) => {
  const [pixData, setPixData] = useState({ key: '', message: '', city: '' });
  const [openModal, setOpenModal] = useState(false);
  const [createPix, { loading }] = useMutation(CREATE_PIX);

  const { register, handleSubmit, errors } = useForm<IPixInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(pixSchema),
  });

  const onSubmit = (data: IPixInput) => {
    createPix({ variables: { pix: data } }).then(() => {
      setOpenModal(false);
      setPixData(data);
    });
  };

  useEffect(() => {
    if (pix.key) {
      setPixData(pix);
    }
  }, [pix]);

  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)}>
        VINCULAR PIX
      </button>
      {openModal && (
        <ModalProvider
          onHide={() => setOpenModal(false)}
          title="Vincule seu pix para receber doações!"
          text={<p>Insira sua chave para facilitar doações com um QR Code.</p>}
        >
          <CreatePixContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
              defaultValue={pixData.key}
              name="key"
              placeholder="Insira sua chave pix"
              refInput={register}
              error={!!errors.key && errors.key.message}
              helperText="Recomendamos o uso de chaves aleatórias para sua própria segurança."
            >
              Chave
            </Input>
            <Input
              defaultValue={pixData.city}
              name="city"
              placeholder="Insira sua cidade"
              refInput={register}
              error={!!errors.city && errors.city.message}
            >
              Cidade
            </Input>
            <Input
              defaultValue={pixData.message}
              name="message"
              placeholder="Insira sua mensagem"
              refInput={register}
              error={!!errors.message && errors.message.message}
            >
              Mensagem
            </Input>
            <CAButton type="submit">
              {loading ? 'Enviando...' : 'CADASTRAR'}
            </CAButton>
          </CreatePixContainer>
        </ModalProvider>
      )}
    </>
  );
};

export default React.memo(CreatePix);
