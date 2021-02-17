console.log("ok");

/*1. Recibir info del usuario */

document.querySelector(".js-go").addEventListener('click', function(){

	var search = get(document,"input");
	/*Usar la API*/
	var url = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=Zfg2WJxAnN2ToIq40x8E7bGfGD1LPJVE"
	apistuff(url, search);
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e){

	if (e.which === 13) {
		var search = get(document,"input");
		/*Usar la API*/
		var url = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=Zfg2WJxAnN2ToIq40x8E7bGfGD1LPJVE"
		apistuff(url, search);
		
	}
});


///////////////////////////////////Funciones//////////////////////////////////

function get(doc,input){
	console.log("Funciona");
	var text = doc.querySelector(input).value;
	console.log("Contenido es "+text);
	return text;
}

function apistuff(url, search){
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();
	GiphyAJAXCall.addEventListener('load',function(e){
  		var data = e.target.response;
  		/*Mostrar los GIF*/
  		pushToDOM(data, ".js-container");

	});

}

function pushToDOM(input, container) {

  /*Mostrar los GIF*/
  var response = JSON.parse(input);
  var imgurls = response.data;
  var container = document.querySelector(container);

  var i = 0;
	  imgurls.forEach(function(image){
	  	setTimeout(function(){
  			var src= image.images.fixed_height.url
  			console.log(src);
  			container.innerHTML += "<img src=\""+src+"\"class=\"container-image\">";
  			i++;
  		},560*i);
  	});

}