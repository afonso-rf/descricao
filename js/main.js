const separador = ['::', ' <> ']

let tipo_falha = {
    "ATENUACAO"     :     "ATN",
    "FALHA_DE_HARDWARE" : "FHW",
    "FALHA_DE_SOFTWARE" : "FSW",
    "FALHA_NO_CLIENTE"  : "FCL",
    "OSCILACAO"     :     "OSC",
    "RUPTURA"       :     "RUP",
    "FALHA_DE_ENERGIA"  : "FEG",
    "PERDA_DE_GERENCIA" : "FGR",
    "SUPERAQUECIMENTO"  : "TPA",
    "INTERMITENCIA"     : "INT"
}

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

// tipo_falha = tipo_falha.sort()
for ( n of Object.keys(tipo_falha)) {
    let item = document.createElement('option')
    let lista = document.querySelector('#tipo')
    item.value = `na${n}`
    item.text = n.toUpperCase()
    if (tipo_falha[n] == 'RUP') {
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
    } /* else if (falha.value.length < 4) {
        alert('Dados invalidos! Informe o tipo da falha.')
        falha.focus()
    }*/ else {
        let tipoSelect = document.getElementById('tipo')
        let tipo = tipoSelect.options[tipoSelect.selectedIndex].text
        let operaSelect = document.getElementById('opera')
        let opera = operaSelect.options[operaSelect.selectedIndex].text
        const lista = [hostA[1], hostB[1]]
        const responseList = []
        const uf = {}
        fetch('js/CodigosCNL.json')
            .then(response => response.json())
            .then(data => {
                for (h of lista) {
                    for (i of data) {
                        if (i.SIGLA == h.toUpperCase()) {
                            responseList.push(i.MUNICIPIO)
                            uf[i.MUNICIPIO] = i.UF
                        }
                    }
                }
                let sites = [
                    responseList[0],
                    `${responseList[1]} ${hostA[2].toUpperCase()}`,
                    `${responseList[3]} ${hostB[2].toUpperCase()}`
                ]
                sites = sites.sort()
                let siteUf = sites[0].split(" ")
                siteUf = uf[siteUf]
                res.innerHTML = 
                `${sitesUf}${separador[0]}${tipo_falha[tipo]}${separador[0]}${sites[1]}${separador[1]}${sites[2]}${separador[0]}${opera}`
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
