const containerEl = $('.container-lg');


function saveData(event){
  console.log('save to local storage: ');
  // this refers to the event.target or the element that was clicked
  console.log(this.parentElement);
  // gets the text from the textarea of the sibling element of the button clicked 
  text = this.parentElement.childNodes[3].value;
  console.log(text);

  // gets id of the parent block to know where to put data
  let parentId = this.parentElement.id;

  localStorage.setItem(parentId, text);
}


function hourCss(){
  let hour = dayjs().format('H');
  console.log('Hour: ' + hour)
  
  console.log(containerEl.children())
  let childEls = containerEl.children();

  for (let i = 0; i < childEls.length; i++){
    if (childEls[i].localName === "div"){
      let blockHour = parseInt(childEls[i].id.substring(5));

      if (blockHour == hour){
        console.log('present')
        // turn block red
        childEls[i].classList.remove('future');
        childEls[i].classList.remove('past');
        childEls[i].classList.add('present');

      } else if (blockHour > hour){
        console.log('future: ')
        // turn block green
        childEls[i].classList.remove('past');
        childEls[i].classList.remove('present');
        childEls[i].classList.add('future');

      } else if (blockHour < hour){
        // turn blokc grey
        console.log('past')
        childEls[i].classList.remove('future');
        childEls[i].classList.remove('present');
        childEls[i].classList.add('past');
      }
    }
  }

}

function loadStorage(){
  let childEls = containerEl.children();
  for (let i = 0; i < childEls.length; i++){
    if (childEls[i].localName === "div"){
      let loadedText = localStorage.getItem(childEls[i].id)
      if (loadedText != null){
        childEls[i].childNodes[3].value = loadedText;
      }
    }
  }
}


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  containerEl.on('click', '.saveBtn', saveData);
  hourCss();
  loadStorage();

});
