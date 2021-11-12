import express from 'express'
import mongo from 'mongodb'
import bodyParser from 'body-parser'
import * as database from './database.js'
const app = express()
const port = 9000

app.use(bodyParser.json())

app.listen(port, function(){
    console.log("Running on port " + port)
})

app.get("/inzendingen", async function(request, response){
    let inzendingen = await database.getInzendingen(mongo.MongoClient)
    response.send(inzendingen)
})

app.get("/inzending/:id", async function(request, response){
    let id = request.params.id
    let inzending = await database.getInzeding(mongo.MongoClient,`${id}`)
    response.send(inzending)
})

app.post("/insert", async function(request, response){
    let inzending = request.body
    if (inzending == undefined){
        response.send({
            error: "Er moet een inzending meegegeven worden"
        })
    }
    let insertResultaat = await database.insertInzending(mongo.MongoClient,inzending)
    response.send(insertResultaat)
})

app.put("/update/:id", async function(request, response){
    let inzending = request.body
    let id = request.params.id
    if (inzending == undefined){
        response.send({
            error: "Er moet een inzending meegegeven worden"
        })
    } 
    let updateResult = await database.updateInzending(mongo.MongoClient,`${id}`,inzending)
    response.send(updateResult)
})

app.delete("/delete/:id", async function(request,response){
    let id = request.params.id
    let deleteResult = await database.deleteInzending(mongo.MongoClient,`${id}`)
    response.send(deleteResult)
})

app.delete("/delete/:id", async function(request,response){
    let id = request.params.id
    response.send(await database.deleteInzending(mongo.MongoClient,`${id}`))
})


