import React from "react";

export const todoReducer = (initialState, action) => {
  switch (action.type) {
    case "add":
      return [...initialState, action.payload];
    case "delete":
      return initialState.filter((todo) => todo.id !== action.payload);
    case "toggle":
      return initialState.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      });
    case "edit":
      return initialState.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    case "delete-all":

    default:
      return initialState;
  }
};
