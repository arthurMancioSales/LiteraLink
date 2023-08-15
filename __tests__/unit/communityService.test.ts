jest.mock("mongodb");
import { MongoClient, ObjectId } from "mongodb";

jest.mocked(MongoClient).mockReturnValue(new MongoClient(""));
jest.spyOn(ObjectId, "createFromHexString").mockReturnValue(new ObjectId());

jest.mock("@/src/repository/community/checkers/isMember");
jest.mock("@/src/repository/community/checkers/checkIsAdminCommunityRepo");
jest.mock("@/src/repository/community/checkers/checkCommunityRepo");

jest.mock("@/src/repository/community/removeMemberCommunityRepo");
jest.mock("@/src/repository/community/getallCommunityRepo");
jest.mock("@/src/repository/community/getCommunityByNameRepo");
jest.mock("@/src/repository/community/checkers/checkCommunityRepo");
jest.mock("@/src/repository/community/patchCommunityRepo");
jest.mock("@/src/repository/community/postAddRepo");
jest.mock("@/src/repository/community/createCommunityRepo");

jest.mock("@/src/repository/user/findUserRepo");

// Checkers
import { isMember } from "@/src/repository/community/checkers/isMember";
import { checkIsAdminCommunity } from "@/src/repository/community/checkers/checkIsAdminCommunityRepo";
import { checkExistingCommunityName } from "@/src/repository/community/checkers/checkCommunityRepo";

// interfaces
import { ICreateCommunity, IPatchCommunity } from "@/src/interfaces/interface";

// Utils

// services
import { removeMemberFromCommunity } from "@/src/service/community/removeMemberCommunity";
import { getAllCommunities } from "@/src/service/community/getAllCommunities";
import { getCommunity } from "@/src/service/community/getCommunity";
import { patchCommunity } from "@/src/service/community/patchCommunity";
import { postAddUserCommunity } from "@/src/service/community/postAddUserCommunity";
import { postCommunity } from "@/src/service/community/postCommunity";

// repositories
import { removeMemberCommunityRepo } from "@/src/repository/community/removeMemberCommunityRepo";
import { getallCommunityRepo } from "@/src/repository/community/getallCommunityRepo";
import { getCommunityByNameRepo } from "@/src/repository/community/getCommunityByNameRepo";
import { patchCommunityRepo } from "@/src/repository/community/patchCommunityRepo";
import { addUserToCommunityRepo } from "@/src/repository/community/postAddRepo";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { createCommunityRepo } from "@/src/repository/community/createCommunityRepo";

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

describe("Service deleteMemberCommunity", () => {
    it("should return error 'Esse usuário não faz parte dessa comunidade'", async () => {
        jest.mocked(isMember).mockResolvedValue(null);
        
        await expect(() =>
            removeMemberFromCommunity({id: `${user._id}`, name: user.name}, "comunidade")
        ).rejects.toThrow(expect.objectContaining({ message: "Esse usuário não faz parte dessa comunidade" }));
    });
    
    it("should return error 'O usuário é administrador da comunidade'", async () => {
        jest.mocked(isMember).mockResolvedValue({} as ReturnType<typeof isMember>);

        jest.mocked(checkIsAdminCommunity).mockResolvedValue(true);

        await expect(() =>
            removeMemberFromCommunity({id: `${user._id}`, name: user.name}, "comunidade")
        ).rejects.toThrow(expect.objectContaining({ message: "O usuário é administrador da comunidade" }));
    });
    
    it("should return error 'Erro ao procurar o membro'", async () => {
        jest.mocked(isMember).mockResolvedValue({} as ReturnType<typeof isMember>);

        jest.mocked(checkIsAdminCommunity).mockResolvedValue(false);
        
        jest.mocked(removeMemberCommunityRepo).mockResolvedValue(null);
        
        await expect(() =>
            removeMemberFromCommunity({id: `${user._id}`, name: user.name}, "comunidade")
        ).rejects.toThrow(expect.objectContaining({ message: "Erro ao procurar o membro" }));
    });
    
    it("should remove member from community", async () => {
        jest.mocked(isMember).mockResolvedValue({} as ReturnType<typeof isMember>);

        jest.mocked(checkIsAdminCommunity).mockResolvedValue({} as ReturnType<typeof checkIsAdminCommunity>);
        
        jest.mocked(removeMemberCommunityRepo).mockResolvedValue({} as ReturnType<typeof removeMemberCommunityRepo>);
        
        await expect(() =>
            removeMemberFromCommunity({id: `${user._id}`, name: user.name}, "comunidade")
        ).resolves;
    });
});

describe("Service getAllCommunities", () => {
    
    it("should return error 'Não há comunidades cadastradas' if there is no community", async () => {
        
        jest.mocked(getallCommunityRepo).mockResolvedValue([]);

        await expect(() => 
            getAllCommunities()
        ).rejects.toThrow(expect.objectContaining({message: "Não há comunidades cadastradas"}));
    });
    
    it("should return all communities", async () => {
        jest.mocked(getallCommunityRepo).mockResolvedValue([
            {
                _id: new ObjectId()
            },
            {
                _id: new ObjectId()
            }
        ]);

        await expect(() => 
            getAllCommunities()
        ).resolves;
    });
});

