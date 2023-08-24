import { registerUser } from "@/src/service/user/createUser";
import { CustomError } from "@/src/utils/customError";

const TAG = 'TEST (CREATE-USER): ';

export async function createUserForTest(name: string) {
    try {
        const insertValues = {
            name: name,
            email: `${name}@email.com`,
            password: 'senha123'
        };
        const newUser = await registerUser(insertValues);
        const user = {
            id: JSON.stringify(newUser.insertedId),
            name: insertValues.name,
            email: insertValues.email,
            image: '/imagem/teste' 
        }
        return user;
    } catch (e: any) {
        console.log(TAG, e);
    }
}