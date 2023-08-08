jest.mock("mongodb");
jest.mock("@/src/repository/user/checkers/checkUserCredentials");
jest.mock("@/src/repository/user/checkers/checkUserNameRepo");
jest.mock("@/src/repository/user/checkers/checkUserEmailRepo");
jest.mock("@/src/repository/user/createUserRepo");
jest.mock("@/src/repository/user/loginRepo");
jest.mock("@/src/repository/user/updateUserRepo");
jest.mock("@/src/repository/users");
jest.mock("@/src/utils/hashPassword");
jest.mock("@/src/repository/user/findUserRepo");
jest.mock("@/src/repository/user/findUserByNameRepo");

import { MongoClient, ObjectId } from "mongodb";
jest.mocked(MongoClient).mockReturnValue(new MongoClient(""));
jest.spyOn(ObjectId, "createFromHexString").mockReturnValue(new ObjectId());

// services
import { registerUser } from "@/src/service/user/createUser";
import { login } from "@/src/service/user/loginUser";
import { postStatistics } from "@/src/service/user/postStatistics";
import { updateUser } from "@/src/service/user/updateUser";
import { getUserById } from "@/src/service/user/getUserById";
import { getUserByName } from "@/src/service/user/getUserByName";

// Checkers
import { checkExistingCredentials } from "@/src/repository/user/checkers/checkUserCredentials";
import { checkUserNameRepo } from "@/src/repository/user/checkers/checkUserNameRepo";
import { checkUserEmailRepo } from "@/src/repository/user/checkers/checkUserEmailRepo";

// repositories
import { createUserRepo } from "@/src/repository/user/createUserRepo";
import { loginRepo } from "@/src/repository/user/loginRepo";
import { users } from "@/src/repository/users";
import { updateUserRepo } from "@/src/repository/user/updateUserRepo";
import { findUserByIdRepo } from "@/src/repository/user/findUserRepo";
import { findUserByNameRepo } from "@/src/repository/user/findUserByNameRepo";

// interfaces
import { IStatistic, IUserUpdate } from "@/src/interfaces/interface";

// Utils
import { hashPassword } from "@/src/utils/hashPassword";


const user = {
    _id: 1,
    name: "edu",
    email: "edu@gmail.com",
    password: "senha123",
    image:
    "https://img.freepik.com/free-photo/confident-attractive-young-outgoing-asian-woman-yellow-top-smiling-friendly-happy-as-cross-hands-chest-posing-white-background-self-assured-sassy-pose-look-determined_176420-36757.jpg?w=740&t=st=1690508577~exp=1690509177~hmac=236a1f520d060dbff430366b4adfeda5fbda663bf017850f98291ecc2448c14f",
    communities: [
        {
            id: 1,
            name: "Comunidade 1",
        },
        {
            id: 3,
            name: "edu world",
        }
    ],
    books: [
        {
            id: 1,
            title: "As Tranças do Rei careca",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalChapter: 15,
            chaptersRead: 15,
            favorite: true,
            lastSequence: "12/12/2012",
            goalExpire: "01/01/2021",
            goalsAchieved: 5,
            goals: [
                {
                    type: "days",
                    partial: 15,
                    total: 15,
                },
                {
                    type: "pages",
                    partial: 395,
                    total: 445,
                },
                {
                    type: "time",
                    partial: 15,
                    total: 60,
                },
            ],
        },
        {
            id: 2,
            title: "Poeira em Baixo Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalChapter: 12,
            chaptersRead: 9,
            favorite: false,
            lastSequence: "12/12/2022",
            goalExpire: "12/12/2023",
            goals: [
                {
                    type: "pages",
                    partial: 395,
                    total: 445,
                },
            ],
        },
        {
            id: 4,
            title: "Poeira no Mar",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalChapter: 12,
            chaptersRead: 9,
            favorite: false,
            lastSequence: "12/12/2022",
            goalExpire: "12/12/2023",
            goals: [
                {
                    type: "pages",
                    partial: 395,
                    total: 445,
                },
            ],
        },
        {
            id: 3,
            title: "Poeiras Cósmicas",
            image:
            "https://img.freepik.com/free-photo/middle-aged-cheerful-dark-skinned-male-with-shining-smile_273609-28538.jpg?w=740&t=st=1690552937~exp=1690553537~hmac=c93caaf252de3841fe45ee8553bbf9965b1684c9abccecd50019216e5583e856",
            status: "lido",
            totalChapter: 12,
            chaptersRead: 9,
            favorite: false,
            lastSequence: "12/12/2022",
            goalExpire: "12/12/2023",
            goals: [
                {
                    type: "pages",
                    partial: 395,
                    total: 445,
                },
            ],
        },
    ],
    statistics: {
        lastSequence: "09/07/2023",
        booksRead: 15,
        readingTime: 241,
        maxSequence: 3,
        actualSequence: 1,
        goalsAchieved: 5,
    },
};

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


    it("should create an user and return its id if all fields are valid", async () => {
        const user = {
            name: "teste",
            email: "teste@test.com",
            password: "123"
        };
                
        jest.mocked(checkExistingCredentials).mockResolvedValue("");

        jest.mocked(createUserRepo).mockResolvedValue({} as ReturnType<typeof createUserRepo>);

        await expect(() =>
            registerUser(user)
        ).resolves;
    });
});

