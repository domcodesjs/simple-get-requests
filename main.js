document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const form = document.querySelector('form');
  const inputValue = document.querySelector('input');

  async function getDogs(count) {
    let images = '';

    let res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    let data = await res.json();
    await data.message.forEach(
      (img) => (images += `<div><img src="${img}" alt="Dog Img"></div>`)
    );

    return images;
  }

  form.addEventListener('submit', handleFormSubmit);

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (
      inputValue.value.trim() === '' ||
      inputValue.value < 1 ||
      inputValue.value > 50
    ) {
      return;
    }
    return (main.innerHTML = await getDogs(inputValue.value));
  }
});
