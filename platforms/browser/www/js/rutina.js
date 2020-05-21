/* ejercicios segun mi estado fisico actual */
var ejerciciosCadena="";
setEstado();
getEjerciciosMiEstado();


var contadorDeRutinas=0;

var ejercicios_mi_estado = [];
function getEjerciciosMiEstado(){
  $.ajax({
    type: "POST",
    url: "https://vuamos.000webhostapp.com/mostrarEstadoEjercicios.php",
    cache: false,
    data: "estado="+localStorage.getItem("estado"),
    beforeSend: function() {
      $("#mis_ejercicios").text("Cargando...");
    },
    success: function(response)
    {
      ejercicios_mi_estado = separaEjerciciosMiEstado(response);
    }
  });
}
function separaEjerciciosMiEstado(response){
  var mis_ejercicios = [];
  var datos_usuario_sep = response.split('|');
  for (let j = 0; j < datos_usuario_sep.length-1; j++) {
    mis_ejercicios.push(datos_usuario_sep[j]);
  }
  return mis_ejercicios;
}
function setEstado(){
  var tiempoEjercicio;
  var tiempoDescanso;
  var sexo = localStorage.getItem("sexo");
  var flexiones= localStorage.getItem("flexiones");
 
  if(sexo=="Hombre"){
     
      if(flexiones<1){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones < 10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else if(flexiones<25){
          tiempoEjercicio=25;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
      else{
          tiempoEjercicio=30;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
 }else{
      if(flexiones<1){
          tiempoEjercicio=10;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 1);
      }
      else if(flexiones < 5){
          tiempoEjercicio=15;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 2);
      }
      else if(flexiones<10){
          tiempoEjercicio=20;
          tiempoDescanso=15;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 3);
      }
      else{
          tiempoEjercicio=20;
          tiempoDescanso=10;
          localStorage.setItem("tiempoEjercicio", tiempoEjercicio);
          localStorage.setItem("tiempoDescanso", tiempoDescanso);
          localStorage.setItem("estado", 4);
      }
 }
}

/* proceso de obtencion de recomendaciones para todos los ejercicios */
var ejercicios_recomendar = [];

