
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
        let moveForward = cc.moveTo(this.moveForwardDuration,this.endPos);
        let callBack = cc.callFunc(()=>{
            cc.log('movemiss');
            cc.director.emit('Miss'); // 脚本监听的是 ‘Miss’ 用来统计总的miss数，脚本监听的‘clickMiss’是用来播放评分
            this.node.destroy();
        },this);
        let seq = cc.sequence(moveForward,callBack);
        this.node.runAction(seq);
    },

    onLoad () {
        this.node.on('clickPerfect',this.clickCallback,this);
        this.node.on('clickGreat',this.clickCallback,this);
        this.node.position = this.startPos; // 初始位置 
        this.moveAction();
    },

    clickCallback(){
        cc.audioEngine.playEffect(this.destroySound,false);
        this.node.destroy();
    },

});
