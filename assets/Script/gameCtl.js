

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        let manager = cc.director.getCollisionManager(); // 开启碰撞系统
        manager.enabled = true;
    },

 
});
