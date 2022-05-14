
import Municipio from "js/municipio"

let tipo = [
    'ROTA',
    'ROTA DWDM',
    'TRANSPORTE',
    'POP',
    'CONEXAO LOCAL',
]

let opera = [
    'MOBWIRE',
    'OI',
    'TIM',
    'UMTELECOM',
    'VIVO',
    'EMBRATEL',
    'TELEBRAS'
]

const divi = [' - ', ' <> ']

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

opera = opera.sort()
for (let o in opera) {
    let item = document.createElement('option')
    let lista = document.querySelector('#opera')
    item.value = `op${o}`
    item.text = opera[o].toUpperCase()
    if (opera[o] == 'MOBWIRE') {
        item.defaultSelected = true
    }
    lista.appendChild(item)
}

function gerar() {
    let res = document.getElementById('res')
    let host1 = document.getElementById('hostA')
    let hostA = host1.value.split('-')
    let host2 = document.getElementById('hostB')
    let hostB = host2.value.split('-')
    let falha = document.getElementById('falha')
    if (hostA.length < 6) {
        alert('Dados invalidos! Informe o Hostname A.')
        host1.value = ""
        host1.focus()
    } else if (hostB.length < 6) {
        alert('Dados invalidos! Informe o Hostmane B.')
        host2.value = ""
        host2.focus()
    } else if (falha.value.length < 4) {
        alert('Dados invalidos! Informe o tipo da falha.')
        falha.value = ""
        falha.focus()
    } else {
        let tipoSelect = document.getElementById('tipo')
        let tipo = tipoSelect.options[tipoSelect.selectedIndex].text
        let operaSelect = document.getElementById('opera')
        let opera = operaSelect.options[operaSelect.selectedIndex].text
        let lista = [
            `${hostA[2].toUpperCase()} ${hostA[3].toUpperCase()}`,
            `${hostB[2].toUpperCase()} ${hostB[3].toUpperCase()}`
        ]
        lista = lista.sort()
        res.innerHTML = `${tipo}${divi[0]}${lista[0]}${divi[1]}${lista[1]}
        ${divi[0]}${opera}${divi[0]}${falha.value.toUpperCase()}`

    }
}
/*
for (let i in municipio) {
    //   if (municipio[i]["UF"] == 'CE'){
    console.log(municipio[i]["SIGLA"]) //["SIGLA"] + "-" + municipio[i]["MUNICIPIO"])
    // }
}

const municipio = {
    'FLA': 'FORTALEZA',
    'AQZ': 'AQUIRAZ',
    'BTT': 'BATURITE',
}
*/
// br-ce-fla-dcm-tp-01