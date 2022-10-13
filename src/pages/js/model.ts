import type { Effect, Reducer } from 'umi';

export interface StateType {
  stackShouldUpdate: boolean;
  cubeShouldUpdate: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'game',

  state: {
    stackShouldUpdate: false,
    cubeShouldUpdate: false,
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
