let data;
window.addEventListener('DOMContentLoaded', () => {
    let request = new XMLHttpRequest();
    
    request.open('GET', 'js/getClass.json');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();

    request.addEventListener('readystatechange', function() {
        
        if(request.readyState == 4 && request.status == 200) {
            data = JSON.parse(request.response);
            document.body.innerHTML = data;
            console.log("Все класс");
        }
    });

    // class GPS {
    //     constructor(props) {
    //         this.name = name;
    //         this.gps = gps;
    //         this.url = url;
    //     }
    // }
});