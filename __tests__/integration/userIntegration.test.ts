import { createCookie } from "@/src/utils/test_util/createCookie";
import { createUserForTest } from "@/src/utils/test_util/createUserForTest";

const request = require('supertest');

let user: any;
let cookie: any;

beforeAll( async () =>{
    user = await createUserForTest('userGeral');
    cookie = createCookie(user!);
})

describe('Test for the /api/user Route', () =>{
    it('Should return 404 if there is no registered user.', async () =>{
        const fakeUser ={
            id: '603f650a0aaf5211c0ccdb2f',
            name: 'string',
            email: 'email@email.com',
            image: '/imageFake'
        }
        const fakeCookie = await createCookie(fakeUser);
        const res = await request('http://web-test:6060')
        .get(`/api/user`)
        .set('Cookie', [
            `Session=${fakeCookie}`,
        ]);
        expect(res.status).toEqual(404);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const res = await request('http://web-test:6060')
        .get(`/api/user`)
        .set('Cookie', [
            `Session=${cookie}`,
        ]);
        expect(res.status).toEqual(200);
    });
});

describe('Test for the /api/new-user Route', () =>{
    it('Should return 400 if the request input name is invalid.', async () =>{
        const body ={
            name: 'nome %$.',
            email: 'email@email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/user`)
        .send(body);
        expect(res.status).toEqual(404);
    });

    it('Should return 400 if the request input email is invalid.', async () =>{
        const body ={
            name: 'nome',
            email: 'email%%email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/user`)
        .send(body);
        expect(res.status).toEqual(404);
    });

    it('Should return 400 if the request input password is invalid.', async () =>{
        const body ={
            name: 'nome',
            email: 'email@email.com',
            password: 'senha 123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/user`)
        .send(body);
        expect(res.status).toEqual(404);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const body ={
            name: 'nome',
            email: 'email@email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/user`)
        .send(body);
        expect(res.status).toEqual(200);
    });
});