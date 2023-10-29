import * as yup from 'yup';

export const phoneSchema = yup.string().matches(
    /^(?:(?:(?:\d{2})|(\d{2}))(9\d{4}[-.\s]?\d{4}))$/,
    'Insira um número válido'
  )

 export  const numberSchema = yup.string().matches(/^[0-9]+$/, 'Apenas números');