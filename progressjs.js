class ProgressBar{
    //useful props for events
    mouseDown = null


    //the more options stuff
    options = {
        position : 0,
        maxPosition : 100,
        color:"#000",
        height:"85px",
        containerHeight:"10px",
        playInterval:.2,
        background:"#0001"
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
                const value = options[key]
                this.setOption(key,value)
            }
        )
        return this
    }
    setPlayInterval(interval){
        interval = parseInt(interval)
        if(!isNaN(interval) && interval < 80){
            this.setOption('playInterval', interval)
            return interval
        }
        return this.getOption('playInterval')
    }
    checkPlayInterval(){
        return this.checkOption('playInterval')
    }
    getPlayInterval(){
        return this.checkOption('playInterval') ? this.getOption('playInterval') : this.setPlayInterval(4)
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

    getRect(){
        return this.element.getBoundingClientRect()
    }

    getLeftEndVal(){
        return this.getRect().left
    }

    getRightEndVal(){
        return this.getRect().right
    }

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
            this.setCss('--progress-max-position', this.getOption('maxPosition'))
        }
        if(this.checkOption('height')){
            this.setCss('--progress-height', this.getOption('height'))
        }
        if(this.checkOption('containerHeight')){
            this.setCss('--progress-container-height', this.getOption('containerHeight'))
        }
        if(this.checkOption('color')){
            this.setCss('--progress-color', this.getOption('color'))
        }
        if(this.checkOption('big')){
            this.checkElement() ? this.getElement().classList.add('pj-big-progressbar') : null
        }
        if(this.checkOption('background')){
            this.setCss('--progress-container-color', this.getOption('background'))
        }
        return this
    }
    autoplay(){
        const move = ()=>{
            if(this.getOption('position') >= this.getOption('maxPosition')){
                this.setPosition(0)
            }else{
                this.setPosition(this.getOption('position')+5)
            }
            setTimeout(move,(this.getPlayInterval()+.5)*1000)
        }
        move()
    }
    showProgress(){
        if(this.checkOption('target')){
            this.getOption('target').appendChild(this.getElement())
        }
        return this
    }

    buildProgress(){
        this.createElement()
        this.refresh()
        return this
    }


    //more interactions related stuff

    clickAction(event){
        const getTargettedPosition = ()=>{
            const length = Math.ceil(this.getStyleElement().width.replace("px",""))
            const distance = Math.ceil(event.clientX) - Math.ceil(this.getLeftEndVal())
            const percent = distance/(length/100)
            const position = (this.getOption('maxPosition')/100) * percent
            return  position
        }
        this.setPosition(getTargettedPosition())        

    }
    dragAction(event){
        const getTargettedPosition = ()=>{
            const length = Math.ceil(this.getStyleElement().width.replace("px",""))
            const distance = Math.ceil(event.clientX) - Math.ceil(this.getLeftEndVal())
            const percent = distance/(length/100)
            const position = (this.getOption('maxPosition')/100) * percent
            return  position
        }
        this.setPosition(getTargettedPosition())        
    }

    listenToActions(){
        this.getElement().removeEventListener(
            'click',e=>{
                this.clickAction(e)
            }
        )
        this.getElement().addEventListener(
            'click',e=>{
                this.clickAction(e)
            }
        )
        this.getElement().removeEventListener(
            'mousedown',e=>{
                this.setCss('--transition-time', '0s')
                this.setCss('cursor', 'ew-resize')
                this.mouseDown = true
                this.dragAction(e)
            }
        )
        this.getElement().addEventListener(
            'mousedown',e=>{
                this.setCss('--transition-time', '0s')
                this.setCss('cursor', 'ew-resize')
                this.mouseDown = true
                this.dragAction(e)
            }
        )
        this.getElement().removeEventListener(
            'mousemove',e=>{
                if(this.mouseDown){
                    console.log('dragging')
                    this.dragAction(e)
                }
            }
        )
        this.getElement().addEventListener(
            'mousemove',e=>{
                if(this.mouseDown){
                    this.dragAction(e)
                }
            }
        )
        window.removeEventListener(
            'mouseup',e=>{
                this.setCss('--transition-time', '.5s')
                this.setCss('cursor', 'default')
                this.mouseDown = null
            }
        )
        window.addEventListener(
            'mouseup',e=>{
                this.setCss('--transition-time', '.5s')
                this.setCss('cursor', 'default')
                this.mouseDown = null
            }
        )
    }


    constructor(options={}){
        this.setOptions(options)
        this.buildProgress()
        this.listenToActions()
        return this
    }
}