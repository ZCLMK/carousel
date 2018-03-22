
class Carousel {
 /**
  * @param {HTMLelement}
  * @param {objet}options
  * @param {objet}options.slidesToScroll - nbr de slides à faire défiler
  * @param {objet}options.slideVisible - nbr d'éléments visibles dans un slide
  */

    constructor(element, options = {}){
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        // this.children = [].slice.call(element.children)
        let enfants = [...element.children]
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        element.appendChild(this.root)
        this.root.appendChild(this.container)
        this.items = enfants.map((child)=>{
          let item = document.createElement('div')
          item.classList.add('carousel-item')
          item.appendChild(child)
          this.container.appendChild(item)
          return item 
        })
        this.setStyle()
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
            let ratio = this.items.length/this.options.slidesVisible
            this.container.style.width = (ratio * 100) + "%" 
            this.items.forEach(item =>  item.style.width = (100/this.options.slidesVisible)/ratio + "%")
        }

        createNavigation(){
            let nextButton = this.createDivWithClass('carousel-next')
            let prevButton = this.createDivWithClass('carousel-prev')
            this.root.appendChild(nextButton)
            this.root.appendChild(prevButton)
            nextButton.addEventListener('click', this.next.bind(this))
            prevButton.addEventListener('click', this.prev.bind(this))
            // on utilise "bind(this)" pour que dans this.next & this.prev, this => la classe, pas à la 
            //fonction createNavigation
        }

        prev(){
            this.goToItem(this.currentItem + this.options.slidesToScroll)
        }

        next(){
            this.goToItem(this.currentItem - this.options.slidesToScroll)
        }
        goToItem(index){
            let translateX = index * 100 / items.length
            this.container.style.transform = 'translate3D('+ translateX +'%,0,0,)'
            this.currentItem = index
        }
    }

document.addEventListener('DOMContentLoaded', function(){

    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3
    })
})
