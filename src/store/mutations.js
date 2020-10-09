import config from '@/config'
export default {

    setShare(state, newShare) {
        state.share = {
            ...state.share,
            ...newShare
        }
    },


    resetShare(state) {
        state.share = config.share
    },


    setUser(state, newUser) {
        state.user = {
            ...state.user,
            ...newUser
        }
    },

};
