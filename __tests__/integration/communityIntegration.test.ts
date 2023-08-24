const request = require('supertest');

import { createCommunityForTest } from "../util/createCommunityForTest";
import { createCookie } from "../util/createCookie";
import { createUserForTest } from "../util/createUserForTest";

describe('teste das rotas de community', () =>{
    it('teste na rota /api/c', async () =>{
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(404);
    });

    it('teste na rota /api/c', async () =>{
        const user = await createUserForTest('user1');
        await createCommunityForTest(user!, 'comunidade1');
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(200);
    });
});