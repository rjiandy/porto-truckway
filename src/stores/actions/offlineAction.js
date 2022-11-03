export default function triggerRehydrate(savedState) {
  return async (dispatch) => {
    dispatch({ type: 'REHYDRATE', savedState });
  };
}
