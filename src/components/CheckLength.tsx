export function checkLength(value: any) {
  if (value.length < 6) {
    return false;
  } else {
    return true;
  }
}
