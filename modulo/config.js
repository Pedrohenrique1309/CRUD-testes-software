/**********************************************************************************************
 * Objetivo: Arquivo de padronizacao de mensagens e status code do projeto
 * Data:21/0/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

/*********************************** MENSAGENS DE EROO ****************************************/

const ERRO_RIQUERIDE_FIELDES = {staus: false, status_code:400, message: "Existe campos obrigatório, que não foram preenchidos ou ultrapassara a quantidade de caracteres. A requisição não pode ser realizada!!!"}

const ERROR_INTERNAL_SERVER_MODEL =  {status: false, status_code:500, message:"Não foi possível acessar a requisão, pois ocorreram erros internos no servior da MODEL!!! "}

const ERROR_INTERNAL_SERVER_CONTROLLER =  {status: false, status_code:500, message:"Não foi possível acessar a requisão, pois ocorreram erros internos no servior da CONTROLLER!!!"}

const ERROR_CONTENT_TYPE = {staus:false, status_code: 415, message: "Não foi possivel acessa a reuisição, pois, o formato de dados encaminhado não é suportado pelo servidor. Favor encaminhar apenas JSON!"}

const ERROR_NOT_FOUND = {staus:false, status_code:404, message:"Não foram encontrados itens para retornar!!!"}

const ERROR_RIQUERIDE_VALUE = {staus: false, status_code: 400, message: "O valor informado não existe no banco de dados!"}


/*********************************** MENSAGENS DE  SUCESSO***********************************/

const SUCESS_CREATE_ITEM = {staus: true, status_code: 201, message: "Item criado com sucesso!!!"}

const SUCESS_DELETE_ITEM = {staus: true, status_code: 200, message: "Item deletado com sucesso!!!"}

const SUCESS_UPDATE_ITEM = {staus: true, status_code: 200, message: "Item atualizado com sucesso!!!"}



module.exports = {
    ERRO_RIQUERIDE_FIELDES,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATE_ITEM,
    SUCESS_DELETE_ITEM,
    ERROR_RIQUERIDE_VALUE,
    SUCESS_UPDATE_ITEM
}