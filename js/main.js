const separador = ['.', '<>', '_', '::']

const urlCnl = "data/codigos-cnl.json"
const urlFailureTypes = "data/tipos-de-falhas.json"
const urlPartners = "data/parceiras.json"

const listCnl = listJson(urlCnl)
const listFailureTypes = listJson(urlFailureTypes)
const listPartners = listJson(urlPartners)

const failureType = document.querySelector('#tipo')
const hostnameA = document.querySelector('#hostA')
const hostnameB = document.querySelector('#hostB')
const partner = document.querySelector('#partner')
const response = document.querySelector('#response')

////--------------------Events------------------------------------
failureType.addEventListener('focus', () => {
    $(function () {
        $("#tipo").autocomplete({
            source: Object.keys(listFailureTypes[0])
        })
    })
})
failureType.addEventListener('keyup', () => {

})
failureType.addEventListener('blur', () => {
    if (failureType.value.length > 0) {
        failureType.classList.add('incluedText')
    }
    if (Object.keys(listFailureTypes[0]).indexOf(failureType.value) == -1) {
        console.log('Tipo não encontrado')
    }
})
//
hostnameA.addEventListener('keyup', () => {
    
})
hostnameA.addEventListener('blur', () => {
    if (hostnameA.value.length > 0) {
        hostnameA.classList.add('incluedText')
    }
})
//
hostnameB.addEventListener('keyup', () => {
    
})
hostnameB.addEventListener('blur', () => {
    if (hostnameB.value.length > 0) {
        hostnameB.classList.add('incluedText')
    }
})
//
partner.addEventListener('focus', () => {
    $(function () {
        $('#partner').autocomplete({
            source: listPartners
        })
    })
})
partner.addEventListener('keyup', () => {

})
partner.addEventListener('blur', () => {
    if (partner.value.length > 0) {
        partner.classList.add('incluedText')
    }
    if (listPartners.indexOf(partner.value) == -1) {
        console.log('Parceiro não encontrado')
    }
})
////-----------------------------------------------------

////-------------------Functions---------------------------

function listJson(URL) {
    let list = []
    fetch(URL).then(resp => resp.json()).then(data => {
        for (item of data) {
            list.push(item)
        }
    })
    return list
}

function gerar() {
    let failureType = document.querySelector('#tipo').value
    let hostA = document.getElementById('hostA').value
    let hostB = document.getElementById('hostB').value
    let selectPartner = document.querySelector('#partner').value
    
    let res = document.getElementById('response')

    let hostnames = [ hostA.split(separador[0]), hostB.split(separador[0])]

    let pops = []

    for (h of hostnames) {
        for (i of listCnl) {
            if (i.SIGLA == (h[1].length > 2 ? h[1]: h[2]).toUpperCase()) {
                i.POP = (h[1].length > 2 ? h[2] : h[3]).toUpperCase()
                pops.push(i)
            }
        }
    }

    pops.sort((a, b)=>{
        return a.MUNICIPIO + a.POP < b.MUNICIPIO + b.POP ? -1 : a.MUNICIPIO + a.POP > b.MUNICIPIO + b.POP ? 1 : 0
    })

    res.innerText = `${pops[0].UF}${separador[3]}${listFailureTypes[0][failureType]}${separador[3]}`+
    `${pops[0].MUNICIPIO}${separador[2]}${pops[0].POP}${separador[1]}`+
    `${pops[1].MUNICIPIO}${separador[2]}${pops[1].POP}${separador[3]}${selectPartner}`
}

////---------------------------------------------------

// Coletrar os itens com "required"
const fields = document.querySelectorAll("[required]")

// Pocurar eventos
for (let field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault()
        console.log(event)
    })
}

// Capturar o evento do botão "submit"
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    gerar()
})

// Copiar o texto criado
const copyButton = document.getElementById("copyButton")

copyButton.addEventListener('click', () => {
    copyButton.classList.remove('active')
    let inputText = document.createElement('input')
    inputText.value = document.querySelector("#response").innerText
    document.body.appendChild(inputText)
    inputText.select()
    document.execCommand('copy')
    document.body.removeChild(inputText)
    copyButton.classList.add('active')
})
