const request = require('supertest');

import { createCommunityForTest } from "../../src/utils/test_util/createCommunityForTest";
import { createCookie } from "../../src/utils/test_util/createCookie";
import { createUserForTest } from "../../src/utils/test_util/createUserForTest";

describe('teste da rota /api/c', () =>{
    it('Should return 404 if there is no registered community.', async () =>{
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(404);
    });

    it('Should return 200 if there is at least 1 registered community.', async () =>{
        const user = await createUserForTest('user1');
        const community = await createCommunityForTest(user!, 'comunidade1');
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(200);
    });
});

describe('teste da rota /api/c/[comunidade]', () =>{
    it('Should return 400 if the request input is invalid.', async () =>{
        const queryCommunity = 'comunidade teste ;&%'
        const res = await request('http://web-test:6060')
        .get(`/api/c/${queryCommunity}`);
        expect(res.status).toEqual(400);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const queryCommunity = 'comunidade1'
        const user = await createUserForTest('user1');
        const community = await createCommunityForTest(user!, 'comunidade1');
        const res = await request('http://web-test:6060')
        .get(`/api/c${queryCommunity}`);
        expect(res.status).toEqual(200);
    });
});