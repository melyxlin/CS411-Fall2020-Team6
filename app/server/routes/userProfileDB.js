const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://terrylin:CS411-Fall2020-Team6@cs411-fall2020-team6.5vp1g.mongodb.net/CS411-Fall2020-Team6?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//helper functions
async function createUser(client, newUser){
    const result = await client.db("CS411-Fall2020-Team6").collection("Tweet").insertOne(newUser);
    console.log('new user created');
}
async function findUser(client, userName){
    const result = await client.db("CS411-Fall2020-Team6").collection("Tweet").findOne({name: userName});
    if(result){
        console.log('found user')
        console.log(result)
    }
    else{
        console.log('no user found')
    }

}
try {
    await client.connect();

    //call functions

} catch (e) {
    console.error(e);
}finally {
    await client.close();
}
