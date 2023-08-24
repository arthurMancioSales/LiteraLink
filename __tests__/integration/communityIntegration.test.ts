const request = require('supertest');

import { createCommunityForTest } from "../../src/utils/test_util/createCommunityForTest";
import { createCookie } from "../../src/utils/test_util/createCookie";
import { createUserForTest } from "../../src/utils/test_util/createUserForTest";

describe('teste da rota /api/c', () =>{
    it('Deve retornar 404 casó não tenha nenhuma comunidade cadastrada', async () =>{
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(404);
    });

    it('Deve retornar 200 casó tenha pelo menos 1 comunidade cadastrada', async () =>{
        const user = await createUserForTest('user1');
        const community = await createCommunityForTest(user!, 'comunidade1');
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(200);
    });
});

describe('teste da rota /api/c/[comunidade]', () =>{
    it('Deve retornar 400 caso o input da requisição seja inválido', async () =>{
        const queryCommunity = 'comunidade teste ;&%'
        const res = await request('http://web-test:6060')
        .get(`/api/c/${queryCommunity}`);
        expect(res.status).toEqual(400);
    });

    it('Deve retornar 200 caso a requisição seja bem sucedida', async () =>{
        const queryCommunity = 'comunidade1'
        // const user = await createUserForTest('user1');
        // const community = await createCommunityForTest(user!, 'comunidade1');
        const res = await request('http://web-test:6060')
        .get(`/api/c${queryCommunity}`);
        expect(res.status).toEqual(200);
    });
});