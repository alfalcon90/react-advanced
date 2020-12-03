// Signature used in middlewares. Randomnly chosen by Redux's creators
// export default function ({ dispatch }) {
//   return function (next) {
//     return function (action) {};
//   };
// }

//eslint-disable-next-line
export default ({ dispatch }) => (next) => (action) => {
  // Check if action has a promise
  if (!action.payload || !action.payload.then) {
    // Send to the next middleware
    return next(action);
  }

  // Wait for promise
  action.payload.then((response) => {
    const newAction = { ...action, payload: response };
    // Create new action
    dispatch(newAction);
  });
};
