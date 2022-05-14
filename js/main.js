const separador = [' - ', ' <> ']

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
    'TELEBRAS',
    'MULTIVALE',
    'EQUINIX',

]

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
    let getHostA = document.getElementById('hostA')
    let hostA = getHostA.value.split('-')
    let getHostB = document.getElementById('hostB')
    let hostB = getHostB.value.split('-')
    let falha = document.getElementById('falha')
    if (hostA.length < 6) {
        alert('Dados invalidos! Informe o Hostname A.\nEx: BR-CE-FLA-FLA-TP-01')
        getHostA.value = ""
        getHostA.focus()
    } else if (hostB.length < 6) {
        alert('Dados invalidos! Informe o Hostmane B.\nEx: BR-CE-FLA-FLA-TP-01')
        getHostB.value = ""
        getHostB.focus()
    } else if (falha.value.length < 4) {
        alert('Dados invalidos! Informe o tipo da falha.')
        falha.value = ""
        falha.focus()
    } else {
        let tipoSelect = document.getElementById('tipo')
        let tipo = tipoSelect.options[tipoSelect.selectedIndex].text
        let operaSelect = document.getElementById('opera')
        let opera = operaSelect.options[operaSelect.selectedIndex].text
        const lista = [hostA[2], hostB[2]]
        const responseList = []
        fetch('js/CodigosCNL.json')
            .then(response => response.json())
            .then(data => {
                for (h in lista) {
                    for (let i in data) {
                        if (data[i].SIGLA == lista[h].toUpperCase()) {
                            responseList.push(data[i].MUNICIPIO)
                        }
                    }
                }
                let sites = [
                    `${responseList[0]} ${hostA[3].toUpperCase()}`,
                    `${responseList[1]} ${hostB[3].toUpperCase()}`
                ]
                sites = sites.sort()
                res.innerHTML = `${tipo}${separador[0]}${sites[0]}${separador[1]}${sites[1]}
        ${separador[0]}${opera}${separador[0]}${falha.value.toUpperCase()}`
            });
    }
}
