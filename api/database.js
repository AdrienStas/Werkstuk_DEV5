class Database{
    constructor(connection, mysql){
        this.connectionVariables = connection
        this.mysql = mysql
    }

    getAllChallenges(callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("select * from challenge",callback)
        connection.end()
    }

    getChallenge(id, callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("select * from challenge where id = ?",[id],callback)
        connection.end()
    }

    insertChallenge(challenge, callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("insert into challenge set ?",challenge,callback)
        connection.end()
    }

    updateChallenge(challenge,id,callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("update challenge set naam = ?, email = ?, opdracht = ?, link = ?, type_id = ? where id = ?",
        [challenge.naam,challenge.email, challenge.opdracht, challenge.link, challenge.type_id, id],callback)
        connection.end()
    }

    deleteChallenge(id,callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("delete from challenge where id = ?",[id],callback)
        connection.end()
    }

    getAllTypes(callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("select * from type",callback)
        connection.end()
    }

    getType(id, callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("select * from type where id = ?",[id],callback)
        connection.end()
    }

    insertType(type, callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("insert into type set ?",type,callback)
        connection.end()
    }

    updateType(type,id,callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("update type set name = ? where id = ?",
        [type.name, id],callback)
        connection.end()
    }

    deleteType(id,callback){
        let connection = this.mysql.createConnection(this.connectionVariables)
        connection.connect()
        connection.query("delete from type where id = ?",[id],callback)
        connection.end()
    }
}

export {
    Database
}