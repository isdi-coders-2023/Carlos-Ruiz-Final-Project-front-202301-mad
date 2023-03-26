import { PayloadAction } from "@reduxjs/toolkit";
import { ReservationStructure } from "../model/reservation";
import { calendarReducer, CalendarState } from "./calendar-slice";
import { reservationReducer, ReservationsState } from "./reservations-slice";

const mockCalendar = {
  active: false,
  date: "date test",
  escaperoom: "room test",
  user: "user test",
};

const mockInitialState: CalendarState = {
  active: false,
  date: "",
  escaperoom: "",
  user: "",
};

describe("Given the calendarSlice", () => {
  describe("when the method updateActive is called", () => {
    test("then it should be that property new value", () => {
      const mockCreate: PayloadAction<boolean> = {
        type: "calendar/updateActive",
        payload: true,
      };
      const element = calendarReducer(mockInitialState, mockCreate);
      expect(element.active).toBe(true);
    });
  });
  describe("when the method updateDate is called", () => {
    test("then it should be that property new value", () => {
      const mockCreate: PayloadAction<string> = {
        type: "calendar/updateDate",
        payload: "a",
      };
      const element = calendarReducer(mockInitialState, mockCreate);
      expect(element.date).toStrictEqual("a");
    });
  });
  describe("when the method updateEscaperoom is called", () => {
    test("then it should be that property new value", () => {
      const mockCreate: PayloadAction<string> = {
        type: "calendar/updateEscaperoom",
        payload: "room",
      };
      const element = calendarReducer(mockInitialState, mockCreate);
      expect(element.escaperoom).toStrictEqual("room");
    });
  });
});
