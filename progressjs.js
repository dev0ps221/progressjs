class ProgressBar{

    //the more options stuff
    options = {
        position : 0,
        maxPosition : 100,
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
    checkOption(key){
        return this.options.hasOwnProperty(key)
    }
    getOption(key){
        return this.checkOption(key) ? this['options'][key] : null
    }


    //the more css stuff
    setCssVar(){

    }


    //the more position stuff
    moveTo(position){
        this.setPosition(position)
    }
    increase(quantity){
        this.moveTo(this.getPosition()+quantity)
    }
    decrease(quantity){
        this.moveTo(this.getPosition()-quantity)
    }

    getposition(){
        return  this.getOption('position')
    }

    setPosition(position){
        if(position < 0){
            position = 0
        }
        if(position>this.getOption('maxPosition')){
            position = this.getOption('maxPosition')
        }
    }



    //the more progress stuff

    createElement(){
        this.element = document.createElement('div')
        this.element.classList.add('pj-progressbar')
    }
    checkElement(){
        return this.hasOwnProperty('element') && this.element
    }
    getElement(){
        return this.checkElement() ? this.element : this.createElement()
    }
    refresh(){

    }
    showProgress(){
        if(this.checkOption('target')){
            this.getOption('target').appendChild(this.getElement())
        }
    }
    buildProgress(){
        this.createElement()
    }


    constructor(options={}){
        this.setOptions(options)
    }
}