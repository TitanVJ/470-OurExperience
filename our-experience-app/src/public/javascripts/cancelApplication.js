const cancelApplication = (applicationId) => {
  $.ajax({
    type: 'DELETE',
    url: `applications/${applicationId}`
  });
}

$(document).ready(() => {
  $('.cancel-application-button').on('click', (event) => {
    const applicationId = event.target.attributes['data-application-id'].value
    cancelApplication(applicationId);
  })
})