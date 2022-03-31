const initialState=false ;

const authReducer=(state=initialState,action)=>{
    if(action.type==="ISLOGGEDIN") return !state ;
    else return state ;
}

export default authReducer ;