interface Action {
    type: string;
  }
  
  interface State {
    value: number;
  }
  
  const initialState: State = {
    value: 0,
  };
  
  const exampleReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, value: state.value + 1 };
      case 'DECREMENT':
        return { ...state, value: state.value - 1 };
      default:
        return state;
    }
  };
  
  export default exampleReducer;