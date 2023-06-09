/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import Details from "./details";
import { EscaperoomState } from "../../reducer/escaperooms-slice";
import { useEscapeRooms } from "../../hooks/use-escaperooms";
import { Calendar } from "../calendar/calendar";

jest.mock("../../hooks/use-escaperooms");
jest.mock("../calendar/calendar");

describe("Given Details component", () => {
  beforeEach(async () => {
    (useEscapeRooms as jest.Mock).mockReturnValue({
      escaperooms: {
        detailsRoom: {
          name: "name test",
          images: ["image 0", "image 1"],
          players: "players test",
          theme: "theme test",
          difficulty: "difficulty test",
          description: "description test",
        },
        escapeRooms: [],
      } as unknown as EscaperoomState,

      escaperoomGetById: jest.fn(),
    });
    render(
      <Provider store={store}>
        <Router>
          <Details></Details>
        </Router>
      </Provider>
    );
  });
  describe("when it renders elements", () => {
    test("then it should render the heading", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("when it renders", () => {
    test("then it should render the calendar component", () => {
      expect(Calendar).toHaveBeenCalled();
    });
  });
  describe("when the buttons are pressed", () => {
    test("then both buttons should be in the document and fired", () => {
      const button = screen.getAllByRole("button");
      fireEvent.click(button[1]);
      fireEvent.click(button[0]);
      expect(button[1]).toBeInTheDocument();
      expect(button[0]).toBeInTheDocument();
    });
  });
  describe("when you try to press the button preview first", () => {
    test("then it is disabled", () => {
      const button = screen.getAllByRole("button");
      fireEvent.click(button[0]);
      expect(button[0]).toHaveAttribute("disabled");
    });
  });
});
