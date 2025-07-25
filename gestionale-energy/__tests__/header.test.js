import { act, render, screen, fireEvent } from "@testing-library/react";
import Header from "../src/app/components/header/header";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Mocks
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("js-cookie", () => ({
    remove: jest.fn(),
    get: jest.fn(() => JSON.stringify({ id_implant: "impianto-123" })),
}));

global.fetch = jest.fn((url) =>
    Promise.resolve({
        ok: true,
        json: async () => {
            if (url.includes("totale-chili")) {
                return { message: { totale_chili: 1234 } };
            }
            return { code: 0, message: 12, message2: 8 };
        },
    })
);

describe("Header component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        useRouter.mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("calls logout on button click", async () => {
        await act(async () => {
            render(<Header implant="impianto-123" username="Mario" type="presser" />);
        });

        const logoutButton = screen.getByRole("button");
        fireEvent.click(logoutButton);

        expect(Cookies.remove).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith("/pages/login");
    });
});


// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Header from "../src/app/components/header/header.js";

// const mockPush = jest.fn();

// jest.mock("next/navigation", () => ({
//     useRouter: () => ({
//         push: mockPush,
//     }),
// }));

// // MOCK di js-cookie
// jest.mock("js-cookie", () => ({
//     get: jest.fn(() => JSON.stringify({ id_implant: "impianto-123" })),
//     remove: jest.fn(),
// }));

// // MOCK del tuo hook useWebSocket
// jest.mock("../src/app/components/main/ws/use-web-socket", () => ({
//     useWebSocket: () => ({ message: "test message" }),
// }));

// // Mock globale per fetch
// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         ok: true,
//         json: () =>
//         Promise.resolve({
//             code: 0,
//             message: 10,
//             message2: 5,
//         }),
//     })
// );

// describe("Header component", () => {
//     it("renders correctly with props and displays basic info", async () => {
//         render(<Header implant="impianto-123" username="Mario" type="presser" />);

//         expect(screen.getByText("impianto-123")).toBeInTheDocument();
//         expect(screen.getByText("Mario")).toBeInTheDocument();

//         const balleInserite = await screen.findByText(/Balle inserite:/);
//         expect(balleInserite).toBeInTheDocument();

//         const balleProdotte = screen.getByText(/Balle prodotte:/);
//         expect(balleProdotte).toBeInTheDocument();

//         const totaleChili = screen.getByText(/Totale chili:/);
//         expect(totaleChili).toBeInTheDocument();
//     });

//     it("calls logout on button click", () => {
//         const Cookies = require("js-cookie");

//         render(<Header implant="impianto-123" username="Mario" type="presser" />);
        
//         const button = screen.getByRole("button");
//         fireEvent.click(button);

//         expect(Cookies.remove).toHaveBeenCalled();
//         expect(mockPush).toHaveBeenCalledWith("/pages/login");
//     });

// });
