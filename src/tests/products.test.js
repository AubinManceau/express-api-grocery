/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import assert from "assert";
import http from "http";

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (error) {
          reject(new Error("Failed to parse response body"));
        }
      });
    });

    req.on("error", (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

describe("Tests Products", () => {
  let token;

  before(async () => {
    const loginOptions = {
      hostname: "localhost",
      port: 3000,
      path: "/api/v1/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginResponse = await makeRequest(loginOptions, {
      email: "test@test.fr",
      password: "test1234",
    });

    assert.strictEqual(loginResponse.status, 200);
    token = loginResponse.body.token;
  });

  describe("/GET products", () => {
    it("should give all products", async () => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/products",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await makeRequest(options);
      assert.strictEqual(response.status, 200);
      assert.ok(
        Array.isArray(response.body.products),
        "Response should contain an array of products",
      );
    });
  });

  describe("/GET product", () => {
    it("should give the product", async () => {
      const productId = 8;
      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${productId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await makeRequest(options);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(
        response.body.product.toSale_id,
        productId,
        "Response should contain the correct product",
      );
    });
  });

  describe("/GET product with invalid id", () => {
    it("should return 404", async () => {
      const invalidProductId = 9999;
      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${invalidProductId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await makeRequest(options);
      assert.strictEqual(response.status, 404);
      assert.strictEqual(
        response.body.error,
        "Product not found",
        "Error message should be correct",
      );
    });
  });

  describe("/POST product", () => {
    it("should create the product", async () => {
      const newProduct = {
        name: "New Product",
        description: "product description",
        HT_price: 24.99,
        TTC_price: 35.99,
        margin: 15.0,
        selling_price: 50.99,
        category: "Category description",
        brand: "Brand description",
        weight: 125,
        nb_soldBy: 4,
        nb_stock: 235,
        user_id_supplier: 4,
      };

      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/products",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, newProduct);
      assert.strictEqual(response.status, 201);
      assert.strictEqual(
        response.body.toSale.name,
        newProduct.name,
        "Product should be created successfully",
      );
    });
  });

  describe("/POST product with invalid data", () => {
    it("should return 500 for invalid data", async () => {
      const invalidProduct = {
        name: "New Product",
        description: "product description",
        HT_price: 24.99,
        TTC_price: 35.99,
        margin: 15.0,
        selling_price: "cinquante",
        category: "Category description",
        brand: "Brand description",
        weight: 125,
        nb_soldBy: 4,
        nb_stock: 235,
        user_id_supplier: 4,
      };

      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/products",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, invalidProduct);
      assert.strictEqual(response.status, 500);
      assert.ok(
        response.body.error,
        "Error message should be present for invalid data",
      );
    });
  });

  describe("/PUT product", () => {
    it("should update the product", async () => {
      const updatedProduct = {
        name: "Updated Product",
        category: "Updated Category",
      };
      const productId = 56;

      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${productId}`,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, updatedProduct);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(
        response.body.toSale.name,
        updatedProduct.name,
        "Product should be updated successfully",
      );
    });
  });

  describe("/PUT product with invalid id", () => {
    it("should return 404", async () => {
      const updatedProduct = {
        selling_price: 100.0,
      };
      const invalidProductId = 9999;

      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${invalidProductId}`,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, updatedProduct);
      assert.strictEqual(response.status, 404);
      assert.strictEqual(
        response.body.error,
        "Product not found",
        "Error message should be correct",
      );
    });
  });

  describe("/PUT product with invalid data", () => {
    it("should return 500 for invalid data", async () => {
      const invalidUpdatedProduct = {
        selling_price: "cent",
      };
      const productId = 8;

      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${productId}`,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, invalidUpdatedProduct);
      assert.strictEqual(response.status, 500);
      assert.ok(
        response.body.error,
        "Error message should be present for invalid data",
      );
    });
  });

  describe("/DELETE product with invalid id", () => {
    it("should return 404", async () => {
      const invalidProductId = 9999;

      const options = {
        hostname: "localhost",
        port: 3000,
        path: `/api/v1/products/${invalidProductId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await makeRequest(options);
      assert.strictEqual(response.status, 404);
      assert.strictEqual(
        response.body.error,
        "Product not found",
        "Error message should be correct",
      );
    });
  });
});
