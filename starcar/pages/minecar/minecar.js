var token = wx.getStorageSync("token");//小程序初始化时就会触发
var app;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telePhone: '400-884-0101',
    user: {
      nickName: "未登录",
      avatarUrl: "../../images/logo1.png",
      token:token
    }
  },
  //我的浏览
  tobrowsing: function () {
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else
      wx.navigateTo({
        url: '../browsing/browsing'
      })
  },
  //我的收藏
  tocollect: function () {
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else
      wx.navigateTo({
        url: '../collect/collect'
      })
  },
  //我的预约
  tomyappoint: function () {
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else
      wx.navigateTo({
        url: '../myappoint/myappoint'
      })
  },
  //在售车辆
  toonsell: function () {
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else
      wx.navigateTo({
        url: '../onsell/onsell'
      })
  },
  //反馈
  tofeedback: function () {
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    } else
      wx.navigateTo({
        url: '../feedback/feedback'
      })
  },
  //打电话
  callphone: function () {
    var temp = this
    wx.makePhoneCall({
      phoneNumber: temp.data.telePhone
    })
  },

  onShow: function () {
    app = getApp();
    token = wx.getStorageSync("token"); //更新token，用户可能已经登陆了
    console.log(token)
    this.setData({
      token:token
    })
    var user;
    if (token) {
      console.log(1)
      if (app.globalData.userInfo) {
        this.setData({
          user: app.globalData.userInfo
        })
        
      } else {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  this.setData({
                    user: res.userInfo
                  })
                }
              })
            }
          }
        })
      }
    }
    //拿到app.js中的用户信息
  },

  onReady: function () {
    token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '../index/index'
      })
    }
  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {

  },
  clear: function () {
    wx.removeStorage({
      key: "token",
      success: function (res) {
        console.log(res)
      }
    })
  }

})