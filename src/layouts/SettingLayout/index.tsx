import React from 'react';
import { MdSettings } from 'react-icons/md';
import Link from 'next/link';
import Router from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

import {
  Container,
  HeaderWeb,
  HeaderMobile,
  GroupTitle,
  Title,
  Content,
  LinkItem,
  NavLink,
  Logo,
  useStyles,
} from './styles';
import { Button } from '@Components/buttons';

interface Props {
  title: string;
  url: {
    pathname: string;
    name: string;
  }[];
  children: any;
}

export default function SettingLayout(props: Props) {
  const classes = useStyles();
  const { title, url } = props;
  return (
    <Container>
      <HeaderWeb>
        <GroupTitle>
          <MdSettings className={classes.icon} />
          <Title>{title}</Title>
        </GroupTitle>
        <NavLink>
          <LinkItem>
            <Link href="/home">
              <a href>Home</a>
            </Link>
          </LinkItem>
          {url.map((url, index: number) => (
            <LinkItem>
              <Link href={url.pathname} key={index}>
                <a href>{url.name}</a>
              </Link>
            </LinkItem>
          ))}
        </NavLink>
      </HeaderWeb>
      <HeaderMobile>
        {/* <Link href="/login"> */}
        {url.slice(-1).map((url, index: number) => (
          <Button
            key={index}
            variant="text"
            classes={classes.backBtn}
            startIcon={<FiChevronLeft size={28} />}
            text={url.name}
            onClick={() => Router.back()}
          />
        ))}

        {/* </Link> */}
        <Logo src="images/logo.png" className={classes.logo} alt="" />
      </HeaderMobile>
      <Content>{props.children}</Content>
    </Container>
  );
}
