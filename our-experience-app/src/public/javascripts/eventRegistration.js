const registerForEvent = (eventId) => {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
  });
  $.ajax({
    type: 'POST',
    url: `/events/${eventId}`,
    success: () => {
      location.reload();
    },
    error: () => alert('Could not register for event')
  });
};

const unregisterForEvent = (eventId) => {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
  });
  $.ajax({
    type: 'DELETE',
    url: `/events/${eventId}`,
    success: () => {
      location.reload();
    },
    error: () => alert('Could not unregister from event')
  });
};

$(document).ready(() => {
  $('.registration-button').on('click', (event) => {
    const eventId = event.target.attributes['data-event-id'].value;
    const isRegistered = +event.target.attributes['data-is-registered'].value;
    if (isRegistered) unregisterForEvent(eventId);
    else registerForEvent(eventId);
  });
});
