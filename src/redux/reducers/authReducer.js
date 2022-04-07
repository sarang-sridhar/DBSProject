const initialState = false;

const authReducer = (state = initialState, action) => {
  if (action.type === 'ISLOGGEDIN') return true;
  else if (action.type === 'ISLOGGEDOUT') return false;
  else return state;
};

export default authReducer;
