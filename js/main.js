
//fetching a now playing movie api
const xhr = new XMLHttpRequest();
    
const endPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=41431b33b25c7b8b4e56fbcd22c41ae6&language=en-US&page=1`;

    xhr.open("GET",endPoint);
    xhr.send();
  
    let movieDisplay = document.querySelector(`#movieNow`)
        
    xhr.onreadystatechange = () => {  
    if(xhr.readyState == 4) {
      let jsonData = JSON.parse(xhr.responseText);

    // forEach loops through the results array and populates the div with each movies title,img etc..
    
      jsonData.results.forEach( movie => {
      let img = `http://image.tmdb.org/t/p/w400${movie.poster_path}`;
      movieDisplay.innerHTML +=` 
      <div class="card-deck">    
        <div class="card split">
          <div class="card-header">
            <h5><span class="rating-outline">${movie.vote_average}</span> <span class="card-title title-mod"> ${movie.title} </span></h5>
          </div>   
         <div class="row no-gutters">
           <div class="col-md-6">
            <img src="${img}"  data-id="${movie.id}" class="card-img" alt="This is movie poster">
          </div>
          <div class="col-md-6">
            <div class="card-body">
             <p class="card-text box">Release Date:${movie.release_date}</p>  
             <p class="card-text">${movie.overview.substring(0,380)}...</p>            
           </div>             
          </div>
        </div>
         <div class="card-footer ">
          <a href="#" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-xl" id="movie-detail" data-id="${movie.id}">More info</a>
         </div>
       </div>
     </div>
      `
     });
    }
  }


  // pagination
  const changePage = (page) => {
    let pageKey = `https://api.themoviedb.org/3/movie/now_playing?api_key=41431b33b25c7b8b4e56fbcd22c41ae6&language=en-US&${page}`; 
    xhr.open(`GET`, pageKey);
    xhr.send();

    console.log(page);
    } 
   

// Fetching the video api to get the trailer of a movie..
let displayModal = document.querySelector(".modal-show");
const showVideo = (id) => {
  let api= `https://api.themoviedb.org/3/movie/${id}/videos?api_key=41431b33b25c7b8b4e56fbcd22c41ae6&language=en-US`;
  let videoRequest = new XMLHttpRequest();

  videoRequest.open(`GET`, api);
  videoRequest.send();

  videoRequest.onreadystatechange = function() {
    if(videoRequest.readyState == 4) {
      let xhrRequest= JSON.parse(videoRequest.responseText);
      
      let videoOutput =  `https://www.youtube.com/embed/${xhrRequest.results[0].key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`;
      document.querySelector('#playTrailer').setAttribute('src', videoOutput);
      
    }
  }
}


// Displaying the modal 

  movieDisplay.addEventListener(`click`, function() {
    let movieDetail = event.target.closest(`#movie-detail`);       
    let xhr2 = new XMLHttpRequest();
    let modalApi = `https://api.themoviedb.org/3/movie/${movieDetail.dataset.id}?api_key=41431b33b25c7b8b4e56fbcd22c41ae6&language=en-US&page=1`;
    
    xhr2.open(`GET`, modalApi);
    xhr2.send();
  
    xhr2.onreadystatechange = function() {
      if(xhr2.readyState == 4 ) {
        let jsonData = JSON.parse(xhr2.responseText);
        let img = `http://image.tmdb.org/t/p/w400${jsonData.poster_path}`;

        jsonData.genres.forEach(genres => {
        
        displayModal.innerHTML = `

        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">${jsonData.title}</h3>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
            </div>
         <div class="modal-body row">
           <div class="col">
             <img src="${img}"  data-id="${jsonData.id}" class="shadow p-3 mb-5 bg-white rounded">
           </div>
           <div class="col">
             <h5>Rating:${jsonData.vote_average}</h5>
             <h4 class="title-movie">Overview:</h4>
             <p>${jsonData.overview}</p> 
             <p class="outline">Release Date:${jsonData.release_date}</p>
           <div>
           <div class="embed-responsive embed-responsive-21by9 border">
             <iframe class="embed-responsive-item player" src=""https://www.youtube.com/embed/${showVideo(jsonData.id)}" id="playTrailer" allowfullscreen></iframe>
           </div>  
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <a href="index.html" class="btn btn-primary">Back</a>
           </div>
          </div>
           </div>         
          </div>
         
        `
        })
      }
    }
  });
  
   


