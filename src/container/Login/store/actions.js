import { CHANGE_LOGIN_STATUS } from './contants';

const changeLoginStatus = status => ({
  type: CHANGE_LOGIN_STATUS,
  status,
});

export const getLogin = () => (dispatch, getState, axiosInstance) => axiosInstance.get('/api/login.json')
  .then((res) => {
    if (res.data.success) {
      const { data } = res.data;
      dispatch(changeLoginStatus(data));
    }
  });

export default {
  getLogin,
};