function getEjercicios() {
  contadorDeRutinas=1;
	document.getElementById("mi_ejercicio").innerHTML = "";
	
  var url_ = "https://vuamos.000webhostapp.com/mostrarTodosEjercicios.php";
  $.ajax({
    type: "GET",
    url: url_,
    success: function(response){
      if(response != ""){
        var arr_ejercicios = separaResponseEjercicios(response);
        localStorage.setItem("num_ejercicios", arr_ejercicios.length-1)
        getRecomendaciones(arr_ejercicios);
      }
    }
  });
}
function separaResponseEjercicios(response) {
  var arr_ejercicios = [];
  var datos = response.split('|');
  for (let i = 0; i < datos.length; i+=2) {
    var objeto = new Object();
    objeto.id = datos[i];
    objeto.nombre = datos[i+1];
    arr_ejercicios.push(objeto);
  }
  return arr_ejercicios;
}
function getRecomendaciones(arr_ejercicios) {
  var url_ = "https://vuamos.000webhostapp.com/mostrarUserEjercicios.php";
  $.ajax({
    type: "GET",
    url: url_,
    success: function(response){
      if(response != ""){
        var arr_user_ejercicio = separaResponseUserEjercicio(response);
        var arr_datos = convertToObject(arr_ejercicios, arr_user_ejercicio);
        var arr_repeticiones_contadas = contarEjercicios(arr_datos, arr_ejercicios);
        var arr_repeticiones_contadas_sort_desc = sort_desc(arr_repeticiones_contadas);
        var arr_ejercicios_mas_hechos = getEjerciciosLimitados(arr_repeticiones_contadas_sort_desc);
        var ejercicio_user_repeticion = setMarcoDatos(arr_datos, arr_ejercicios);
        var correlaciones = getCorrelaciones(ejercicio_user_repeticion, arr_ejercicios);
        var correlacion_join_num = joinCorrelacionNum(correlaciones, arr_repeticiones_contadas);
        ejercicios_recomendar = sort_desc_correlacion(correlacion_join_num);
        setEjerciciosRecom(ejercicios_recomendar);
        //var correlacion_join_num_sort_desc = sort_desc_correlacion(correlacion_join_num);
        //ejercicios_recomendar = getEjerciciosRecomendar(correlacion_join_num_sort_desc);
        /*getMisEjercicios(result => {
          var mis_ejercicios = separaMisEjercicios(result);
          comparaEjerciciosHechos(ejercicios_recomendar, mis_ejercicios);
        })*/
        
      }
    }
  });
}
function separaResponseUserEjercicio(response){
  var arrUserEjercicio = [];
  var datos_usuario = response.split('>');
  for (let i = 0; i < datos_usuario.length; i++) {
    const element = datos_usuario[i];
    var datos_usuario_sep = element.split('|');
    var arrTemp = [];
    for (let j = 0; j < datos_usuario_sep.length-1; j++) {
      if(datos_usuario_sep[j] == ""){
        datos_usuario_sep[j] = 0;
      }
      arrTemp.push(datos_usuario_sep[j]);
    }
    arrUserEjercicio.push(arrTemp);
  }
  return arrUserEjercicio;
}
function convertToObject(ejercicio_prop, dato_to_convert) {
  var arrConverted = [];
  for (let i = 0; i < dato_to_convert.length-1; i++) {
    const element_dato = dato_to_convert[i];
    var objeto = new Object();
    let contador = 2;
    for (let j = 0; j < ejercicio_prop.length-1; j++) {
      const element = ejercicio_prop[j];
      objeto['id'] = element_dato[0];
      objeto['usuario'] = element_dato[1];
      objeto[element['nombre']] = element_dato[contador];
      contador++;
    }
    arrConverted.push(objeto);
  }
  return arrConverted;
}
function contarEjercicios(arr_datos, arr_ejercicios) {
  var arr_repeticiones_contadas = [];
  for (let i = 0; i < arr_ejercicios.length-1; i++) {
    let contador_person_ejercicio = 0;
    for (let j = 0; j < arr_datos.length; j++) {
      const element = arr_datos[j];
      if(element[arr_ejercicios[i]['nombre']] > 0){
        contador_person_ejercicio++;
      }
    }
    let media = contador_person_ejercicio/(localStorage.getItem('num_ejercicios'));
    var objeto = new Object();
    objeto.nombre = arr_ejercicios[i]['nombre'];
    objeto.media = Math.round(media * 1000) / 1000;
    objeto.num_person_make_ejercicio = contador_person_ejercicio;
    arr_repeticiones_contadas.push(objeto);
  }
  return arr_repeticiones_contadas;
}
function sort_desc(arr_repeticiones_contadas) {
  var arr_repeticiones_contadas_sort = [...arr_repeticiones_contadas];
  arr_repeticiones_contadas_sort.sort(((a, b) => a.num_person_make_ejercicio - b.num_person_make_ejercicio));
  
  var arr_repeticiones_contadas_sort_desc = [];
  for (let i = arr_repeticiones_contadas_sort.length-1; i >= 0; i--) {
    const element = arr_repeticiones_contadas_sort[i];
    arr_repeticiones_contadas_sort_desc.push(element);
  }
  return arr_repeticiones_contadas_sort_desc;
}
function getEjerciciosLimitados(arr_repeticiones_contadas_sort_desc) {
  // limitar ejercicios donde al menos 100 usuarios hayan realizado el ejercicio y mostrarlos
  var arr_ejercicios_mas_hechos = [];
  for (let i = 0; i < arr_repeticiones_contadas_sort_desc.length; i++) {
    const element = arr_repeticiones_contadas_sort_desc[i];
    if(element['num_person_make_ejercicio'] > 100){
      var temp_recomendar = [];
      var objeto = new Object();
      objeto.nombre = element['nombre'];
      objeto.media = element['media'];
      objeto.num_person_make_ejercicio = element['num_person_make_ejercicio'];
      temp_recomendar.push(objeto);
      arr_ejercicios_mas_hechos.push(temp_recomendar);
    }
  }
  return arr_ejercicios_mas_hechos;
}
function setMarcoDatos(arr_datos, arr_ejercicios) {
  var ejercicio_user_repeticion = [];
  for (let i = 0; i < arr_ejercicios.length-1; i++) {
    var ejercicio_temp = [];
    for (let j = 0; j < arr_datos.length; j++) {
      ejercicio_temp.push(parseInt(arr_datos[j][arr_ejercicios[i]['nombre']]));
    }
    ejercicio_user_repeticion.push(ejercicio_temp);
  }
  return ejercicio_user_repeticion;
}
function getCorrelaciones(ejercicio_user_repeticion, arr_ejercicios) {
  var correlaciones = [];
  for (let i = 0; i < ejercicio_user_repeticion.length; i++) {
    var correlacion_temp = [];
    for (let j = 0; j < ejercicio_user_repeticion.length; j++) {
      var objeto = new Object();
      objeto.nombre = arr_ejercicios[j]['nombre'];
      objeto.correlacion = Math.round(getPearson(ejercicio_user_repeticion[i], ejercicio_user_repeticion[j]) * 100) / 100;
      correlacion_temp.push(objeto);
    }  
    correlaciones.push(correlacion_temp);
  }
  return correlaciones;
}
function getPearson(arr1, arr2){
  // arr1_media
  var arr1_suma = arr1.reduce((previous, current) => current += previous);
  var arr1_media = arr1_suma/arr1.length;
  // arr2_media
  var arr2_suma = arr2.reduce((previous, current) => current += previous);
  var arr2_media = arr2_suma/arr2.length;
  // arr1[pos] - arr1_media
  var arr1_pos_menos_media = [];
  // arr2[pos] - arr2_media
  var arr2_pos_menos_media = [];
  for (let i = 0; i < arr1.length; i++) {
    arr1_pos_menos_media.push(arr1[i] - arr1_media);
    arr2_pos_menos_media.push(arr2[i] - arr2_media);
  }
  // multiplicar arr1_pos_menos_media * arr2_pos_menos_media
  var arr1_producto_arr2 = [];
  for (let i = 0; i < arr1_pos_menos_media.length; i++) {
    arr1_producto_arr2.push(arr1_pos_menos_media[i] * arr2_pos_menos_media[i]);
  }
  // sumatoria arr1_producto_arr2
  var sumatoria_arr1_producto_arr2 = arr1_producto_arr2.reduce((previous, current) => current += previous);
  // calculo de desvest arr1
  // calcular media
  // calcular varianza
  // (arr1[pos] - arr1_media)^2
  var arr1_pos_menos_media_cuadrado = [];
  var arr2_pos_menos_media_cuadrado = [];
  for (let i = 0; i < arr1_pos_menos_media.length; i++) {
    arr1_pos_menos_media_cuadrado.push(arr1_pos_menos_media[i]*arr1_pos_menos_media[i]);
    arr2_pos_menos_media_cuadrado.push(arr2_pos_menos_media[i]*arr2_pos_menos_media[i]);
  }
  // hacer sumatoria de ambos arreglos
  var sumatoria_arr1_pos_menos_media_cuadrado = arr1_pos_menos_media_cuadrado.reduce((previous, current) => current += previous);
  var sumatoria_arr2_pos_menos_media_cuadrado = arr2_pos_menos_media_cuadrado.reduce((previous, current) => current += previous);
  // desvest = raiz de varianza
  var varianza_arr1 = sumatoria_arr1_pos_menos_media_cuadrado/(arr1_pos_menos_media.length-1);
  var varianza_arr2 = sumatoria_arr2_pos_menos_media_cuadrado/(arr2_pos_menos_media.length-1);
  var desvest_arr1 = Math.sqrt(varianza_arr1);
  var desvest_arr2 = Math.sqrt(varianza_arr2);
  // pearson_denominador = n * desvest_a * desvest_b
  // pearson
  var pearson_denominador = (arr1_pos_menos_media.length * desvest_arr1 * desvest_arr2);
  var pearson = sumatoria_arr1_producto_arr2/pearson_denominador;
  return pearson;
}
function joinCorrelacionNum(correlaciones, arr_repeticiones_contadas) {    
  var correlacion_join_num = [];
  for (let i = 0; i < correlaciones.length; i++) {
    var correlacion_join_num_temp = [];
    for (let j = 0; j < arr_repeticiones_contadas.length; j++) {
      var objeto = new Object(correlaciones[i][j]);
      objeto.num_person_make_ejercicio = arr_repeticiones_contadas[j]['num_person_make_ejercicio'];
      correlacion_join_num_temp.push(objeto);
    }
    correlacion_join_num.push(correlacion_join_num_temp);
  }
  return correlacion_join_num;
}
function sort_desc_correlacion(arr) {
  var arr_sort = [...arr];
  for (let i = 0; i < arr_sort.length; i++) {
    arr_sort[i].sort(((a, b) => b.correlacion - a.correlacion));
  }
  return arr_sort;
}
function getEjerciciosRecomendar(correlacion_ejercicios_sort_desc) {
  var ejercicios_recomendar = [];
  for (let i = 0; i < correlacion_ejercicios_sort_desc.length; i++) {
    var ejercicios_recomendar_temp = [];
    for (let j = 0; j < correlacion_ejercicios_sort_desc[i].length; j++) {
      if(correlacion_ejercicios_sort_desc[i][j]['num_person_make_ejercicio'] > 100){
        ejercicios_recomendar_temp.push(correlacion_ejercicios_sort_desc[i][j]);
      }
    }
    ejercicios_recomendar.push(ejercicios_recomendar_temp);
  }
  
  return ejercicios_recomendar;
}
/* mis ejercicios de circuito */

