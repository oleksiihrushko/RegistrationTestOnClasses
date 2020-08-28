import './styles.scss';

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
    this.form = document.querySelector(`${selector}`);
    this.logInInput = this.form.elements.logIn;
    this.passInput = this.form.elements.password;
    this.passwordRepeatInput = this.form.elements.passwordRepeat;
    this.okBtn = this.form.elements.okBtn;
    this.togglePassBth = document.querySelectorAll(
      `${selector}--password-control`,
    );
  }

  handleChange(e, h_selector) {
    const form = document.querySelector(`${h_selector}`);
    const passInput = form.elements.password;
    const passwordRepeatInput = form.elements.passwordRepeat;
    const okBtn = form.elements.okBtn;
    const loginDescr = document.querySelector(`${h_selector}--loginDescr`);
    const passDescr = document.querySelector(`${h_selector}--passDescr`);
    const secondPassDescr = document.querySelector(
      `${h_selector}--secondPassDescr`,
    );
    const checkLogin = value => {
      if (value.match(/^[a-zA-Z][a-zA-Z0-9\.]{4,9}$/)) {
        loginDescr.classList.remove('invalid');
        loginDescr.classList.add('valid');
      } else {
        loginDescr.classList.remove('valid');
        loginDescr.classList.add('invalid');
      }
    };

    const checkPass = value => {
      if (value.match(/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-Zа-я]).{8,}/)) {
        passDescr.classList.remove('invalid');
        passDescr.classList.add('valid');
      } else {
        passDescr.classList.remove('valid');
        passDescr.classList.add('invalid');
      }
    };

    const checkSecondPass = (firstPass, secondPass) => {
      if (firstPass === secondPass) {
        secondPassDescr.classList.remove('invalid');
        secondPassDescr.classList.add('valid');
      } else {
        secondPassDescr.classList.remove('valid');
        secondPassDescr.classList.add('invalid');
      }
    };

    const checkOkBtn = () => {
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
    this.logInInput.addEventListener('input', e =>
      this.handleChange(e, this.selector),
    );
    this.passInput.addEventListener('input', e =>
      this.handleChange(e, this.selector),
    );
    this.passwordRepeatInput.addEventListener('input', e =>
      this.handleChange(e, this.selector),
    );
    this.togglePassBth.forEach(btn =>
      btn.addEventListener('click', this.show_hide_password),
    );
    this.okBtn.addEventListener('click', this.handleOk);
  }
}

const myForm = new Form('.modal__form');
myForm.addListeners();
