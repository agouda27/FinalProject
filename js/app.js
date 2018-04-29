

$('.identifier-col').on('click', function(e) {
	const $targ = $(e.target);
	if ($targ.is('[name="Pin1"]')) {
		console.log($targ.parent().find('[name="Identifier"]').val())
	}	

});
	

$('[name="Identifier"]').on('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();//Add Validator Function
		console.log($(e.target).val())
	}
})