class ProgressBar{
    position = 0
    options = {
        color:"#fff",
        background:"#333"
    }
    moveTo(position){
        this.position = position
    }
    increase(quantity){
        this.position += quantity
        this.position = this.position > 100 ? 100 : this.position
    }
    decrease(quantity){
        this.position -= quantity
        this.position = this.position < 0 ? 0 : this.position
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
    append(){

    }
    constructor(options={}){
        this.setOptions(options)
    }
}