$(document).ready(function(){
	console.log("ready!");
	$('#submitSearch').click(function(event){
		event.preventDefault();
		//confirm in console user clicked to submit search
		console.log("submit clicked");
		//find value of user entry and assign to variable searchTerm
		var searchTerm = $('#searchBox').val();
		console.log("user searched for " + searchTerm);
		//.ajax function is called on searchTerm parameter user entered
		getTaggedPics(searchTerm);	
	});

//takes user entered searchTerm and runs getTaggedPics function on it
function getTaggedPics(searchTerm){

	//the parameters Instagram API requires us to pass to it
	$.ajax({
    url: 'https://api.instagram.com/v1/tags/' + encodeURI(searchTerm) + '/media/recent?access_token=9393562.1fb234f.e082fd4be5ea4e0fb0751c5208c628fc',
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function(results){
        console.log(results);
        showResults(results.data);
    }
	});
	
};

function showResults(results){
	var ul = $('<ul>');
	$('.photoSlideshow').html(ul);
	console.log(results);
	$.each(results, function(key, value){
		//use dot notation to parse data
		console.log(value);
		var image = value.images.standard_resolution.url;
		var user = value.user.username;
		var caption = value.caption.text;
		var instagramSearch = "https://www.instagram.com/";
		var date = new Date(value.created_time * 1000).toLocaleDateString();
		//console.log(image);
		console.log(date);
		//create var li to append li tag to DOM
		var li = $("<li>");
		//create var showUser to assist in appending user data to DOM
		var showUser = $('<p class="user">' + user + '</p>');
		//create var showCaption to assist in appending caption data to DOM
		var showCaption = $('<p class="caption">' + caption + '</p>');
		//create var img to store image data to be appended to DOM
		var img = $('<img>').attr('src', image);
		//append showUser and showCaption data to DOM
		$(li).append(img, '<hr class="hrBottom">', '<p class=postedDate>' + "Posted on " + date + " by Instagram user:" + '</p>', showUser, showCaption, '<hr class="hrBottom">');
		//wrap user name data in a link
		showUser.wrapInner($('<a>').attr('href', instagramSearch + user));
		img.wrap($('<a>').attr('href', value.link));
		//append all data to the page
		$(ul).append(li);
	});
};

//declare variable numImages & set equal to length of the photoSlidehow img array


setInterval(function(){
	var numImages = $('.photoSlideshow li').length;
	//set currentImage equal to the img in photoSlideshow w/ property visible
	var currentImage = $('.photoSlideshow li').index($('.photoSlideshow li.visible'));
	//use Math.max to set current(mage to start at index position 0
	currentImage = Math.max(currentImage, 0);	
	//set variable nextImage equal to currentImage + 1 to iterate through array
	var nextImage = currentImage + 1;
	//use if stmt to make cycle back through from array beginning once array end is reached
	if (nextImage >= numImages) nextImage = 0;
	//rotates the visible class through to each picture for 5000ms each fo slideshow effect
	$('.photoSlideshow li').removeClass('visible').eq(nextImage).addClass('visible');
},5000);

	//refreshes page, clearing results for new search
	$('#resetButton').click(function(){
		location.reload();
	});
});
