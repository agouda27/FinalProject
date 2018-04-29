$('.identifier-col').on('click', function(e) {
	let input = "";
  if (e.target !== this){
	if(e.target.name === "Identifier"){
		alert('Identifier')
		input = e.target.value;
	}
	if(e.target.value === "Query"){
		alert('Query')
		console.log(input);
	}
		
}
	
  else{
  alert( 'clicked the col' );
  console.log(this)
  	};

});
	

