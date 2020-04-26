import { combineReducers } from 'redux'
import { Actions } from '../actions'
import { Elements } from '../elements'

const commands = (state = {do: [], redo: [], transient: []}, action) => {
    switch (action.type) {
        case Actions.MOVE_ELEMENT:
        case Actions.CREATE_ELEMENT:
            if (action.payload.isTransient) {
                return {...state, transient: [action]}
            }
            return {...state, do: [...state.do, action], redo: [], transient: []};
        case Actions.NEW_DRAWING:
            return {do: [], redo: [], transient: []};
        case Actions.UNDO:
            return {
                ...state, 
                do: state.do.slice(0, state.do.length - 1),
                redo: [state.do[state.do.length - 1], ...state.redo],
                transient: []
            };
        case Actions.REDO:
            return {
                ...state, 
                do: [...state.do, state.redo[0]],
                redo: state.redo.slice(1),
                transient: []
            };
        case Actions.DELETE_ELEMENT:
            return {...state, do: [...state.do, action], redo: [], transient: []};
        default:
    }
    return {...state};
};

const tool = (state = Elements.Line, action) => {
    if (action.type === Actions.SET_TOOL) {
        return action.payload;
    }
    return state;
}

const interaction = (state = {}, action) => {
    if (action.type === Actions.DRAG_START) {
        return {dragFrom: action.payload};
    }
    if (action.type === Actions.DRAG_FINISH) {
        return {};
    }
    return state;
}

export default combineReducers({
  commands,
  tool,
  interaction
})