function setEjerciciosRecom(ejercicios_recomendar){
	var ejercicios_circuito = [];
	var url_ = "https://vuamos.000webhostapp.com/mostrarCircuito.php";
  $.ajax({
    type: "POST",
    url: url_,
    dataType: "json",
    data: "usuario="+localStorage.getItem('nombre'),
    success: function(data)
    {
      if(data.length > 0 && contadorDeRutinas>0){
        let encontrado = false;
        while(encontrado != true){
          let pos = Math.floor(Math.random() * data.length);
          let pos_rec = posEjercicioCircuito(ejercicios_recomendar, data[pos]["nombre"]);
          if(pos_rec != -1){
          
            showRecomendaciones(ejercicios_recomendar[pos_rec]);
            encontrado = true;
          }
        }
      }else{
        contadorDeRutinas=1;
        ejerciciosCadena="";
      }
    }
  });
}
function separaMisEjercicios(response) {
  var mis_ejercicios = [];
  var datos = response.split('|');
  for (let i = 0; i < datos.length-1; i++) {
    mis_ejercicios.push(datos[i]);
  }
  return mis_ejercicios;
}
/* comparar ejercicios de cicuitos para mostrar las recomendaciones, tendra mas variedad */
function posEjercicioCircuito(ejercicios_recomendar, ejercicios_circuito) {
  for (let j = 0; j < ejercicios_recomendar.length; j++) {
    if(ejercicios_recomendar[j][0]['nombre'] == ejercicios_circuito){
      return j;
    } 
  }
  return -1;
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
  circuitos=1;
}
else if(estado==2){
  circuitos=1;
}
else{
  circuitos=2;
}
var tiempoRutina=((tiempoEjercicio*7)+(tiempoDescanso*7))*circuitos;



