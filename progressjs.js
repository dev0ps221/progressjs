class ProgressBar{
    options = {
        color:"#fff",
        background:"#333"
    }
    setTarget(target){
        if(target instanceof HTMLElement){
            this.setOption(
                'target',target
            )
            this.target = target
        }
    }
    setColor(color){
        this.setOption('color', color)
    }
    setBackground(background){
        this.setOption('background', background)
    }
    setOption(key,value){
        this.options[key] = value
    }
    setOptions(options){
        Object.key(options).forEach(
            key=>{
                const value = options[key]
                this.setOption(key,value)
            }
        )
    }
    constructor(options={}){
        this.setOptions(options)
    }
}