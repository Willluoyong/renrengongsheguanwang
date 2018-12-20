const mobile = {
  state: {
    toModifyUserInfo: {
      rand: "",
      type: 1,
      verifyCode: "",
      account: "",
      authCode:"",
      token:""
    }
  },
  mutations: {
    saveRegisterInfo(state, param) {
      state.toModifyUserInfo = param;
    },


  },
  actions: {},
};
export default mobile
