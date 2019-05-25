import { CHANGE_LIST } from './contants';
const changeList = list => ({
  type: CHANGE_LIST,
  list,
});


export const getHomeList = () => (dispatch, getState, axiosInstance) => {
  return axiosInstance.get('/api/list.json')
    .then(res => {
      if (res.data.success) {
        const list = res.data.data;
        dispatch(changeList(list));
      }
    });
};
