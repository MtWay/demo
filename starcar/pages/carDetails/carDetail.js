const URL='https://www.hx2car.com.cn/mobile/carDetail.json?&id='

import Util from '../Util/wxAutoImageCal'; 


Page({
      data:{
         windowWidth: 0,
    windowHeight: 0,
        carid:'',
        showcarinfo:true,
        showsellinfo:false,
        loading:false,
       imgUrls:[],
       carinfo:'',
       price:'',
       newcarprice:'',
       clickcount:'',
       creditvalue:'',
       publishdata:'',
       cartype:'车型: --',
      mileage:'里程: --',
      paifang:'排放: --',
      ranyou:'燃油: --',
      yongtu:'用途: --',
      yanse:'颜色: --',
      anjie:'按揭: --',
      guohu:'过户: --',
      nianshen:'年审情况: --',
      baoxian:'保险情况: --',
      cardescribe:'暂无车辆描述',
      currentImage:'1/1',
         carList:[],
         companyhead:'',
         companyname:'',
         signature:'',
         linkman:'',
         telePhone:'',
         mobliePhone:'',
         location:'',
         kucunList:[],
          currentpage:1,
          hasMore:false,
          sametype:'',
          serial:'',
          areacode:'',
          priceintal:'',
          latitude:'',
          longitude:'',
      },

    
      onLoad:function(options){
        // 生命周期函数--监听页面加载
      
     var temp =this
       wx.getSystemInfo({
            success: (res) => {
                temp.setData({
                  windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })
        //获取数据
        this.setData({
          carid:options.id
        })
        this.fetchData()
        this.getcompanycars()
      },

      //获取车辆库存
      getcompanycars:function(){
  var  KUCUNURL = 'https://www.hx2car.com.cn/mobile/search.json?&parameters=sameCompany&pageSize=25&id='+this.data.carid+'&currPage='+this.data.currentpage
  var temp =this;
          wx.request({
          url: KUCUNURL, 
          data: {
            x: '' ,
            y: ''
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
                let items = temp.data.kucunList;
                items = items.concat(res.data.carList);
              temp.setData({
                kucunList:items,
                 currentpage:temp.data.currentpage+1,
              })

if(res.data.page.lastpage>=temp.data.currentpage){
      temp.setData({
          hasMore:true,
      })
  }else{
       temp.setData({
          hasMore:false,
      })
  
}

          }
        })

      },

      // 加载更多
loadmore:function(e){
 this.getcompanycars()
},

//设置图片的宽度和高度
  cusImageLoad: function (e){
    var that = this;
    that.setData(Util.wxAutoImageCal(e));
  },

      //获取详情页数据
      fetchData:function(){
        var temp =this
          wx.request({
            url: URL+temp.data.carid, 
            data: {
              x: '' ,
              y: ''
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              //品牌信息
            var info='['+res.data.car.shortAreaName+']'+res.data.car.year+' '+res.data.car.brandFullName+' '+res.data.car.color+' '+res.data.car.carAuto

            //价格
            var pricetemp=''
            if(res.data.car.price == '面议' || res.data.car.price == '0' || res.data.car.price == '0.0')            {
              pricetemp="面议"
            }else{
             pricetemp= '￥'+res.data.car.price+'万'
            }

            //指导价
            var guidePrice=''
              if(res.data.car.guidePrice != '' && res.data.car.guidePrice != '0' && res.data.car.guidePrice != null)            {
              guidePrice="新车价: "+res.data.car.guidePrice+'万'
            }

            //浏览量
            var click = '浏览量: '+res.data.car.clickOut

            //信誉值
            var credit = "信誉值: "+res.data.user.creditValue

            //发布时间
            var publish = res.data.car.publishDate

            //车型
            var carType=res.data.car.type
            if(carType ==''){
                carType ="--"
            }else{
              carType = ""+carType
            }
            temp.setData({
              sametype:res.data.car.type,
              serial:res.data.car.serial,
              areacode:res.data.car.areaCode,
              priceintal:res.data.car.price
            })


            //公里
            var journey = res.data.car.journey
            if(journey ==''){
                journey ="--"
            }else{
              journey = ""+journey+"万公里"
            }

            //排放
            var discharge = res.data.car.discharge
            if(discharge ==''){
                discharge ="--"
            }else{
              discharge = ""+discharge
            }
            //燃油
               var oilWear = res.data.car.oilWear
            if(oilWear ==''){
                oilWear ="--"
            }else{
              oilWear = ""+oilWear
            }

            //用途
                var usePurpose = res.data.car.usePurpose
            if(usePurpose ==''){
                usePurpose ="--"
            }else{
              usePurpose = ""+usePurpose
            }
            
            //颜色
    var color = res.data.car.color
            if(color ==''){
                color ="--"
            }else{
              color = ""+color
            }
            //按揭
              var morgage = res.data.car.morgage
            if(morgage ==''){
                morgage ="--"
            }else{
              morgage = ""+morgage
            }
            //过户
            var transfer = res.data.car.transfer
               if(transfer ==''){
                transfer ="面议"
            }else if(transfer =='1'){
              transfer = "能"
            }else{
                transfer = "不能"
            }
            //年审情况
  var inspectionMonth = res.data.car.inspectionMonth
   var inspectionYear = res.data.car.inspectionYear
   var nianshentemp = ''
   if (inspectionMonth == "选择年份年选择月份月") {
				nianshentemp=""+"未知";
		}else if(inspectionMonth =='' || inspectionYear==''){
        nianshentemp=""+"未知";
    }else{
      	nianshentemp=""+inspectionYear+'年'+inspectionMonth+'月';
    }

    //保险情况
  var insuranceMonth = res.data.car.insuranceMonth
   var insuranceYear = res.data.car.insuranceYear
   var baoxiantemp = ''
   if (insuranceMonth == "选择年份年选择月份月") {
				baoxiantemp=""+"未知";
		}else if(insuranceMonth =='' || insuranceYear==''){
        baoxiantemp=""+"未知";
    }else{
      	baoxiantemp=""+insuranceYear+'年'+insuranceMonth+'月';
    }

    //车辆描述
   var describle=res.data.car.describle
          if(describle ==''){
                describle ="暂无车辆描述"
            }

      //联系电话
      var tellphone=res.data.user.tellPhone
      var mobliephone=res.data.user.mobliePhone
      if(tellphone =='' && mobliephone!=''){
          tellphone = mobliephone
          mobliephone = ''
      }

      if(mobliephone ==''){
        mobliephone = "| "+tellphone;
      }

      if(tellphone == mobliephone){
          mobliephone = "";
      }

    if(mobliephone !=''){
        mobliephone = "| "+mobliephone;
      }


              temp.setData({
                loading:true,
                carList:res.data.recomendcars,
                  imgUrls:res.data.car.bigPicList,
     currentImage:1+'/'+res.data.car.bigPicList.length,
                  carinfo:info,
                  price:pricetemp,
                  newcarprice:guidePrice,
                  clickcount:click,
                  creditvalue:credit,
                  publishdata:publish,
                  cartype:carType,
                  mileage:journey,
                  paifang:discharge,
                  ranyou:oilWear,
                  yongtu:usePurpose,
                  yanse:color,
                  anjie:morgage,
                  guohu:transfer,
                  nianshen:nianshentemp,
                  baoxian:baoxiantemp,
                  cardescribe:describle,
                  companyhead:res.data.user.headPic,
                  companyname:res.data.user.companyName,
                  signature:res.data.user.signature,
              linkman:"联系人:  "+res.data.user.userName,
                telePhone:tellphone,
                mobliePhone:mobliephone,
                location:res.data.user.companyAddress,
                latitude:res.data.managerList.latitude,
                longitude:res.data.managerList.longitude,
              })
            }
          })
      },
   
      onShareAppMessage: function() {
        // 用户点击右上角分享
        var temp =this;
        return {
          title: temp.data.carinfo, // 分享标题
          desc: '华夏二手车', // 分享描述
           path: '/pages/carDetail/carDetail?id='+temp.data.carid // 分享路径
        }
      },

      //地图
      tomap:function(){
//            var temp =this;
//            console.log(temp.data.latitude+"==="+temp.data.longitude)
//            if(temp.data.latitude !=''){
//  wx.openLocation({
//       latitude: temp.data.latitude,
//       longitude: temp.data.longitude,
//       scale: 28
//     })
//            }

      },

//图片切换过程
durationChange:function(e){
  var length = this.data.imgUrls.length
  this.setData({
    currentImage:(e.detail.current+1)+'/'+length
  })
},

binderrorimgmain:function(e){
  var carlistData = this.data.carList;
  var errorImgIndex= e.target.dataset.errorimg //获取循环的下标

carlistData[errorImgIndex].firstSmallPic="http://static.hx2cars.com/resource/web/mobpages/images/mcarlist/carmr.jpg"
  this.setData({
           carList:carlistData,
       })
},

binderrorimgmain1:function(e){
  var carlistData = this.data.kucunList;
  var errorImgIndex= e.target.dataset.errorimg //获取循环的下标

carlistData[errorImgIndex].firstSmallPic="http://static.hx2cars.com/resource/web/mobpages/images/mcarlist/carmr.jpg"
  this.setData({
           kucunList:carlistData,
       })
},

  //进入车辆详情页
  todetail:function(e){
       var carid= e.currentTarget.id
       wx.redirectTo({
        url: '../carDetail/carDetail?id='+carid
      })
  },

  //点击车辆信息
  carinfo:function(){
      this.setData(
        {
        showcarinfo:true,
        showsellinfo:false,
        }
      )
  },

  //点击车商信息
  sellinfo:function(){
        this.setData(
        {
        showcarinfo:false,
        showsellinfo:true,
        }
      )
  },

  //打电话
  callphone:function(){
      var temp=this
      wx.makePhoneCall({
          phoneNumber: temp.data.telePhone
        })
  },
    //打电话
  callphone1:function(){
      var temp=this
      wx.makePhoneCall({
          phoneNumber: temp.data.mobliePhone.replace("| ","")
        })
  },

  //出价
  chujia:function(){
    var temp =this;
         wx.navigateTo({
        url: '../chujia/chujia?price='+this.data.price+'&id='+temp.data.carid
      })
  },

  //搜索同类型的车
  samecar:function(e){
        var id= e.currentTarget.id
        if(id == 1){
            //同类型         
          wx.redirectTo({
        url: '../sameCarList/sameCarList?id=1&type='+this.data.sametype
      })
        }else if(id ==2){
            //同品牌
                  wx.redirectTo({
        url: '../sameCarList/sameCarList?id=2&type='+this.data.serial
      })
        }else if(id ==3){
            //同地区
                     wx.redirectTo({
        url: '../sameCarList/sameCarList?id=3&type='+this.data.areacode
      })
        }else if(id ==4){
            //同价位
        if (this.data.priceintal == null
						|| this.data.priceintal==''
						|| this.data.priceintal == 0 ||         this.data.priceintal == '面议') {
              this.setData({
                  priceintal:'0-1'
              })
				}else{
          var up=Math.ceil(Number(this.data.priceintal)+0.01)
           var down=Math.floor(this.data.priceintal)
             this.setData({
                  priceintal:down+'-'+up
              })
        }
              wx.redirectTo({
        url: '../sameCarList/sameCarList?id=4&type='+this.data.priceintal
      })
        }
  }

    })