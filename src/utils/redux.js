export const REQUEST = ['PENDING']

export const createReducer = (initialState, handlers) => (
	state = initialState,
	action
) => {
	if (handlers[action.type]) {
		return handlers[action.type](state, action)
	}
	return state
}
