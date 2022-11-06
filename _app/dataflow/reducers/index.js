import {userReducer} from './userReducer';
import {dataReducer} from './dataReducer';

export default mainReducer = ({user, data}, action) => {
  return {
    user: userReducer(user, action),
    data: dataReducer(data, action),
  };
};
