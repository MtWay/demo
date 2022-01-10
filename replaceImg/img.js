$(function () {
    let ctx = $("canvas")[0].getContext("2d");
    let replaces = [255,255,255]
    $("#file").change(function (params) {
        changepic()
    })
    function changepic() {
        var reads = new FileReader();
        f = document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            showImg(this.result)
        };
    }
    function showImg(params) {
        // console.log(params);
        let img = new Image();
        img.src = params;
        img.onload = function () {
            $("#canvas").attr({
                width: img.width,
                height: img.height
            })
            ctx.drawImage(img, 0, 0)
        }
    }
    $("#canvas").on("mousemove",function (e) {
            // console.log(e.clientX)
            let x = e.clientX;
            let y = e.clientY;
            let rgb  = ctx.getImageData(x,y,1,1);
            let color = `rgb(${rgb.data[0]},${rgb.data[1]},${rgb.data[2]})`;
            console.log(color)
            $(".fix").css({
                left:x,
                top:y,
                background:color
            })
            
    })
    $("#canvas").click(function (e) {
        let x = e.clientX;
            let y = e.clientY;
            let rgb  = ctx.getImageData(x,y,1,1);
            replaces = rgb.data;
            let color = `rgb(${rgb.data[0]},${rgb.data[1]},${rgb.data[2]})`;
            $(".color-box").css({
                background:color
            })
    })
    $("#splice").click(function (params) {
        let canvast = $("<canvas></canvas>");
        canvast.attr({
            width: $("#canvas")[0].width,
            height: $("#canvas")[0].height,
        })
        let ctxt = canvast[0].getContext("2d");
        let arr = ctx.getImageData(0,0,$("#canvas")[0].width,$("#canvas")[0].height);
        for (var i = 0; i < arr.data.length; i += 4) {
            if (abs(arr.data[i],replaces[0]) &&abs(arr.data[i+ 1],replaces[1]) &&abs(arr.data[i+ 2],replaces[2])) {
                arr.data[i + 3] = 0
            }else{
                // 转为白色
                // arr.data[i ] = 255;
                // arr.data[i+1 ] = 255;
                // arr.data[i+2 ] = 255;
            }
        }
        ctxt.putImageData(arr,0,0);
        let src = canvast[0].toDataURL("image/png",.9)
        $("#img").attr("src",src)
    })
    function abs(a,b) {
        let rc = 50;
        return Math.abs(b-a)<rc
    }
})
