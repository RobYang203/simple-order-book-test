import types from 'actions/types';
import { videoState } from './initialState';

export default function authReducer(video = videoState, { type, payload }) {
  switch (type) {
    case types.GET_FOR_YOU_LIST_SUCCESS:
      return { ...video, forYouList: [...payload] };
    case types.GET_FOLLOWING_LIST_SUCCESS:
      return { ...video, followingList: [...payload] };
    default:
      return video;
  }
}
