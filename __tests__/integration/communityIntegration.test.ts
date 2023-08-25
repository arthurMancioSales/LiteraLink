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

describe('Test for the /api/c Route', () =>{
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

describe('Test for the /api/c/[comunidade] Route', () =>{
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

describe('Test for the POST: /api/community Route', () =>{
    it('Should return 400 if the request input is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .post(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .field('name', 'comunidade teste ;&%')
        .field('description', 'descrição da comunidade 3')
        .field('communityGenre', 'Terror')
        expect(res.status).toBe(400);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const res = await request('http://web-test:6060')
        .post(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .field('name', 'comunidade 3')
        .field('description', 'descrição da comunidade 3')
        .field('communityGenre', 'Terror')
        expect(res.status).toEqual(201);
    });
});

describe('Test for the PATCH: /api/community Route', () =>{
    it('Should return 400 if the request name is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .field('name', 'comunidade teste ;&%')
        expect(res.status).toBe(400);
    });

    it('Should return 403 if communityGenre is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .field('name', 'comunidade 3')
        .field('description', 'descrição da comunidade 3')
        .field('communityGenre', 'terror')
        expect(res.status).toEqual(403);
    });

    it('Should return 200 if the request is successful.', async () =>{
        await createCommunityForTest(user!, 'comunidadeGeral');
        const res = await request('http://web-test:6060')
        .patch(`/api/community`)
        .set('Cookie', [
            `Session=${userCookie}`,
        ])
        .field('id', `123`)
        .field('oldName', `comunidadeGeral`)
        .field('name', `comunidade 123`)
        .field('description', 'descrição da comunidade 3')
        .field('communityGenre', 'Terror')
        expect(res.status).toEqual(200);
    });
});