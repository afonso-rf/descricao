const separador = ['-', '<>', '_', ' ']

let tipo = [
    'ROTA',
    'ROTA DWDM',
    'TRANSPORTE',
    'POP',
    'CONEXAO LOCAL',
]

let operadora = [
    'MOBWIRE',
    'OI',
    'TIM',
    'UMTELECOM',
    'VIVO',
    'EMBRATEL',
    'TELEBRAS',
    'MULTIVALE',
    'EQUINIX',

]

$(function () {
    $("#tipo").autocomplete({
        source: tipo
    })
})

$(function () {
    $('#operadora').autocomplete({
        source: operadora
    })
})
/*
 tipo = tipo.sort()
for (let n in tipo) {
    let item = document.createElement('option')
    let lista = document.querySelector('#tipo')
    item.value = `na${n}`
    item.text = tipo[n].toUpperCase()
    if (tipo[n] == 'ROTA') {
        item.defaultSelected = true
    }
    lista.appendChild(item)
}

operadora = operadora.sort()
for (let o in operadora) {
    let item = document.createElement('option')
    let lista = document.querySelector('#operadora')
    item.value = `op${o}`
    item.text = operadora[o].toUpperCase()
    if (operadora[o] == 'MOBWIRE') {
        item.defaultSelected = true
    }
    lista.appendChild(item)
}
*/

function gerar() {
    let res = document.getElementById('res')
    let getHostA = document.getElementById('hostA')
    let hostA = getHostA.value.split(separador[0])
    let getHostB = document.getElementById('hostB')
    let hostB = getHostB.value.split(separador[0])
    //    let falha = document.getElementById('falha')
    if (hostA.length < 6) {
        alert('Dados invalidos! Informe o Hostname A.\nEx: BR-CE-FLA-FLA-TP-01')
        // getHostA.value = ""
        getHostA.focus()
    }
    else if (hostB.length < 6) {
        alert('Dados invalidos! Informe o Hostmane B.\nEx: BR-CE-FLA-FLA-TP-01')
        // getHostB.value = ""
        getHostB.focus()
    }
    /* else if (falha.value.length < 4) {
       alert('Dados invalidos! Informe o tipo da falha.')
       falha.focus()
   } */
    else {
        let tipoSelect = document.getElementById('tipo').value
        if (tipo.indexOf(tipoSelect) == -1) {
            tipoSelect = `Tipo "${tipoSelect}" não encontrado`
        }
        let operadorSelect = document.getElementById('operadora').value
        if (operadora.indexOf(operadorSelect) == -1) {
            operadorSelect = `Operadora "${operadorSelect}" não encontrada`//.options[operadoraSelect.selectedIndex].text
        }
        var lista = [hostA[2], hostB[2]]
        var responseList = []
        var dict = {}
        fetch('js/CodigosCNL.json')
            .then(response => response.json())
            .then(data => {
                for (h of lista) {
                    for (i of data) {
                        if (i.SIGLA == h.toUpperCase()) {
                            responseList.push(i.MUNICIPIO)
                            dict[i.MUNICIPIO] = i.UF
                        }
                    }
                }
                var sites = [
                    `${responseList[0]}${separador[2]}${hostA[3].toUpperCase()}`,
                    `${responseList[1]}${separador[2]}${hostB[3].toUpperCase()}`
                ]
                sites = sites.sort()
                var site1 = sites[0].split(" ")
                console.log(dict[site1[0]])
                res.innerHTML = `${tipoSelect}${separador[0]}${sites[0]}${separador[1]}${sites[1]}
        ${separador[0]}${operadorSelect}`//${separador[0]}${falha.value.toUpperCase()}

            });
    }
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


function buscarCNL(CNL, JSON) {

}