const GET_COLLECTION = 'GET_COLLECTION';
const SET_COLLECTION = 'SET_COLLECTION';
const SPLASH_SCREEN = 'SPLASH_SCREEN';

export const GetUserDataAction = () => ({
  type: GET_COLLECTION,
});

export const SetUserDataAction = ({token, username}) => ({
  type: SET_COLLECTION,
  token,
  username,
});

export const GetSplashScreenAction = () => ({
  type: SPLASH_SCREEN,
});

export const SetSplashScreenAction = ({loading}) => ({
  type: SPLASH_SCREEN,
  loading,
});

const initialState = {
  token: null,
  isSplashLoading: true,
  username: '',
};

export const AuthReducer = (
  state = initialState,
  action: {type: string; token: string; loading: boolean; username: string},
) => {
  switch (action.type) {
    case GET_COLLECTION:
      return {...state, token: null, isSplashLoading: true};
    case SET_COLLECTION:
      return {
        ...state,
        token: action.token,
        isSplashLoading: false,
        username: action.username,
      };

    case SPLASH_SCREEN:
      return {...state, token: action.token, isSplashLoading: false};

    default:
      return state;
  }
};
