
var nodos = new vis.DataSet([
	{id:1, label: "n1"},
	{id:2, label: "n2",borderWidth:"3"},
	{id:3, label: "n3",borderWidth:"3"},
	{id:4, label: "n4",borderWidth:"3"},
	{id:5, label: "n5",borderWidth:"3"}
	]);

var aristas = new vis.DataSet([

	{id:1, 	from:1, to:2, label: "a"},
	{id:2, 	from:2, to:3, label: "b"},
	{id:3, 	from:2, to:4, label: "c"},
	{id:4, 	from:2, to:5, label: "d"},
	{id:5, 	from:3, to:4, label: "c"},
	{id:6, 	from:3, to:3, label: "b"},
	{id:7, 	from:3, to:5, label: "d"},
	{id:8, 	from:4, to:4, label: "c"},
	{id:9,  from:5, to:4, label: "c"},
	{id:10, from:5, to:5, label: "d"}
	])

var contenedor = document.getElementById('automata');

var datos = {
	nodes: nodos,
	edges: aristas
};

var opciones = {
	edges:{
		arrows:{
			to:{
				enabled:true
			}
		}
	}
};

var grafo = new vis.Network(contenedor,datos,opciones);
var output = document.querySelector("#time");
var milisegundos;

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

//funciones
function getValueInput(){
	let palabra = document.querySelector("#palabra").value;
	var slider = document.querySelector("#myRange");
	milisegundos = slider.value*5;
	output.innerHTML = milisegundos/1000;
	camino(palabra);
}

async function camino(palabra){

	var id=1;
	for (var i = 0; i < palabra.length; i++) {
		await sleep(milisegundos);
		id=validarLetra(palabra[i],id);

		if(id==-1)
			break;
	}

	if(!palabra || id==-1){
		modal.style.display = "block";
		document.querySelector("#parrafoValidacion").innerText = "Palabra no válida";
		document.querySelector("#MiWaifu").src = "images/NozomiSad.jpg";
	}
	else{
		modal.style.display = "block";
		document.querySelector("#parrafoValidacion").innerText = "Palabra válida!";
		document.querySelector("#MiWaifu").src = "images/NozomiHappy.jpg";
	}

}

function validarLetra(letra, idNodo){
	var idArista;
	if(letra=="a" && idNodo==1){

		idArista=1;
		cambiarColorAutomata(idArista,idNodo);
		return idNodo+1;

	}else if(letra=="b" && (idNodo==2 || idNodo==3)){

		if(idNodo==2)
			idArista=2;
		else
			idArista=6; 
		
		cambiarColorAutomata(idArista,idNodo);
		return 3;

	}else if(letra=="d" && (idNodo==2 || idNodo==3 || idNodo==5)){
		if(idNodo==2)
			idArista=4;
		else if(idNodo==3)
			idArista=7;
		else if(idNodo==5)
			idArista=10;
		
		cambiarColorAutomata(idArista,idNodo);
		return 5;

	}else if(letra=="c" && (idNodo==2 || idNodo==3 || idNodo==4 || idNodo==5)){

		if(idNodo==2)
			idArista=3;
		else if(idNodo==3)
			idArista=5;
		else if(idNodo==5)
			idArista=9;
		else if(idNodo==4)
			idArista=8;

		cambiarColorAutomata(idArista,idNodo);
		return 4;

	}else
		return -1;
}

function cambiarColorAutomata(idAr,idNod){
	
	nodos.update({
		id: idNod,
		color:{background: "red"},
		shadow: true
	})

	aristas.update({
		id: idAr,
		shadow: true,
		color:{color: "green"}

	})
}