//app.js
App({
  data: {
    a: 1
  },
  onLaunch: function () {
    var haost = this.globalData.haost;
    var that = this;
    console.log(haost)
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var token = token = wx.getStorageSync("token") || "";;
    if(!token) 
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // return false;
        // wx.request({
        //   url: 'bd.2schome.net/wxapp/authorizelogin.json',
        //   data:{
        //     code:res.code;  

        //   },success:fun
        // })

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.getUserInfo({
        //   success:function(res){
        //     console.log(res)

        //   }
        // })
        var code = res.code;
        wx.getSetting({
          success: res => {
            console.log(res)
            // if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                // this.globalData.userInfo = res.userInfo
                that.login(res.encryptedData, res.iv, code)

              }
            })
            // }else{
            //   console.log(1)
            // }
          }
        })
      }

    })
  },

  login: function (encryptedData, iv, code) {
    var haost = this.globalData.haost;
    wx.request({
      url: haost + "/wxapp/" + this.globalData.second + "/wxappauthorize.json",
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      success: function (res) {
        console.log(res)
        if (res.data.msg == "验证成功") {
          wx.setStorage({
            key: "token",
            data: res.data.token,
            success: function (res) {
              console.log(res)
              //由初始页进来
              wx.switchTab({
                url: '../carlist/carlist'
              })
            }
          })
        } else {
          wx.setStorage({
            key: "uuid",
            data: res.data.uuid,
            success: function (res) {
              console.log(res)
              // //由初始页进来
              // wx.navigateTo({
              //   url: '../login/login?mark=1'
              // })
            }
          })
        }
      }
      })
  },
  globalData: {
    userInfo: null,
    haost: "http://m.2schome.net",//测试
    // haost: "https://www.hx2car.com.cn",//生产
    token: wx.getStorageSync("token") || "",
    second: "diyizhan"
  }
})
