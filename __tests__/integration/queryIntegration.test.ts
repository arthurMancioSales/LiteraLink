const request = require('supertest');

describe("Integration of route search", () => {
    it("Test GET: /api/search/[query]", async () => {
        const teste = 'teste'
        const res = await request('http://web-test:6060')
        .get(`/api/search/${teste}`);
        expect(res.status).toEqual(200);
    });
});