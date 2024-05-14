
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
const calendarDiv = document.getElementById('calendar');
const reservationForm = document.getElementById('reservationForm');
const reservationsDiv = document.getElementById('reservations');

function renderCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0-based index

    calendarDiv.innerHTML = '';

    let dayCounter = 1;

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = dayCounter;
        day.addEventListener('click', function () {
            showReservationForm(dayCounter);
        });
        calendarDiv.appendChild(day);
        dayCounter++;
    }
}

function showReservationForm(day) {
    reservationForm.style.display = 'block';
    document.getElementById('date').valueAsDate = new Date(); // Set date to current date
    document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]); // Set minimum date to current date
    document.getElementById('submitDay').value = day;
}

function submitReservation() {
    const name = document.getElementById('name').value;
    const time = document.getElementById('time').value;
    const numOfPeople = document.getElementById('numOfPeople').value;
    const date = document.getElementById('date').value;
    reservations.push({ name, date, time, numOfPeople });
    localStorage.setItem('reservations', JSON.stringify(reservations));
    renderReservations();
    reservationForm.style.display = 'none';
}

function deleteReservation(index) {
    reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    renderReservations();
}

function renderReservations() {
    reservationsDiv.innerHTML = '<h2>Moje rezervace</h2>';
    reservations.forEach((reservation, index) => {
        const reservationDiv = document.createElement('div');
        reservationDiv.innerHTML = `
        <p><strong>Jméno:</strong> ${reservation.name}</p>
        <p><strong>Datum:</strong> ${reservation.date}</p>
        <p><strong>Čas:</strong> ${reservation.time}</p>
        <p><strong>Počet osob:</strong> ${reservation.numOfPeople}</p>
        <button onclick="deleteReservation(${index})">Smazat</button>
    `;
        reservationsDiv.appendChild(reservationDiv);
    });
}

renderCalendar();
renderReservations();
