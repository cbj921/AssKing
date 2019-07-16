
cc.Class({
    extends: cc.Component,

    properties: {
        moveForwardDuration:1,
        startPos:cc.Vec2,
        endPos:cc.Vec2,
        destroySound:{
            default:null,
            type:cc.AudioClip,
        },
    },

    moveAction(){
        this.moveForward = cc.moveTo(this.moveForwardDuration,this.endPos);
        this.node.runAction(this.moveForward);
    },

    onLoad () {
        this.node.position = this.startPos; // 初始位置 
        this.moveAction();
    },

    onDestroy(){
        cc.audioEngine.playEffect(this.destroySound,false);
    },
});
