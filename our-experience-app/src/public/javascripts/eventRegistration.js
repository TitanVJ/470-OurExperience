const registerForEvent = (eventId) => {
  $.ajax({
    type: 'POST',
    url: `/events/${eventId}`,
    success: () => { location.reload() }
  });
}

const unregisterForEvent = (eventId) => {
  $.ajax({
    type: 'DELETE',
    url: `/events/${eventId}`,
    success: () => { location.reload() }
  });
}

$(document).ready(() => {
  $('.registration-button').on('click', (event) => {
    const eventId = event.target.attributes['data-event-id'].value;
    const isRegistered = +event.target.attributes['data-is-registered'].value;
    console.log('isRegistered', isRegistered, typeof isRegistered)
    if (isRegistered) unregisterForEvent(eventId);
    else registerForEvent(eventId);
  })
});