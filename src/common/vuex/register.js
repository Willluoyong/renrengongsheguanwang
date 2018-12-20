const mobile = {
    state: {
      registerInfo: {
        loginName:"",
        password:"",
        smsCode:"",
        recommendedCode:""
      }
    },
    mutations: {
      saveRegisterInfo(state, param) {
        state.registerInfo = param;
      },
  
  
    },
    actions: {},
  
  };
  export default mobile