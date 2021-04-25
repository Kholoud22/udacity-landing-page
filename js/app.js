/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const sections = document.getElementsByClassName("landing__container");
// build the nav
function addCollapseToSection(section){
  section.addEventListener("click", function() {
    this.querySelector('h2').classList.toggle("active");
	//console.log(this);
    var content = this.lastElementChild;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function createNavLink(section){
	let navLink = document.createElement('li');
	let lnkId = section.getAttribute('id');
	let lnkName = section.getAttribute('data-nav');
	navLink.innerHTML = `<a class ="menu__link" href='#${lnkId}'>${lnkName}</a>`;
	return navLink;
}

function createScrollUpBtn(){
	let scrollBtn = document.createElement('button');
	scrollBtn.textContent = "Scroll up"
	document.querySelector('main').appendChild(scrollBtn);
	scrollBtn.setAttribute("id", "scroll_up_btn");
    scrollBtn.setAttribute("class", "scroll_btn");
	scrollBtn.addEventListener('click', function(){
		event.preventDefault();
		document.querySelector('header').scrollIntoView({behavior: "smooth"});
	});
}

(function(){
	const frg = document.createDocumentFragment();
	let i = 0;
	while(i < sections.length){
		addCollapseToSection(sections[i]);
		let section = document.getElementById(`section${i+1}`);
		frg.appendChild(createNavLink(section));
		++i;
	}
	const navLst = document.querySelector('#navbar__list')
    navLst.appendChild(frg);
	createScrollUpBtn();
})();

// Add class 'active' to section when near top of viewport
function inViewPort(section){
	const bounding = section.getBoundingClientRect();
	let isViewPort = (bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
	return isViewPort;
}
function setActiveClass(){

	const sectionLst = document.querySelectorAll('section');
	
	 for(sec of sectionLst){
		 
		 if (inViewPort(sec)){
             sec.classList.add("your-active-class");
         }else{
             sec.classList.remove("your-active-class");
         }
	 }
}

// Scroll to anchor ID using scrollTO event
let scrollToSection = function(event){
	let sectionId = event.target.getAttribute('href');
	var sectionToScroll = document.querySelector(sectionId);
	if(sectionToScroll){
		//event.preventDefault();
		//setActiveClass(sectionToScroll);
		sectionToScroll.scrollIntoView({behavior: "smooth"});
		//event.preventDefault();
	}
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

let navEl = document.getElementById('navbar__list');
navEl.addEventListener("click", function(event){
	scrollToSection(event)
});

// Set sections as active
var isStopScrolling;
document.addEventListener('scroll', function (event) {
	// Clear our timeout throughout the scroll
	window.clearTimeout(isStopScrolling);
	setActiveClass();
    const navBar = document.querySelector('.page__header');
    navBar.style.position = "fixed";
	// Set a timeout to run after scrolling ends
	   isStopScrolling = setTimeout(function() {
          navBar.style.position = "relative";
	   }, 1000);

});

