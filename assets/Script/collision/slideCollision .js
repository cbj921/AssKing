
cc.Class({
    extends: cc.Component,

    properties: {
        perfectDistance:20,
        greatDistance:30,
        _slideFlag:false,
    },

    onLoad(){  
        this._slideFlag = false; // 用来判定是否开启碰撞回调函数的调用
        cc.director.on('slideStart',()=>{this._slideFlag = true;},this);
        cc.director.on('slideEnd',()=>{this._slideFlag = false;},this);
    },

    onCollisionStay: function (other, self) { // 不可能一碰撞就点击按钮，所以应该用stay
        if(this._slideFlag){
            let otherPosition = other.node.position;
            let distance = Math.abs(Math.floor(otherPosition.x - self.node.x));
            if(distance<this.perfectDistance){
                cc.log('perfect');
                other.node.emit('clickPerfect'); // 向碰撞节点发送，是用来销毁节点
                cc.director.emit('clickPerfect'); // 向全局发送，是用来计数的，统计评分
            }else if(distance<this.greatDistance){
                cc.log('great');
                other.node.emit('clickPerfect');
                cc.director.emit('clickGreat');
            }else {
                cc.log('miss');
                cc.director.emit('clickMiss');  // 向 播放处理评分的脚本发送，播放点击失败的miss
                                                // 脚本监听的是 ‘Miss’ 用来统计总的miss数，脚本监听的‘clickMiss’是用来播放评分
            }
            this._slideFlag = false;
        }
    },

});
