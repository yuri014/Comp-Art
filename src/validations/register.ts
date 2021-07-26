import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';

yup.setLocale({
  mixed: {
    required: 'Preencha esse campo para continuar',
  },
  string: {
    email: 'Preencha um e-mail válido',
    min: 'Valor muito curto (mínimo ${min} caracteres)',
    max: 'Valor muito longo (máximo ${max} caracteres)',
  },
  number: {
    min: 'Valor inválido (deve ser maior ou igual a ${min})',
    max: 'Valor inválido (deve ser menor ou igual a ${max})',
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createUserSchema = (otherValidations?: {
  [key: string]: RequiredStringSchema<string, Record<string, unknown>>;
}) =>
  yup.object().shape({
    ...otherValidations,
    password: yup.string().min(8).max(64).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas não conferem')
      .required(),
  });

const registerField = {
  username: yup
    .string()
    .trim()
    .min(6)
    .max(24)
    .matches(
      /^[a-zA-Z0-9]+\s*$/,
      'Não é permitido espaços em branco no username',
    )
    .required(),
  email: yup.string().email().required(),
};

const registerUserSchema = createUserSchema(registerField);

export default registerUserSchema;
