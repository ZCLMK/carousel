
class Carousel {
 /**
  * @param {HTMLelement}
  * @param {objet}options
  * @param {objet}[options.slidesToScroll=1] - nbr de slides à faire défiler
  * @param {objet}[options.slideVisible=1] - nbr d'éléments visibles dans un slide
  * @param {boolean}[options.loop = false] - faut-il boucler à la fin du carousel? 
  * 
  * @callback moveCallback
  *     @param {number} index
  */

    constructor(element, options = {}){
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop:true
        }, options)
        // this.children = [].slice.call(element.children)
        let enfants = [...element.children]
        this.isMobile = false
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
       
        //modif du DOM
        this.container = this.createDivWithClass('carousel-container')
        this.root.setAttribute('tabindex', '0')
            // permet l'utilisation de la tablature pour
        this.element.appendChild(this.root)
        this.root.appendChild(this.container)
        this.moveCallbacks = []
        this.items = enfants.map((child)=>{
          let item = document.createElement('div')
          item.classList.add('carousel-item')
          item.appendChild(child)
          this.container.appendChild(item)
          return item 
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(cb =>cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', (e) =>{
            // ke deuxieme est la pour edge qui ne comprends par ArrowRight/ArrowLeft
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            }else if(e.key ==='ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
        // !: si on utilise un fonction preES6, this n'est plus la classe mais l'élément
    }
        /**
 * @param {string} className
 * @returns {HTMLelement}
 */
        createDivWithClass(className){
            let maDiv = document.createElement('div')
            maDiv.setAttribute('class', className)
            return maDiv
            }
/**
 * Défini la largeur des images du carousel
 */
        setStyle(){
            let ratio = this.items.length/this.slidesVisible
            this.container.style.width = (ratio * 100) + "%" 
            this.items.forEach(item =>  item.style.width = (100/this.slidesVisible)/ratio + "%")
        }

        createNavigation(){
            let nextButton = this.createDivWithClass('carousel-next')
            let prevButton = this.createDivWithClass('carousel-prev')
            this.root.appendChild(nextButton)
            this.root.appendChild(prevButton)
            nextButton.addEventListener('click', this.next.bind(this))
            prevButton.addEventListener('click', this.prev.bind(this))
            if(this.options.loop === true){
                return
            }
            // on utilise "bind(this)" pour que dans this.next & this.prev, this => la classe, pas à la 
            //fonction createNavigation
            this.onMove(index => {
                if(index==0){
                    prevButton.classList.add('prevButton-hidden')
                }else{
                    prevButton.classList.remove('prevButton-hidden')
                }
                if(this.items[this.currentItem + this.slidesVisible] === undefined){
                    nextButton.classList.add('nextButton-hidden')
                }else{
                    nextButton.classList.remove('nextButton-hidden')
                }
            })
        }

        prev(){
            this.goToItem(this.currentItem - this.slidesToScroll)
        }

        next(){
            this.goToItem(this.currentItem + this.slidesToScroll)
        }
        goToItem(index){
        //     debugger
            console.log(index)
           if(index < 0 && this.currentItem === 0){
               if(this.options.loop){
                index = this.items.length - this.slidesVisible
               }else{
                   return
               }
            } else if(index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)){
                        if(this.options.loop){
                            index = 0
                        }else{
                            return
                        } 
                    } else if(index < 0 && this.currentItem > 0 ){
                    index = 0
                }            
                    
            let translateX = index * (-100 / this.items.length)
            this.container.style.transform = 'translate3d('+translateX +'%,0,0)'
            this.currentItem = index
            this.moveCallbacks.forEach(cb =>cb(index))
           }
        

        /**
         * @param {moveCallback} cb
        */           
           onMove(cb){
            this.moveCallbacks.push(cb)
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
           }
           onWindowResize(){
               let mobile = window.innerWidth < 800
               if(mobile != this.isMobile){
                   this.isMobile = mobile
                   this.setStyle()
               }
           }
           /**
            * @returns {number}
            */
           get slidesToScroll(){
            return this.isMobile ? 1 : this.options.slidesToScroll
           }
             /**
            * @returns {number}
            */
           get slidesVisible(){
            return this.isMobile ? 1 : this.options.slidesVisible
           }
        }
    

document.addEventListener('DOMContentLoaded', function(){

    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3,
        slidesToScroll:3,
        loop:true,
        isMobile:true
    })
    new Carousel(document.querySelector('#carousel2'),{
        slidesToScroll:2,
        slidesVisible:2
    })
    new Carousel(document.querySelector('#carousel3'))
    
})
