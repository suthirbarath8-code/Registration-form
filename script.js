const rules = {
  name:     v => v.trim() ? '' : 'Enter your name.',
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email, like you@example.com.',
  password: v => v.length >= 6 ? '' : 'Password needs at least 6 characters (' + v.length + ' so far).'
};

function setupForm(form, onSuccess) {
  const inputs = [...form.querySelectorAll('input[name]')];
  const btn = form.querySelector('button[type="submit"]');
  const touched = new Set();

  const check = (input, show) => {
    const msg = rules[input.name](input.value);
    const p = input.closest('div[class=""], div:not(.relative)').querySelector('.err');
    if (show) {
      p.textContent = msg;
      input.classList.toggle('is-bad', !!msg);
      input.classList.toggle('is-ok', !msg);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }
    return !msg;
  };
  const refresh = () => { btn.disabled = !inputs.every(i => !rules[i.name](i.value)); };

  inputs.forEach(i => {
    i.addEventListener('input', () => { touched.add(i); check(i, true); refresh(); });
    i.addEventListener('blur', () => { touched.add(i); check(i, true); });
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    inputs.forEach(i => check(i, true));
    if (inputs.every(i => !rules[i.name](i.value))) onSuccess(Object.fromEntries(inputs.map(i => [i.name, i.value.trim()])));
  });
  form._reset = () => { form.reset(); inputs.forEach(i => { i.classList.remove('is-bad','is-ok'); i.removeAttribute('aria-invalid'); });
    form.querySelectorAll('.err').forEach(p => p.textContent = ''); refresh(); };
}

const signup = document.getElementById('signup'), login = document.getElementById('login');
const done = document.getElementById('done');
const tabs = { signup: document.getElementById('tab-signup'), login: document.getElementById('tab-login') };

function show(which) {
  done.classList.add('hidden');
  signup.classList.toggle('hidden', which !== 'signup');
  login.classList.toggle('hidden', which !== 'login');
  for (const k in tabs) {
    const on = k === which;
    tabs[k].setAttribute('aria-selected', on);
    tabs[k].style.background = on ? 'var(--card)' : 'transparent';
    tabs[k].style.boxShadow = on ? '0 1px 3px rgba(0,0,0,.15)' : 'none';
  }
  document.getElementById('card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
document.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => show(b.dataset.switch)));

function finish(title, text) {
  signup.classList.add('hidden'); login.classList.add('hidden'); done.classList.remove('hidden');
  document.getElementById('done-title').textContent = title;
  document.getElementById('done-text').textContent = text;
}
setupForm(signup, d => finish('Welcome, ' + d.name.split(' ')[0] + '!', 'Your Furaveri account for ' + d.email + ' is ready.'));
setupForm(login, d => finish('You\u2019re logged in', 'Signed in as ' + d.email + '.'));
document.getElementById('reset').addEventListener('click', () => { signup._reset(); login._reset(); show('signup'); });

document.querySelectorAll('[data-toggle]').forEach(t => t.addEventListener('click', () => {
  const inp = t.previousElementSibling, hidden = inp.type === 'password';
  inp.type = hidden ? 'text' : 'password'; t.textContent = hidden ? 'Hide' : 'Show';
}));
show('signup');