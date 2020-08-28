import './styles.scss';
import { checkLogin, checkPass, checkSecondPass, checkOkBtn } from './checkers';

const regBtn = document.querySelector('.regBtn');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const logInInput = form.elements.logIn;
const passInput = form.elements.password;
const passwordRepeatInput = form.elements.passwordRepeat;
const okBtn = form.elements.okBtn;
const togglePassBth = document.querySelectorAll(
  '.modal__form--password-control',
);

okBtn.disabled = true;

const openModal = e => {
  e.preventDefault();
  modal.classList.add('is-open');
};

const handleChange = e => {
  switch (e.target.name) {
    case 'logIn':
      checkLogin(e.target.value);
      break;
    case 'password':
      checkPass(e.target.value);
      checkSecondPass(passwordRepeatInput.value, passInput.value);
      break;
    case 'passwordRepeat':
      checkSecondPass(e.target.value, passInput.value);
      break;
    default:
      break;
  }
  checkOkBtn();
};

const handleOk = e => {
  e.preventDefault();
  alert('ТАДААААМ!');
};

function show_hide_password({ target }) {
  let input = document.querySelector(`.${target.name}`);

  if (input.getAttribute('type') === 'password') {
    target.classList.add('view');
    input.setAttribute('type', 'text');
  } else {
    target.classList.remove('view');
    input.setAttribute('type', 'password');
  }
}

regBtn.addEventListener('click', openModal);
logInInput.addEventListener('input', handleChange);
passInput.addEventListener('input', handleChange);
passwordRepeatInput.addEventListener('input', handleChange);
togglePassBth.forEach(btn => btn.addEventListener('click', show_hide_password));
okBtn.addEventListener('click', handleOk);
