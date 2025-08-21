/**********************************************************************************************
 * Objetivo: Controller responável pela regra de negócio do CRUD de clientes
 * Data:21/08/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Import do arquivo de consfiguração para menssagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar CRUD no banco de dados
const clientesDAO = require('../../model/DAO/clientes.js')


//Função para inserir um novo cliente
const inserirCliente = async function(cliente, contentType){

    try{
        
        if(contentType == 'application/json'){

            if( 
                cliente.nome       == undefined  ||  cliente.nome      == ''   || cliente.nome      == null   || cliente.nome.length     > 80   ||
                cliente.email      == undefined  ||  cliente.email     == ''   || cliente.email     == null   || cliente.email.length    > 100  ||
                cliente.telefone   == undefined  ||  cliente.telefone  == ''   || cliente.telefone  == null   || cliente.telefone.length > 20   
            ){
                return MESSAGE.ERROR_REQUIRED_FIELD //400
            }else{
                //encamnha os dados do novo cliente para ser inserido no banco de dados
                let resultCliente = await clientesDAO.insertCliente(cliente)

                if(resultCliente){
                
                    return MESSAGE.SUCESS_CREATE_ITEM //201

                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    
    } catch(error){
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }   

}

//Função para atualizar um cliente
const atualizarCliente = async function(cliente, id, contentType){

    try{

        if(contentType == 'application/json'){

            if( 
                id == undefined || id == ''  || id  == null || isNaN(id) || id <= 0 ||
                cliente.nome       == undefined  ||  cliente.nome      == ''   || cliente.nome      == null   || cliente.nome.length     > 80   ||
                cliente.email      == undefined  ||  cliente.email     == ''   || cliente.email     == null   || cliente.email.length    > 100  ||
                cliente.telefone   == undefined  ||  cliente.telefone  == ''   || cliente.telefone  == null   || cliente.telefone.length > 20
            ){

                return MESSAGE.ERROR_REQUIRED_FIELD //400

            }else{

                //Validar se o id existe no Banco de Dados
                let resultCliente = await buscarCliente(parseInt(id))


                if(resultCliente.status_code == 200){
                    
                    //Update

                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    cliente.id = parseInt(id)
                    let result = await clientesDAO.updatetCliente(cliente)

                    if(result){
                        return MESSAGE.SUCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                }else if(resultCliente.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //400
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir um cliente
const excluirCliente = async function(id){

    try{
     
        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let resultCliente = await buscarCliente(parseInt(id))

            if(resultCliente.status_code == 200){

                //Delete

                //Chama fução para deletar os dados do cliente
                let result = await clientesDAO.deleteCliente(id)

                if(result){
                    return MESSAGE.SUCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            }else if (resultCliente.status_code == 404){
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }

    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os clientes
const listarClientes = async function (){

    try{

        let dadosCliente = {}

        //Chama função para retornar os dados do cliente
        let resultCliente = await clientesDAO.selectAllCliente()

        if(resultCliente != false || typeof(resultCliente) == 'object'){

            if(resultCliente.length > 0){

                //Cria um objeto Json para retornar a lista de clientes
                dadosCliente.status = true
                dadosCliente.status_code = 200
                dadosCliente.Items = resultCliente.length
                dadosCliente.clientes = resultCliente
                
                return  dadosJogos//200

            }else{
    
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
        
        
    }catch(erro){

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para buscar um cliente
const buscarCliente = async function (id){
     
    try{

        if(id != '' && id != undefined && id != null && !isNaN(id) && id > 0){

            let dadosCliente = {}

            //Chama fução para retornar os dados do cliente
            let resultCliente = await clientesDAO.selectByIdCliente(id)

            if(resultCliente !== String(resultCliente)){
                
                if(resultCliente != false || typeof(resultCliente) == 'object'){

                    if(resultCliente.length > 0){

                        //Cria um objeto Json para retornar a lista de clientes
                        dadosCliente.status = true
                        dadosCliente.status_code = 200
                        dadosCliente.Items = resultJogo.length
                        dadosClientes.clientes = resultCliente
                         
                        return  dadosCliente//200        
                        
    
                    }else{
            
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }
        
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE//415
            }
            
        }else{
            return ERROR_REQUIRED_FIELD //400
        }


    }catch(result){

    }
    
}

module.exports = {
    inserirCliente,
    atualizarCliente,
    excluirCliente,
    listarClientes,
    buscarCliente
}