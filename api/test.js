import { assert } from "chai"
import supertest from "supertest"
import { Database } from './database.js'
import dotenv from 'dotenv'
import mysql from 'mysql';
dotenv.config()
const request = supertest("http://10.3.51.232:3000")

const connectionVariables = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
}

let db = new Database(connectionVariables,mysql)


describe("unit tests: challenges API", ()=>{
    let insertedId = undefined
    it("insert challenge", async ()=>{
        let challenge = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type_id: 1
        }
        let promise = new Promise(function(resolve,reject) {
            db.insertChallenge(challenge, (error, result)=>{
                insertedId = result.insertId
                db.getChallenge(result.insertId, (error,insertedChallenges)=>{
                    let insertedChallenge = insertedChallenges[0]
                    assert.equal(challenge.naam,insertedChallenge.naam)
                    assert.equal(challenge.email,insertedChallenge.email)
                    assert.equal(challenge.opdracht,insertedChallenge.opdracht)
                    assert.equal(challenge.link,insertedChallenge.link)
                    assert.equal(challenge.type_id,insertedChallenge.type_id)
                    resolve()
                })
            })
        })
        await promise
    })

    it("update challenge", async ()=>{
        let challenge = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje 2",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type_id: 3
        }
        let promise = new Promise(function(resolve, reject) {
            db.updateChallenge(challenge,insertedId,(error,result)=>{
                db.getChallenge(insertedId,(error,result)=>{
                    let updatedRow = result[0]
                    assert.equal(challenge.opdracht,updatedRow.opdracht)
                    resolve()
                })
            })
        })
        await promise
    })
    it("delete inzending test",async ()=>{
        let promise = new Promise(function(resolve,reject){
            db.deleteChallenge(insertedId,(error,result)=>{
                db.getChallenge(insertedId,(error,result)=>{
                    assert.isEmpty(result)
                    resolve()
                })
            })
        })
        await promise
    })
})

describe("integration tests: challenges api", ()=>{
    let insertedId = undefined
    it("POST /insert", () =>{
        let challenge = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type_id: 1
        }
        return request.post("/challenges")
        .send(challenge)
        .expect(200)
        .then(data =>{
            insertedId = data.body.insertId
            db.getChallenge(insertedId, async (error,result)=>{
                let insertedRow = result[0]
                let promise = new Promise(function (resolve,reject){
                    assert.equal(insertedRow.naam,challenge.naam)
                    assert.equal(insertedRow.email,challenge.email)
                    assert.equal(insertedRow.opdracht,challenge.opdracht)
                    assert.equal(insertedRow.link,challenge.link)
                    resolve()
                })
                await promise
            })
        })
    })

    it("GET /challenges", ()=>{
        return request.get("/challenges")
        .expect(200)
        .then(data => {
            assert.isNotEmpty(data.body)
        })
    })
    

    it("GET challenges",async () =>{
        return request.get(`/challenges/${insertedId}`)
            .expect(200)
            .then(data =>{
                assert.isNotEmpty(data.body)
            })
    })


    it("PUT /update",async ()=>{
        let challenge = {
            naam: "Adrien",
            email: "adrien.stas@student.ehb.be",
            opdracht: "voetbal trucje deel 2",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type_id: 3
        }
        return request.put(`/challenges/${insertedId}`)
        .send(challenge)
        .expect(200)
        .then(async data => {
            let promise = new Promise(function(resolve,reject){
                db.getChallenge(insertedId,(error,result)=>{
                    assert.equal(result[0].opdracht,challenge.opdracht)
                    resolve()
                })
            })
            await promise
        })
    })

    it("DELETE /delete", async ()=>{
        return request.delete(`/challenges/${insertedId}`)
        .expect(200)
        .then(async data => {
            let promise = new Promise(function(resolve,reject){
                db.getChallenge(insertedId,(error,result)=>{
                    assert.isEmpty(result)
                    resolve()
                })
            })
            await promise
        })
    })
})

describe("integration tests: types api", ()=>{
    let insertedId = undefined
    it("POST /insert", async () =>{
        let type = {
            name: "new type",
        }
        return request.post("/types")
            .send(type)
            .expect(200)
            .then(async data => {
                insertedId = data.body.insertId
                console.log(insertedId)
                let promise = new Promise(function(resolve,reject){
                    db.getType(insertedId, (error,result)=>{
                        let insertedRow = result[0]
                        assert.equal(insertedRow.name,type.name)
                        resolve()
                    })
                })
                await promise
            })
    })

    it("GET /types", ()=>{
        return request.get("/types")
            .expect(200)
            .then(data => {
                assert.isNotEmpty(data.body)
            })
    })
    

    it("GET /type/id",async () =>{
        return request.get(`/types/${insertedId}`)
            .expect(200)
            .then(data =>{
                assert.isNotEmpty(data.body)
            })
    })


    it("PUT /update",async ()=>{
        let type = {
            name: "updated type"
        }
        return request.put(`/types/${insertedId}`)
            .send(type)
            .expect(200)
            .then(async data => {
                let promise = new Promise(function(resolve,reject){
                    db.getType(insertedId,(error,result)=>{
                        let updatedRow = result[0]
                        assert.equal(updatedRow.name,type.name)
                        resolve()
                    })
                })
                await promise
            })
    })

    it("DELETE /delete", async ()=>{
        return request.delete(`/types/${insertedId}`)
            .expect(200)
            .then(async data => {
                let promise = new Promise(function(resolve,reject){
                    db.getType(insertedId,(error,result)=>{
                        assert.isEmpty(result)
                        resolve()
                    })
                })
                await promise
            })
    })
})

