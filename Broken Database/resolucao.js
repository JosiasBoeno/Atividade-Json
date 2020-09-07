var arquivo = require ('./roken-database.json')
var fs = require ('fs')

function ler () {   // Função que le o arquivo json de forma sincrona
    var dadosCru = fs.readFileSync('./roken-database.json')
    var dadosJson = JSON.parse(dadosCru)
    console.log(dadosJson)
}

function corrigir () {   // Função que corrige os nomes, preços e quantidades.
    arquivo.forEach( item => {               
        for(let x in arquivo) {
            arquivo[x].name = arquivo[x].name.replace('ø', 'o').replace('¢', 'c').replace('æ', 'a')

            arquivo[x].price = parseFloat(arquivo[x].price)

            var propriedade = "quantity";
            var tipo = parseFloat(0)
                            
            if (arquivo[x].hasOwnProperty("quantity") == false) {
                arquivo[x][propriedade] = tipo
            } 
        }
    })    
}

function exportar () {   // Função que exporta a correção em outro arquivo JSON.
    corrigir()
    var data = JSON.stringify(arquivo, null, 2)
    fs.writeFileSync('saida.json', data)
}

var saidaJson = require ('./saida.json')  

function lerCorreçao () {   // função que imprime a lista com todos os nomes dos produtos ordenados..
    saidaJson.sort (function (a, b) {
        return a.id - b.id
    }) 
    saidaJson.sort (function (a, b) {
        if (a.category > b.category) {
            return 1;
        }
        if (a.category < b.category) {
            return -1;
        }
        return 0;
    })
    for (let x in saidaJson) {
        console.log(saidaJson[x].name) 
    }     
}

function calcular() {   //Função que calcula qual é o valor total do estoque por categoria.        
    var eletronicos = saidaJson.filter((o) => {
        return o.category === "Eletrônicos"
    })
        var valorEletronicos = 0
            for (let x in eletronicos) {
                multiplicar = eletronicos[x].price * eletronicos[x].quantity
                valorEletronicos = parseInt(valorEletronicos + multiplicar)
            }   
    var eletrodomesticos = saidaJson.filter((o) => {
        return o.category === "Eletrodomésticos"
    })
        var valorEletrodomesticos = 0
            for (let x in eletrodomesticos) {
                multiplicar = eletrodomesticos[x].price * eletrodomesticos[x].quantity
                valorEletrodomesticos = parseInt(valorEletrodomesticos + multiplicar)
            }
    var panelas = saidaJson.filter((o) => {
        return o.category === "Panelas"
    })
        var valorPanelas = 0
            for (let x in panelas) {
                multiplicar = panelas[x].price * panelas[x].quantity
                valorPanelas = parseInt(valorPanelas + multiplicar)
            }
    var acessorios = saidaJson.filter((o) => {
        return o.category === "Acessórios"
    })
        var valorAcessorios = 0
            for (let x in acessorios) {
                multiplicar = acessorios[x].price * acessorios[x].quantity
                valorAcessorios = parseInt(valorAcessorios + multiplicar)
            }   
    console.log(`Valor total dos produtos: \nEletrônicos: ${valorEletronicos} \nEletrodomésticos: ${valorEletrodomesticos}\nPanelas: ${valorPanelas}\nAcessórios: ${valorAcessorios}`)
}