import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function SwichIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  });
  return <></>;
}
