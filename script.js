'use strict';

const $ = element => {
  return document.querySelector(element);
};

const jugador0 = ($('#score--0').textContent = '0');
const jugador1 = ($('#score--1').textContent = '0');

const jugador0activo = $('.player--0');
const jugador1activo = $('.player--1');

const hold = $('.btn--hold');

const dado = $('.dice');
dado.classList.add('hidden');
let puntaje = 0;
let puntajesFinales = [0, 0];
let jugador = 0;
let jugando = true;

$('.btn--roll').addEventListener('click', () => {
  if (jugando) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    dado.classList.remove('hidden');
    dado.src = 'dice-' + randomNumber + '.png';

    if (randomNumber == 1) {
      puntaje = 0;
      puntajesFinales[jugador] = puntaje;
      document.getElementById(`current--${jugador}`).textContent = puntaje;
      jugador0activo.classList.toggle('player--active');
      jugador1activo.classList.toggle('player--active');
      $(`#score--${jugador}`).textContent = '0';
      if (jugador == 0) {
        jugador = 1;
      } else {
        jugador = 0;
      }
    } else {
      puntaje += randomNumber;
      document.getElementById(`current--${jugador}`).textContent = puntaje;
    }
  }
});

hold.addEventListener('click', () => {
  if (jugando) {
    jugador0activo.classList.toggle('player--active');
    jugador1activo.classList.toggle('player--active');
    puntajesFinales[jugador] += puntaje;
    if (puntajesFinales[jugador] >= 20) {
      //   alert(`jugador ${jugador+1} ha ganado`);
      document
        .querySelector(`.player--${jugador}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${jugador}`)
        .classList.remove('player--active');
      dado.classList.add('hidden');
      jugando = false;
      $(`#score--${jugador}`).textContent = puntajesFinales[jugador];
    } else {
      if (jugador == 0) {
        $('#score--0').textContent = puntajesFinales[jugador];
        jugador = 1;
        puntaje = 0;
      } else {
        $('#score--1').textContent = puntajesFinales[jugador];
        jugador = 0;
        puntaje = 0;
      }
    }
  }
});

$('.btn--new').addEventListener('click', () => {
  jugando = true;
  dado.classList.remove('hidden');
  document
    .querySelector(`.player--${jugador}`)
    .classList.remove('player--winner');
  puntaje = 0;

  $('#score--0').textContent = '0';
  $('#score--1').textContent = '0';
  jugador0activo.classList.add('player--active');
  jugador1activo.classList.remove('player--active');
  document.getElementById(`current--${jugador}`).textContent = '0';

  for (let index = 0; index < puntajesFinales.length; index++) {
    puntajesFinales[index] = 0;
  }
  jugador = 0;
});
