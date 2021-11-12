const database = "Dev5"
const collectionName = "Inzendingen"
const url = `mongodb+srv://Adrien:Adrien@cluster0.m5ynl.mongodb.net/${database}?retryWrites=true&w=majority`

function generateRandomId(){
    return Math.random().toString(16).slice(2)
}


async function connect(mongo){
    const client = await mongo.connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    return client
}

async function getInzendingen(mongo){
    const client = await connect(mongo)
    const collection = client.db(database).collection(collectionName)
    const inzendingen = await collection.find({}).toArray()
    client.close()
    return inzendingen
}

async function getInzeding(mongo, id){
    const client = await connect(mongo)
    const collection = client.db(database).collection(collectionName)
    const inzending = await collection.findOne({id:id})
    client.close()
    return inzending
}

async function insertInzending(mongo,inzending){
    let id = generateRandomId()
    let inzendingen = await getInzendingen(mongo)
    // om te voorkomen dat 2 inzendingen exact dezelfde id hebben
    while (inzendingen.some(x => x.id == id)){
        id = generateRandomId()
    }
    // we kunnen gewoon de update methode gebruiken omdat die het document insert als het nog niet bestaat
    return await updateInzending(mongo,id,inzending)
}

async function updateInzending(mongo,id,inzending){
    const client = await connect(mongo)
    const collection = client.db(database).collection(collectionName)
    // die upsert zegt dat die het document moet inserten als het niet bestaat
    let result = await collection.updateOne({id: id},{$set: inzending},{upsert: true})
    client.close()
    return getInzeding(mongo,id)
}

async function deleteInzending(mongo,id){
    const client = await connect(mongo)
    const collection = client.db(database).collection(collectionName)
    let result = await collection.deleteOne({id:id})
    client.close()
    return result
}

export {
    getInzendingen,
    getInzeding,
    insertInzending,
    updateInzending,
    deleteInzending
}