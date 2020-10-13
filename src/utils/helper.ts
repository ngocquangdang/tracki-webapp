import axios from 'axios';

import { UNWIREDLABS_API_KEY } from '@Definitions/app';

export function isMobileView(req) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const isMobile = userAgent
    ? Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
    : false;
  return isMobile;
}

export function formatNumber(num) {
  let num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num_parts.join('.');
}

export async function getAddress(location) {
  if (!location || !location.lat || !location.lng) {
    return 'Unknow location';
  }
  const { lat, lng } = location;
  const { data } = await axios.get(
    `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${lat}&lon=${lng}`
  );
  return data.status === 'ok' ? data.address.display_name : 'Unknow location';
}

export function msToTime(duration: number) {
  let parseSeconds = parseInt((duration % 60).toString(), 10);
  let parseMinutes = parseInt(((duration / 60) % 60).toString(), 10);
  let parseHours = parseInt(((duration / (60 * 60)) % 24).toString(), 10);

  let hour = parseHours < 10 ? `0${parseHours}` : parseHours;
  let minute = parseMinutes < 10 ? `0${parseMinutes}` : parseMinutes;
  let second = parseSeconds < 10 ? `0${parseSeconds}` : parseSeconds;
  return `${hour}:${minute}:${second}`;
}

export function loadScript(
  src: string,
  position: HTMLElement | null,
  id: string
) {
  if (!position) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}
