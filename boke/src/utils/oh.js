function Oh(){
    this.box = function(desc){
        var box = document.createElement('div')
        box.style.width = '400px'
        box.style.height= '160px'
        box.style.backgroundColor = "#ccc"
        box.style.position = "absolute"
        box.style.left = "50%"
        box.style.top = "40%"
        box.style.margin = "-130px 0 0 -200px"
        box.style.borderRadius = "20px"
        box.style.textAlign = "center"
        box.style.font = "22px blod"
        box.style.padding = "100px 0 0 0"
        box.innerHTML = desc
        document.body.appendChild(box)
        var btn = document.createElement('button')
        btn.style.border = "none"
        btn.style.width = "80px"
        btn.style.height = "30px"
        btn.style.borderRadius='10px'
        btn.style.backgroundColor = "#3085d6"
        btn.style.position = "absolute"
        btn.style.left = "50%"
        btn.style.bottom = "20px"
        btn.style.margin = "0 0 0 -40px"
        btn.innerHTML = "OK"
        box.appendChild(btn)
    }
    this.alert = function(str){
        var alertDesc = str || "你确定吗？"
        this.box(alertDesc)
    }
}