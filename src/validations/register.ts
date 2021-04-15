import * as yup from 'yup';

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

const registerUserSchema = yup.object().shape({
  username: yup.string().min(6).max(24).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Senha precisa de uma letra maiúscula e uma minúscula, um número e um caracter especial',
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas não conferem')
    .required(),
});

export default registerUserSchema;
