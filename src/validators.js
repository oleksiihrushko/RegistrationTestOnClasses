export const validation = element => {
  element.classList.remove('invalid');
  element.classList.add('valid');
};
export const unvalidation = element => {
  element.classList.remove('valid');
  element.classList.add('invalid');
};
