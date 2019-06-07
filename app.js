//login 
var provider_google = new firebase.auth.GoogleAuthProvider();

var provider_facebook = new firebase.auth.FacebookAuthProvider();

// poner un escuchador en el boton login 


$('#login_facebook').click(function(){
firebase.auth().
  		 getRedirectResult()
  		 .then(function(result) {
  		if (result.credential) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    	var token = result.credential.accessToken;
    // ...
 	 	}
  // The signed-in user info.
 		//var user = result.user;
 		guardarUsuario(result.user)
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;

	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  console.log(errorCode);
	  console.log(errorMessage);
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	})
});

$('#login_google').click(function(){
	firebase.auth()
	 	.signInWithPopup(provider_google)
	 	.then(function(result) {

	 		console.log(result.user);
	 		//$('#login').hide()
	 		guardarUsuario(result.user);
	 		//$('#root').append("<img src='"+result.user.photoURL+"'>")

	     })

});

// funcion para guardar los datos tomados  del user

function guardarUsuario(user){
	var usuario= {
		uid:user.uid,
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL 
	}
	// esta vez voy  agregar  por medio de push para que se agregue en una lista
	// importante el slash  
	firebase.database().ref("usuarioDB/"+user.uid)
	.set(usuario)	

}

// Escribir en la base de datos

//tengo  que usar otro nombre en db si  de lo contrario estare sobreescriboendo la toda la rama
$('#guardar').click(function (){
	firebase.database().ref("otracosa")
	.set({
		//diccionario
		nombre:"chris",
		edad :"25",
		sexo : "mucho"
	})
});

//leer la bd 
//la funcion va a recibir el snap.. snapshot.. de firebase
firebase.database().ref("usuarioDB")
.on("child_added", function (s){
	var user= s.val();
	//es el user tomado del snap por eso no es photoUrl si no foto como se encuentra en la bd
	$('#root').append("<img  width='100ṕx' src='"+user.foto+"'>")
})