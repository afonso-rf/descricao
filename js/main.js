const separador = [':', ' <> ']

let tipo = [
    'ROTA',
    'ROTA DWDM',
    'TRANSPORTE',
    'POP',
    'CONEXAO LOCAL',
]

let opera = [
    "MOBWIRE",
    "EMBRATEL",
    "UM TELECOM",
    "ETICE",
    "LUMEN",
    "BRISANET",
    "ADL LINK",
    "OI",
    "MULTIVALE",
    "ALGAR",
    "MEGALINK",
    "VIVO",
    "TIM",
    "TELXIUS",
    "INTERNEXA",
    "GLOBENET",
    "EVO TELECOM",
    "COGENT",
    "CODATA",
    "SKY",
    "TELEBRAS",
    "WEBFOCO",
    "ITS BRASIL",
    "IX",
    "GOOGLE",
    "FACEBOOK",
    "NETFLIX",
    "AKAMAI",
    "TELY",
    "ARAUJO SAT",
    "PONTO A PONTO",
    "MAIS TELECOM",

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
    let hostA = getHostA.value.split('.')
    let getHostB = document.getElementById('hostB')
    let hostB = getHostB.value.split('.')
    let falha = document.getElementById('falha')
    if (hostA.length < 4) {
        alert('Dados invalidos! Informe o Hostname A.\nEx: CE.FLA.FLA.TP01')
        getHostA.focus()
    } else if (hostB.length < 4) {
        alert('Dados invalidos! Informe o Hostmane B.\nEx: CE.FLA.FLA.TP01')
        getHostB.focus()
    } else if (falha.value.length < 4) {
        alert('Dados invalidos! Informe o tipo da falha.')
        falha.focus()
    } else {
        let tipoSelect = document.getElementById('tipo')
        let tipo = tipoSelect.options[tipoSelect.selectedIndex].text
        let operaSelect = document.getElementById('opera')
        let opera = operaSelect.options[operaSelect.selectedIndex].text
        const lista = [hostA[1], hostB[1]]
        const responseList = []
        fetch('js/CodigosCNL.json')
            .then(response => response.json())
            .then(data => {
                for (h in lista) {
                    for (i in data) {
                        if (data[i].SIGLA == lista[h].toUpperCase()) {
                            responseList.push(data[i].MUNICIPIO)
                        }
                    }
                }
                let sites = [
                    `${responseList[0]} ${hostA[2].toUpperCase()}`,
                    `${responseList[1]} ${hostB[2].toUpperCase()}`
                ]
                sites = sites.sort()
                res.innerHTML = `${tipo}${separador[0]}${sites[0]}${separador[1]}${sites[1]}
        ${separador[0]}${opera}${separador[0]}${falha.value.toUpperCase()}`
            });
    }
}

const copyButton = document.getElementById("copyButton")
copyButton.addEventListener('click', () => {
    let inputText = document.createElement('input')
    inputText.value = document.querySelector("#res").innerText
    document.body.appendChild(inputText)
    inputText.select()
    document.execCommand('copy')
    document.body.removeChild(inputText)
})
