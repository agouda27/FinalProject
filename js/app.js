
$('.identifier-col').on('click', function(e) {
	const $targ = $(e.target);
	if ($targ.is('[value="Query"]')) {
        const pinNum = $targ.parent().find('[name="Identifier"]').val();
        getData(pinNum);

	}	

});
	

const $shim = $('.js-shim');
const showShim = () => $shim.removeClass('hidden');
const hideShim = () => $shim.addClass('hidden');

let currentpin = null;

$('[name="Identifier"]').on('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();//Add Validator Function
        const pinNum = $(e.target).val()
        getData(pinNum)
	}
});

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

$('.js-submit').on('click', function(e) {
    e.preventDefault();// to test
    if (!currentpin) {
            alert('No pins to update')
            hideShim();
            return;
        } 
    const $targ = $(e.target);   
    const data = {};
    const PostData = {};
    
    data["Owner"]=$targ.parent().find('[class="js-owner"]').val();
    data["Location"]=$targ.parent().find('[class="js-location"]').val();
    data["Manager"]=$targ.parent().find('[class="js-manager"]').val();
    data["Activity Status"]=$targ.parent().find('[class="js-activityStatus"]').val();
    data["Steward"]=$targ.parent().find('[class="js-steward"]').val();
    data["Activity Type"]=$targ.parent().find('[class="js-activityType"]').val();
    data["Asset Conditions"]=$targ.parent().find('[class="js-assetCondition"]').val();
    data["Custodian"]=$targ.parent().find('[class="js-custodian"]').val();
    data["Expected Return Date"]=$targ.parent().find('[class="js-expectedReturnDate"]').val();
    data["User"]=$targ.parent().find('[class="js-user"]').val();



    PostData[currentpin.toString()]=data;
    //Send as a string
    const PostDataString = JSON.stringify(PostData);
    console.log(PostDataString)
    postData(PostDataString);
    alert(PostDataString);

    }); 



    const postData = (data) => {

    $.post('https://api.myjson.com/bins',data, function(data, textStatus, jqXHR){
        console.log(data)
    })

};

  
