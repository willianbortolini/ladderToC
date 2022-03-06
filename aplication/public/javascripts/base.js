function log(message) {
    console.log(message)
}

const cards = document.querySelectorAll('.block')
const dropzones = document.querySelectorAll('.dropzone')

$(document).ready(function () {
    //$('.ls-select').select2();
    //$('.ls-select').append('<option>teste</option>');

});

const titulo = document.getElementById('titulo')
titulo.addEventListener('click', click => {
    compile()
})



function compile() {
    var currentLine = 0
    var line = 0;
    var variaveis = ''
    var outs = []
    var ins = []
    var insPulseIn = []
    var insPulseOut = []
    var sets = []
    var times = []
    var lineString = ''
    var logs = ''

    function forLine(i, nj = 0) {

        colunas = tabela.rows[i].childNodes;

        for (j = nj; j < colunas.length; j++) {
            //codeString += "j="+j+"-"+i+" - "
            elementos = colunas[j].childNodes;

            for (l = 0; l < elementos.length; l++) {
                var typeBlock = elementos[l].getAttribute('ladderType')
                var e = elementos[l].getElementsByClassName('ls-select')
                try {
                    var value = e[0].options[e[0].selectedIndex].value;
                    var name = e[0].options[e[0].selectedIndex].text;
                    if (j == 1) {
                        lineString = "if(" + lineString
                    }
                } catch (error) {
                }


                if (typeBlock == 'lu') {
                    forLine(i - 1, j)
                    line = i
                }
                if (typeBlock == 'o') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    if(name.includes('Out')){
                        lineString += "digitalRead(out" + value + ")"
                    }else{
                        lineString += "state" + value
                    }
                    
                }
                if (typeBlock == 'c') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    lineString += "!state" + value
                }
                if (typeBlock == 'p') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    insPulseIn.push(value)
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    lineString += "pulseIn" + value
                }
                if (typeBlock == 'pc') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    insPulseIn.push(value)
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    lineString += "!pulseIn" + value
                }
                if (typeBlock == 'pd') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    insPulseOut.push(value)
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    lineString += "pulseDown" + value
                }
                if (typeBlock == 'pdc') {
                    if (j > 1) {
                        lineString += "&&"
                    }
                    insPulseOut.push(value)
                    if (!name.includes('T') && !name.includes('Out')) {
                        ins.push(value)
                    }
                    lineString += "!pulseDown" + value
                }
                if (elementos > 0) {
                    elementos[l].classList.remove("blockError")
                }
                if (typeBlock == 'coil') {
                    /*if (outs.indexOf(value) != -1 || sets.indexOf(value) != -1) {
                        logs = 'Erro na linha:' + i + ' e coluna:' + 6 + "<br> Saída " + value + " ja foi usada anteriormente"
                    } else {*/
                        lineString += "){<br> state" + value + " = 1;<br>}"
                    //}
                    outs.push(value)
                }

                if (typeBlock == 'tcoil') {
                    var quanTenpo = elementos[l].querySelectorAll('input[type=number]')[0].value
                    lineString += "){<br> tempo" + value + " = 1;<br>}else{<br> tempocont"+value+" = millis() + "+quanTenpo+";}<br>"
                    times.push(value)
                }

                if (typeBlock == 'scoil') {
                   /* if (outs.indexOf(value) != -1) {
                        logs = 'Erro na linha:' + i + ' e coluna:' + 6 + "<br> Saída " + value + " ja foi usada anteriormente"
                    } else {*/
                        lineString += "){<br> state" + value + " = 1;<br>}"
                    //}
                    sets.push(value)
                }
                if (typeBlock == 'rcoil') {
                    /*if (outs.indexOf(value) != -1) {
                        logs = 'Erro na linha:' + i + ' e coluna:' + 6 + "<br> Saída " + value + " ja foi usada anteriormente"
                    } else {*/
                        lineString += "){<br> state" + value + " = 0;<br>}"
                    //}
                    sets.push(value)
                }
            }

            currentLine
        }
    }

    var tabela = document.getElementById('program');
    var codeString = ''
    var variaveisOnLoop = ''
    var setup = 'void setup(){<br>Serial.begin(9600);<br>'
    $(".code").html('')

    for (i = 0; i < tabela.rows.length;) {
        forLine(i)
        countIf = 0
        line++
        i = line;
        codeString += lineString
        lineString = ''
    }

    let uniqueOuts = [...new Set(outs)];
    var stringPos = ''
    for (var o = 0, len = uniqueOuts.length; o < len; ++o) {
        variaveis += "const int out" + uniqueOuts[o] + " = " + uniqueOuts[o] + ";<br>"
        variaveisOnLoop += "bool state" + uniqueOuts[o] + " = 0;<br>"
        setup += "pinMode(out" + uniqueOuts[o] + ", OUTPUT);<br>";
        stringPos += "if(state" + uniqueOuts[o] + "){<br>digitalWrite(out" + uniqueOuts[o] + ", HIGH); <br>}else{<br>digitalWrite(out" + uniqueOuts[o] + ", LOW);<br>}"
    }
    let uniqueIns = [...new Set(ins)];
    for (var o = 0, len = uniqueIns.length; o < len; ++o) {
        variaveis += "const int input" + uniqueIns[o] + " = " + uniqueIns[o] + ";<br>"
        setup += "pinMode(input" + uniqueIns[o] + ", INPUT);<br>";
        variaveisOnLoop += "bool state" + uniqueIns[o] + " = digitalRead(input" + uniqueIns[o] + ");<br>"
    }
    let uniqueSets = [...new Set(sets)];
    for (var o = 0, len = uniqueSets.length; o < len; ++o) {
        variaveis += "const int out" + uniqueSets[o] + " = " + uniqueSets[o] + ";<br>"
        variaveis += "bool state" + uniqueSets[o] + ";<br>"
        setup += "pinMode(out" + uniqueSets[o] + ", OUTPUT);<br>";
        stringPos += "if(state" + uniqueSets[o] + "){<br>digitalWrite(out" + uniqueSets[o] + ", HIGH); <br>}else{<br>digitalWrite(out" + uniqueSets[o] + ", LOW);<br>}<br>"
    }
    pulses = ''
    let uniqueinsPulseIn = [...new Set(insPulseIn)];
    for (var o = 0, len = uniqueinsPulseIn.length; o < len; ++o) {
        variaveis += "bool lastState" + uniqueinsPulseIn[o] + "=0;<br>"
        variaveisOnLoop += "bool pulseIn" + uniqueinsPulseIn[o] + "=0;<br>"
        pulses += "if (lastState" + uniqueinsPulseIn[o] + " != state" + uniqueinsPulseIn[o] + " ) { <br>" +
            "if (state" + uniqueinsPulseIn[o] + " ) { <br>" +
            "pulseIn" + uniqueinsPulseIn[o] + "=1;<br>}<br>}<br>"
        stringPos += "lastState" + uniqueinsPulseIn[o] + " = state" + uniqueinsPulseIn[o] + ";<br>"
    }
    let uniqueinsPulseOut = [...new Set(insPulseOut)];
    for (var o = 0, len = uniqueinsPulseOut.length; o < len; ++o) {
        pulses += "if (lastState" + uniqueinsPulseOut[o] + " != state" + uniqueinsPulseOut[o] + " ) { <br>" +
            "if (!state" + uniqueinsPulseOut[o] + " ) { <br>" +
            "pulseDown" + uniqueinsPulseOut[o] + "=1;<br>}<br>}<br>"
        if (uniqueinsPulseIn.indexOf(uniqueinsPulseOut[o]) == -1) {
            variaveis += "bool lastState" + uniqueinsPulseOut[o] + "=0;<br>"
            variaveisOnLoop += "bool pulseDown" + uniqueinsPulseOut[o] + "=0;<br>"
            stringPos += "lastState" + uniqueinsPulseOut[o] + " = state" + uniqueinsPulseOut[o] + ";<br>"
        }
    }
    let uniqueinsTimes = [...new Set(times)];
    for (var o = 0, len = uniqueinsTimes.length; o < len; ++o) {
        variaveis += "long tempocont" + uniqueinsTimes[o] + " = 0;<br>"
        variaveis += "bool state" + uniqueinsTimes[o] + " = 0;<br>"
        variaveisOnLoop += "bool tempo" + uniqueinsTimes[o] + "= false;<br>"
        codeString += "if(tempo" + uniqueinsTimes[o] + "){<br>if(tempocont" + uniqueinsTimes[o] + " < millis()){<br>" +
            "state" + uniqueinsTimes[o] + " = 1;<br>}else{<br>" +
            "state" + uniqueinsTimes[o] + " = 0;<br>}<br>}else{" +
            "state" + uniqueinsTimes[o] + " = 0;<br>" +
            "state" + uniqueinsTimes[o] + " = 0;<br>}<br>"

    }

    setup += "}<br>"
    codeString = variaveis + setup + 'void loop(){<br>' + variaveisOnLoop + pulses + codeString + stringPos + "<br>}";
    $('.logs').html(logs);
    $(".code").append(codeString)
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

    //get draggin cards
    var nodeCopy = document.querySelector('.is-dragging').cloneNode(true);
    nodeCopy.classList.remove('is-dragging')
    var isCoil = nodeCopy.classList.contains("coil")
    var canCoil = this.classList.contains("onlyCoil")
    if (this.getElementsByClassName('block').length > 0 || isCoil != canCoil) {
        log('não pode')
    } else {
        this.appendChild(nodeCopy)
        this.classList.add('withBlock')
    }
}

function removeBlock(este) {
    este.parentElement.classList.remove('withBlock')
    este.nextSibling.remove()
    log('remove this block')
}


