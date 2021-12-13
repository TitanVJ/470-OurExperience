// delete modal handler

var del_modal = $('#delete_modal')[0];

del_modal.addEventListener('show.bs.modal', (event) => {
    var btn = event.relatedTarget;

    var title = btn.getAttribute('job_title');
    var job_id = btn.getAttribute('job_id');

    var modalLabel = del_modal.querySelector('.modal-body #title');
    var modalInput = del_modal.querySelector('.modal-body #id');

    modalLabel.value = title;
    modalInput.value = job_id;
});

