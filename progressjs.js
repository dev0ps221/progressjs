class ProgressBar{

    //the more options stuff
    options = {
        position : 0,
        maxPosition : 100,
        color:"#fff",
        height:"5px",
        containerHeight:"5rem",
        background:"#00c"
    }
    
    setTarget(target){
        if(target instanceof HTMLElement){
            this.setOption(
                'target',target
            )
        }
        return this
    }
    setColor(color){
        this.setOption('color', color)
        return this
    }
    setBackground(background){
        this.setOption('background', background)
        return this
    }
    setOption(key,value){
        this.options[key] = value
        this.refresh()
        return this
    }
    setOptions(options){
        Object.keys(options).forEach(
            key=>{
                console.log
                const value = options[key]
                this.setOption(key,value)
            }
        )
        return this
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
        this.checkElement() ? this.getElement().style.setProperty(property,value) : null
        return this
    }
    getCss(property){
        return this.checkStyleElement() ? this.getStyleElement().getPropertyValue(property) : null
    }


    //the more position stuff
    moveTo(position){
        this.setPosition(position)
        this.refresh()
        return this
    }
    increase(quantity){
        this.moveTo(this.getPosition()+quantity)
        this.refresh()
        return this
    }
    decrease(quantity){
        this.moveTo(this.getPosition()-quantity)
        this.refresh()
        return this
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
        this.setOption('position',position)
        this.refresh()
        return this
    }

    setLimit(limit){
        this.setOption('maxPosition', limit)
        this.refresh()
        return this
    }



    //the more progress stuff

    createElement(){
        this.element = document.createElement('div')
        this.element.classList.add('pj-progressbar')
        this.styleElement = getComputedStyle(this.getElement())
        return this
    }
    checkElement(){
        return this.hasOwnProperty('element') && this.element
    }
    getElement(){
        return this.checkElement() ? this.element : this.createElement()
    }
    refresh(){
        if(this.checkOption('position')){
            this.setCss('--progress-position', this.getOption('position'))
        }
        if(this.checkOption('maxPosition')){
            this.setCss('--max-position', this.getOption('maxPosition'))
        }
        if(this.checkOption('color')){
            this.setCss('--progress-color', this.getOption('color'))
        }
        if(this.checkOption('background')){
            this.setCss('--progress-container-color', this.getOption('background'))
        }
        return this
    }
    showProgress(){
        if(this.checkOption('target')){
            this.getOption('target').appendChild(this.getElement())
        }
        return this
    }
    buildProgress(){
        this.createElement()
        return this
    }


    constructor(options={}){
        this.setOptions(options)
        this.buildProgress()
        return this
    }
}