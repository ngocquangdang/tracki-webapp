import React from 'react';
import { MdSettings } from 'react-icons/md';
import Link from 'next/link';

import {
  BreadCrumbContainer,
  GroupTitle,
  Title,
  LinkItem,
  NavLink,
  useStyles,
} from './styles';

interface Props {
  title: string;
  url: {
    pathname: string;
    name: string;
  }[];
}

export default function BreadCrumb(props: Props) {
  const classes = useStyles();
  const { title, url } = props;
  return (
    <BreadCrumbContainer>
      <GroupTitle>
        <MdSettings className={classes.icon} />
        <Title>{title}</Title>
      </GroupTitle>
      <NavLink>
        <LinkItem>
          <Link href="/trackers">
            <span>Home</span>
          </Link>
        </LinkItem>
        {url.map((url, index: number) => (
          <LinkItem key={index}>
            <Link href={url.pathname} key={index}>
              <span>{url.name}</span>
            </Link>
          </LinkItem>
        ))}
      </NavLink>
    </BreadCrumbContainer>
  );
}
