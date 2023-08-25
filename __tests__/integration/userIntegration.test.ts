import { createCookie } from "@/src/utils/test_util/createCookie";
import { createUserForTest } from "@/src/utils/test_util/createUserForTest";
import { eraseDatabase } from "@/src/utils/test_util/eraseDatabase";

const request = require('supertest');

let user: any;
let cookie: any;

beforeAll( async () =>{
    user = await createUserForTest('userGeralUser');
    cookie = createCookie(user!);
});

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
            email: 'emailUser@email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/new-user`)
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 400 if the request input email is invalid.', async () =>{
        const body ={
            name: 'nome99',
            email: 'emailUser%%email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/new-user`)
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 400 if the request input password is invalid.', async () =>{
        const body ={
            name: 'nome99',
            email: 'emailUser@email.com',
            password: 'senha 123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/new-user`)
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const body ={
            name: 'nome99',
            email: 'emailUser@email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/new-user`)
        .send(body);
        expect(res.status).toEqual(200);
    });
});

describe('Test for the /api/update-user Route', () =>{
    it('Should return 400 if the request input name is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/update-user`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .field('name', 'nome %$.')
        .field('email', 'nome#$emai.');
        expect(res).toEqual(400);
    });

    it('Should return 400 if the request input email is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/update-user`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .field('name', 'nome')
        .field('email', 'nome#$emai.');
        expect(res.status).toEqual(400);
    });

    it('Should return 400 if the request input password is invalid.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/update-user`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .field('name', 'nome')
        .field('email', 'nome@email.com')
        .field('password', 'nome emai123');
        expect(res.status).toEqual(400);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const res = await request('http://web-test:6060')
        .patch(`/api/update-user`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .field('name', 'nomeAlterado');
        expect(res.status).toEqual(200);
    });
});

describe('Test for the /api/login', () =>{
    it('Should return 400 if the request input name is invalid.', async () =>{
        const body ={
            email: 'email$%email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/login`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 400 if the request input email is invalid.', async () =>{
        const body ={
            email: 'email@email.com',
            password: 'senha 123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/login`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 404 if the user not exist.', async () =>{
        const body ={
            email: 'email@email.com',
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/login`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .send(body);
        expect(res.status).toEqual(400);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const body ={
            email: user?.email,
            password: 'senha123'
        }
        const res = await request('http://web-test:6060')
        .post(`/api/login`)
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .send(body);
        expect(res.status).toEqual(200);
    });
});