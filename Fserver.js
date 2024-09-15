const express = require("express");
const axios = require("axios");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

const FAKE_STORE_API = "https://fakestoreapi.com/products";

app.post("/products", async (req, res) => {
  try {
    const response = await axios.post(FAKE_STORE_API, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(FAKE_STORE_API);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Product not found", error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const response = await axios.put(
      `${FAKE_STORE_API}/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${FAKE_STORE_API}/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
