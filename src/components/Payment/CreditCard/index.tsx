import React from 'react';
import { CreditCard as CreditCardIcon } from '@material-ui/icons';
import { Formik } from 'formik';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  Container,
  HeaderCredit,
  Text,
  LeftHeader,
  RightHeader,
  ImageCredit,
  Form,
  TextInputLineUp,
  useStyles,
} from './styles';

const initialValuesForm = {
  card_number: '',
  expiration_date: '',
  cv2: '',
  card_name: '',
};

interface Props {
  onClickCreditCard(): void;
  isMobile: boolean;
}

function CreditCard(props: Props) {
  const { onClickCreditCard, isMobile } = props;
  const classes = useStyles();
  const submitForm = () => {
    console.log('submit form');
  };
  return (
    <Container>
      <HeaderCredit>
        <LeftHeader>
          <CreditCardIcon className={classes.iconCredit} />
          <Text>Credit card</Text>
        </LeftHeader>
        <RightHeader>
          <ImageCredit src="/images/credit-card.png" />
        </RightHeader>
      </HeaderCredit>
      <Formik
        className={classes.container}
        initialValues={initialValuesForm}
        onSubmit={submitForm}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <TextInputLineUp>
              <TextInput
                label="Credit Card Number"
                name="card_number"
                value={values.card_number}
                onChange={handleChange}
                variant="outlined"
                className={classes.textInput}
              />
              <TextInput
                label="Expiration Date"
                name="expiration_date"
                value={values.expiration_date}
                onChange={handleChange}
                variant="outlined"
                className={classes.textInputDate}
              />
              <TextInput
                label="CV2"
                name="cv2"
                value={values.cv2}
                onChange={handleChange}
                variant="outlined"
                className={classes.inputCv2}
                InputProps={{
                  endAdornment: (
                    <AiOutlineQuestionCircle
                      className={`${classes.questionIcon}`}
                    />
                  ),
                }}
              />
            </TextInputLineUp>
            <TextInput
              label="Name On Card"
              name="card_name"
              value={values.card_name}
              onChange={handleChange}
              variant="outlined"
              className={classes.textInputName}
            />
            <Button
              className={`${classes.btn}`}
              color="primary"
              variant="outlined"
              text={isMobile ? 'Pay Now' : 'Proceed with Payment'}
              endIcon={isMobile ? null : <ArrowForwardIosIcon />}
              onClick={onClickCreditCard}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreditCard;
