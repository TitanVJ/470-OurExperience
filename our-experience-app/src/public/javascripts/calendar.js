$(document).ready(() => {
  const calendarEl = document.querySelector('#calendar');
  const events = JSON.parse(calendarEl.attributes['data-events'].value);
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: events,
  });
  calendar.render();
});