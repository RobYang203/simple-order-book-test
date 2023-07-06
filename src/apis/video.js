import { getServer } from './index';

const server = getServer();

export const getFollowingListResult = async () => {
  const { data } = await server.get('/following_list');
  return data;
};

export const getForYouListResult = async () => {
  const { data } = await server.get('/for_you_list');
  return data;
};
