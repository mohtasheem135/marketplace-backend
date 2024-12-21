// backend/models/Product.js
const base = require('../config/airtableConfig');

const Product = {
  // Fetch all products
  getAll: async () => {
    const products = [];
    await base('Products')
      .select({})
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          products.push({ id: record.id, ...record.fields });
        });
        fetchNextPage();
      });
    return products;
  },

  // Fetch a single product by ID
  getById: async (id) => {
    const product = await base('Products').find(id);
    return { id: product.id, ...product.fields };
  },

  // Create a new product
  create: async (data) => {
    const { name, price, description, imageUrl } = data;
    const createdProduct = await base('Products').create([
      {
        fields: { name, price, description, imageUrl },
      },
    ]);
    return createdProduct;
  },

  // Update a product by ID
  update: async (id, data) => {
    const updatedProduct = await base('Products').update([
      {
        id: id,
        fields: data,
      },
    ]);
    return updatedProduct;
  },

  // Delete a product by ID
  delete: async (id) => {
    const deletedProduct = await base('Products').destroy(id);
    return deletedProduct;
  },
};

module.exports = Product;
