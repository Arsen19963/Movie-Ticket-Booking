// Get values from DOM elements

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

let count = document.getElementById('count');
let total = document.getElementById('total');
let movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Initialize movie list from local storage
populateUi();

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Ticket price counter function

function PriceCounter() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  let countOfSeats = selectedSeats.length;

  let seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  count.innerHTML = countOfSeats;
  total.innerHTML = countOfSeats * ticketPrice;
}

// Get items from localStorage
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Change selected movie's ticket price

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  PriceCounter();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    PriceCounter();
  }
});

// Finally shows all list of movies
PriceCounter();
