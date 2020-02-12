var timeout;

document.addEventListener("DOMContentLoaded", function(event) {
    counter(0, 5, 1000, counterViewInConsole);
});

// Función que realiza una cuenta desde un número "num" a "finish" en el tiempo "milliseconds", a la cual se le pasa una función de vista "viewFunction" que se encargará de visualizar la cuenta
function counter(num, finish, milliseconds, viewFunction) {
    var i = num;
    timeout = setTimeout(function () {
        if (i < finish) {
            viewFunction(i);
            i++;
            counter(i, finish, milliseconds, viewFunction);
        }
    }, milliseconds);
}

// Función de vista sólo para mostrar en consola
function counterViewInConsole(num){
    console.log(num);
}

// Función en evento click de botón para empezar una cuenta
function clickViewCount(){
    clearTimeout(timeout);
    var counterHtml = document.getElementById("counter");
    counterHtml.innerHTML = "";
    counter(0, 5, 1000, counterViewInHtml);
}

// Función de vista para visualizar en un listado
function counterViewInHtml(num){
    var counterHtml = document.getElementById("counter");
    var li = document.createElement("li");

    li.innerHTML = num;
    counterHtml.appendChild(li);
}