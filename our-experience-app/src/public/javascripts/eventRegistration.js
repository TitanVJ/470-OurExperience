const registerForEvent = (eventId) => {
  $.ajax({
    type: 'POST',
    url: `/events/${eventId}`
  })
}

$(document).ready(() => {
  $('.registration-button').on('click', (event) => {
    const eventId = event.target.attributes['data-event-id'].value;
    registerForEvent(eventId);
  })
});