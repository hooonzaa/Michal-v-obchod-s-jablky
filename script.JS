let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
const calendarDiv = document.getElementById('calendar');
const reservationForm = document.getElementById('reservationForm');
const reservationsDiv = document.getElementById('reservations');
 
function renderCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
 
    calendarDiv.innerHTML = '';
 
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;
        day.addEventListener('click', function () {
            showReservationForm(i);
        });
        calendarDiv.appendChild(day);
    }
}
 
function showReservationForm(day) {
    reservationForm.style.display = 'block';
    const form = document.getElementById('reservation');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const time = document.getElementById('time').value;
        const numOfPeople = document.getElementById('numOfPeople').value;
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
        reservations.push({ name, date, time, numOfPeople });
        localStorage.setItem('reservations', JSON.stringify(reservations));
        renderReservations();
        reservationForm.style.display = 'none';
    });
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