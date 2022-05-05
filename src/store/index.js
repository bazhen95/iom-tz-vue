import { createStore, useStore as baseUseStore } from 'vuex';

export const key = Symbol('StoreInjectionKey');
export const useStore = () => baseUseStore(key);

const store = createStore({
  state: {
    tree: [
      {
        id: 1,
        label: 'Dir 1',
        type: 'folder',
        nodes: [
          {
            id: 2,
            label: 'Dir 1-1',
            type: 'folder',
            nodes: [
              {
                id: 3,
                label: 'File 1-1-1',
                type: 'file',
              },
            ],
          },
          {
            id: 4,
            label: 'File 1-2',
            type: 'file',
          },
        ],
      },
      {
        id: 5,
        label: 'Dir 2',
        type: 'folder',
        nodes: [
          {
            id: 6,
            label: 'Dir 2-1',
            type: 'folder',
          },
          {
            id: 7,
            label: 'File 2-2',
            type: 'file',
          },
        ],
      },
      {
        id: 8,
        label: 'File 2',
        type: 'file',
      },
    ],
  },

  mutations: {
    updateTree(state, tree) {
      console.log(tree);
      state.tree = tree;
    },
  },
  actions: {},
  getters: {},
  modules: {},
  plugins: [],
});

export default store;
