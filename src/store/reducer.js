const initialState = {
  content: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
