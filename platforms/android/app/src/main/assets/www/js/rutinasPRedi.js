$(document).ready(function() {
	setEstado();
  $.ajax({
    type: "POST",
    url: "https://vuamos.000webhostapp.com/json_ejercicios_mi_estado.php",
    cache: false,
    data: "estado="+localStorage.getItem("estado"),
    beforeSend: function() {
      $("#musculosRutinas").text("Cargando...");
    },
    success: function(response)
    {
	    $('#musculosRutinas').html(response).fadeIn();
	    $("#musculosRutinas").listview("refresh");
    }
  });
});

function setEstado(){
  var sexo = localStorage.getItem("sexo");
  var flexiones= localStorage.getItem("flexiones");
 
  if(sexo=="Hombre"){
     
      if(flexiones<1){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
      else if(flexiones < 10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones<25){
          tiempoEjercicio=25;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else{
          tiempoEjercicio=30;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
 }else{
      if(flexiones<1){
          tiempoEjercicio=10;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
      else if(flexiones < 5){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones<10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else{
          tiempoEjercicio=20;
          tiempoDescanso=10;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
 }
}
	var sexo = localStorage.getItem("sexo");
  var flexiones= localStorage.getItem("flexiones");
 
  if(sexo=="Hombre"){
     
      if(flexiones<1){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
      else if(flexiones < 10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones<25){
          tiempoEjercicio=25;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else{
          tiempoEjercicio=30;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
 }else{
      if(flexiones<1){
          tiempoEjercicio=10;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
      else if(flexiones < 5){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones<10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else{
          tiempoEjercicio=20;
          tiempoDescanso=10;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
 }

var tiempoEjercicio;
var tiempoDescanso;
var circuitos;
var tiempoSerie=30;
var contadorCircuitos=0;
var tiempoEjercicio = localStorage.getItem("tiempoEjercicio");
  	var tiempoDescanso = localStorage.getItem("tiempoDescanso");
    var estado=localStorage.getItem("estado");

    if(estado==3){
      circuitos=4;
    }
    else if(estado==2){
      circuitos=3;
    }
    else{
      circuitos=2;
   }

$(document).ready(function() {
  $.ajax({
    type: "POST",
    url: "https://vuamos.000webhostapp.com/miRutina.php",
    cache: false,
    data: "estado="+estado+"&tiempo="+tiempoEjercicio+"&descanso="+tiempoDescanso+"&circuitos="+circuitos,
    beforeSend: function() {
        $("#miRutinaB").text("Cargando...");
      },
    success: function(response)
    {
        $('#miRutinaB').html(response).fadeIn();
        $("#miRutinaB").listview("refresh");
    }
});
});
function rutinaDe(musculo){
  
  	
  $.ajax({
      type: "POST",
      url: "https://vuamos.000webhostapp.com/rutinaAleatoria.php",
      cache: false,
      data: "musculo="+musculo+"&estado="+estado+"&tiempo="+tiempoEjercicio+"&descanso="+tiempoDescanso+"&circuitos="+circuitos,
      beforeSend: function() {
          $("#rutinaAleatoria").text("Cargando...");
        },
      success: function(response)
      {
          $('#rutinaAleatoria').html(response).fadeIn();
          $("#rutinaAleatoria").listview("refresh");
      }
	});

}

var arrEjerciciosCircuito;
var arrayDeCadenas=[];
function circuito(ejercicios){
  arrayDeCadenas = ejercicios.split(",");
  arrEjerciciosCircuito = ejercicios.split(",");
  var ejercicioActual=arrayDeCadenas[contadorEjercicios];
  $.ajax({
      type: "POST",
      url: "https://vuamos.000webhostapp.com/realizarEjercicio.php",
      cache: false,
      data: "ejercicio="+ejercicioActual,
      beforeSend: function() {
          $("#RealizaEjercicioCircuito").text("Cargando...");
        },
      success: function(response)
      {
          $('#RealizaEjercicioCircuito').html(response).fadeIn();
          $("#RealizaEjercicioCircuito").listview("refresh");
      }
});
 


}

function SiguienteEjercicio(ejercicio){
  $.ajax({
      type: "POST",
      url: "https://vuamos.000webhostapp.com/realizarEjercicio.php",
      cache: false,
      data: "ejercicio="+ejercicio,
      beforeSend: function() {
          $("#RealizaEjercicioCircuito").text("Cargando...");
        },
      success: function(response)
      {
          $('#RealizaEjercicioCircuito').html(response).fadeIn();
          $("#RealizaEjercicioCircuito").listview("refresh");
      }
});
}

function recarga(){
  window.location.replace("principal.html");
}

function circuitoTerminado(){
$('#RealizaEjercicioCircuito').html("Circuito Terminado <br> <a href='javascript:recarga()' style='color: white; text-decoration: none;'>Ir al inicio</a>").fadeIn();
document.getElementById('RealizaEjercicioCircuito').style.textAlign="center";
fondo.pause();
subirCircuito();
}

function subirCircuito() {
  var dataString = "usuario=" + localStorage.getItem("nombre") + "&ejercicios=" + arrEjerciciosCircuito;
  $.ajax({
    type: "POST",
    url: "https://vuamos.000webhostapp.com/subirCircuito.php",
    cache: false,
    crossDomain: true,
    data: dataString,
    beforeSend: function() {
        $("#subirCircuito").text("Cargando...");
      },
    success: function(response)
    {
        $('#subirCircuito').html(response).fadeIn();
    }
  });
}

var contadorEjercicios=0;

$("#HacerCircuito").on("pageshow", function(){
  contadorEjercicios=0;
  regresiva();
 
});


function regresiva(){
  setTimeout(function() { 
      
    var time = 5; /* how long the timer will run (seconds) */
    $('h2').text(time);
    var initialOffset = '440';
    var i = 1
    
    /* Need initial run as interval hasn't yet occured... */
   document.getElementById("relojF").style.backgroundColor="red";
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
    var audio = document.getElementById("regresiva");
    audio.play();
    var interval = setInterval(function() {
        $('h2').text(time-i);
        if (i == time) {  	
          clearInterval(interval);
           
            $('h2').text("Comienza");
           
            cronometro();
            
          return;
        }
        $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
        i++;  
    }, 1000);
    
    }, 0)
}

var fondo = document.getElementById("sonidoFondo");
          

function cronometro(){
  setTimeout(function() { 
    $('h1').text("Haz el ejercicio");
    var time = 3; /* how long the timer will run (seconds) */
    $('h2').text(time);
    var initialOffset = '440';
    var i = 1;
    
    /* Need initial run as interval hasn't yet occured... */
    document.getElementById("relojF").style.backgroundColor="green";
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
    fondo.play();
    var interval = setInterval(function() {
        $('h2').text(time-i);
        if(i==5){
          var audio = document.getElementById("regresiva");
          audio.play();
        }
        if (i == time) {  	
          clearInterval(interval);
            
            contadorEjercicios++;
            descanso();
            SiguienteEjercicio(arrayDeCadenas[contadorEjercicios]);
          return;
        }
        $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
        i++;  
    }, 1000);
    
    }, 0)
}

function descanso(){
  if(contadorCircuitos==circuitos){
     window.location.replace("principal.html");
  }
  if(contadorEjercicios==arrayDeCadenas.length-1){
   if(contadorCircuitos<circuitos){
      contadorCircuitos++;
      contadorEjercicios=0;
      descansoCircuito();
   }else{
      window.location.replace("principal.html");
   }
 }else{
  setTimeout(function() { 
      
    var time = 3; /* how long the timer will run (seconds) */
    $('h2').text(time);
    var initialOffset = '440';
    var i = 1
    $('h1').text("Recuperación");
    /* Need initial run as interval hasn't yet occured... */
   document.getElementById("relojF").style.backgroundColor="red";
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
    var audio = document.getElementById("recuperacion");
    audio.play();
    var interval = setInterval(function() {
        $('h2').text(time-i);
        if(i==5){
          var audio = document.getElementById("regresiva");
          audio.play();
        }
        if (i == time) {  	
          clearInterval(interval);
         
            if(contadorEjercicios<arrayDeCadenas.length-1){
                cronometro();
            }
            else{
              window.location.replace("principal.html");
            }
          return;
        }
        $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
        i++;  
    }, 1000);
    
    }, 0)
 }
  
}

function descansoCircuito(){
  
  setTimeout(function() { 
      
    var time = 3; /* how long the timer will run (seconds) */
    $('h2').text(time);
    var initialOffset = '440';
    var i = 1
    $('h1').text("Recuperación");
    /* Need initial run as interval hasn't yet occured... */
   document.getElementById("relojF").style.backgroundColor="red";
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
    
    var interval = setInterval(function() {
        $('h2').text(time-i);
        if(i==5){
          var audio = document.getElementById("regresiva");
          audio.play();
        }
        if (i == time) {  	
          clearInterval(interval);
          if(contadorCircuitos<circuitos){
            cronometro();
            SiguienteEjercicio(arrayDeCadenas[contadorEjercicios]);
         }else{
            circuitoTerminado();
         }
          return;
        }
        $('.circle_animation').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
        i++;  
    }, 1000);
    
    }, 0)
}


