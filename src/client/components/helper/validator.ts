export function validateEmail(value: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}

export function validateText(value: string) {
  const re = /(^[a-z ]+$)/i;
  return re.test(value);
}

export function validateNumber(value: string) {
  const re =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  return re.test(value);
}

export function validateAddress(value: string) {
  const re = /^[a-zA-Z0-9\s,'-]*$/;
  return re.test(value);
}

export function validateZipCode(value: string) {
  const re = /^\d{5}(?:[-\s]\d{4})?$/;
  return re.test(value);
}
