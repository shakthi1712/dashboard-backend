import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

mongoose.connect("mongodb+srv://shakthi:asv1712@dashboard.rcd9kwr.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Mongodb connected..."))
.catch(err => console.error("error in connecting:", err));

const countrySalesSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    percentage: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const countrysales = mongoose.model('CountrySales', countrySalesSchema);

const userCardSchema = new mongoose.Schema({
    stat: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sales: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    profit: {
        type: String,
        required: true
    }
});

const UserCard = mongoose.model('UserCard', userCardSchema);


app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.status(200).send("Hello");
});

// open api code

app.get("/openapi/users", async (req, res) => {
    try {
      const apiUrl = "https://jsonplaceholder.typicode.com/users"; 
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the external API');
      }
      const data = await response.json(); 
      res.json(data);
    } catch (error) {
      console.error("Error fetching data from the external API:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });




app.post("/post", async (req, res) => {
    const postData = req.body;
    try {
        const sendMethod = await countrysales.create(postData);
        res.status(201).send(sendMethod);
    } catch (error) {
        res.status(500).send({ error: "error while posting" });
    }
});

app.post("/salesdashboard/countrystatus", async (req, res) => {
    const data = req.body;
    try {
        const sendMethod = await countrysales.insertMany(data);
        res.status(201).send(sendMethod);
    } catch (error) {
        res.status(500).send({ error: "error in post" });
    }
});

app.get("/salesdashboard/countrysales/data", async (req, res) => {
    try {
        const getData = await countrysales.find();
        res.status(200).json(getData);
    } catch (error) {
        res.status(500).send({ error: "error in get" });
    }
});

app.post("/salesdashboard/usercard", async (req, res) => {
    const data = req.body;
    try {
        const sendMethod = await UserCard.insertMany(data);
        res.status(201).send(sendMethod);
    } catch (error) {
        res.status(500).send({ error: "error in post" });
    }
});

app.get("/salesdashboard/usercard/usercarddata", async (req, res) => {
    try {
        const getData = await UserCard.find();
        res.status(200).send(getData);
    } catch (error) {
        res.status(500).send({ error: "error in get" });
    }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port - ${PORT}`);
});
