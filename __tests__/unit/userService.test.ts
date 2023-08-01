jest.mock("mongodb");
jest.mock("@/src/repository/user/checkUserCredentials");
jest.mock("@/src/repository/user/createUser");
jest.mock("@/src/repository/user/loginRepository");
// jest.mock("@/src/repository/user/users");

// services
import { registerUser } from "@/src/service/user/createUser";
import { login } from "@/src/service/user/loginUser";
import { postStatics } from "@/src/service/user/postStatistics";

// repositories
import { checkExistingCredentials } from "@/src/repository/user/checkUserCredentials";
import { createUser } from "@/src/repository/user/createUser";
import { MongoClient } from "mongodb";
import { loginRepository } from "@/src/repository/user/loginRepository";
// import { users } from "@/src/repository/users";

// interfaces
import { IStatistic } from "@/src/interfaces/interface";

jest.mocked(MongoClient).mockReturnValue(new MongoClient(""));

describe("Service registerUser", () => {
    it("should return 'Error: email already taken' if emails is already in use", async () => {
        const user = {
            name: "teste",
            email: "teste@test.com",
            password: "123"
        };
        
        jest.mocked(checkExistingCredentials).mockResolvedValue("Email");

        await expect(( ) =>
            registerUser(user)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: email already taken" }));
    });
    
    it("should return 'Error: username already taken' if name is already in use", async () => {
        const user = {
            name: "teste",
            email: "teste@test.com",
            password: "123"
        };
        
        jest.mocked(checkExistingCredentials).mockResolvedValue("Username");

        await expect(() =>
            registerUser(user)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: username already taken" }));
    });


    // Dúvida -> como simular a criação de um documento
    
    // it("should create an user and return its id if all fields are valid", async () => {
    //     const user = {
    //         name: "teste",
    //         email: "teste@test.com",
    //         password: "123"
    //     };
                
    //     jest.mocked(checkExistingCredentials).mockResolvedValue("");

    //     // jest.mocked(createUser).mockResolvedValue();

    //     await expect(() =>
    //         registerUser(user)
    //     ).resolves;
    // });
});

// TODO -> desmockar a rota
describe("Service loginUser", () => {
    it("should return 'Error: user not found' if user does not exist", async () => {
        const user = {
            email: "teste@test.com",
            password: "123"
        };
        
        jest.mocked(loginRepository).mockResolvedValue(null);

        await expect(() =>
            login(user.email, user.password)
        ).rejects.toMatchObject({message: "Error: user not found."});
    });

    // Dúvida -> como simular a busca de um documento
    
    // it("should return 'Error: email or password incorrect' if email or password don't match", async () => {
    //     const user = {
    //         email: "user@test.com",
    //         password: "abc"
    //     };
        
    //     // jest.mocked(loginRepository).mockResolvedValue({"teste@test.com"});

    //     await expect(() =>
    //         login(user.email, user.password)
    //     ).rejects; //.toThrow("Error: user not found.");
    // });

    // Dúvida -> como simular a busca de um documento

    // it("should return 'Sucess' and session cookie if user credentials match", async () => {
    //     const user = {
    //         email: "teste@test.com",
    //         password: "123"
    //     };
        
    //     // jest.mocked(loginRepository).mockResolvedValue({"teste@test.com"});

    //     await expect(() =>
    //         login(user.email, user.password)
    //     ).rejects; //.toThrow("Error: user not found.");
    // });

});

// TODO -> desmockar a rota
describe("Service postStatistics", () => {

    // Dúvida -> da pra testar rota mockada com array global?

    // it("should return 'Error: user not found' if user does not exist", async () => {
    //     const user = {
    //         id: "1",
    //     };

    //     const statistics: IStatistic = {
    //         actualSequence: 1,
    //         booksRead: 2,
    //         goalsAchieved: 3,
    //         lastSequence: new Date("31-02-2099"),
    //         maxSequence: 4,
    //         readingTime: 60,
    //     };

    //     // jest.mocked(users.find).mockReturnValue(undefined);

    //     // await expect(() =>
    //     //     postStatics(user.id, statistics)
    //     // ).toThrow("Error: Usuário não encontrado!");
    // });

    // it("should return 'Error: permission denied' if user requesting != target user") {
        
    // }
    
    // it("should return 'Sucess'", async () => {
    //     const user = {
    //         id: "1",
    //     };

    //     const statistics: IStatistic = {
    //         actualSequence: 1,
    //         booksRead: 2,
    //         goalsAchieved: 3,
    //         lastSequence: new Date("31-02-2099"),
    //         maxSequence: 4,
    //         readingTime: 60,
    //     };

    //     // jest.mocked(users.find).mockReturnValue(undefined);

    //     // await expect(() =>
    //     //     postStatics(user.id, statistics)
    //     // ).toThrow("Error: Usuário não encontrado!");
    // });
});

describe("Service updateUser", () => {
    // it("should return 'Error: user not found' if user does not exist", async () => {
    //     const user = {
    //         id: "1",
    //     };

    //     const statistics: IStatistic = {
    //         actualSequence: 1,
    //         booksRead: 2,
    //         goalsAchieved: 3,
    //         lastSequence: new Date("31-02-2099"),
    //         maxSequence: 4,
    //         readingTime: 60,
    //     };

    //     // jest.mocked(users.find).mockReturnValue(undefined);

    //     // await expect(() =>
    //     //     postStatics(user.id, statistics)
    //     // ).toThrow("Error: Usuário não encontrado!");
    // });

    // it("should return 'Error: permission denied' if user requesting != target user") {
        
    // }
});

