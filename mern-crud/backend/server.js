const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/merncrud', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
