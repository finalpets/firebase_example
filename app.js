
var matricula = "";
var nombre = "";
var del_matricula="";


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
  clean_fields();
  
});

$( "#clean" ).click(function() {
	clean_fields();
});
function clean_fields(){	
	$('#matricula').val("");
	$('#nombre').val("");    
}

  $( "#delete" ).click(function() {
	del_matricula = $('#del_matricula').val();	
	clean_fields();
	db.collection("alumnos").doc(del_matricula).delete().then(function() {
		console.log("Document successfully deleted!");
	}).catch(function(error) {
		console.error("Error removing document: ", error);
	});

  });

  function store_alumno(){

	var docData = {
	    matricula: matricula,	    	    
	    nombre: nombre	    
	};
	
	db.collection("alumnos").doc(matricula).set(docData).then(function() {
	    console.log("Alumno Document successfully written!");
	});
}

db.collection("alumnos").onSnapshot(function(querySnapshot) {
	console.log("Read Data");
	$("#tabla_alumnos tbody > tr").remove();
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        $('#tabla_alumnos > tbody:last-child').append('<tr><th scope="row"></th><td>'+doc.data().matricula+'</td><td>'+doc.data().nombre+'</td></tr>');

	});
});

