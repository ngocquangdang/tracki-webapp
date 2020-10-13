import * as Yup from 'yup';

export const CreditCardSchema = Yup.object().shape({
  card_number: Yup.string()
    .matches(/^[0-9]{16}$/, 'Card number is not invalid')
    .max(16)
    .required('Please fill out a card number.'),
  expiration_date: Yup.string()
    .typeError('This expiration date is not valid.')
    .max(5, 'This expiration date is not valid.')
    .matches(/([0-9]{2})\/([0-9]{2})/, 'This expiration date is not valid.')
    .required('Expiration date is required'),
  cvv: Yup.string()
    .min(3, 'CVV must be at least 3 characters')
    .max(4)
    .required('CVV is required'),
});
