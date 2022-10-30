const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://modue-65:45U3UxPeN1XdVvLq@cluster0.kfc3dzw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connetToDatabase = async() => {
    try {
        const productList = client.db('UserDb').collection('users');

        app.post('/products', async (req,res) => {
            const product = req.body;
            const result = await productList.insertOne(req.body)
            console.log(result);
            res.send(result)
        })

        app.get('/products', async (req,res) => {
            const cursor = productList.find({});
            const data = await cursor.toArray();
            res.send(data)
            console.log('giving');
        })

        app.delete('/products/:id', async (req,res) => {
            const id = req.params.id;
            const result = await productList.deleteOne({_id: ObjectId(id)});
            res.send(result);
        })

    }
    finally{}
}
connetToDatabase().catch(err => console.log(err.message))

app.get('/', (req,res) => {
    res.send(`Server api is running`)
})
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})