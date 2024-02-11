document.addEventListener('DOMContentLoaded', () => {
    

    // Слайдеры

    // Карусель товаров

    (() => {

        if (document.querySelectorAll('.catalog-carousel__item').length) {

            document.querySelectorAll('.catalog-carousel__item').forEach((item, index) => {
                document.querySelector('.carousel-catalog__dots').insertAdjacentHTML('beforeEnd', `<div class = "carousel-catalog__dot ${[index == 0 ? 'active' : '']}"></div>`)
            })

            let glide = new Glide('.catalog-carousel', {
                type: 'carousel',
                keyboard: true,
                gap: 20,
                perView: 4,
                animationTimingFunc: 'linear',
                animationDuration: 300,
                breakpoints: {
                    800: {
                        perView: 2
                    },
                    480: {
                        perView: 1
                    }
                }
            })

            glide.on('run', function() {
                
                document.querySelector('.carousel-catalog__dot.active').classList.remove('active')
                document.querySelectorAll('.carousel-catalog__dot')[glide.index].classList.add('active')
            })
            
            glide.mount()


            document.querySelector('.catalog-carousel__left').addEventListener('click', () => {
                glide.go('<')
            })

            document.querySelector('.catalog-carousel__right').addEventListener('click', () => {
                glide.go('>')
            })

        }
    })();

        
    // Карусель брендов
    
    (() => {

        if (!document.querySelectorAll('.brand-carousel__item').length) return false

        document.querySelectorAll('.brand-carousel__item').forEach((item, index) => {
            document.querySelector('.carousel-brand__dots').insertAdjacentHTML('beforeEnd', `<div class = "carousel-brand__dot ${[index == 0 ? 'active' : '']}"></div>`)
        })

        let glide_brands = new Glide('.brand-carousel', {
            type: 'carousel',
            keyboard: true,
            gap: 20,
            perView: 4,
            animationTimingFunc: 'linear',
            animationDuration: 300,
            breakpoints: {
                800: {
                    perView: 2
                },
                480: {
                    perView: 1
                }
            }
        })

        glide_brands.on('run', function() {
            
            document.querySelector('.carousel-brand__dot.active').classList.remove('active')
            document.querySelectorAll('.carousel-brand__dot')[glide_brands.index].classList.add('active')
        })
        
        glide_brands.mount()


        document.querySelector('.brand-carousel__left').addEventListener('click', () => {
            glide_brands.go('<')
        })

        document.querySelector('.brand-carousel__right').addEventListener('click', () => {
            glide_brands.go('>')
        })
    })()


    // Слайдер в товаре

    if (document.querySelector('.glide')) {

        let icons = document.querySelectorAll('.product-icon-item'),
            glide = new Glide('.glide', {
                        type: 'carousel',
                        perView: 1,
                        keyboard: true,
                        animationDuration: 300
                    })
    
        glide.mount()

        glide.on('run', () => {

            icons.forEach(item => {
                item.classList.contains('active') ? item.classList.remove('active') : ''
            })

            icons[glide.index].classList.add('active')
        })

        document.querySelectorAll('.product-icon-item').forEach(item => {
            
            item.addEventListener('click', () => {
                glide.go(event.target.getAttribute('data-glide-dir'))
            })
        })
    }


})