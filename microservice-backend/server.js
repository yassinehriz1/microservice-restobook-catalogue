require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const client = require('prom-client');
const { getLastConnectedUser, startGRPCClient } = require('./grpc-client');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); 
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/api/current-user', (req, res) => {
  const username = getLastConnectedUser();
  if (!username) {
    return res.status(404).json({ error: "Aucun utilisateur connecté pour le moment." });
  }
  res.json({ username });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

mongoose.connect("mongodb://admin:pass@mongodb-statefulset-0.mongo-service:27017,mongodb-statefulset-1.mongo-service:27017/catalogue?replicaSet=rs0&authSource=admin")
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

startGRPCClient();

app.listen(process.env.PORT, () => {
  console.log(`🚀 Catalogue service running on port ${process.env.PORT}`);
});
