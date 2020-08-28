import './styles.scss';
import { validation, unvalidation } from './validators';

const regBtn = document.querySelector('.regBtn');
const modal = document.querySelector('.modal');

const openModal = e => {
  e.preventDefault();
  modal.classList.add('is-open');
};

regBtn.addEventListener('click', openModal);

class Form {
  constructor(selector) {
    this.selector = selector;
    this.logIn = '';
    this.pass = '';
    this.pass2 = '';
    this.form = document.querySelector(`${selector}`);
    this.logInInput = form.elements.logIn;
    this.passInput = form.elements.password;
    this.passwordRepeatInput = form.elements.passwordRepeat;
    this.okBtn = form.elements.okBtn;
    this.togglePassBth = document.querySelectorAll(
      `${selector}--password-control`,
    );

    this.loginDescr = document.querySelector(`${selector}--loginDescr`);
    this.passDescr = document.querySelector(`${selector}--passDescr`);
    this.secondPassDescr = document.querySelector(
      `${selector}--secondPassDescr`,
    );
  }

  checkLogin(value) {
    if (value.match(/^[a-zA-Z][a-zA-Z0-9\.]{4,9}$/)) {
      validation(loginDescr);
    } else {
      unvalidation(loginDescr);
    }
  }

  checkPass(value) {
    if (value.match(/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-Zа-я]).{8,}/)) {
      validation(passDescr);
    } else {
      unvalidation(passDescr);
    }
  }

  checkSecondPass(firstPass, secondPass) {
    if (firstPass === secondPass) {
      validation(secondPassDescr);
    } else {
      unvalidation(secondPassDescr);
    }
  }

  checkOkBtn() {
    if (
      this.loginDescr.classList.contains('valid') &&
      this.passDescr.classList.contains('valid') &&
      this.secondPassDescr.classList.contains('valid')
    ) {
      this.okBtn.disabled = false;
    } else {
      this.okBtn.disabled = true;
    }
  }

  handleChange(e) {
    switch (e.target.name) {
      case 'logIn':
        this.checkLogin(e.target.value);
        break;
      case 'password':
        this.checkPass(e.target.value);
        this.checkSecondPass(passwordRepeatInput.value, passInput.value);
        break;
      case 'passwordRepeat':
        this.checkSecondPass(e.target.value, passInput.value);
        break;
      default:
        break;
    }
    checkOkBtn();
  }

  handleOk(e) {
    e.preventDefault();
    alert('ТАДААААМ!');
  }

  show_hide_password({ target }) {
    let input = document.querySelector(`.${target.name}`);

    if (input.getAttribute('type') === 'password') {
      target.classList.add('view');
      input.setAttribute('type', 'text');
    } else {
      target.classList.remove('view');
      input.setAttribute('type', 'password');
    }
  }
  addListeners() {
    this.okBtn.disabled = true;
    this.logInInput.addEventListener('input', this.handleChange);
    this.passInput.addEventListener('input', this.handleChange);
    this.passwordRepeatInput.addEventListener('input', this.handleChange);
    this.togglePassBth.forEach(btn =>
      btn.addEventListener('click', this.show_hide_password),
    );
    this.okBtn.addEventListener('click', this.handleOk);
  }
}

const myForm = new Form('.modal__form');
