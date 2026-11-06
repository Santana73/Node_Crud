const express = require('express')
const cors = require('cors')
const path = require('path')
const db = require('./db.js')
const PORT = 3005

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/front_end')))

// Listar todas as pessoas
app.get('/pessoas', async (req,res)=>{
    try{

        const [linhas] = await db.query('select * from pessoa');

        if(linhas.length === 0){
        return res.status(404).send({erro: 'Nenhuma pessoa cadastrada'})
    }

    res.status(200).send(linhas)
    }catch(error){
        console.error('Erro detalhado no banco de dados:', error)
        res.status(500).send({erro: 'Consulta não executada'})
    }
    })

app.listen(PORT, (req,res)=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

// Buscar uma pessoa pelo id
app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params

    try{
        const [linhas] = await db.query('select * from pessoa where id = ?',[id])

        if(linhas.length === 0){
            return res.status(404).send({erro:'Pessoa não cadastrada'})
        }
        return res.status(200).send(linhas[0])
    }catch(error){
        console.log(error)
        return res.status(500)
    }
})

// Adiciona novas pessoas 
