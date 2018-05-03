/*Calling the GetData function when the user clicks on the query 
button
*/
$('.identifier-col').on('click', function(e) {
	const $targ = $(e.target);
	if ($targ.is('[value="Query"]')) {
        const pinNum = $targ.parent().find('[name="Identifier"]').val();
        getData(pinNum);

	}	

});
	
//Shim when the data is loading 
const $shim = $('.js-shim');
const showShim = () => $shim.removeClass('hidden');
const hideShim = () => $shim.addClass('hidden');

let currentpin = null;

/*Calling the GetData function when the user presses enter in the
  input field
*/
$('[name="Identifier"]').on('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();//Add Validator Function
        const pinNum = $(e.target).val()
        getData(pinNum)
	}
});

/*
Function that gets the data using HTTP request get and the jquery
funtion getJson. If the user submits without entering the pin or 
provide a wrong pin they get an alert informing them that it does 
not exist. After data is retrieved it gets mapped out to the proper
tags in the information fieldset  
*/
const getData = (pinNum) => {
    showShim();
    $.getJSON('https://api.myjson.com/bins/olsvr', data => {
        console.log(data)
        console.log('resutls=', data[pinNum])
        if (!data[pinNum]) {
            alert('this pin does not exist!')
            hideShim();
            return;
        } 
        $('.js-owner').val(data[pinNum]["Owner"]);
        $('.js-location').val(data[pinNum]["Location"]);
        $('.js-manager').val(data[pinNum]["Manager"]);
        $('.js-activityStatus').val(data[pinNum]["Activity Status"]);
        $('.js-steward').val(data[pinNum]["Steward"]);
        $('.js-activityType').val(data[pinNum]["Activity Type"]);
        $('.js-assetCondition').val(data[pinNum]["Asset Conditions"]);
        $('.js-custodian').val(data[pinNum]["Custodian"]);
        $('.js-expectedReturnDate').val(data[pinNum]["Expected Return Date"]);
        $('.js-user').val(data[pinNum]["User"]);
        hideShim();
       currentpin = pinNum;   
    })
    
};
/*
Update the Json when the user clicks update and the pin number is 
not null, map the updated data to a new json and call postData 
to update
*/
$('.js-submit').on('click', function(e) {
    e.preventDefault();// to test
    if (!currentpin) {
        alert('No pins to update')
        hideShim();
        return;
    } 
const $targ = $(e.target);   
    const data = {};
    
    data["Owner"]=$targ.parent().find('.js-owner').val();
    data["Location"]=$targ.parent().find('.js-location').val();
    data["Manager"]=$targ.parent().find('.js-manager').val();
    data["Activity Status"]=$targ.parent().find('.js-activityStatus').val();
    data["Steward"]=$targ.parent().find('.js-steward').val();
    data["Activity Type"]=$targ.parent().find('.js-activityType').val();
    data["Asset Conditions"]=$targ.parent().find('.js-assetCondition').val();
    data["Custodian"]=$targ.parent().find('.js-custodian').val();
    data["Expected Return Date"]=$targ.parent().find('.js-expectedReturnDate').val();
    data["User"]=$targ.parent().find('.js-user').val();


    postData(data);

    }); 


/*
Get the data to be updated and updated the value of it using the 
current pin then put that data into the JSON using PUT 
*/
const postData = (newData) => {
    $.getJSON('https://api.myjson.com/bins/olsvr')
        .then(_data => {
            _data[currentpin] = newData; 
            return _data;
        })
        .then(_completedData => {
            return $.ajax({
                url:'https://api.myjson.com/bins/olsvr',
                type:"PUT",
                data: JSON.stringify(_completedData),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
        });
    })
};

  
