
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
        this.children = [...element.children]
        console.log(this.children)
        // let ratio = this.children.length/this.options.slidesVisible
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel-container')
        // container.style.width = (ratio * 100) + "%"
        console.log(root, container)
        this.element.appendChild(root)
        root.appendChild(container)
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
    }

document.addEventListener('DOMContentLoaded', function(){

    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3
    })
})

