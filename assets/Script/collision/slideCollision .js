
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
                cc.director.emit('clickPerfect',other.node);
                other.node.destroy();
            }else if(distance<this.greatDistance){
                cc.log('great');
                cc.director.emit('clickGreat',other.node);
                other.node.destroy();
            }else {
                cc.log('miss');
                cc.director.emit('clickMiss',other.node);
            }
            this._slideFlag = false;
        }
    },

});
