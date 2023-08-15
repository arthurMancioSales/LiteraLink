jest.mock("mongodb");

// Delete mocks
jest.mock("@/src/repository/user/findUserRepo.ts");
jest.mock("@/src/service/book/patchBook");
jest.mock("@/src/repository/book/findBook");
jest.mock("@/src/repository/book/deleteBook");

import { deleteBookFromUser } from "@/src/repository/book/deleteBook";
import { findBook } from "@/src/repository/book/findBook";
import { findUserByIdRepo } from "@/src/repository/user/findUserByIdRepo";
import { deleteBook } from "@/src/service/book/deleteBook";
import { ObjectId } from "mongodb";
import { postBook } from "@/src/service/book/postBook";


import { bookMocked, updateBook, userMocked } from "@/src/utils/test_variables/mockedVariables";
import { patchBook } from "@/src/service/book/patchBook";


describe("Service deleteBook", () => {
    it("should return 'Error: Usuário não encontrado!' if user not found", async () => {
        jest.mocked(findUserByIdRepo).mockResolvedValue(null);
        const userObjectId = ObjectId.createFromHexString('5effaa5662679b5af2c58829');

        await expect(() =>
            deleteBook(userObjectId, 'livro_id')
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Usuário não encontrado!" }));
    });
   
    it("should return 'Error: Livro não encontrado!' if book not found", async () => {
        jest.mocked(findUserByIdRepo).mockResolvedValue(userMocked);
        jest.mocked(findBook).mockResolvedValue(undefined);

        await expect(() =>
            deleteBook(userMocked._id, 'livro_id')
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Livro não encontrado!" }));
    });
   
    it("should delete book from user profile", async () => {
        jest.mocked(findUserByIdRepo).mockResolvedValue(userMocked);
        jest.mocked(findBook).mockResolvedValue(userMocked);
        jest.mocked(deleteBookFromUser).mockResolvedValue({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });

        expect(() =>
            deleteBook(userMocked._id, '3')
        ).resolves;
    });
});

describe("Service patchBook", () => {   
    it("should update book from user profile", () => {
        const userObjectId = '5effaa5662679b5af2c58829';

        expect(() =>
            patchBook(userObjectId, updateBook)
        ).resolves;
    });
});

describe("Service postBook", () => {
    it("should return 'Error: Usuário não encontrado!' if user not found", async () => {
        jest.mocked(findUserByIdRepo).mockResolvedValue(null);
        const userObjectId = '5effaa5662679b5af2c58829';

        await expect(() =>
            postBook(userObjectId, bookMocked)
        ).rejects.toThrow(expect.objectContaining({ message: "Error: Usuário não encontrado!" }));
    });
   
    it("should insert book on user profile", async () => {
        jest.mocked(findUserByIdRepo).mockResolvedValue(userMocked);
        const userObjectId = '5effaa5662679b5af2c58829';

        expect(() =>
            postBook(userObjectId, bookMocked)
        ).resolves;
    });
});
