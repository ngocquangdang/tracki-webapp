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

export function msToTime(duration: number, stringTime?: boolean) {
  let parseSeconds = parseInt((duration % 60).toString(), 10);
  let parseMinutes = parseInt(((duration / 60) % 60).toString(), 10);
  let parseHours = parseInt(((duration / (60 * 60)) % 24).toString(), 10);

  let hour = parseHours < 10 ? `0${parseHours}` : parseHours;
  let minute = parseMinutes < 10 ? `0${parseMinutes}` : parseMinutes;
  let second = parseSeconds < 10 ? `0${parseSeconds}` : parseSeconds;
  if (stringTime) {
    return `${hour}h, ${minute}m  and ${second}s`;
  }
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

export function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

export function sendMessageToGeobot(nameMessage) {
  let isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === 'IFRAME';
  let chatIframe = document.getElementById('chatIframe');
  if (isIFrame(chatIframe) && chatIframe.contentWindow) {
    chatIframe.contentWindow.postMessage(nameMessage, '*');
  }
}
export const distanceCal = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
};
