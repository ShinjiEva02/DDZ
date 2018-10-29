window.addEventListener('DOMContentLoaded', () => {
    let request = new XMLHttpRequest();
    
    request.open('GET', 'js/getClass.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();
});