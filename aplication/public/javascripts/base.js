function log(message) {
    console.log(message)
}

const cards = document.querySelectorAll('.block')
const dropzones = document.querySelectorAll('.dropzone')

$(document).ready(function () {
    //$('.ls-select').select2();
    $('.ls-select').append('<option>teste</option>');

});

const titulo = document.getElementById('titulo')
titulo.addEventListener('click', click => {
    compile()
})



function compile() {
    var tabela = document.getElementById('program');

    $(".code").html('')
    for (i = 0; i < tabela.rows.length; i++) {
        colunas = tabela.rows[i].childNodes;
        for (j = 0; j < colunas.length; j++) {
            elementos = colunas[j].childNodes;
            for (l = 0; l < elementos.length; l++) {
                var typeBlock = elementos[l].getAttribute('ladderType')
                if (typeBlock) {                    
                    //$(".code").append('element: ' + typeBlock +' l:'+i +' c:'+ j)
                }
                //log(elementos[l].getAttribute('ladderType'))
                var e = elementos[l].getElementsByClassName('ls-select')
                try {
                    var value = e[0].options[e[0].selectedIndex].value;
                    //$(".code").append(' | port:' + value)
                } catch (error) {

                }
                if (typeBlock) {
                    //$(".code").append('<br>')
                }
                if(typeBlock == 'c'){
                    $(".code").append('if(!'+value+'){' )
                }
                if(typeBlock == 'o'){
                    $(".code").append('if('+value+'){' )
                }
                if(typeBlock == 'coil'){
                    $(".code").append('digitalWrite(HIGH,'+value+');}else{digitalWrite(LOW,'+value+');}' )
                }
            }
        }
    }
}

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})

function dragstart() {
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))
    this.classList.add('is-dragging')
}

function drag() {

}

function dragend() {
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))
    this.classList.remove('is-dragging')
}

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})



function dragenter() {

}

function dragover(event) {
    event.preventDefault();
    this.classList.add('over')



}

function dragleave() {

    this.classList.remove('over')
}

function drop() {
    this.classList.remove('over')
    this.classList.add('withBlock')
    //get draggin cards
    var nodeCopy = document.querySelector('.is-dragging').cloneNode(true);
    nodeCopy.classList.remove('is-dragging')
    //yhis = dropzone
    if (this.getElementsByClassName('ls-select').length > 0) {
        log('não pode')
    } else {
        this.appendChild(nodeCopy)
    }
}

function removeBlock(este) {
    log(este.nextSibling)
    este.parentElement.classList.remove('withBlock')
    este.nextSibling.remove()
    log('remove this block')
}


