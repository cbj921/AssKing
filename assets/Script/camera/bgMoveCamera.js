
cc.Class({
    extends: cc.Component,
    properties: {
        bgMoveSpeed:30, // 背景移动速度,默认30
        camera:cc.Camera,

        bgSprite1:cc.Sprite,
        bgSprite2:cc.Sprite,

    },

    onLoad(){
        this.count =1 ;// 用来计数，判断移动背景图时机
    },

    moveCameraUpdate(dt){
        this.camera.node.x += this.bgMoveSpeed *dt;
        let remain = this.count % 2;
        if(remain == 1){
            if(this.camera.node.x > this.count*this.bgSprite1.node.width){
                this.bgSprite1.node.x = (this.count + 1) * this.bgSprite1.node.width;
                this.count ++;
            }
        }else{
            if(this.camera.node.x > this.count*this.bgSprite1.node.width){
                this.bgSprite2.node.x = (this.count + 1) * this.bgSprite2.node.width;
                this.count ++;
            }
        }
    },

    update (dt) {
        this.moveCameraUpdate(dt);
    },
});
