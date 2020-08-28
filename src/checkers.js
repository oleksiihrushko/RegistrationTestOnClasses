import { validation, unvalidation } from './validators';

const loginDescr = document.querySelector('.modal__form--loginDescr');
const passDescr = document.querySelector('.modal__form--passDescr');
const secondPassDescr = document.querySelector('.modal__form--secondPassDescr');
const okBtn = document.querySelector('.modal__form--okBtn');

export const checkLogin = value => {
  if (value.match(/^[a-zA-Z][a-zA-Z0-9\.]{4,9}$/)) {
    validation(loginDescr);
  } else {
    unvalidation(loginDescr);
  }
};

export const checkPass = value => {
  if (value.match(/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-Zа-я]).{8,}/)) {
    validation(passDescr);
  } else {
    unvalidation(passDescr);
  }
};

export const checkSecondPass = (firstPass, secondPass) => {
  if (firstPass === secondPass) {
    validation(secondPassDescr);
  } else {
    unvalidation(secondPassDescr);
  }
};

export const checkOkBtn = () => {
  if (
    loginDescr.classList.contains('valid') &&
    passDescr.classList.contains('valid') &&
    secondPassDescr.classList.contains('valid')
  ) {
    okBtn.disabled = false;
  } else {
    okBtn.disabled = true;
  }
};
