class ProgressBar{
    options = {}
    setTarget(target){
        if(target instanceof HTMLElement){
            this.setOption(
                'target',target
            )
            this.target = target
        }
    }
    setOption(key,value){
        this.options[key] = value
    }
    constructor(options={}){
        this.options = options
    }
}