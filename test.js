import { assert } from "chai"
import supertest from "supertest"
import * as database from './database.js'
import mongoDb from 'mongodb'
const mongoClient = mongoDb.MongoClient

const request = supertest("http://localhost:9000")

async function getId(){
    let inzendingen = (await request.get("/inzendingen")).body
    for (let inzending of inzendingen){
        if (inzending != undefined) return inzending.id
    }
    return undefined
}


describe("unit tests: inzendingen API", ()=>{
    it("insert inzending", async ()=>{
        let inzending = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        let addedInzending = await database.insertInzending(mongoClient,inzending)
        assert.notEqual(addedInzending,undefined)
    })
    it("update inzending", async ()=>{
        let id = await getId()
        let inzending = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje 2",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        await database.updateInzending(mongoClient, id, inzending)
        let updatedInzending = await database.getInzeding(mongoClient,id)
        assert.equal(updatedInzending.opdracht,"voetbal trucje 2")
    })
    it("delete inzending test",async ()=>{
        let id = await getId()
        await database.deleteInzending(mongoClient,id)
        let inzending = await database.getInzeding(mongoClient,id)
        assert.equal(inzending,undefined)
    })
})

describe("integration tests: inzendingen api", ()=>{
    it("POST /insert", () =>{
        let inzending = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        return request.post("/insert")
        .send(inzending)
        .expect(200)
        .then(data =>{
            assert.equal(data.body.naam, inzending.naam)
            assert.equal(data.body.email, inzending.email)
            assert.equal(data.body.opdracht, inzending.opdracht)
            assert.equal(data.body.link, inzending.link)
        })
    })

    it("GET /inzendingen", ()=>{
        return request.get("/inzendingen")
        .expect(200)
        .then(data => {
            assert.isNotEmpty(data.body)
        })
    })
    

    it("GET inzending",async () =>{
        let id = await getId()
        return request.get(`/inzending/${id}`)
            .expect(200)
            .then(data =>{
                assert.isNotEmpty(data.body)
            })
    })


    it("PUT /update",async ()=>{
        let inzending = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje deel 2",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        let id = await getId()
        return request.put(`/update/${id}`)
        .send(inzending)
        .expect(200)
        .then(data => {
            assert.equal(data.body.opdracht, "voetbal trucje deel 2")
        })
    })

    it("DELETE /delete", async ()=>{
        let id = await getId()
        return request.delete(`/delete/${id}`)
        .expect(200)
        .then(data => {
            assert.equal(data.body.deletedCount, 1)
        })
    })
})