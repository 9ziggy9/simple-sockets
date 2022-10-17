/* eslint-disable no-unused-vars */
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth", {
    headers: {"Content-Type": "application/json"},
  });
  if (response.ok) {
    const data = await response.json();
    console.log("PARSED API DATA", data);
    if (data.errors) {
      console.log(data.errors);
      return;
    }
    dispatch(setUser(data));
  }
};

export const login = (username, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password}),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {"Content-Type": "application/json"},
  });
  if (response.ok) {
    dispatch(removeUser());
  }
};

const initialState = {user: null};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case SET_USER: return {user: action.payload};
  case REMOVE_USER: return {user: null};
  default: return state;
  }
}
