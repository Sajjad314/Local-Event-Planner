import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EventResponse } from "../interface/EventResponse.interface";

const initialState: EventResponse = {
  date: "",
  description: "",
  location: "",
  time: "",
  title: "",
  type: "",
};

export const eventSlicer = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventResponse>) => {
      (state.date = action.payload.date),
        (state.description = action.payload.description),
        (state.location = action.payload.location),
        (state.time = action.payload.time),
        (state.title = action.payload.title),
        (state.type = action.payload.type);
    },
    removeEvent: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEvent, removeEvent } = eventSlicer.actions;

export default eventSlicer.reducer;
