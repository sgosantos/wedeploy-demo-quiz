'use strict';

const DOMAIN = window.location.hostname.split(".").slice(-3).join(".");
const alert = document.getElementById('alert');
const auth = WeDeploy.auth(`auth.${DOMAIN}`);

function submitForm() {
  const password = signUp.password.value;
  const email = signUp.email.value;

  return auth
    .createUser({
      name: signUp.name.value,
      email,
      password,
    })
    .then((user) => {
      signInWithEmailAndPassword(email, password);
    }).catch(() => {
      showAlertEmailAlreadyInUse();
      signUp.reset();
    });
}

function showAlertEmailAlreadyInUse() {
  alert.innerHTML = `
    <p>Email already in use. Try another email.</p>
    <button>
      <span class="close icon-12-close-short" onclick="closeAlert()"></span>
    </button>`;

  alert.classList.add('visible');
}


function closeAlert() {
  alert.classList.remove('visible');
}

function signInWithEmailAndPassword(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(() => signUp.reset())
    .catch(() => {
      showAlertWrongEmailOrPassword();
      signUp.reset();
    });
}

function showAlertWrongEmailOrPassword () {
  alert.innerHTML = `
    <p>Wrong email or password.</p>
    <button>
      <span class="close icon-12-close-short" onclick="closeAlert()"></span>
    </button>`;

  alert.classList.add('visible');
}

auth.onSignIn((user) => {
  location.href = '/';
});
