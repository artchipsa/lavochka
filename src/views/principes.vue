<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view
            .owl-dots.principes
            .owl-arrows.principes
                a(href="#" @click.prevent="prevSlide") 
                    i.fa.fa-caret-left(aria-hidden="true")
                a(href="#" @click.prevent="nextSlide") 
                    i.fa.fa-caret-right(aria-hidden="true")
            .left-info-block.mobile-top
                    .tag принципы
                    h1.without-link покупателю  #[br] важно #[br] знать!
            .count 01
            .owl-carousel.black-carousel
                .item(style="background-image: url(public/p1.jpg)")
                    .container
                        .center-text-block
                            h2 «частная лавочка» всегда предпочтет крупным комбинатам и предприятиям #[br] #[span частных и семейных поставщиков]
                    .overlay
                .item(style="background-image: url(public/p2.jpg)")
                    .container
                        .center-text-block
                            h2 мы сотрудничаем только #[span персонально] #[br] с конкретными людьми. #[br] хозяин отвечает за все
                    .overlay
                .item(style="background-image: url(public/p3.jpg)")
                    .container
                        .center-text-block
                            h2 мы боремся за доступность цен, но главное – #[span качество, вкус и натуральность продуктов]
                    .overlay
                .item(style="background-image: url(public/p4.jpg)")
                    .container
                        .center-text-block
                            h2 поставщик продуктов короткого хранения#[br]не может находиться#[br]дальше #[span 1000 км] #[br]от магазина
                    .overlay
                .item(style="background-image: url(public/p5.jpg)")
                    .container
                        .center-text-block
                            h2 у нас #[span нет] продуктов, #[br] которые изготовлены с использованием химических консервантов
                    .overlay
                .item(style="background-image: url(public/p6.jpg)")
                    .container
                        .center-text-block
                            h2 В супермаркетах «Частная Лавочка» принципиально нет склада. Свежие продукты подвозятся в магазин #[span каждый день ранним утром]   
                    .overlay
                .item(style="background-image: url(public/p7.jpg)" v-if="mobile")
                    .container
                        .center-text-block.big
                            .row
                                .row-item
                                    h2 «частная лавочка» всегда предпочтет крупным комбинатам и предприятиям #[span частных и семейных поставщиков]
                                .row-item
                                    h2 мы сотрудничаем только #[span персонально], с конкретными людьми. хозяин отвечает за все
                                .row-item
                                    h2 мы боремся за доступность цен, но главное – #[span качество, вкус и натуральность продуктов]
                            .row
                                .row-item
                                    h2 поставщик продуктов короткого хранения не может находиться дальше #[span 1000] км  от магазина
                                .row-item
                                    h2 у нас #[span нет] продуктов, которые изготовлены с использованием химических консервантов
                                .row-item
                                    h2 В супермаркетах «Частная Лавочка» принципиально нет склада. Свежие продукты подвозятся в магазин #[span каждый день ранним утром]. 
                                
                    .overlay



</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                owl: '',
                _this: '',
                mobile: true
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
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-50%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity(el, {translateY: '0%'}, {duration: 10})                    
                } else {
                    Velocity(el, {translateY: '200%'}, {duration: 10})
                    Velocity($(el).find('.center-text-block'), {opacity: 0});
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-50%', translateX: '-50%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
            },
            beforeLeave(el){
                
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
                    document.querySelector('body').style.backgroundColor = '#FAF6EB';      
                } else if (this._flow == 'back'){
                    Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-50%', translateX: '-50%'}, {duration: 350, easing: 'easeInCubic'})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                    Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done})
                    document.querySelector('body').style.backgroundColor = '#D5DFDE';
                }
            }
        },
        created(){
            if ($(window).width() < 500){
                this.mobile = false;
            } else {
                this.mobile = true;
            }
        },
        mounted(){
            this.owlInit();            
            this.owl.on('translate.owl.carousel', (event) => {
                let index = event.page.index + 1;
                if (index < 10){
                    document.querySelector('.count').innerText = '0'+index;
                } else {
                    document.querySelector('.count').innerText = index;
                }
            });
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

    .left-info-block{
        z-index: 1;
    }

    .owl-dots.principes{
        bottom: 10%;
        right: 47%;
        z-index: 1;
    }
    .owl-arrows.principes{
        right: 13%;
        z-index: 1;
    }

    .count{
        position: absolute;
        top: 23.5%;
        left: 3%;
        color: $orange;
        font-family: bebas;
        font-weight: 800;
        font-size: 5.2vw;
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
                    top: 23%;
                    left: 55%;
                    width: 65%;
                    transform: translateX(-50%);
                    &.big{
                        top: 25%;
                        width: 65%;
                        left: 55%;
                    }
                }
                .row{
                    width: 100%;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    margin-bottom: 150px;
                    &:last-child{
                        margin-bottom: 0px;
                    }
                    .row-item{
                        width: 33.33%;
                        h2{
                            font-size: 26px;
                            line-height: 135%;
                            padding-right: 20%;
                            margin-bottom: 0px;
                        }
                    }
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
    
    @media (max-width: 1367px){
        .black-carousel .item .container .row{
            margin-bottom: 28px;
        }
    }

    @media (max-width: 1025px){
        .black-carousel .item .container .center-text-block.big{
            top: 25%;
            width: 70%;
            left: 57%;
        }
        .black-carousel .item .container .row .row-item h2 {
            font-size: 24px;
        }
    }


    @media (max-width: 469px){
        .black-carousel .item .container .center-text-block{
            width: 80%;
            left: 43%;
            top: 50%;
            min-height: 1px;
            height: auto;
        }
        .count{
            top: 32%;
            font-size: 9.5vw;
        }
        .black-carousel .item .container .center-text-block h2{
            font-size: 9.5vw;
        }
        .black-carousel .item.no-mobile{
            display: none;
        }
        .owl-dots,
        .owl-arrows {
            right: 3%;
        }
    }

    @media (max-width: 321px){

        .black-carousel .item .container .center-text-block h2{
            font-size: 8.2vw;
        }

    }

    @import 'src/assets/styles/responsive.scss';    

</style>


