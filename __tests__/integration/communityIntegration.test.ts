const request = require('supertest');

import { createCommunityForTest } from "../../src/utils/test_util/createCommunityForTest";
import { createCookie } from "../../src/utils/test_util/createCookie";
import { createUserForTest } from "../../src/utils/test_util/createUserForTest";

let user: any;
let userCookie: any;

beforeAll(async () => {
    user = await createUserForTest('userGeral');
    userCookie = await createCookie(user!);
})

describe('teste da rota /api/c', () =>{
    it('Should return 404 if there is no registered community.', async () =>{
        const res = await request('http://web-test:6060')
        .get(`/api/c`);
        expect(res.status).toEqual(404);
    });

    it('Should return 200 if there is at least 1 registered community.', async () =>{
        const user = await createUserForTest('user1');
        await createCommunityForTest(user!, 'comunidade1');

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

    it('Should return 404 if not found a community.', async () =>{
        const queryCommunity = 'comunidade'

        const res = await request('http://web-test:6060')
        .get(`/api/c/${queryCommunity}`);
        expect(res.status).toEqual(404);
    });
    
    it('Should return 200 if the request is successful.', async () =>{
        const queryCommunity = 'comunidade2'
        const user = await createUserForTest('user2');
        await createCommunityForTest(user!, 'comunidade2');

        const res = await request('http://web-test:6060')
        .get(`/api/c/${queryCommunity}`);
        expect(res.status).toEqual(200);
    });
});

describe('teste da rota /api/community', () =>{
    it('Should return 400 if the request input is invalid.', async () =>{
        const body = {
            name: 'comunidade teste ;&%',
            description: 'descrição da comunidade 3',
            image: '/imagem',
            communityGenre: 'Terror'
        }

        const res = await request('http://web-test:6060')
        .post(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .send(body);
        expect(res).toBe({});
    });

    it('Should return 200 if the request is successful.', async () =>{
        const body = {
            name: 'communidade 3',
            description: 'descrição da comunidade 3',
            image: '/imagem',
            communityGenre: 'Terror'
        }

        const res = await request('http://web-test:6060')
        .post(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .send(body);
        expect(res.status).toEqual(201);
    });
});