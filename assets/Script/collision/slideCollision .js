
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){  
        this.slideFlag = false; // 用来判定是否开启碰撞回调函数的调用
        cc.director.on('slideStart',()=>{this.slideFlag = true;},this);
        cc.director.on('slideEnd',()=>{this.slideFlag = false;},this);
    },

    onCollisionStay: function (other, self) { // 不可能一碰撞就点击按钮，所以应该用stay
        if(this.slideFlag){
            cc.log('stay');
            this.slideFlag = false;
        }
    },

    onCollisionEnter: function (other, self){ 
        if(this.slideFlag){
            cc.log('enter');
        }
    },

});