function showRecomendaciones(ejercicios_recomendar) {
  if(contadorDeRutinas>0 ){
   
    $("#miRutinaB").html("");
  $("#mi_ejercicio").append("<br/>Por realizar el ejercicio: <br/>" + "<h4><b>" + ejercicios_recomendar[0]['nombre'] + "</h4></b><br/>")
  $("#tiempoEstimado").html(' <li > <h5 style="font-size:14px;"> &#9200; Tiempo: '+ tiempoRutina +' segundos <br> &#128681; Circuitos:'+circuitos +' </h5></li>  <li data-role="list-divider"> <h5 style="text-align:center;">Ejercicios</h5></li>');
  $("#tiempoEstimado").listview("refresh");
  
  var ejercicios_verdaderos_temp = [];
  for (var i = 0; i < ejercicios_mi_estado.length; i++) {
    for (var j = 0; j < ejercicios_recomendar.length; j++) {
      if(ejercicios_mi_estado[i] == ejercicios_recomendar[j]['nombre']){
        ejercicios_verdaderos_temp.push(ejercicios_recomendar[j]);
        break;
      }
    }
  }
  console.log(ejercicios_verdaderos_temp)
  var ejercicios_verdaderos = [...ejercicios_verdaderos_temp];
  ejercicios_verdaderos.sort(((a, b) => b.correlacion - a.correlacion));
  
  if(ejercicios_verdaderos.length > 8){
  	
    for (let i = 1; i < 8; i++) {
      $.ajax({
        type: "POST",
        url: "https://vuamos.000webhostapp.com/RecomendacionRutina.php",
        cache: false,
        data: "ejercicio="+ ejercicios_verdaderos[i]['nombre']+"&tiempo="+tiempoEjercicio+"&descanso="+tiempoDescanso+"&circuitos="+circuitos,
       
        success: function(response)
        {
            $('#miRutinaB').append(response).fadeIn();
           
            $("#miRutinaB").listview("refresh");
        }
    });

    }
    
  }else{

    for (let i = 1; i < ejercicios_verdaderos.length; i++) {  
    $.ajax({
        type: "POST",
        url: "https://vuamos.000webhostapp.com/RecomendacionRutina.php",
        cache: false,
        data: "ejercicio="+ ejercicios_verdaderos[i]['nombre']+"&tiempo="+tiempoEjercicio+"&descanso="+tiempoDescanso+"&circuitos="+circuitos,
      
        success: function(response)
        {
            $('#miRutinaB').append(response).fadeIn();
            $("#miRutinaB").listview("refresh");
        }
    });
 
    }
   
  }

  if(ejerciciosCadena==""){
    if(ejercicios_verdaderos.length > 8)
    {
      for (let i = 1; i < 8; i++)
      {
        $.ajax({
          type: "POST",
          url: "https://vuamos.000webhostapp.com/crearCircuito.php",
          dataType: "json",
          cache: false,
          data: "ejercicio="+ ejercicios_verdaderos[i]['nombre'],
         
          success: function(data)
          {
            
            ejerciciosCadena=ejerciciosCadena+data["cadena"];
            if(i==7){
             
              $.ajax({
                type: "POST",
                url: "https://vuamos.000webhostapp.com/RealizarRutina.php",
                cache: false,
                data: "cadena="+ejerciciosCadena,
                success: function(response)
                { 
                  $('#botonRutina').html(response).fadeIn();
                  $("#botonRutina").listview("refresh");  
                
                }
            });
            }
            
          }
      });
      }
    }else{
      for (let i = 1; i < ejercicios_verdaderos.length; i++)  {
        if(i==7){
         
          $.ajax({
            type: "POST",
            url: "https://vuamos.000webhostapp.com/RealizarRutina.php",
            cache: false,
            data: "cadena="+ejerciciosCadena,
            success: function(response)
            { 
              $('#botonRutina').html(response).fadeIn();
              $("#botonRutina").listview("refresh");  
            
            }
        });
        }
      }
    }
  }else{
    ejerciciosCadena="";
    if(ejercicios_verdaderos.length > 8)
    {
      for (let i = 1; i < 8; i++)
      {
        $.ajax({
          type: "POST",
          url: "https://vuamos.000webhostapp.com/crearCircuito.php",
          dataType: "json",
          cache: false,
          data: "ejercicio="+ ejercicios_verdaderos[i]['nombre'],
         
          success: function(data)
          {
            
            ejerciciosCadena=ejerciciosCadena+data["cadena"];
            if(i==7){
              
              $.ajax({
                type: "POST",
                url: "https://vuamos.000webhostapp.com/RealizarRutina.php",
                cache: false,
                data: "cadena="+ejerciciosCadena,
                success: function(response)
                { 
                  $('#botonRutina').html(response).fadeIn();
                  $("#botonRutina").listview("refresh");  
                
                }
            });
            }
            
          }
      });
      }
    }else{
      for (let i = 1; i < ejercicios_verdaderos.length; i++)  {
        if(i==7){
          alert(ejerciciosCadena);
          $.ajax({
            type: "POST",
            url: "https://vuamos.000webhostapp.com/RealizarRutina.php",
            cache: false,
            data: "cadena="+ejerciciosCadena,
            success: function(response)
            { 
              $('#botonRutina').html(response).fadeIn();
              $("#botonRutina").listview("refresh");  
            
            }
        });
        }
      }
    }

  }
  
  }else{
    contadorDeRutinas=1;
  }
  
}

