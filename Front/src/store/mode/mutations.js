export default {
    setMode(state, mode) {
      state.mode = mode;
      localStorage.setItem('mode', mode); // Sauvegarder la préférence dans le localStorage
    },
  };
  