import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import cookieClient from '@Utils/cookie';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    function getCookie(cName) {
      const name = cName + '=';
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split('; ');
      let res;
      cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    }

    const lang = getCookie('NEXT_LOCALE');
    if (cookieClient.checkCookie(process.env.COOKIE_NAME || 'token')) {
      router.replace('/tracker', '/tracker', { locale: lang || 'en' });
      return;
    }
    router.replace('/login', '/login', { locale: lang || 'en' });
  });
  return <></>;
}
