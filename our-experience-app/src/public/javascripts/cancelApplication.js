const cancelApplication = (applicationId) => {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
  });
  $.ajax({
    type: 'DELETE',
    url: `applications/${applicationId}`,
    success: () => {
      location.reload();
    }
  });
};

$(document).ready(() => {
  $('.cancel-application-button').on('click', (event) => {
    const applicationId = event.target.attributes['data-application-id'].value;
    cancelApplication(applicationId);
  });
});
