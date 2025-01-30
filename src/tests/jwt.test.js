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
        resolve({ status: res.statusCode, body: JSON.parse(data) });
      });
    });

    req.on("error", (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

let token;

describe("Tests JWT", () => {
  describe("/POST login", () => {
    it("should give the token", async () => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await makeRequest(options, {
        email: "test@test.fr",
        password: "test1234",
      });

      assert.strictEqual(response.status, 200);
      assert.ok(response.body.token, "Token should be present");
      token = response.body.token;
    });
  });

  describe("/GET users", () => {
    it("should give all users", async () => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await makeRequest(options);

      assert.strictEqual(response.status, 200);
      assert.ok(
        Array.isArray(response.body.users),
        "Response should have a 'users' key that is an array",
      );
    });
  });

  describe("/GET users with invalid token", () => {
    it("should return a 401 Unauthorized error", async () => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/users",
        method: "GET",
        headers: {
          Authorization: "Bearer invalidToken123",
        },
      };

      const response = await makeRequest(options);

      assert.strictEqual(response.status, 401);
      assert.ok(response.body.error, "Error message should be present");
    });
  });

  describe("/GET users without token", () => {
    it("should return a 401 Unauthorized error", async () => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path: "/api/v1/users",
        method: "GET",
        headers: {},
      };

      const response = await makeRequest(options);

      assert.strictEqual(response.status, 401);
      assert.ok(response.body.error, "Error message should be present");
    });
  });
});
