$(document).ready(function () {
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser() {
    var confirmation = confirm('Are you sure?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',     // set of key, value pairs that config the AJAX  request.
            url: '/users/delete/' + $(this).data('id')  // string containing the to which the url is sent.
        }).done(function (response) {
            window.location.replace('/');
        });
        window.location.replace('/');
    } else {
        return false;
    }
};