

cc.Class({
    extends: cc.Component,

    properties: {
        enabledCollisionManager:{
            default:false,
            displayName:'碰撞系统',
            tooltip:'是否开启碰撞系统',
        },
    },

    onLoad () {
        if(this.enabledCollisionManager){
            let manager = cc.director.getCollisionManager(); // 开启碰撞系统
            manager.enabled = true;
        }
    },
   
    update(){
    },

});
