
const initialState = {
    currentRoute: '/'
};

const routerReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'NAVIGATE_TO':
        return {
        ...state,
        currentRoute: action.payload
        };
    default:
        return state;
    }
};

export default routerReducer;