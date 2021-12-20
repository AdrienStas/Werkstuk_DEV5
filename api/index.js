import express from 'express'
import mysql from 'mysql'
import { Database } from './database.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
const connectionVariables = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
}

let db = new Database(connectionVariables,mysql)

app.listen(port, function(){
    console.log("Running on port " + port)
})

function returnResult(error,result, res){
    if (error){
        res.send(error)
    }
    else{
        res.send(result)
    }
}

app.get("/challenges", async(req,res) =>{
    db.getAllChallenges((error, result)=>{
        returnResult(error,result,res)
    })
})

app.get("/challenges/:id", async(req,res) =>{
    let id = req.params.id
    db.getChallenge(id,(error, result)=>{
        returnResult(error,result,res)
    })
})

app.post("/challenges", async(req,res)=>{
    let challenge = req.body
    db.insertChallenge(challenge,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.put("/challenges/:id", async(req,res)=>{
    let id = req.params.id
    let challenge = req.body
    console.log(challenge)
    console.log(id)
    db.updateChallenge(challenge,id,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.delete("/challenges/:id", async(req,res)=>{
    let id = req.params.id
    db.deleteChallenge(id,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.get("/types",async (req,res)=>{
    db.getAllTypes((error,result)=>{
        returnResult(error,result,res)
    })
})

app.get("/types/:id", async(req,res)=>{
    let id = req.params.id
    db.getType(id,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.post("/types", async(req,res)=>{
    let type = req.body
    db.insertType(type,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.put("/types/:id", async(req,res)=>{
    let id = req.params.id
    let type = req.body
    db.updateType(type,id,(error,result)=>{
        returnResult(error,result,res)
    })
})

app.delete("/types/:id", async(req,res)=>{
    let id = req.params.id
    db.deleteType(id,(error,result)=>{
        returnResult(error,result,res)
    })
})
