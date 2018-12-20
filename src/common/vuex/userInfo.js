const UserInfo = {
  state: {
    loginSuccess: false,
    token:"",
    accountId:"",
    loginName:"",
    userName:"",
    cellPhone:"",
    email:"",
    nickName:"",
    accountLevel:"",
    defaultBundleType:"",
    invitationCode:"",
    point:0,
  },
  mutations: {
    updateLoginState(state,val){
      console.log("loginState:" + val);
      state.loginSuccess = val;
    },
    updateToken(state,val){
      console.log("token:" + val);
      state.token = val;
    },
    updateAccountId(state,val){
      console.log("accountId:" + val);
      state.accountId = val;
    },

    updateLoginName(state,val){
      console.log("loginName:" + val);
      state.loginName = val;
    },

    updateUserName(state,val){
      console.log("UserName:" + val);
      state.userName = val;
    },

    updateCellPhone(state,val){
      console.log("cellPhone:" + val);
      state.cellPhone = val;
    },
    updateEmail(state,val){
      console.log("email:" + val);
      state.email = val;
    },
    updateNickName(state,val){
      console.log("nickName:" + val);
      state.nickname = val;
    },
    updateAccountLevel(state,val){
      console.log("accountLevel:" + val);
      state.accountLevel = val;
    },

    updateDefaultBundleType(state,val)
    {
      console.log("defaultBundleType:" + val);
      state.defaultBundleType = val;
    },

    updateInvitationCode(state,val){
      console.log("invitationCode:" + val);
      state.invitationCode = val;
    },

    updatePoint(state,val){
      console.log("point:" + val);
      state.point = val;
    }
  },
  getters: {
    isLoginSuccess(){
      return this.state.loginSuccess;
    },

    getToken(){
      return this.state.token;
    },

    getAccountId(){
      return this.state.accountId;
    },

    getLoginName(){
      return this.state.loginName;
    },

    getUserName(){
      return this.state.userName;
    },

    getCellPhone(){
      return this.state.cellPhone;
    },

    getEmail(){
      return this.state.email;
    },

    getNickName(){
      return this.state.nickName;
    },

    getAccountLevel(){
      return this.state.accountLevel;
    },

    getDefaultBundleType(){
      return this.state.defaultBundleType;
    },

    getInvitationCode(){
      return this.state.invitationCode;
    },

    getPoint(){
      return this.state.point;
    }
  }
};
export default UserInfo
