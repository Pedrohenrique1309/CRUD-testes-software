/**********************************************************************************************
 * Objetivo: API refrente ao projeto de teste de software
 * Data:21/08/2025
 * Autor: Pedro
 * Versão: 1.0
 * Observação: 
  
        ********** Para configurar e instalar a API,  precimaos das seguintes bibliotecas:
                express                npm install express --save
                cors                   npm instal cors --save
                body-parser            npm instal body-parser --save

        ********** Para configurar e instalar o acesso ao Banco de Dados precimos:   
                prisma                 npm install prisma --save (conexão com o BD)
                prisma/client          npm install @prisma/client --save  (Executa scripts no BD)

        *********** Após a instalação do prisma e do prisma client, devemos:
                npx prisma init (Inicializar o prisma no projeto)

        Para realizar o sincronismo do prisma com o banco de dados, devemos executar o seguinte comando:
                npx prisma migrate dev     
            
        *********** Para instalar o jest para realizar o reste de software devemos realizar o seguinte comando:
                npm install --save-dev jest

 * *******************************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Estabelecendo o formato dos dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Import das cotrollers para realizar o CRUD de dados
const controllerClientes = require('./controller/clientes/controllerClientes.js')

//Cria o objeto app para criar a API
const app = express()

//Configuração do cors
app.use((request, response, next)=>{
        response.header('Acess-Control-Allow-Origin','*')
        response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())
        next()
})

//EndPoint para inserir um cliente no Banco de Dados 
app.post('v1/controle-clientes/clientes', cors(), bodyParserJSON, async function (request,response) {
        
        //Recebe o content type para validar o tipo de dados da requisição
        let contentType = request.headers['content-type']

        //Recebe o conteúdo do body da requisição
        let dadosBody = request.body

        //Encaminhando os dados do body da requisição para a controller inserir no Banco de Dados 
        let resultCliente =  await controllerClientes.inserirCliente(dadosBody,contentType)

        response.status(resultCliente.status_code)
        response.json(resultCliente)

})

//EndPoint para listar todos clientes no Banco de Dados
app.get('v1/controle-clientes/clientes', cors(), async function (request, response) {
        
        //Chama a função para listar os clientes 
        let resultCliente = await controllerClientes.listarClientes()

        response.status(resultCliente.status_code)
        response.json(resultCliente)

})

//EndPoint para buscar cliente no Banco de Dados pelo ID
app.get('v1/controle-clientes/clientes/:id', cors(), async function (request, response) {
        
        let idCliente = request.params.id

        //Chama a função para buscar cliente 
        let resultCliente = await controllerClientes.buscarCliente(idCliente)
        
        
        response.status(resultCliente.status_code)
        response.json(resultCliente)

})

//EndPoint para deletar clientes no Banco de Dados pelo ID
app.delete('v1/controle-clientes/clientes/:id', cors(), async function (request, response) {
        
        let idCliente = request.params.id

        //Chama a função para excluir cliente
        let resultCliente = await controllerClientes.excluirCliente(idCliente)

        response.status(resultCliente.status_code)
        response.json(resultCliente)

})

//EndPoint para atualizar cliente no Banco de Dados pelo ID
app.put('/clientes/:id', cors(), bodyParserJSON, async function (request,response) {
        
        
        //Recebe content-type da requisição
        let contentType = request.headers['content-type']

        //Recebe o ID do cliente
        let idCliente = request.params.id

        //Recebe os dados do cliente encainhado no body da requisição
        let dadosBody = request.body

        let resultCliente = await controllerClientes.atualizarCliente(dadosBody, idCliente, contentType)

        response.status(resultCliente.status_code)
        response.json(resultCliente)

})

app.listen('8080', function(){
    console.log('API aguardando Requisições...')
})