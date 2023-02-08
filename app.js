let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "",
    affection: Math.ceil(Math.random()*5)
  }

  if (checkForDuplicates(kitten.name) == false) {
    setKittenMood(kitten)

    kittens.push(kitten)
    saveKittens()
  }else{
    alert("You alreaady have a kitten with that name.")
  }
  form.reset()
}

function checkForDuplicates(kittenName) {
    let kittenIndex = kittens.findIndex(kitten => kitten.name === kittenName)
    if (kittenIndex != -1) {
      return true //the name exists
    }else{
      return false
    }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittenList", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittenList"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenTemplate = `<div class="w-100 bg-dark text-danger m-2 p-1 d-flex justify-content-center deleteButton" onclick="clearKittens()">Clear kitten list</div>`

  if (kittens.length > 0){
    kittens.forEach(kitten => {

      kittenTemplate += `
        <div class="card kittenCard">
          <h3 class="mb-1">${kitten.name}</h3>
          <div class="space-between">
            <p>
              <div class="kitten ${kitten.mood}"><img src="moody-logo.png" height="60"></div>
              <div>Mood: ${kitten.mood}</div>
              <div>Affection: ${kitten.affection}</div>
            </p>
            <p class="kittenMenu">
              <i class="action text-danger pr-1" onclick="pet('${kitten.id}')">pet</i>
              <i class="action text-danger pl-1" onclick="catnip('${kitten.id}')">catnip</i>
            </p>
            <p class="kittenMenu">
              <i class="action text-danger" onclick="removeKitten('${kitten.id}')">delete</i>
            </p>
          </div>
        </div>`
    })
  }
  else{
    //you have no kittens
    kittenTemplate = `<div class="card w-100 m2"><h1>You have no kittens!</h1></div>`
  }

  document.getElementById("kittens").innerHTML = kittenTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} kittenId 
 * @return {kittenIndex}
 */
function findKittenById(kittenId) {
  let kittenIndex = kittens.findIndex(kitten => kitten.id === kittenId)
  return kittenIndex
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kittenIndex = findKittenById(id)
  if(Math.random() > .5){
    //increase affection (not above 5)
    if (kittens[kittenIndex].affection <= 4){
    kittens[kittenIndex].affection += 1
    }
  }else{
    //decrease affection (not below 1)
    if (kittens[kittenIndex].affection >= 2){
      kittens[kittenIndex].affection -= 1
      }
  }
  let kitten = {} //create an object to pass to setKittenMood function
  kitten = kittens[kittenIndex]

  setKittenMood(kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kittenIndex = findKittenById(id)
  kittens[kittenIndex].mood = "Tolerant"
  kittens[kittenIndex].affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  switch (kitten.affection){
    case 1:
      kitten.mood = "gone"
      break
    case 2:
      kitten.mood = "angry"
      break
    case 3:
      kitten.mood = "tolerant"
      break
    case 4:
      kitten.mood = "happy"
      break
    case 5:
      kitten.mood = "exultant"
      break
    default:
      kitten.mood = "unknown"
  }

  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.length = 0
  saveKittens()
}

/* 
 * Remove selected kitten
 */
function removeKitten(kittenId) {
  let kittenIndex = kittens.findIndex(kitten => kitten.id === kittenId)
  if (kittenId == -1) {
    throw new Error("Invalid Kitten Id: " + kittenId)
  }
  kittens.splice(kittenIndex, 1)
  saveKittens()
}



/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  //console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
