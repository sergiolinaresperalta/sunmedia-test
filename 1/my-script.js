document.addEventListener("DOMContentLoaded", function(event) {
    updateColorsView(rgb, wb, colors);
});

// Actualiza la vista en HTML con todos los colores en los objetos
function updateColorsView(rgb, wb, colors){
    var rgbtext = document.getElementById("rgbtext");
    var wbtext = document.getElementById("wbtext");
    var colorstext = document.getElementById("colorstext");

    updateColorView(rgbtext, rgb, "rgb");
    updateColorView(wbtext, wb, "wb");
    updateColorView(colorstext, colors, "colors");
}

// Función de actualización en vista individual
function updateColorView(text, object, objectName){
    text.innerHTML = viewColor(object, objectName);
}

// Función que recorre el objeto y devuelve un string con la información a visualizar
function viewColor(object, objectName){
    var textColors = "";
    textColors += "<strong>"+objectName+"</strong>"+": ";
    for (var color in object){
        textColors += color+" = "+object[color]+", ";
    }
    textColors = textColors.replace(/,\s*$/, "");
    return textColors;
}

// Función para evento click que actualizar el objeto RGB a los valores iniciales y mejoramos la llamada a la función .assign para mantener los valores en los objetos
function clickColorsChange(){
    var rgb = {
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF"
    };
    
    colors = Object.assign({}, rgb, wb);
    updateColorsView(rgb, wb, colors);
}