
cc.Class({
    extends: cc.Component,

    properties: {
        dragonPrefab:cc.Prefab,
        ghostPrefab:cc.Prefab,
        rabbitPrefab:cc.Prefab,
        crabPrefab:cc.Prefab,
        canvas:cc.Node,

        _audioID:null,
        _noteArray:[],
    },

    loadMusic(musicName){
        cc.loader.loadRes(musicName, (err, music)=>{ // 改成箭头函数就可以使用this了
            if(err){
                cc.log(err);
                return;
            }
            this._audioID = cc.audioEngine.playMusic(music,false,1); // 播放并获取到audio的ID
        })
    },
    
    musicAnaly(jsonName){
        cc.loader.loadRes(jsonName,(err,jsonAsset)=>{
            if(err){
                cc.log(err);
                return;
            }
            let noteData = jsonAsset.json;
            for(let i = noteData.length;i>0;i--){
                this._noteArray.push(noteData[i]); // 得到音符数组
            }
        })
    },
    
    creatEnemy(){
        let nowMusicTime = Math.floor(cc.audioEngine.getCurrentTime(this._audioID)*10); // 将精度提升到 0.1 秒
        if(this._noteArray.length != 0){
            if(this._noteArray[this._noteArray.length -1].time == nowMusicTime){
                let enemyData = this._noteArray.pop();
                switch(enemyData.type){
                    case "dragon":{
                        this.makePrefab("dragon");
                        break;
                    }
                    case "ghost":{
                        this.makePrefab("ghost");
                        break;
                    }
                    case "rabbit":{
                        this.makePrefab("rabbit");
                        break;
                    }
                    case "crab":{
                        this.makePrefab("crab");
                        break;
                    }
                }
            }
        }
    },

    makePrefab(prefabType){ // 暂时没有用 对象池，后续要改成对象池
        let prefab = null;
        switch(prefabType){
            case "dragon": prefab = this.dragonPrefab; break;
            case "ghost": prefab = this.ghostPrefab; break;
            case "rabbit": prefab = this.rabbitPrefab; break;
            case "crab": prefab = this.crabPrefab; break;
        }
        let enemy = cc.instantiate(prefab);
        enemy.parent = this.canvas;
    },

    // 之后可以通过对 cc.direction.on('clickPerfect')进行监听，并获取到节点信息，然后回收到对象池

    onLoad () {
        this.loadMusic('music/old'); // test
        this.musicAnaly('music/oldJson');
    },
    
    update (dt) {
        this.creatEnemy();
    },
});
