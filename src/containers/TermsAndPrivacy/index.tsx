import React, { useState } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FiChevronLeft } from 'react-icons/fi';
import { MdLock } from 'react-icons/md';
import { GoNote } from 'react-icons/go';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';

import {
  Container,
  Logo,
  Header,
  Content,
  Wrapper,
  TopButton,
  Paragraph,
  TabStyle,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';
import TabPanel from './tabPanel';

const Policy = dynamic(() => import('./policy'));
const Term = dynamic(() => import('./term'));

function TermsAndPrivacy(props: any) {
  const { t, router } = props;
  const classes = useStyles();
  const [value, setValue] = useState(router.pathname.includes('terms') ? 1 : 0);

  const handleChange = (event, newValue: any) => {
    setValue(newValue);
    window.history.pushState({}, null, newValue ? '/terms' : '/privacy');
  };

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <Container>
      <Header>
        <Link href="/">
          <Button
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text={t('back')}
          />
        </Link>
        <Link href="/">
          <Logo src="images/logo.png" className={classes.logo} alt="" />
        </Link>
      </Header>
      <Wrapper>
        <Content>
          <Paper className={classes.border}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <TabStyle label="Privacy Policy" icon={<MdLock />} />
              <TabStyle label="Terms of Service" icon={<GoNote />} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0} title="Tracki Privacy Policy">
            <Policy />
          </TabPanel>
          <TabPanel value={value} index={1} title="Terms of Service">
            <Term />
          </TabPanel>
        </Content>
      </Wrapper>
      <TopButton onClick={scrollToTop}>
        <AiOutlineArrowUp className={classes.arrow} />
        <Paragraph>Back to Top</Paragraph>
      </TopButton>
    </Container>
  );
}

export default withRouter(TermsAndPrivacy);
