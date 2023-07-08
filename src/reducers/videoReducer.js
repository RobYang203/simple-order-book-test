import types from 'actions/types';
import { videoState } from './initialState';

export default function authReducer(video = videoState, { type, payload }) {
  switch (type) {
    default:
      return video;
  }
}
