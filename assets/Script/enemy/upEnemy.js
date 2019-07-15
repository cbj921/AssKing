
cc.Class({
    extends: cc.Component,

    properties: {
        moveForwardDuration:1,
        destroySound:{
            default:null,
            type:cc.AudioClip,
        },
    },

    moveAction(){
        this.moveForward = cc.moveTo(this.moveForwardDuration,cc.v2(-1072,346));
        this.node.runAction(this.moveForward);
    },

    onLoad () {
        this.node.position = cc.v2(1055,346); // 初始位置 
        this.moveAction();
    },

    onDestroy(){
        cc.audioEngine.playEffect(this.destroySound,false);
    },
});
