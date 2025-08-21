/**********************************************************************************************
 * Objetivo: Model reponsável pelo CRUD de dados referente a clientes no Banco de Dados
 * Data:21/08/2025
 * Autor: Pedro
 * Versão: 1.0
 * *******************************************************************************************/

//Quando precisar do retorno de dados usar prisma.$queryRawUnsafe(), se for apenas executar usar prisma.$executeRawUnsafe()

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados um novo cliente
const insertCliente = async function(cliente){

    try{

        let sql = `insert into tbl_clientes(
                                            nome,
                                            email,
                                            telefone
                                        )values(
                                            '${cliente.nome}',
                                            '${cliente.email}',
                                            '${cliente.telefone}'
                                        );`

        //Executa o script SQL no BD e AGUARDA o retorno do BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let sqlSelectId = `SELECT * FROM tbl_clientes WHERE nome = '${cliente.nome}' ORDER BY id DESC LIMIT 1`
            let criar = await prisma.$queryRawUnsafe(sqlSelectId)
            return criar[0]
        }else{
            return false
        }

    }catch(error){
        console.log(error)
        return false
    }


}

//Função para atualizar no Banco de Dados um cliente existente
const updatetCliente = async function(cliente){
    
    try{

        let sql = `update tbl_clientes set nome = '${cliente.nome}',
                                        email    = '${cliente.email}',
                                        telefone = '${cliente.telefone }'
                                    where id = ${cliente.id} `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }                            

        
    }catch(error){
        return 
    }

}

//Função para excluir no Banco de Dados um cliente existente
const deleteCliente = async function(id){
    
    try{


        //Script SQL para deletr dados de um cliente pelo seu id
        let sql = `delete from tbl_clientes where id=${id}`

        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{ 
            return false
        }

    }catch(error){
        return false
    }

}

//Função para retornar do Banco de Dados uma lista de clientes
const selectAllCliente = async function(){
    
    try{

        //Script SQL para retornar os dados do banco
        let sql = 'select * from tbl_clientes order by id desc'
        
        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql) 

        if(result){
            return result
        }else{ 
            return false
        }
            
    }catch(error) {
        return false
    } 

}

//Função para buscar no Banco de Dados um cliente pelo ID
const selectByIdCliente = async function(id){

    try{

        //Script SQL para retornar dados de um cliente pelo seu id
        let sql = `select * from tbl_clientes where id=${id}`

        //Executa o Script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)
        
        if(result){
            return result
        }else{ 
            return false
        }

    }catch(result){
        return false
    }

}

module.exports = {
    insertCliente,
    updatetCliente,
    deleteCliente,
    selectAllCliente,
    selectByIdCliente
}