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
    checkStyleElement(){
        return  this.hasOwnProperty('styleElement') && this.styleElement
    }
    getStyleElement(){
        return this.checkStyleElement() ? this.styleElement : null
    }
    setCss(property,value){
        this.checkStyleElement() ? this.getStyleElement().setProperty(property,value) : null
    }
    getCss(property){
        return this.checkStyleElement() ? this.getStyleElement().getPropertyValue(property) : null
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
            this.setOption('position',0)
        }
        if(position>this.getOption('maxPosition')){
            this.setOption('position',this.getOption('maxPosition'))
        }
    }

    setLimit(limit){
        this.setOption('maxPosition', limit)
    }



    //the more progress stuff

    createElement(){
        this.element = document.createElement('div')
        this.element.classList.add('pj-progressbar')
        this.styleElement = getComputedStyle(this.getElement())
    }
    checkElement(){
        return this.hasOwnProperty('element') && this.element
    }
    getElement(){
        return this.checkElement() ? this.element : this.createElement()
    }
    refresh(){
        if(this.checkOption('position')){
            this.setCss('--position', this.getOption('position'))
        }
        if(this.checkOption('maxPosition')){
            this.setCss('--max-position', this.getOption('position'))
        }
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
        this.buildProgress()
    }
}