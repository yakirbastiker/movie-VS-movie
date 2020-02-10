let inputLeftDom = document.querySelector('#input-left');
let inputRightDom = document.querySelector('#input-right');
let resultDivLeftDom = document.querySelector('#result-left');
let resultDivRightDom = document.querySelector('#result-right');
let movieStringLeft,movieStringRight;
let movieLeft,movieRight;
let apiKey = '&apikey=f5ab7998';
let apiAddress = 'http://www.omdbapi.com/?t=';


//class movie
class Movie {
    constructor(title,plot, genre, runtime,  awards, boxOffice, imdbVotes, imdbRating, poster){
        this.title = title;
        this.plot = plot;
        this.genre = genre;
        this.runtime = runtime;
        this.awards = awards;
        this.boxOffice = boxOffice;
        this.imdbVotes = imdbVotes;
        this.imdbRating = imdbRating;
        this.poster = poster
    }
}

//add event to input
//get value from input 
// clear input
inputLeftDom.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13) {
        movieStringLeft = e.target.value;
        e.target.value = '';
        //send data and compere
        getMovieData(movieStringLeft, 'left');
    }
})

inputRightDom.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13) {
        movieStringRight = e.target.value;
        e.target.value = '';
        getMovieData(movieStringRight, 'right');
    }
})
 
//send req for movies
function getMovieData(stringOfMovie, side){
    fetch(`${apiAddress}${stringOfMovie}${apiKey}`)
    .then(res => res.json())
        .then( data => {
            if(side === 'left'){
                movieLeft = new Movie(data.Title,data.Plot,
                    data.Genre, data.Runtime,data.Awards,data.BoxOffice,
                    data.imdbVotes,data.imdbRating,data.poster);
                    makeBoxDiv(movieLeft, side);
            }
            else {
                
                movieRight =new Movie(data.Title,data.Plot,
                    data.Genre, data.Runtime,data.Awards,data.BoxOffice,
                    data.imdbVotes,data.imdbRating, data.poste);
                    makeBoxDiv(movieRight, side);
            }
        
        })
        //add messege for error
        .catch(err => console.log(err));
}

//ui - add template of result  //remove old template

function makeBoxDiv (movie, side){
    const titleBox = document.createElement('div');
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${movie.title}`)
    .then(res =>{
        return res.json()
    })
    .then(poster =>{ 
        movie.poster = poster.results[0].poster_path;
    }).then(() =>{
        
        titleBox.classList.add('box-main');
        titleBox.classList.add('box');
        titleBox.innerHTML = `
            <img src="http://image.tmdb.org/t/p/w500${movie.poster}" width="70" height="130" alt="no poster available" class="img-box clearfix">
            <h3 class="box-main">${movie.title} </h3>
            <h4 class="box-genre">${movie.genre}</h4>
            <h4 class="box-runtime">${movie.runtime}</h4>
            <p class="box-plot">${movie.plot}</p>
        `;
    }
    )
    .catch(err=> console.log(err));



    if(side === 'left'){
        resultDivLeftDom.innerHTML = '';
        resultDivLeftDom.appendChild(titleBox);
    } else {
        resultDivRightDom.innerHTML = '';
        resultDivRightDom.appendChild(titleBox);
    }

    for(let key in movie){
        
        if(key !== 'title' && key !== 'plot' && key !=='genre' && key !== 'runtime' && key !== 'poster'){

            if(movie[key] === "N/A") {
                movie[key] = 'not available';
            }
            const divOfBox = document.createElement('div')
            divOfBox.innerHTML = `
                <p class="box-text" id="${key}-${side}">${movie[key]}</p>
                <p class="box-text-title">${key}</p>
                `;
            divOfBox.classList.add('box');
               if(side === 'left') {
                   resultDivLeftDom.appendChild(divOfBox)
               }else {
                   resultDivRightDom.appendChild(divOfBox)
               }
        }
    }

    checkMovies()
}


//ui - check box green/orange add class green/orange
function checkMovies (){
    if(movieLeft && movieRight) {
       
        //check box office
        if(movieLeft.boxOffice.replace(/[^0-9 ]/g, "") > movieRight.boxOffice.replace(/[^0-9 ]/g, "") ){
            document.querySelector('#boxOffice-left').parentNode.classList.add("box-green");
            document.querySelector('#boxOffice-right').parentNode.classList.add("box-orange");
        }else if(movieRight.boxOffice.replace(/[^0-9 ]/g, "") > movieLeft.boxOffice.replace(/[^0-9 ]/g, "")) {
            document.querySelector('#boxOffice-right').parentNode.classList.add("box-green");
            document.querySelector('#boxOffice-left').parentNode.classList.add("box-orange");
        } else {
            document.querySelector('#boxOffice-right').parentNode.classList.remove("box-green","box-orange");
            document.querySelector('#boxOffice-left').parentNode.classList.remove("box-green","box-orange");
        }



        //check imdb votes
        
        if(parseInt(movieLeft.imdbVotes.replace(/[^0-9 ]/g, "")) > parseInt(movieRight.imdbVotes.replace(/[^0-9 ]/g, "")) ){
            document.querySelector('#imdbVotes-left').parentNode.classList.add("box-green");
            document.querySelector('#imdbVotes-right').parentNode.classList.add("box-orange");
        }else if(parseInt(movieRight.imdbVotes.replace(/[^0-9 ]/g, "")) > parseInt(movieLeft.imdbVotes.replace(/[^0-9 ]/g, ""))) {

            document.querySelector('#imdbVotes-right').parentNode.classList.add("box-green");
            document.querySelector('#imdbVotes-left').parentNode.classList.add("box-orange");
        } else {
            document.querySelector('#imdbVotes-right').parentNode.classList.remove("box-green","box-orange");
            document.querySelector('#imdbVotes-left').parentNode.classList.remove("box-green","box-orange");
        }

        //check imdb rating

        if(parseInt(movieLeft.imdbRating.replace(/[^0-9 ]/g, "")) > parseInt(movieRight.imdbRating.replace(/[^0-9 ]/g, "") )){
            document.querySelector('#imdbRating-left').parentNode.classList.add("box-green");
            document.querySelector('#imdbRating-right').parentNode.classList.add("box-orange");
        }else if(parseInt(movieRight.imdbRating.replace(/[^0-9 ]/g, "")) > parseInt(movieLeft.imdbRating.replace(/[^0-9 ]/g, ""))) {
            document.querySelector('#imdbRating-right').parentNode.classList.add("box-green");
            document.querySelector('#imdbRating-left').parentNode.classList.add("box-orange");
        } else {
            document.querySelector('#imdbRating-right').parentNode.classList.remove("box-green","box-orange");
            document.querySelector('#imdbRating-left').parentNode.classList.remove("box-green","box-orange");
        }
        
    }
}



