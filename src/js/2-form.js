let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const populateForm = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    formData = JSON.parse(savedData);

    for (const key in formData) {
      if (form.elements[key]) {
        form.elements[key].value = formData[key];
      }
    }
  } catch (error) {
    console.log('Error reading LocalStorage:', error.message);
    localStorage.removeItem(STORAGE_KEY);
  }
};

populateForm();

form.addEventListener('input', event => {
  const { name, value } = event.target;

  formData[name] = value.trim();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error seting to LocalStorage:', error.message);
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