describe("Service loginUser", () => {
    it("should return 'Error: O usuário não existe!' if user does not exist", async () => {
        const user = {
            email: "teste@test.com",
            password: "123"
        };
        
        jest.mocked(loginRepo).mockResolvedValue(null);

        await expect(() =>
            login(user.email, user.password)
        ).rejects.toThrow(expect.objectContaining({ message: "O usuário não existe!" }));
    });

    it("should return 'Error: email or password incorrect' if email or password don't match", async () => {
        const user = {
            email: "user@test.com",
            password: "abc"
        };

        
        jest.mocked(loginRepo).mockResolvedValue({
            _id: new ObjectId(),
            password: "123",
            email: "user@test.com"
        });

        await expect(() =>
            login(user.email, user.password)
        ).rejects.toThrow(expect.objectContaining({ message: "Senha ou Email incorreto!" }));
    });

    it("should return 'Sucess' and session cookie if user credentials match", async () => {
        const user = {
            email: "teste@test.com",
            password: "123"
        };
        
        jest.mocked(loginRepo).mockResolvedValue({
            _id: new ObjectId(),
            password: "123",
            email: "user@test.com"
        });

        await expect(() =>
            login(user.email, user.password)
        ).resolves;
    });

});

describe("Service postStatistics", () => {

    it("should return 'Error: user not found' if user does not exist", async () => {
        const user = {
            id: "1",
        };

        const statistics: IStatistic = {
            actualSequence: 1,
            booksRead: 2,
            goalsAchieved: 3,
            lastSequence: new Date("31-02-2099"),
            maxSequence: 4,
            readingTime: 60,
        };

        jest.spyOn(users, "find").mockReturnValue(undefined);

        await expect(() =>
            postStatistics(user.id, statistics)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Usuário não encontrado" }));
    });
    
    it("should return 'Sucess'", async () => {

        const statistics: IStatistic = {
            actualSequence: 1,
            booksRead: 2,
            goalsAchieved: 3,
            lastSequence: new Date("31-02-2099"),
            maxSequence: 4,
            readingTime: 60,
        };

        jest.spyOn(users, "find").mockReturnValue(user);

        await expect(() =>
            postStatistics(user._id, statistics)
        ).resolves;
    });
});

describe("Service updateUser", () => {
    it("should return 'Error: Esse Apelido já está em uso' if new name is already in use", async () => {
        
        const body: IUserUpdate = {
            email: "test@test.com",
            name: "novo nome",
            password: "123"
        };

        jest.mocked(checkUserNameRepo).mockResolvedValue({
            _id: new ObjectId(),
            name: "novo nome",
        });

        await expect(() =>
            updateUser(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({ message: "Esse Apelido já está em uso" }));
    });

    it("should return 'Error: Esse Email já está em uso' if new email is already in use", async () => {
        
        const body: IUserUpdate = {
            email: "novo_teste@test.com",
            name: "novo teste",
            password: "123"
        };

        jest.mocked(checkUserNameRepo).mockResolvedValue(null);

        jest.mocked(checkUserEmailRepo).mockResolvedValue({
            _id: new ObjectId(),
            email: "novo_teste@test.com",
        });

        await expect(() =>
            updateUser(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({ message: "Esse Email já está em uso" }));
    });

    it("should return 'Error: Erro ao fazer o hash da nova senha' if there is a problem with scrypt", async () => {
        
        const body: IUserUpdate = {
            email: "test@test.com",
            name: "test",
            password: "123"
        };

        jest.mocked(checkUserNameRepo).mockResolvedValue(null);

        jest.mocked(checkUserEmailRepo).mockResolvedValue(null);

        jest.mocked(hashPassword).mockResolvedValue(null);

        await expect(() =>
            updateUser(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({ message: "Erro ao fazer o hash da nova senha" }));
    });

    it("should return 'Error: Erro na busca dos dados do usuário' if there is a problem find user information", async () => {
        
        const body: IUserUpdate = {
            email: "test@test.com",
            name: "test",
            password: "123"
        };

        jest.mocked(checkUserNameRepo).mockResolvedValue(null);

        jest.mocked(checkUserEmailRepo).mockResolvedValue(null);

        jest.mocked(hashPassword).mockResolvedValue("abc");

        jest.mocked(updateUserRepo).mockResolvedValue(null);

        await expect(() =>
            updateUser(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({ message: "Erro na busca dos dados do usuário" }));
    });

    it("should return 'Sucess'", async () => {

        const body: IUserUpdate = {
            email: "test@test.com",
            name: "test",
            password: "123"
        };

        jest.mocked(checkUserNameRepo).mockResolvedValue(null);

        jest.mocked(checkUserEmailRepo).mockResolvedValue(null);

        jest.mocked(hashPassword).mockResolvedValue("abc");

        jest.mocked(updateUserRepo).mockResolvedValue({} as ReturnType<typeof updateUserRepo>);

        await expect(() =>
            updateUser(`${user._id}`, body)
        ).resolves;
    });
});

describe("Service getUserById", () => {
    it("should return 'Error: O usuário não existe!' if user does not exist", async () => {
        
        jest.mocked(findUserByIdRepo).mockResolvedValue(null);

        await expect(() =>
            getUserById(`${user._id}`)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Usuário não encontrado" }));
    });

    it("should return user found", async () => {

        jest.mocked(findUserByIdRepo).mockResolvedValue({} as ReturnType<typeof findUserByIdRepo>);

        await expect(() =>
            getUserById(`${user._id}`)
        ).resolves;
    });

});

describe("Service getUserByName", () => {
    it("should return 'Error: O usuário não existe!' if user does not exist", async () => {
        
        jest.mocked(findUserByNameRepo).mockResolvedValue(null);

        await expect(() =>
            getUserByName(`${user.name}`)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Usuário não encontrado" }));
    });

    it("should return user found", async () => {

        jest.mocked(findUserByNameRepo).mockResolvedValue({} as ReturnType<typeof findUserByNameRepo>);
        
        jest.mocked(findUserByNameRepo).mockResolvedValue({} as ReturnType<typeof findUserByNameRepo>);

        await expect(() =>
            getUserByName(`${user.name}`)
        ).resolves;
    });
});

