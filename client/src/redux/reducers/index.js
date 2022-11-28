import { combineReducers } from "redux";
import user from "./user_reducer";
import ChatRoom from "./chatRoom_reducer";
const rootReducer = combineReducers({
  // 여러개의 리듀서를 합쳐준다.
  user,
  ChatRoom,
});

export default rootReducer;
