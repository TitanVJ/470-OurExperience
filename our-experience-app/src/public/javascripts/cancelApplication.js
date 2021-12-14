const cancelApplication = (applicationId) => {
  $.ajax({
    type: 'DELETE',
    url: `applications/${applicationId}`,
    success: () => { location.reload() }
  });
}

$(document).ready(() => {
  $('.cancel-application-button').on('click', (event) => {
    const applicationId = event.target.attributes['data-application-id'].value;
    cancelApplication(applicationId);
  })
})