export function getCookie(name: string) {
  const escapedName = name.replace(/([.?*|{}\(\)\[\]\\\/\+^])/g, "\$1");
  const regex = new RegExp(`(?:^|; )${escapedName}=([^;]*)`);
  const matches = document.cookie.match(regex);
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: { [key: string]: Date | string | number | boolean } = {}) {
  props = props || {};
  const { expires, ...restProps } = props;

  if (typeof expires === 'number' && expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    props.expires = date.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;
  for (const [propName, propValue] of Object.entries(restProps)) {
    if (propValue === true) {
      updatedCookie += `; ${propName}`;
    } else {
      updatedCookie += `; ${propName}=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}