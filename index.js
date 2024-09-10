const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');


const app = express();
app.use(cors());
app.use('/weather',weatherRoutes);

app.listen(5000, ()=>{
console.log("app is up on port 5000");
})