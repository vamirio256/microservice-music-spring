const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = "BUY_CAKE";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "Buy the cake",
  };
};

//state
const inittialState = {
  numOfCakes: 10,
};

const reducer = (state = inittialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
