import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@components/Input';
import { REGISTER_USER } from '@graphql/mutations/user';
import { IUser } from '@interfaces/User';
import { Snackbar, IconButton, ThemeProvider } from '@material-ui/core';
import CAButton from '@styles/components/button';
import formTheme from '@styles/themes/FormTheme';
import registerUserSchema from '@validations/register';
import { ISnackbar } from '@interfaces/Generics';

const CodeInputModal = dynamic(() => import('@components/CodeInputModal'));

interface RegisterFormProps {
  isArtist: boolean;
}

const FormHeader = React.memo(() => (
  <>
    <Link href="/login">
      <a className="go-back-login">
        <FaArrowLeft /> Voltar para login
      </a>
    </Link>
    <h2>Crie sua conta</h2>
    <p className="subtitle">
      Junte-se a milhares de artistas e fãs, venha divulgar seus trabalhos!
    </p>
  </>
));

const initialSnackbarState: ISnackbar = {
  variant: 'error',
  message: '',
};

const RegisterForm: React.FC<RegisterFormProps> = ({ isArtist }) => {
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<ISnackbar>(
    initialSnackbarState,
  );
  const inputRef = useRef(null);

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => setSuccessModalShow(true),
    onError: ({ graphQLErrors }) =>
      setShowSnackbar({ variant: 'error', message: graphQLErrors[0].message }),
  });

  const { register, handleSubmit, errors, watch } = useForm<IUser>({
    mode: 'onChange',
    resolver: yupResolver(registerUserSchema),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current);
      inputRef.current.focus();
    }
  }, [register]);

  const onSubmit = (data: IUser) => {
    registerUser({
      variables: { registerInput: { ...data, isArtist } },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormHeader />
        <div className="input-group">
          <Input
            name="username"
            placeholder="Digite seu username"
            refInput={inputRef}
            error={!!errors.username && errors.username.message}
            required
          >
            Username
          </Input>
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            refInput={register({
              pattern: /^\S+@\S+$/,
              required: true,
            })}
            error={!!errors.email && errors.email.message}
            required
          >
            E-mail
          </Input>
          <Input
            name="password"
            placeholder="Digite sua senha"
            refInput={register({
              minLength: 8,
              required: true,
            })}
            error={!!errors.password && errors.password.message}
            type="password"
            required
          >
            Senha
          </Input>
          <Input
            name="confirmPassword"
            placeholder="Digite novamente sua senha"
            refInput={register({
              validate: (value: string) => value === watch('password'),
            })}
            error={!!errors.confirmPassword && errors.confirmPassword.message}
            type="password"
            required
          >
            Confirmar Senha
          </Input>
        </div>
        <CAButton type="submit">CADASTRAR</CAButton>

        <div className="contract">
          <p>
            Ao se registrar, você aceita nossos{' '}
            <Link href="/terms">
              <a>termos de uso</a>
            </Link>{' '}
            e a nossa{' '}
            <Link href="/terms">
              <a>política de privacidade.</a>
            </Link>
          </p>
        </div>
        <ThemeProvider theme={formTheme}>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={!!showSnackbar.message}
            autoHideDuration={6000}
            onClose={() => setShowSnackbar(initialSnackbarState)}
            message={showSnackbar.message}
            className="success"
            ContentProps={{
              style: {
                background:
                  showSnackbar.variant === 'success' ? '#077E76' : '#ED4848',
              },
            }}
            action={
              <IconButton
                size="small"
                aria-label="fechar menu"
                onClick={() => setShowSnackbar(initialSnackbarState)}
              >
                <FaTimes />
              </IconButton>
            }
          />
        </ThemeProvider>
      </form>
      {successModalShow && (
        <CodeInputModal
          email={watch('email')}
          setShowModal={setSuccessModalShow}
          setMessage={setShowSnackbar}
        />
      )}
    </>
  );
};

export default RegisterForm;
