export function validateEmail(value: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

export function validateText(value: string) {
  const re = /(^[a-z ]+$)/i;
  return re.test(value);
}

export function validateNumber(value: string) {
  return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
    value,
  );
}

export function validateAddress(value: string) {
  const re = /^[a-zA-Z0-9\s,'-]*$/;
  return re.test(value);
}

export function validateZipCode(value: string) {
  const re = /^\d{5}(?:[-\s]\d{4})?$/;
  return re.test(value);
}

export const clearErrorIfHasValue = (
  value: string,
  hasError: boolean,
  setError: any,
) => {
  if (value && hasError) {
    setError(false);
  }
};
