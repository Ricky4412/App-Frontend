export const increment = (): { type: 'INCREMENT' } => {
    return {
      type: 'INCREMENT',
    };
  };
  
  export const decrement = (): { type: 'DECREMENT' } => {
    return {
      type: 'DECREMENT',
    };
  };