export default {
    toggleMode({ commit, state }) {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      commit('setMode', newMode);
    },
  };
  