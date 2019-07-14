
cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration: 0.5,
        siledDuration: 0.5,
        sildeSpriteFrame: cc.SpriteFrame,
        runSpriteFrame:cc.SpriteFrame,
        _jumpFlag:false, // 跳跃的标志位，用来判断是否在跳跃
        _sildeFlag:false,
    },

    onLoad() {
        this.animation = this.node.getComponent(cc.Animation); // 获取动画组件
        this.sprite = this.node.getComponent(cc.Sprite);       // 获取精灵组件
        cc.director.on('jumpStart', this.jumpActionPlay, this);
        cc.director.on('slideStart', this.sildeActionPlay, this);
        //cc.director.on('jumpEnd',this.jumpActionEnd,this);
        //cc.director.on('slideEnd',this.sildeActionEnd,this);
        this.jumpActionInit();
        this.sildeActionInit();
    },
    // 初始化跳跃动作
    jumpActionInit() {
        let stopRun = cc.callFunc(() => {
            this._jumpFlag = true;
            this.animation.pause('run')
        });
        let restartRun = cc.callFunc(() => {
            this.animation.play('run')
            this._jumpFlag = false;
        });
        let jump = cc.moveTo(this.jumpDuration, cc.v2(-760, 350)).easing(cc.easeCubicActionOut());
        let down = cc.moveTo(this.jumpDuration, cc.v2(-760, -14)).easing(cc.easeCubicActionIn());
        this.jumpAction = cc.sequence(stopRun, jump, down, restartRun);
    },
    jumpActionPlay() {
        if(this._sildeFlag){
            this.node.stopAction(this.sildeAction); // 停止滑动动作
            this.node.y = -14;
            this.sprite.spriteFrame = this.runSpriteFrame;
            this._sildeFlag = false;
        }
        this.node.runAction(this.jumpAction);
    },
    // 下滑动作初始化
    sildeActionInit() {
        let flagChange = cc.callFunc(()=>{this._sildeFlag = true;}); // 用来改变滑动标志位
        let down = cc.moveTo(this.siledDuration, cc.v2(-760, -50));
        let changeSlide = cc.callFunc(() => { 
            this.animation.pause('run'); 
            this.sprite.spriteFrame = this.sildeSpriteFrame; 
        });
        let restartRun = cc.callFunc(() => { 
            this.node.y = -14; 
            this.animation.play('run'); 
            this._sildeFlag = false;
        });
        this.sildeAction = cc.sequence(flagChange,down, changeSlide, cc.delayTime(0.2), restartRun);
    },
    sildeActionPlay() {
        if (this._jumpFlag) {
            this.node.stopAction(this.jumpAction); // 停止跳跃动作
            this._jumpFlag = false;
        }
        this.node.runAction(this.sildeAction);
    },

    sildeActionEnd() {

    },
    jumpActionEnd() {

    },

    // update (dt) {},
});
