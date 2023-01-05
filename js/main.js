const separador = ['.', '<>', '_', ' ']

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

// --------------------Events------------------------------------
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
    console.log('saiu do tipos de falhas')
})


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
    if (partner.value.length > 0 ){
        partner.classList.add('incluedText')
    }
    if (listPartners.indexOf(partner.value) == -1) {
        console.log('Parceiro não encontrado')
    }
    console.log('saiu de parceiros')
})


hostnameA.addEventListener('keyup', () => {

})
hostnameA.addEventListener('blur', () => {
    if (hostnameA.value.length > 0 ){
        hostnameA.classList.add('incluedText')
    }
    
    console.log('saiu de hostnameA')
})

hostnameB.addEventListener('keyup', () => {

})
hostnameB.addEventListener('blur', () => {
    if (hostnameB.value.length > 0 ){
        hostnameB.classList.add('incluedText')
    }
    
    console.log('saiu de hostnameB')
})

////-------------------Functions---------------------------////

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
    let res = document.getElementById('res')
    let hostA = document.getElementById('hostA').value
    hostA = hostA.split(separador[0])
    let hostB = document.getElementById('hostB').value
    hostB = hostB.split(separador[0])


    let tipoSelect = document.getElementById('tipo').value
    if (tipo.indexOf(tipoSelect) == -1) {
        tipoSelect = `Tipo "${tipoSelect}" não encontrado`
    }
    let operadorSelect = document.getElementById('partners').value
    if (partners.indexOf(operadorSelect) == -1) {
        operadorSelect = `partners"${operadorSelect}" não encontrada`//.options[partnerselect.selectedIndex].text
    }
    let lista = [
        hostA[1].length > 2 ? hostA[1] : hostA[2],
        hostB[1].length > 2 ? hostB[1] : hostB[2]
    ]

    let responseList = []
    let dict = {}
    for (h of lista) {
        for (i of listCnl) {
            if (i.SIGLA == h.toUpperCase()) {
                responseList.push(i.MUNICIPIO)
                dict[i.MUNICIPIO] = i.UF
            }
        }
    }
    let sites = [
        `${responseList[0]}${separador[2]}${hostA[3].toUpperCase()}`,
        `${responseList[1]}${separador[2]}${hostB[3].toUpperCase()}`
    ]
    sites = sites.sort()
    let site1 = sites[0].split(" ")
    console.log(dict[site1[0]])
    res.innerText = `${tipoSelect}${separador[3]}${sites[0]}${separador[1]}${sites[1]}
        ${separador[3]}${operadorSelect}`//${separador[0]}${falha.value.toUpperCase()}
}

//Coletrar os itens com "required"
const fields = document.querySelectorAll("[required]")

// Pocurar eventos
for (let field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault()
        console.log(event)
    })
}



function spanError(ELEMT, EVENT) { }

// Capturar o evento do botão "submit"
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    gerar()
})

// Copiar o texto criado
const copyButton = document.getElementById("copyButton")

copyButton.addEventListener('click', () => {
    let inputText = document.createElement('input')
    inputText.value = document.querySelector("#res").innerText
    document.body.appendChild(inputText)
    inputText.select()
    document.execCommand('copy')
    document.body.removeChild(inputText)
})
