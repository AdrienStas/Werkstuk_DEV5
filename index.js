import express from 'express'
import mongo from 'mongodb'
import bodyParser from 'body-parser'
const app = express()
const port = 9000

app.use(bodyParser.json())

app.listen(port, function(){
    console.log("Running on port " + port)
})

app.get("/inzendingen", async function(request, response){

})

app.get("/inzending/:id", async function(request, response){
    
})

app.post("/insert", async function(request, response){
    
})

app.put("/update/:id", async function(request, response){
    
})

app.delete("/delete/:id", async function(request,response){
    
})

