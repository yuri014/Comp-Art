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

const pixSchema = yup.object().shape({
  key: yup.string().max(72),
  message: yup.string().max(255),
  city: yup.string().max(255),
});

export default pixSchema;
