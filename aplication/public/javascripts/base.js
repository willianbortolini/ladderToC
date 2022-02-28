function log(message)
{
    console.log('> ' + message)
}

const cards = document.querySelectorAll('.block')
const dropzones = document.querySelectorAll('.dropzone')


cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})

function dragstart(){
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging')
}

function drag(){

}

function dragend(){
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
    log("removeu")
    this.classList.remove('is-dragging')
}

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})

function dragenter(){
    
}

function dragover(event){
    event.preventDefault();
    this.classList.add('over')

    
    
}

function dragleave(){
    
    this.classList.remove('over')
}

function drop(){    
    log("soltou")
    this.classList.remove('over')
    //get draggin cards
    var nodeCopy = document.querySelector('.is-dragging').cloneNode(true);
    nodeCopy.classList.remove('is-dragging')
    //yhis = dropzone
    this.appendChild(nodeCopy)
}

