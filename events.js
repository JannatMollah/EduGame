const buttons = document.querySelectorAll('.btn-group button');
const display = document.getElementById('set-font');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        display.innerText = button.innerText;
    });
});