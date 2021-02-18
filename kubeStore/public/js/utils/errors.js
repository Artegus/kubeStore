function showMessage(type, message, errors) {

    if (type == 'ok' || type == 'error-email') {
        $(`
            <div id='messageStatus'>
                <h4>${message}.</h4>
                <div>
                    <button id='messageStatus-close' class="btn btn-primary">Ok</button>
                </div>
            </div>
        `).appendTo('#main')
    } else if (type == 'error') {
        $(`
            <div id='messageStatus'>
                <h4>${message}.</h4>
                <div>
                    <button id='messageStatus-close' class="btn btn-primary error-credentials">Ok</button>
                </div>
            </div>
        `).appendTo('#main')
    } else if (type == 'error-form') {
        var errorsArray = Object.values(errors)

        $(`<div id="messageStatus">
            <h4>${message}</h4>
            <ul></ul>
            <div>
                <button id='messageStatus-close' class="btn btn-primary error-credentials">Ok</button>
            </div>
        </div>`).appendTo('#main')

        errorsArray.forEach(error => $(`<li>${error}</li>`).appendTo('#messageStatus ul'))
    }
}

export { showMessage }