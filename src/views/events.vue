<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view
            .owl-dots.events
            .owl-arrows.events
                a(href="#" @click.prevent="prevSlide")
                    i.fa.fa-caret-left(aria-hidden="true")
                a(href="#" @click.prevent="nextSlide")
                    i.fa.fa-caret-right(aria-hidden="true")
            .owl-carousel.black-carousel
                .item(:style="{ backgroundImage: event.img}" v-for="event in events")
                    .container
                        .left-info-block
                            .tag новости
                            h1 {{ event.data }}
                            router-link(:to="event.link") подробнее
                        //- .count {{event.data}}
                        .center-text-block
                            h2 
                                router-link(:to="event.link") {{ event.name }}
                    .overlay



</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                owl: '', 
                events:[
                    {
                        name: 'две экскурсии с дегустациями',
                        link: '/events/degustation',
                        img: 'url(public/events/degustation.jpg)',
                        data: '23.09.2017'     
                    },
                    {
                        name: 'Открытие магазина восьмого сентября',
                        link: '/events/new-shop',
                        img: 'url(public/e1.jpg)',
                        data: '06.09.2017'
                    },
                    {
                        name: 'фестиваль «зеленый»',
                        link: '/events/zeleniy',
                        img: 'url(public/ev_img2.jpg)',
                        data: '23.06.2017'                        
                    }
                ],
                _this: '',
            }
        },
        beforeRouteLeave(to, from, next){
            const toDepth = to.path
            const fromDepth = from.path
            let current;
            let next_view;
            for (let i = 0; i < this.links.length; i++){
                if (toDepth == this.links[i].url){
                    next_view = i;
                }
                if (fromDepth == this.links[i].url){
                    current = i;
                }
            }
            this._flow = current < next_view ? 'forward' : 'back';
            next();
        },
        methods:{
            owlInit(){
                this.owl = $('.black-carousel').owlCarousel({
                    items:1,
                    loop: true,
                    center: true,
                    dots: true,
                    dotsContainer: '.owl-dots'
                })
            },
            prevSlide(){
			    this.owl.trigger('prev.owl.carousel');
			},
			nextSlide(){
			    this.owl.trigger('next.owl.carousel');
            },
            beforeEnter(el){
                if (this.flow == ''){
                    Velocity($(el).find('.center-text-block'), {opacity: 0});
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-80%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity(el, {translateY: '0%'}, {duration: 10})                    
                } else {
                    Velocity(el, {translateY: '200%'}, {duration: 10})
                    Velocity($(el).find('.center-text-block'), {opacity: 0});
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-80%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
            },
            beforeLeave(el){
                el.style.zIndex = 1;
            },
            enter(el, done){
                $(".contacts-top").css("right", "12%");
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#ffffff');
                    Velocity(document.querySelector('.logo-text'), {color: '#ffffff'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                    Velocity(document.querySelectorAll('.center-text-block'), {opacity: 1, translateY: '0%', translateX: '-50%'}, {duration: 350, delay: 400, easing: 'easeOutCubic'}); 
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#ffffff');
                    Velocity(document.querySelector('.logo-text'), {color: '#ffffff'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                        Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                        Velocity(document.querySelectorAll('.center-text-block'), {opacity: 1, translateY: '0%', translateX: '-50%'}, {duration: 350, delay: 400, easing: 'easeOutCubic'}); 
                        done();
                    }, 800);
                }

            },
            leave(el, done){
                clearInterval(this.interval)
                if (this._flow == 'forward'){
                   Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-50%', translateX: '-50%'}, {duration: 350, easing: 'easeInCubic'})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                    Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done}) 
                } else if (this._flow == 'back'){
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-50%', translateX: '-50%'}, {duration: 350, easing: 'easeInCubic'})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                    Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done})

                }
            }
        },
        mounted(){
            this.owlInit();
            // this.owl.on('translate.owl.carousel', (event) => {
            //     let index = event.page.index + 1;
            //     if (index < 10){
            //         document.querySelector('.count').innerText = '0'+index;
            //     } else {
            //         document.querySelector('.count').innerText = index;
            //     }
            // })
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    // .left-info-block{
    //     z-index: 1;
    //     h1{
    //         color: $white;
    //     }
    //     a{
    //         color: $white;
    //     }
    // }

    .owl-dots{
        right: 50%;
        z-index: 1;
    }
    .owl-arrows{
        right: 13%;
        z-index: 1;
    }

    .count{
        position: absolute;
        top: 23.5%;
        left: 3%;
        color: $white;
        font-family: bebas;
        font-weight: 800;
        font-size: 20px;
        line-height: 100%;
        z-index: 1;
    }

    .black-carousel{
        width: 100%;
        height: 100%;
        z-index: 0;
        .item{
            position: relative;
            height: 100%;
            width: 100%;
            background-size: cover;
            .container{
                z-index: 1;
                .center-text-block{
                    top: 30%;
                    width: 50%;
                }
            }
            .overlay{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                z-index: 0;
                background-color: transparentize($black, .4);
            }
        }
    }
    
    @media (max-width: 769px){
        .black-carousel .item .container .center-text-block{
            width: 68%;
            top: 32%;
        }
        .center-text-block h2{
            font-size: 11vw;
        }
        .owl-dots{
            right: 3%;
        }
        .owl-arrows{
            right: 3%;
        }
    }

</style>


