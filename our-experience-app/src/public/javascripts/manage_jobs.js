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

// update modal handler

var update_modal = $('#update-modal')[0];

update_modal.addEventListener('show.bs.modal', (event) =>{
    var btn = event.relatedTarget;
    var form = update_modal.querySelector('form');

    var job_id = btn.getAttribute('job_id');

    var id = form.querySelector('#job_id');
    var titleInput = form.querySelector('#title');
    var company = form.querySelector('#org_op');
    var deadline = form.querySelector('#deadline');
    var description = form.querySelector('#description');

    $.get('/admin/job/data/' + job_id, (job_data) => {
        id.value= job_data.id;

        titleInput.value = job_data.title;

        company.value = job_data.company.id;
        company.innerText = job_data.company.name;

        deadline.valueAsNumber = new Date( job_data.deadline ).valueOf();

        // description.innerText = job_data.description;
        tinymce.activeEditor.setContent(job_data.description);
        // tinymce.get('#update-form #description').setContent(job_data.description);
    });


});

update_modal.addEventListener('hide.bs.modal', (event) =>{
        tinymce.activeEditor.setContent('');

});