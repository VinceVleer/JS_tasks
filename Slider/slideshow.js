//retrieve HTML elements
var prev = document.getElementsByClassName("prev");
var next = document.getElementsByClassName("next");
var play = document.getElementsByClassName("play");
var image = document.getElementsByClassName("image");

//index for currently active image
var slideIndex = 0;

//slider state boolean
var slideState = false;

//increase slider index
var nextSlide = function() {
	slideIndex++;

	if (slideIndex > 2) {
		slideIndex = 0;
	} 

	updateSlider();
}

//decrease slider index
var prevSlide = function() {
	slideIndex--;

	if (slideIndex < 0) {
		slideIndex = 2;
	} 

	updateSlider();
}

//var to start & stop the set interval
var refreshIntervalId;

//play or pause slider
var playPause = function() {

	slideState = !slideState;

	if (slideState == true) {
		play[0].classList.add("pause");
		refreshIntervalId = setInterval(nextSlide, 5000);
	} else {
		play[0].classList.remove("pause");
		clearInterval(refreshIntervalId);
	}
}

//link the next, prev & play elements to a function
next[0].addEventListener('click', nextSlide);
prev[0].addEventListener('click', prevSlide);
play[0].addEventListener('click', playPause);

//create img element with empty content
var newElement = document.createElement('img'),
	newContent = document.createTextNode('');

//add class to newly created img element
newElement.classList.add("image");

//add img to element
newElement.src = "image1.jpg";

//put element into html
newElement.appendChild(newContent);
var positionElement = document.getElementsByTagName('div')[0];
positionElement.appendChild(newElement);

//update slider element
var updateSlider = function() {

	if (slideIndex == 0) {
		newElement.src = "image1.jpg";
	}

	if (slideIndex == 1) {
		newElement.src = "image2.jpg";
	}

	if (slideIndex == 2) {
		newElement.src = "image3.jpg";
	}
}

//assign keyboard keys to functions
document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37:
			nextSlide();
			break;
		case 39:
			prevSlide();
			break;
	}
};