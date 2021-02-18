function logOut(event) {

    $.post('php/database/utils/logOut.php', {}, reloadPage, 'json')

    function reloadPage(data) {
        data.status == 'ok' ?
            location.reload() :
            alert('An error occurred while trying to log out.')
    }

}

export { logOut }