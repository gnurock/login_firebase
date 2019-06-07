
//investigar on jquert equivale 
// addeventlistener


var storageRef = firebase.storage().ref();



$('#subirArchivo').on('change',function(e){


	alert('nuevo super meme');
	file = e.target.files[0];
	var storageRef = firebase.storage().ref('img_momos/'+file.name);
	storageRef.put(file);
	console.log(file.name);

});



var starsRef = storageRef('img_momos/');

starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  console.log("venga la imagen");
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      console.log('archovo no existe')
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log("no tiene permiso para ver acceder archivo")
      break;

    case 'storage/canceled':
      // User canceled the upload
      console.log("usuario cancelo archivo");
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      console.log("error desconocido");
      break;
  }
});