
var matricula = "";
var nombre = "";


firebase.initializeApp({
  apiKey: 'AIzaSyBL70yUsPzFS1gtJiHLddHncFgMT8QQ1wk',
  authDomain: 'uabctest.firebaseapp.com',
  projectId: 'uabctest'
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);



$( "#save" ).click(function() {
  matricula = $('#matricula').val();
  nombre = $('#nombre').val();
  store_alumno();
  
});


$( "#clean" ).click(function() {
	$('#matricula').val("");
	$('#nombre').val("");
  });

  function store_alumno(){

	var docData = {
	    matricula: matricula,	    	    
	    nombre: nombre	    
	};
	
	db.collection("alumnos").doc($('#matricula').val()).set(docData).then(function() {
	    console.log("Alumno Document successfully written!");
	});
}

db.collection("alumnos").onSnapshot(function(querySnapshot) {
	console.log("Read Data");
	$("#tabla_alumnos tbody > tr").remove();
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        $('#tabla_alumnos > tbody:last-child').append('<tr><th scope="row">1</th><td>'+doc.data().matricula+'</td><td>'+doc.data().nombre+'</td></tr>');

	});
});

