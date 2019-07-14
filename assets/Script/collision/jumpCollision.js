
cc.Class({
    extends: cc.Component,

    properties: {
        perfectDistance:20,
        greatDistance:30,
        missDistance:40,
    },

    onLoad(){
        this.jumpFlag = false;  // 用来判定是否开启碰撞回调函数的调用
        cc.director.on('jumpStart',()=>{this.jumpFlag = true;},this);
        cc.director.on('jumpEnd',()=>{this.jumpFlag = false;},this);
    },

    onCollisionStay: function (other, self) { // 不可能一碰撞就点击按钮，所以应该用stay
        if(this.jumpFlag){
            let otherPosition = other.node.position;
            let distance = Math.abs(Math.floor(otherPosition.x - self.node.x));
            if(distance<this.perfectDistance){
                cc.log('perfect!');
                other.node.destroy();
            }else if(distance<this.greatDistance){
                cc.log('great!');
                other.node.destroy();
            }else {
                cc.log('miss!');
            }
            this.jumpFlag = false;
        }
    },
    

});
