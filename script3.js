/*My public key:
48c2b3d3552744c634ae90b2fcb3a3fc
My hash :
992a9b31fcbcd78d6e5e57acf974cbec
 */

//function for show heros depends on search also filter heros depends on key press

const showCorrespondingHeros = () => {
    const xhr = new XMLHttpRequest();
    const name = document.getElementById("name").value;
  
    // IN CASE OF ERROR
      xhr.onerror = function() {
      document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
    }
    // INCASE OF NO ERROR load
    xhr.onload = function(){
      var responseJSON = JSON.parse(xhr.response);
      console.log(responseJSON);
      // const characterAttributes = responseJSON.results;
      let html = "";
      html += "<div class='row'>";
        if (responseJSON.response == "success") {
          responseJSON.results.forEach((element) => {
            html += `
            <div class="col-4" style = "margin-top = 50px;">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" onclick="showDetails(${element.id})" src="${element.image.url}">
                <div class="card-body">
                    <span> <h5 class="card-title" onclick="showDetails(${element.id})">${element.name}`+
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    +`<i id="${element.id}" class="fa-solid fa-plus icon" onclick="addFavourite(${element.id})" style:"align-items: right; cursor:pointer"></i></h5></span>
                </div>
              </div>
            </div>    `
           // console.log(responseJSON.results.length);
      
          });
        }
        document.getElementById("cards-group").innerHTML = html;
    }
  
        xhr.open("GET", `https://www.superheroapi.com/api.php/586069776286026/search/${name}`, true);
  
        xhr.send();
  }
  
  // make a favourites key for storing all favourites hero's id in local storage if not available
  if (localStorage.getItem("favourites")==null) {
    localStorage.setItem("favourites",JSON.stringify([]));
  }else{
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }
  
  
  // function for show heros full details in a new page
  function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
  }
  
  
  // function for adding id value in local storage favourites key if not available this id 
  function addFavourite(id) {
    if (!arr.includes(id) == true) {
      arr.push(id);
      localStorage.setItem("favourites", JSON.stringify(arr));
      alert("your hero added in favourites")
    }else{
      alert("your hero already added in favourites")
    }
  }
  
  
  // CHARACTER
  function character() {
      // SO THAT THE URL CAN HAVE THE NAME INPUT AND ITS VALUE
      let urlQueryParameters = new URLSearchParams(window.location.search),
        queryParameterName = urlQueryParameters.get("name"),
        name = document.getElementById("name").value;
     
      if (queryParameterName !== null && queryParameterName !== "") {
        document.getElementById("name").value = queryParameterName;
        connection();
      } else if (name !== null && name !== "") {
        document
          .getElementById("connectionForm")
          .addEventListener("submit", connection);
          // WORKS ON BOTH CLICK AS WELL AS ENTER EVENT
      } else {
        document.getElementById("characterSection").innerHTML =
          '<h2 id="characterMainTitle">Type Name & Press "ENTER" to get the result....</h2>';
      }
    }
  // CONNECTION
  function connection() {
      const xhr = new XMLHttpRequest();
      const name = document.getElementById("name").value;
      const params = "name=" + name;
      
  
    // ON LOAD-START
        xhr.onloadstart = function() {
            document.getElementById("characterSpinnerSection").innerHTML =
            '<strong id="spinnerText" class="text-primary">Loading character...</strong>' +
            '<div class="text-primary spinner-border ml-auto" role="status" ' +
            'aria-hidden="true" id="spinner"></div>';
        }
    // IN CASE OF ERROR
        xhr.onerror = function() {
            document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
        }
  
    // INCASE OF NO ERROR load
        xhr.onload = function(){
            var responseJSON = JSON.parse(xhr.response);
            // console.log(responseJSON.data.results[0].comics);
            console.log(responseJSON.data.count)
            // IF THE COUNT IS 0 MEANS NO DATA AVAILABLE
            if (responseJSON.data.count === 0) {
              document.getElementById("characterSection").innerHTML =
                '<h2 id="characterMainTitle"><span style="font-weight:bold;">No results for... ' +
                name + "</span>" + ". Try again.</h2>";
              
              document.getElementById("characterSpinnerSection").innerHTML = "";
              document.getElementById("comicsSpinnerSection").innerHTML = "";
              
            }
            // IF SOMETHING WRONG WRITTEN IN THE INPUT
            else if (responseJSON == undefined || responseJSON.length == 0) {
              document.getElementById("characterSection").innerHTML =
                '<h2 id="characterMainTitle">' +
                "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";
              
              document.getElementById("characterSpinnerSection").innerHTML = "";
              document.getElementById("comicsSpinnerSection").innerHTML = "";
              
            } 
            // IF EVERYTHING IS FINE
            else {
              const characterAttributes = responseJSON.data.results[0],
              characterID = responseJSON.data.results[0].id;
              // THE CHACTER INFO SECTION
              let output = "";
              output = output + 
              '<h2 id="characterMainTitle">' +
              "Character" +
              "</h2>" +
              '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard">' +
              '<div id="characterImage">' +
              '<img class="card-img-right flex-auto d-md-block img-fluid"' +
              ' alt="Picture of ' +
              characterAttributes.name +
              '" src="' +
              characterAttributes.thumbnail["path"] +
              "." +
              characterAttributes.thumbnail["extension"] +
              '">' +
              "</div>" +
              '<div class="card-body d-flex flex-column align-items-start">' +
              '<h3 class="mb-0 text-dark" id="characterName">' +
              characterAttributes.name +
              "</h3>" +
              '<p class="card-text mb-3" id="characterDescription">';
              if (characterAttributes.description !== "") {
                output += characterAttributes.description;
              }
              output +=
                "</p>" +
                '<p class="text-muted mb-3" id="comicsAvailable">' +
                "Comics: " +
                characterAttributes.comics.available +
                " | " +
                "Series: " +
                characterAttributes.series.available +
                " | " +
                "Stories: " +
                characterAttributes.stories.available +
                " | " +
                "Events: " +
                characterAttributes.events.available +
                "</p>" +
                '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
                responseJSON["attributionText"] +
                "</p>" +
                "</div>" +
                "</div>";
              document.getElementById("characterSection").innerHTML = output;
              comics(characterID);
            }
        }
  
    // INCASE OF LOAD END
        xhr.onloadend = function() {
            document.getElementById("characterSpinnerSection").innerHTML = '<strong id="spinnerText" class="text-success">done</strong>';
        }
  
        xhr.open("GET", `https://gateway.marvel.com/v1/public/characters?${params}&ts=1&apikey=48c2b3d3552744c634ae90b2fcb3a3fc&hash=992a9b31fcbcd78d6e5e57acf974cbec`, true);
  
        xhr.send();
      }
  
    //COMICS SECTION
  function comics(characterID) {
      const xhr = new XMLHttpRequest();
      var id = characterID;
  
    //LOAD START OF COMICS SECTION 
      xhr.onloadstart = function () {
        document.getElementById("comicsSpinnerSection").innerHTML =
          '<strong id="spinnerText" class="text-danger">Loading comics below...</strong>' +
          '<div class="spinner-border text-danger ml-auto" role="status" ' +
          'aria-hidden="true" id="spinner"></div>';
      }
    //IN CASE OF ERROR
      xhr.onerror = function () {
        document.getElementById("characterSection").innerHTML =
          '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
        document.getElementById("comicSection").innerHTML =
          '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
      }
  
    // ON LOAD SECTION
      xhr.onload = function(){
        var responseJSONcomic = JSON.parse(xhr.response);
        // console.log(responseJSONcomic.data.results);
  
        // IF THE COUNT IS 0 MEANS NO DATA AVAILABLE
        if (responseJSONcomic.data.count === 0) {
          document.getElementById("characterSection").innerHTML =
            '<h2 id="characterMainTitle"><span style="font-weight:bold;">No results for... ' +
            name + "</span>" + ". Try again.</h2>";
          
          document.getElementById("characterSpinnerSection").innerHTML = "";
          document.getElementById("comicsSpinnerSection").innerHTML = "";
          
        }
        // IF SOMETHING WRONG WRITTEN IN THE INPUT
        else if (responseJSONcomic == undefined || responseJSONcomic.length == 0) {
          document.getElementById("characterSection").innerHTML =
            '<h2 id="characterMainTitle">' +
            "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";
          
          document.getElementById("characterSpinnerSection").innerHTML = "";
          document.getElementById("comicsSpinnerSection").innerHTML = "";
          
        } 
        // IF EVERYTHING IS FINE
        else{
            // comics available
            const results = responseJSONcomic;
            let comics = responseJSONcomic.data.results;
            let comicSection = document.getElementById("comicSection");
            let output = "",
              creators = "";
            
              output += '<h2 id="comicMainTitle" >Comics</h2>' + '<div class="card-columns">';
  
            for (const i in comics) {
              if (comics.hasOwnProperty(i)) {
                const comic = comics[i];
  
                output +=
                  '<div class="card">' +
                  '<a href=""><img src="' +
                  comic.thumbnail["path"] +
                  "." +
                  comic.thumbnail["extension"] +
                  '" class="card-img-top" alt="' +
                  comic.title +
                  '"></a>' +
                  '<div class="card-body">' +
                  '<h5 class="card-title">' +
                  comic.title +
                  "</h5>";
  
                if (comic.description != null) {
                  output +=
                    '<p style="font-size: 12px;" class="card-text">' +
                    comic.description +
                    "</p>";
                }
  
                output +=
                  '<p style="font-size: 12px;" class="card-text text-muted">Characters: ';
  
                for (const k in comic.characters.items) {
                  if (comic.characters.items.hasOwnProperty(k)) {
                    const character = comic.characters.items[k];
                    output += character.name.concat(", ");
                  }
                }
  
                output += "</p>";
                output +=
                  '<p style="font-size: 12px;" class="card-text text-muted">Creators: ';
  
                for (const j in comic.creators.items) {
                  if (comic.creators.items.hasOwnProperty(j)) {
                    const creator = comic.creators.items[j];
  
                    output += creator.name.concat(" (" + creator.role + "), ");
                  }
                }
  
                output += "</p>";
                output +=
                  "</div>" +
                  '<div class="card-footer">' +
                  '<small style="line-height: 1;" class="text-muted">' +
                  results["attributionText"] +
                  "</small>" +
                  "</div>" +
                  "</div>";
              }
            }
  
            output += "</div>";
  
            comicSection.innerHTML = output;
        }
      }
  
    // IF LOADING.. IS DONE
      xhr.onloadend = function() {
        document.getElementById("comicsSpinnerSection").innerHTML =
          '<strong id="spinnerText" class="text-success"></strong>';
      }
    // ON ERROR
      xhr.onerror = function () {
        document.getElementById("characterSection").innerHTML =
          '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
        document.getElementById("comicSection").innerHTML =
          '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
      }
  
      xhr.open("GET", `https://gateway.marvel.com/v1/public/characters/${id}/comics?&ts=1&apikey=48c2b3d3552744c634ae90b2fcb3a3fc&hash=992a9b31fcbcd78d6e5e57acf974cbec`, true);
  
      xhr.send();
  
  }  