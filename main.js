document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const imagesForm = document.querySelector('.dog-images-form');
  const breedForm = document.querySelector('.dog-breed-form');
  const imageInputValue = document.querySelector('.img-input');
  const breedInputValue = document.querySelector('.breed-input');

  async function getDogs(count) {
    let images = '';

    let res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    let data = await res.json();
    await data.message.forEach(
      (img) => (images += `<div><img src="${img}" alt="Dog Img"></div>`)
    );

    return images;
  }

  async function getBreedImage(breed) {
    try {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);

      const data = await res.json();

      if (data.status !== 'success') {
        return 'Breed does not exist!';
      }

      const { message } = data;

      return `<div><img src="${message[0]}" alt="Dog Img"></div>`;
    } catch (err) {
      console.log(err);
      return 'Breed does not exist!';
    }
  }

  imagesForm.addEventListener('submit', handleImagesFormSubmit);
  breedForm.addEventListener('submit', handleBreedFormSubmit);

  async function handleBreedFormSubmit(e) {
    e.preventDefault();

    if (breedInputValue.value.trim() === '') {
      return;
    }

    return (main.innerHTML = await getBreedImage(breedInputValue.value));
  }

  async function handleImagesFormSubmit(e) {
    e.preventDefault();

    if (
      imageInputValue.value.trim() === '' ||
      imageInputValue.value < 1 ||
      imageInputValue.value > 50
    ) {
      return;
    }
    return (main.innerHTML = await getDogs(imageInputValue.value));
  }
});
