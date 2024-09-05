export const state = () => ({
    fetching: false,
    errors: {},
    message: null,
    status: null
})

export const mutations = {
    setFetching(state: any, fetching: boolean = false) {
        state.fetching = fetching;
    },
    setErrors(state: any, errors: object = {}) {
        state.errors = errors;
    },
    setMessage(state: any, payload: any = {message: null, status: 200}) {
        state.message = payload.message;
        state.status = payload.status ? payload.status : 200;
    }
}
