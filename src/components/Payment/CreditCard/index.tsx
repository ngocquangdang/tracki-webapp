import React from 'react';
import { CreditCard as CreditCardIcon } from '@material-ui/icons';
import { Formik } from 'formik';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Fade from '@material-ui/core/Fade';
import { CreditCardSchema } from './schema';
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
  cvv: '',
  card_name: '',
};

interface Props {
  onClickCreditCard(): void;
  isMobile: boolean;
  t(key: string): string;
}

function CreditCard(props: Props) {
  const { onClickCreditCard, t, isMobile } = props;
  const classes = useStyles();
  const submitForm = () => {
    console.log('submit form');
  };
  return (
    <Fade in unmountOnExit mountOnEnter>
      <Container>
        <HeaderCredit>
          <LeftHeader>
            <CreditCardIcon className={classes.iconCredit} />
            <Text>{t('subscription:credit_card')}</Text>
          </LeftHeader>
          <RightHeader>
            <ImageCredit src="/images/credit-card.png" />
          </RightHeader>
        </HeaderCredit>
        <Formik
          className={classes.container}
          initialValues={initialValuesForm}
          onSubmit={submitForm}
          validationSchema={CreditCardSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextInputLineUp>
                <TextInput
                  label={t('subscription:credit_card_number')}
                  name="card_number"
                  value={values.card_number}
                  onChange={handleChange('card_number')}
                  onBlur={handleBlur('card_number')}
                  variant="outlined"
                  className={classes.textInput}
                  errorInput={
                    errors.card_number && touched.card_number
                      ? errors.card_number
                      : undefined
                  }
                />
                <TextInput
                  label={t('subscription:credit_card_expiration_date')}
                  name="expiration_date"
                  value={values.expiration_date}
                  onChange={handleChange('expiration_date')}
                  onBlur={handleBlur('expiration_date')}
                  variant="outlined"
                  className={classes.textInputDate}
                  errorInput={
                    errors.expiration_date && touched.expiration_date
                      ? errors.expiration_date
                      : undefined
                  }
                  placeholder="MM/YY"
                />
                <TextInput
                  label={t('subscription:credit_card_cvv')}
                  name="cvv"
                  value={values.cvv}
                  onChange={handleChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  variant="outlined"
                  className={classes.inputCv2}
                  errorInput={
                    errors.cvv && touched.cvv ? errors.cvv : undefined
                  }
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
                label={t('subscription:credit_card_name')}
                name="card_name"
                value={values.card_name}
                onChange={handleChange('card_name')}
                onBlur={handleBlur('card_name')}
                variant="outlined"
                className={classes.textInputName}
              />
              <Button
                className={`${classes.btn}`}
                color="primary"
                variant="outlined"
                type="submit"
                text={
                  isMobile
                    ? t('subscription:credit_card_pay_now')
                    : t('subscription:credit_card_proceed')
                }
                endIcon={isMobile ? null : <ArrowForwardIosIcon />}
                onClick={onClickCreditCard}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </Fade>
  );
}

export default CreditCard;
