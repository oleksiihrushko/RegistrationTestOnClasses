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
    this.loginDescr = document.querySelector(`${selector}--loginDescr`);
    this.passDescr = document.querySelector(`${selector}--passDescr`);
    this.secondPassDescr = document.querySelector(
      `${selector}--secondPassDescr`,
    );
  }

  checkLogin = value => {
    if (value.match(/^[a-zA-Z][a-zA-Z0-9\.]{4,9}$/)) {
      this.loginDescr.classList.remove('invalid');
      this.loginDescr.classList.add('valid');
    } else {
      this.loginDescr.classList.remove('valid');
      this.loginDescr.classList.add('invalid');
    }
  };

  checkPass = value => {
    if (value.match(/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-Zа-я]).{8,}/)) {
      this.passDescr.classList.remove('invalid');
      this.passDescr.classList.add('valid');
    } else {
      this.passDescr.classList.remove('valid');
      this.passDescr.classList.add('invalid');
    }
  };

  checkSecondPass = (firstPass, secondPass) => {
    if (firstPass === secondPass) {
      this.secondPassDescr.classList.remove('invalid');
      this.secondPassDescr.classList.add('valid');
    } else {
      this.secondPassDescr.classList.remove('valid');
      this.secondPassDescr.classList.add('invalid');
    }
  };

  checkOkBtn = () => {
    if (
      this.loginDescr.classList.contains('valid') &&
      this.passDescr.classList.contains('valid') &&
      this.secondPassDescr.classList.contains('valid')
    ) {
      this.okBtn.disabled = false;
    } else {
      this.okBtn.disabled = true;
    }
  };

  handleChange(e, h_selector) {
    switch (e.target.name) {
      case 'logIn':
        this.checkLogin(e.target.value);
        break;
      case 'password':
        this.checkPass(e.target.value);
        this.checkSecondPass(
          this.passwordRepeatInput.value,
          this.passInput.value,
        );
        break;
      case 'passwordRepeat':
        this.checkSecondPass(e.target.value, this.passInput.value);
        break;
      default:
        break;
    }
    this.checkOkBtn();
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
    this.logInInput.addEventListener('input', this.handleChange.bind(this));
    this.passInput.addEventListener('input', this.handleChange.bind(this));
    this.passwordRepeatInput.addEventListener(
      'input',
      this.handleChange.bind(this),
    );
    this.togglePassBth.forEach(btn =>
      btn.addEventListener('click', this.show_hide_password),
    );
    this.okBtn.addEventListener('click', this.handleOk);
  }
}

const myForm = new Form('.modal__form');
myForm.addListeners();
