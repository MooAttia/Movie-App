let nameInput = document.querySelector('.nameInput')
let ageInput = document.querySelector('.ageInput')
let emailInput = document.querySelector('.emailInput')
let emailAlert = document.querySelector('.emailAlert')
let passwordInput = document.querySelector(".passwordInput")
let passAlert = document.querySelector(".passAlert")
let rePasswordInput = document.querySelector('.rePasswordInput')
let repassAlert = document.querySelector('.repassAlert')
let phoneAlert = document.querySelector('.phoneAlert')
let phoneInput = document.querySelector('.phoneInput')
let submitBtn = document.querySelector('.submitBtn')
let search = document.querySelector('.search')





function close(){
    let x = $('.side-nav .nav-tab').outerWidth();

    $('.side-nav').animate({left : -x } , 500)
        $('.listIcon').addClass('fa-align-justify');
        $('.listIcon').removeClass('fa-x');
        $('.links li').animate({top : 300 } , 500)
  }
close();    
 
$('.side-nav i.listIcon').on('click' , function () {
     
    if($('.side-nav').css('left') == '0px'){
        close();
    }
    else
    {
        $('.side-nav').animate({left : 0 } , 500)
        $('.listIcon').addClass('fa-x');
        $('.listIcon').removeClass('fa-align-justify');
        $('.links li').eq(0).animate({top : 0 } , 600)
        $('.links li').eq(1).animate({top : 0 } , 700)
        $('.links li').eq(2).animate({top : 0 } , 800)
        $('.links li').eq(3).animate({top : 0 } , 900)
        $('.links li').eq(4).animate({top : 0 } , 1000)
        $('.links li').eq(5).animate({top : 0 } , 1100)
    }
  })
 


$(function(){
    $(".spinner").fadeOut(1000 , function(){
        $(".loading").fadeOut(1000);
        $("body").css({overflow: "auto"})
    });

})

let mainOffset = $(".mainSection").offset().top;

$(window).on("scroll" , function(){
    let scroll = $(window).scrollTop();
    if (scroll > mainOffset) {
        $('.scrollUp').fadeIn(1000);
    }
    else
    {
        $('.scrollUp').fadeOut(1000);
    }
})
$('.scrollUp').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
})




$('.emailInput').on("input" , function(){
    let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if(emailRegex.test(emailInput.value) !== true)
    {
        emailAlert.classList.add("d-block")
    }
    else
    {
        emailAlert.classList.remove("d-block")
    }
})
$('.phoneInput').on('input' , function(){
    let phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/g;
    if(phoneRegex.test(phoneInput.value) !== true)
    {
        phoneAlert.classList.add("d-block")
    }
    else
    {
        phoneAlert.classList.remove("d-block")
    }
})
$('.passwordInput').on('input' , function(){
    let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/;
    if(passRegex.test(passwordInput.value) !== true)
    {
        passAlert.classList.add("d-block")
    }
    else
    {
        passAlert.classList.remove("d-block")
    }
})
$('.rePasswordInput').on('input' , function(){
    if(rePasswordInput.value !== passwordInput.value)
    {
        repassAlert.classList.add("d-block")
    }
    else
    {
        repassAlert.classList.remove("d-block")
    }
})
$('.submitBtn').on('click' , function(){
    nameInput.value = null;
    emailInput.value = null;
    ageInput.value = null;
    passwordInput.value = null;
    rePasswordInput.value = null;
    phoneInput.value = null;
})


async function getNowData()
{
  try
  {
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=be348b6e9827777a814fd866a7103bca`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    console.log(arrayData[0].poster_path);
    displayNowPlaying(arrayData)
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}
getNowData();

function displayNowPlaying(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average.toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}

$('.nowPlaying').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
  getNowData();
  displayNowPlaying();
  
})
$('.logoImg').on('click' , function(){
  getNowData();
  displayNowPlaying();
})
async function getPopular()
{
  try{
    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    console.log(arrayData[0].poster_path);
    displayPopular(arrayData)
  }
   catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayPopular(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].original_title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average .toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}

$('.popular').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
  getPopular();
  displayPopular();
})
async function getTopRated()
{
  try{
    let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    console.log(arrayData[0].poster_path);
    displayTopRated(arrayData)
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayTopRated(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].original_title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average .toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}

$('.topRated').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
  getTopRated();
  displayTopRated();
})
async function getupComing()
{
  try{
    let response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    console.log(arrayData[0].poster_path);
    displayTopRated(arrayData)
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayupComing(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].original_title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average .toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}

$('.Upcoming').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
  getupComing();
  displayupComing();
})
async function getTrending()
{
  try{
    let response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    console.log(arrayData[0].poster_path);
    displayTrending(arrayData)
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayTrending(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].original_title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average .toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}

$('.trending').on('click' , function(){
  $('body').animate({scrollTop : 0 } , 1500)
  getTrending();
  displayTrending();
})

async function getSearch(searchTerm)
{
  try{
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=be348b6e9827777a814fd866a7103bca`);
    let data = await response.json();
    let arrayData = data.results;
    console.log(arrayData);
    displaySearch(arrayData)
  }
  catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displaySearch(arrayData){
    let cartona = ``;
    for(let i = 0 ; i < arrayData.length ; i++)
    {
        cartona+=`<div class="col-md-6 col-lg-4 col-12 ">
        <div class="card position-relative ">
          <img
            src="https://image.tmdb.org/t/p/w500${arrayData[i].poster_path}"
            class="card-img-top movieImg" alt="Film Cover">
            <div class="hoverItems position-absolute top-0 bottom-0 p-4 ">
              <div class="title text-center">
                <h1 class="movieName">${arrayData[i].original_title} 2</h1>
              </div>
              <p class="movieDes">${arrayData[i].overview}</p>
              <p class="movieDate">Relaeas Date : ${arrayData[i].release_date}</p>
              <div class="rating movieStars">
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                <i class="fa-solid fa-star-half" style="color: #FFD43B;"></i>
              </div>
              <div class="ratingNum mt-4">
                <span class="num movieRate">${arrayData[i].vote_average .toFixed(1)}</span>
              </div>
            </div>
        </div>
      </div>`
    }
    document.getElementById('rowData').innerHTML = cartona;
}
$('.search').on('input', function () {
  let searchTerm = search.value; 
  getSearch(searchTerm);
  
});


$('.Upcoming').on('click' , function(){
  displayupcoming();
})
$('.contact').on('click' , function(e){
  $('body').animate({scrollTop : 4100} , 1000)
})