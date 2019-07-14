
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.jumpButton = this.node.getChildByName('jump');
        this.slideButton = this.node.getChildByName('slide');
        this.jumpButton.on('touchstart',this.touchStartCallback,this);
        this.jumpButton.on('touchend',this.touchEndCallback,this);
        this.jumpButton.on('touchcancel',this.touchEndCallback,this);
        this.slideButton.on('touchstart',this.touchStartCallback,this);
        this.slideButton.on('touchend',this.touchEndCallback,this);
        this.slideButton.on('touchcancel',this.touchEndCallback,this);
    },

    touchStartCallback(event){
        if(event.currentTarget.name == 'jump'){
            cc.director.emit('jumpStart');
        }
        if(event.currentTarget.name == 'slide'){
            cc.director.emit('slideStart');
        }
        
    },
    touchEndCallback(event){
        if(event.currentTarget.name == 'jump'){
            cc.director.emit('jumpEnd');
        }
        if(event.currentTarget.name == 'slide'){
            cc.director.emit('slideEnd');
        }
    },

    // update (dt) {},
});
