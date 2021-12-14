const deleteDocument = (documentId) => {
  $.ajaxSetup({
    headers: { 'X-CSRF-Token': $('meta[name="_csrf"]').attr('content') }
  });
  $.ajax({
    type: 'DELETE',
    url: `documents/${documentId}`,
    success: () => {
      location.reload();
    }
  });
};

$(document).ready(() => {
  $('.delete-document-button').on('click', (event) => {
    const documentId = event.target.attributes['data-document-id'].value;
    deleteDocument(documentId);
  });
});
