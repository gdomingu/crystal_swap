const useReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return { currentUser: action.user, modalOpen: false };
    case "LOGGED_OUT":
      return { currentUser: null };
    default:
      return state;
  }
};

export default useReducer;