describe("Service getCommunity", () => {
    it("should return error 'comunidade não encontrada' ", async () => {
        jest.mocked(getCommunityByNameRepo).mockResolvedValue(null);
        
        await expect(() => 
            getCommunity("teste")
        ).rejects.toThrow(expect.objectContaining({message: "Error: Comunidade não encontrada"}));
    });

    it("should return one or more communities if a match is found", async () => {
        jest.mocked(getCommunityByNameRepo).mockResolvedValue({} as ReturnType<typeof getCommunity>);

        await expect(() => 
            getCommunity("")
        ).resolves;
    });
});

describe("Service patchCommunity", () => {
    it("should return error 'Esse nome de comunidade já está em uso' if new names is already in use", async () => {
        
        const body: IPatchCommunity = {
            oldName: "abc",
            name: "123"
        };
        
        jest.mocked(checkExistingCommunityName).mockResolvedValue({} as ReturnType<typeof checkExistingCommunityName>);
        

        await expect(() => 
            patchCommunity(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({message: "Esse nome de comunidade já está em uso"}));
    });
    
    it("should return error 'Usuário não é administrado da comunidade' if new names is already in use", async () => {
        
        const body: IPatchCommunity = {
            oldName: "abc",
            name: "123"
        };
        
        jest.mocked(checkExistingCommunityName).mockResolvedValue(null);
        
        jest.mocked(checkIsAdminCommunity).mockResolvedValue(false);

        await expect(() => 
            patchCommunity(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({message: "Usuário não é administrado da comunidade"}));
    });
    
    it("should return error 'Ocorreu um erro na atualização da comunidade", async () => {
        
        const body: IPatchCommunity = {
            oldName: "abc",
            name: "123"
        };
        
        jest.mocked(checkExistingCommunityName).mockResolvedValue(null);
        
        jest.mocked(checkIsAdminCommunity).mockResolvedValue(true);
        
        jest.mocked(patchCommunityRepo).mockResolvedValue(null);

        await expect(() => 
            patchCommunity(`${user._id}`, body)
        ).rejects.toThrow(expect.objectContaining({message: "Ocorreu um erro na atualização da comunidade"}));
    });
    
    it("should patch the community", async () => {
        
        const body: IPatchCommunity = {
            oldName: "abc",
            name: "123"
        };
        
        jest.mocked(checkExistingCommunityName).mockResolvedValue(null);
        
        jest.mocked(checkIsAdminCommunity).mockResolvedValue(true);
        
        jest.mocked(patchCommunityRepo).mockResolvedValue({} as ReturnType<typeof patchCommunityRepo>);

        await expect(() => 
            patchCommunity(`${user._id}`, body)
        ).resolves;
    });
});

describe("Service postAddUserCommunity", () => {
    it("should return error 'Esse usuário já faz parte dessa comunidade' if user is already a member of community", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        jest.mocked(isMember).mockResolvedValue({} as ReturnType<typeof isMember>);
        
        await expect(() => 
            postAddUserCommunity(user, "community")
        ).rejects.toThrow(expect.objectContaining({message: "Esse usuário já faz parte dessa comunidade"}));
    });
    
    it("should return error 'Erro ao procurar o membro'", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        jest.mocked(isMember).mockResolvedValue(null);
        
        jest.mocked(addUserToCommunityRepo).mockResolvedValue(null);

        await expect(() => 
            postAddUserCommunity(user, "community")
        ).rejects.toThrow(expect.objectContaining({message: "Erro ao procurar o membro"}));
    });
    
    it("should add user to community", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        jest.mocked(isMember).mockResolvedValue(null);
        
        jest.mocked(addUserToCommunityRepo).mockResolvedValue({} as ReturnType<typeof addUserToCommunityRepo>);

        await expect(() => 
            postAddUserCommunity(user, "community")
        ).resolves;
    });
});

describe("Service postCommunity", () => {
    it("should return error 'Usuário não encontrado' if user was not found", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        const community: ICreateCommunity = {
            description: "description",
            favoriteBook: "favorite book",
            is_admin: "2",
            name: "new community"
        };

        jest.mocked(findUserByIdRepo).mockResolvedValue(null);

        await expect(() => 
            postCommunity(user, community)
        ).rejects.toThrow(expect.objectContaining({message: "Usuário não encontrado"}));
    });
    
    it("should return error 'Nome da comunidade já está em uso' if community user is not avaliable", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        const community: ICreateCommunity = {
            description: "description",
            favoriteBook: "favorite book",
            is_admin: "2",
            name: "new community"
        };

        jest.mocked(findUserByIdRepo).mockResolvedValue({} as ReturnType<typeof findUserByIdRepo>);

        jest.mocked(checkExistingCommunityName).mockResolvedValue({} as ReturnType<typeof checkExistingCommunityName>);

        await expect(() => 
            postCommunity(user, community)
        ).rejects.toThrow(expect.objectContaining({message: "Nome da comunidade já está em uso"}));
    });
    
    it("should create community", async () => {
        const user = {
            id: "12",
            name: "teste"
        };

        const community: ICreateCommunity = {
            description: "description",
            favoriteBook: "favorite book",
            is_admin: "2",
            name: "new community"
        };

        jest.mocked(findUserByIdRepo).mockResolvedValue({} as ReturnType<typeof findUserByIdRepo>);

        jest.mocked(checkExistingCommunityName).mockResolvedValue(null);

        await expect(() => 
            postCommunity(user, community)
        ).resolves;
    });
    
});
