//array with classes
const elements = [
	{ class: "content", type: 'div'},
	{ class: "prev", type: 'span'},
	{ class: "play", type: 'span'},
	{ class: "next", type: 'span'}
];

//create elements with matching classnames
for (var i = 0; i < elements.length; i++) {

	var newElement = document.createElement(elements[i].type),
		newContent = document.createTextNode(elements[i].class);

	newElement.classList.add(elements[i].class);

	newElement.appendChild(newContent);
	var htmlBody = document.getElementsByTagName('body')[0];
	htmlBody.appendChild(newElement);
}

//retrieve elements
var prevButton = document.querySelector("span.prev");
var nextButton = document.querySelector("span.next");
var playButton = document.querySelector("span.play");

//index for currently active image
var currentSlide = 0;

//how many slides should there be
var maxSlides = 4;

//time in seconds between each slide (in play mode)
var slideTime = 5;

//slider state boolean
var autoPlay = false;

//increase slider index
var nextSlide = function() {
	currentSlide++;

	if (currentSlide > maxSlides-1) {
		currentSlide = 0;
	} 

	updateSlider();
}

//decrease slider index
var prevSlide = function() {
	currentSlide--;

	if (currentSlide < 0) {
		currentSlide = maxSlides-1;
	} 

	updateSlider();
}

//var to start & stop the set interval
var playInterval;

//play or pause slider
var playPause = function() {

	autoPlay = !autoPlay;

	if (autoPlay == true) {
		playButton.classList.add("pause");
		playInterval = setInterval(nextSlide, slideTime * 1000);
	} else {
		playButton.classList.remove("pause");
		clearInterval(playInterval);
	}
}

//link the next, prev & play elements to a function
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
playButton.addEventListener('click', playPause);

//create img element with empty content
var sliderElement = document.createElement('img'),
	sliderContent = document.createTextNode('');

//add class to newly created img element
sliderElement.classList.add("image");

//put element into html
sliderElement.appendChild(sliderContent);
var positionSlider = document.getElementsByTagName('div')[0];
positionSlider.appendChild(sliderElement);

const slides = [

];

for (var i = 0; i < maxSlides; i++) {
	slides.push("image" + [i+1] + ".jpg")
}

//update slider element
var updateSlider = function() {
	sliderElement.src = slides[currentSlide];
}

//assign keyboard keys to functions
document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37:
			prevSlide();
			break;
		case 39:
			nextSlide();
			break;
	}
};

updateSlider();