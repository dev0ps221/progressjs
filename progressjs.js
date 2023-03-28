class ProgressBar{
    options = {
        position : 0,
        maxPosition : 100,
        color:"#fff",
        background:"#333"
    }
    refresh(){

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
    setPosition(position){
        if(position < 0){
            position = 0
        }
        if(position>this.getOption('maxPosition')){
            position = this.getOption('maxPosition')
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
    checkOption(key){
        return this.options.hasOwnProperty(key)
    }
    getOption(key){
        return this.checkOption(key) ? this['options'][key] : null
    }
    showProgress(){
        if(this.checkOption('target')){

        }
    }
    buildProgress(){
        this.element = document.createElement('div')
        this.element.classList.add('pj-progressbar')
    }
    constructor(options={}){
        this.setOptions(options)
    }
}