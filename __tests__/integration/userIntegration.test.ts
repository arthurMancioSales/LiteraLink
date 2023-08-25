import { createCookie } from "@/src/utils/test_util/createCookie";
import { createUserForTest } from "@/src/utils/test_util/createUserForTest";

const request = require('supertest');

let user: any;
let cookie: any;

beforeAll( async () =>{
    user = await createUserForTest('userGeral');
    cookie = createCookie(user!);
})

describe('Test for the /api/c Route', () =>{
    it('Should return 404 if there is no registered user.', async () =>{
        const fakeUser ={
            id: 'string',
            name: 'string',
            email: 'email@email.com',
            image: '/imageFake'
        }
        const fakeCookie = await createCookie(fakeUser);
        const res = await request('http://web-test:6060')
        .set('Cookie', [
            `Session=${fakeCookie}`,
        ])
        .get(`/api/user`);
        expect(res.status).toEqual(404);
    });

    it('Should return 200 if the request is successful.', async () =>{
        const res = await request('http://web-test:6060')
        .set('Cookie', [
            `Session=${cookie}`,
        ])
        .get(`/api/user`);
        expect(res.status).toEqual(200);
    });
});