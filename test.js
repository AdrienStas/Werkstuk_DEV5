import { assert } from "chai"
import supertest from "supertest"

const request = supertest("http://localhost:9000")



describe("inzendingen api", ()=>{
    async function getId(){
        let inzendingen = (await request.get("/inzendingen")).body
        for (let inzending of inzendingen){
            if (inzending != undefined) return inzending.id
        }
        return undefined
    }

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

