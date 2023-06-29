import { addARating } from '../js/API_request/rating-modal';
const RatingAdd = new addARating();

function modalRating() {
  const refs = {
    closeBtnModal: document.querySelector('.btn-close-rating'),
    ratingBackdrop: document.querySelector('.rating-backdrop'),
    ratingEmailBtn: document.querySelector('.rating-email-btn'),
    starInputs: document.querySelectorAll('.star-input'),
    ratingEmailInp: document.querySelector('.rating-email-inp'),
  };

  refs.closeBtnModal.addEventListener('click', () => {
    refs.ratingBackdrop.classList.add('visible');
    changeColor(0);
    enableScroll();
  });

  refs.starInputs.forEach(input => {
    input.addEventListener('click', event => {
      const star = event.target;

      const ratingValue = star.value;
      RatingAdd.setRatingValue(ratingValue);
    });
  });

  refs.ratingEmailBtn.addEventListener('click', () => {
    refs.ratingBackdrop.classList.add('visible');

    changeColor(0); // !!!!!!!!!!!!!!!!! при отправке на backend должы обновиться звезды, но и отправиться

    const inpValue = refs.ratingEmailInp.value.trim();
    if (inpValue === '') {
      window.alert('Please enter a valid query');
      return;
    }
    const id = refs.ratingEmailBtn.id;
    RatingAdd.setInpValue(inpValue);
    RatingAdd.setId(id);
    RatingAdd.addRating();
  });

  refs.ratingBackdrop.addEventListener('click', evt => {
    if (evt.target === refs.ratingBackdrop) {
      refs.ratingBackdrop.classList.add('visible');
      enableScroll();
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      changeColor(0);
      refs.ratingBackdrop.classList.add('visible');
      enableScroll();
    }
  });

  const stars = document.querySelectorAll('.rating-star input[type="radio"]');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const starCount = parseInt(star.value);
      changeColor(starCount);
    });
  });
}

function changeColor(starCount) {
  const stars = document.querySelectorAll('.rating-star input[type="radio"]');

  for (let i = 0; i < stars.length; i++) {
    const starLabel = stars[i].nextElementSibling;
    const starSVG = starLabel.querySelector('.star-rating');
    if (i < starCount) {
      starSVG.classList.add('active');
    } else {
      starSVG.classList.remove('active');
    }
  }
}
function disableScroll() {
  document.body.classList.add('scroll-lock');
}

function enableScroll() {
  document.body.classList.remove('scroll-lock');
}

modalRating();







// MODAL-VALIDATION //

const modal = document.getElementById('rating-modal-js');
const emailInput = modal.querySelector('.rating-email-inp');
const submitButton = modal.querySelector('.rating-email-btn');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email === '') {
    emailInput.classList.add('error');
    return;
  }

 
  emailInput.value = '';
});

emailInput.addEventListener('input', function() {
  emailInput.classList.remove('error');
});
