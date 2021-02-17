console.log("ok");

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");

var triggers ={};

var i = true;

triggers.button = function(){
	document.querySelector(".js-submit").addEventListener('click', function(){

		free(i);

		/*1. Get the info from the user */
		var name = '#searchbar';
		var search = triggers.retrive(document,name);
		console.log(search);
		
		if (search == null) {
			document.location.reload();
		} else {
		/*Use the API*/
			sound(search);	
			i = false;
		}	
	});
	document.querySelector(".js-refresh").addEventListener('click', function(){
		localStorage.removeItem("key");
		var side = document.querySelector('.js-playlist');
  		while(side.hasChildNodes()){
			side.removeChild(side.firstChild);
		}

	});
}

triggers.clicks = function(){
	/*little easter egg*/
	document.addEventListener('keyup', function(e){
		if (e.which === 17) {
			cat();
		} 
		else if (e.which === 13) {

			free(i);

			/*1. Get the info from the user */
			var name = '#searchbar';
			var search = triggers.retrive(document,name);
			console.log(search);
			
			if (search == null) {
				document.location.reload();
			} 
			else {
				/*Use the API*/
				sound(search);
				i = false;	
			}
		}
	});
}

triggers.retrive = function(doc,input){
	console.log("Todo ok");
	var text = doc.querySelector(input).value;
	console.log("Contenido es: "+text);
	return text;
}

triggers.clicks();
triggers.button();

////////////////////Functions//////////////////////


/*Procedure of the API personalized*/
function sound(search){
	SC.initialize({
		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});

	SC.get('/tracks',{
		q: search
	}).then(function(tracks) {
			render(tracks);
	});
}

/*Free the cards for new research*/
function free(control){

	var card = document.getElementById("searchres");
	console.log(card);
	if (control != true) {
		console.log("entered");
		while(card.hasChildNodes()){
			card.removeChild(card.firstChild);
		}
	}
}

/*Renders the cards for songs*/
function render(tracks){

			tracks.forEach(function(track){
				console.log(track);
				var imagesurl = track.artwork_url;
				console.log(imagesurl);
				var lin = track.permalink_url;
				console.log(lin);
				var title = track.title;
				console.log(title);

				/*Create the div class "card"*/
				var card = document.createElement('div');
				card.classList.add("card");
				card.setAttribute("id", "cardObj");

				/*code for display the album*/
				var imageDiv = document.createElement('div');
				imageDiv.classList.add("image");

				var artwork = document.createElement("img");
				artwork.classList.add("image_img");
				if (imagesurl === null) {
					artwork.src="../Imagenes/kjnegra.png";
				} 
				else{
					artwork.src=imagesurl;
				}

				imageDiv.appendChild(artwork);


				/*code for the content*/
				var content = document.createElement('div');
				content.classList.add('content');

				var header = document.createElement('div');
				header.classList.add('header');
				if (lin === null || title === null) {
					header.innerHTML = '<a href="#" target="_blank">"Sample"</a>';
				}
				else{
					header.innerHTML = '<a href="'+lin+'" target="_blank">"'+title+'"</a>';
				}

				/*code for the buttom*/
				var buttom = document.createElement('div');
				buttom.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
			
				var	icon = document.createElement('i');
				icon.classList.add('add', 'icon');

				var	text = document.createElement('span');
				text.innerHTML = 'A&ntilde;adir a la playlist';

				content.appendChild(header);

				buttom.appendChild(icon);
				buttom.appendChild(text);

				buttom.addEventListener('click', function(){
					play(lin);
				});

				card.appendChild(imageDiv);
				card.appendChild(content);
				card.appendChild(buttom);

				/*Put the card inside "cardinf"*/
				var results = document.querySelector(".js-search-results");
				results.appendChild(card);
			});
}

function play(url){

	SC.oEmbed(url , {
  		auto_play: true
	}).then(function(embed){
  		console.log('oEmbed response: ', embed);
  		var side = document.querySelector('.js-playlist');

  		var list = document.createElement('div');
  		list.innerHTML = embed.html;

  		side.insertBefore(list, side.firstChild);

  		localStorage.setItem("key", side.innerHTML);

});
}