var del_modal = $('#delete_modal')[0];

del_modal.addEventListener('show.bs.modal', (event) => {
    var btn = event.relatedTarget;

    var c_name = btn.getAttribute('company_name');
    var c_id = btn.getAttribute('company_id');

    var modalLabel = del_modal.querySelector('.modal-body #title');
    var modalInput = del_modal.querySelector('.modal-body #id');

    modalLabel.value = c_name;
    modalInput.value = c_id;
});