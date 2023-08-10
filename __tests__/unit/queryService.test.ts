jest.mock("mongodb");

import { getQueryRepo } from "@/src/repository/query/getQueryRepo";

describe("Service getQuery", () => {
    it("should return users and communities if a match is found", () => {
        expect(() =>
            getQueryRepo('query')
        ).resolves;
    })
});
