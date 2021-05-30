import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {byId:{}, allIds:[]},
  reducers: {
    init(state, action) {
      //console.log(state, action);
      const result = {byId:{}, allIds:[]};
      action.payload.channels.forEach((channel) => {
        result.byId[channel.id] = channel;
        result.allIds.push(channel.id);
      });
      return result;
    },
    add(state, action) {
      //todo
    },
    reset: () => ({byId:{}, allIds:[]}),
  },
})

export const { init, add, reset } = slice.actions;
export default slice.reducer;