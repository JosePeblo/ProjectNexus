(()=>{
    const dialogBody = document.querySelector('#verify-body');
    const dialogForm = document.querySelector('#verify-dialog');
    const form = document.querySelector('form');

    /**
     * @param {KeyboardEvent} ev 
     */
    const goToNextInput = (ev) => {
        const t = ev.target;
        let sib = t.nextElementSibling;
        if(!sib) {
            sib = dialogBody.firstElementChild;
        }
        sib.select();
        sib.focus();
    }

    /**
     * @param {KeyboardEvent} ev 
     */
    const onFocus = (ev) => {
        ev.target.select();
    }

    dialogBody.addEventListener('keyup', goToNextInput);
    dialogBody.addEventListener('click', onFocus);
    dialogForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let verCode = '';
        dialogBody.querySelectorAll('input').forEach(elem => {
            verCode += elem.value;
        });
        console.log(verCode);
        fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ vc: verCode }),
        })
        .then(res => res.json())
        .then(console.log);
    
    })
})()
