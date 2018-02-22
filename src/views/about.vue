<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            floats
            .container
                .owl-dots.about
                .owl-carousel.about-carousel
                    .item 
                        h2 за этот базар #[span отвечают]
                        .people-block
                            .item
                                .img(style="background-image: url(public/max.jpg)")
                                .content
                                    .name Максим Валерьевич Павлов
                                    .rank Управляющий проектом
                                    .contacts
                                        a(href="tel:+7 929 338-23-26") +7 929 338-23-26
                                        a(href="mailto:maxpavlovval@mail.ru") maxpavlovval@mail.ru
                                        a(href="https://www.instagram.com/maxmanfun/", target="_blank") instagram
                            .item
                                .img(style="background-image: url(public/ow1.jpg)")
                                .content
                                    .name Алексей Хрульков
                                    .rank Руководитель направления закупок и логистики
                                    .contacts
                                        a(href="tel:+7 923 354-25-27") +7 923 354-25-27
                                        a(href="mailto:alexeynh@bk.ru") alexeynh@bk.ru
                                        a(href="https://www.instagram.com/alekseikhrulkov/", target="_blank") instagram
                            .item
                                .img(style="background-image: url(public/ow2.jpg)")
                                .content
                                    .name Дмитрий Васильевич Вербицкий
                                    .rank Основатель проекта
                                    .contacts
                                        a(href="tel:8 913 532 80 00") +7 913 532-80-00
                                        a(href="mailto:ooo.diva@mail.ru") ooo.diva@mail.ru
                                        a(href="https://www.instagram.com/verbitskii13/", target="_blank") instagram
                            //- .item
                            //-     .img(style="background-image: url(public/ow4.jpg)")
                            //-     .content
                            //-         .name Татьяна Левина 
                            //-         .rank Маркетолог проекта
                            //-         .contacts
                            //-             a(href="tel:+7 908 011 36 92") +7 908 011-36-92
                            //-             a(href="mailto:t.levina@pkdiva.ru") t.levina@pkdiva.ru
                            //-         .small-text Все пожелания и замечания отправляйте мне. Не одно обращение не оставлю без ответа
                    .item
                        h2 «Частная лавочка» — это супермаркет продуктов #[span от частников]
                        p.descr  Сеть Частная Лавочка уделяет отдельное внимание заботе о личном успехе Поставщиков  у аудитории. Мы, в отличие от других, не только  не пытаемся "застроить их под общую гребенку",  но и помогаем в персональном продвижении партнеров-производителей на территории магазинов  и в промоматериалах Частной Лавочки.
                    .item
                        h2 МЫ РАБОТАЕМ ТОЛЬКО #[br] #[span С ЧАСТНИКАМИ]
                        p.descr Сеть Частная Лавочка уделяет отдельное внимание заботе о личном успехе Поставщиков  у аудитории. Мы, в отличие от других, не только  не пытаемся "застроить их под общую гребенку",  но и помогаем в персональном продвижении партнеров-производителей на территории магазинов  и в промоматериалах Частной Лавочки.
                        
                .owl-arrows.about
                    a(href="#" @click.prevent="prevSlide") 
                        i.fa.fa-caret-left(aria-hidden="true") 
                    a(href="#" @click.prevent="nextSlide") 
                        i.fa.fa-caret-right(aria-hidden="true") 
                .left-info-block.mobile-top.big
                    .tag {{tag}}
                    h1.without-link {{h1}}
                    a(href="/principles.pdf", target="_blank").link  скачать pdf

</template>

<script>
    import floats from '../components/float.vue';

    export default {
        data(){
            return{
                color: '#FAF6EB',
                sections: '',
                owl: '',
                items: [
                    {
		                tag: 'О компании',
		                h1: 'Супермаркет натуральных продуктов',
                    },
                    {
		                tag: 'О компании',
		                h1: 'Супермаркет натуральных продуктов',
                    },
                    {
                        tag: 'Ищем партнеров',
                        h1: 'Хотите стать нашим партнером? Ознакомьтесь с памяткой для потенциального поставщика',
                    },
                ],
                tag: 'О компании',
                h1: 'Супермаркет натуральных продуктов',
            }
        },
        components:{
            floats
        },            
        methods:{
            beforeEnter(el){
                document.querySelector('body').style.backgroundColor = '#FAF6EB';
                Velocity(el, {translateY: '200%'}, {duration: 10})
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
                
            },
            beforeLeave(el){
                Velocity(document.querySelector('.left-info-block'), {translateX: '-0%'}, { duration: 10});
            },
            enter(el, done){
            	$('.left-info-block.mobile-top.big a.link').css('display', 'none');
                $(".contacts-top").css("right", "12%");
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#312217');
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#312217');
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                        Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                        done();
                    }, 800);
                }
            },
            leave(el, done){
                Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done})
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, easing: 'easeInCubic'});
            },

            owlInit(){
                this.owl = $('.about-carousel').owlCarousel({
                    items:1,
                    loop: true,
                    center: true,
                    dots: true,
                    dotsContainer: '.owl-dots',
                    startPosition: 1
                })
            },
            prevSlide(){
                this.owl.trigger('prev.owl.carousel');
            },
            nextSlide(){
                this.owl.trigger('next.owl.carousel');
            },

        },
        mounted(){
            this.owlInit(); 
            this.owl.on('translate.owl.carousel', (event) => {
                let index = event.page.index;
                this.tag = this.items[index].tag;
                this.h1 = this.items[index].h1;
                if (index == 2) {
                	$('.left-info-block.mobile-top.big a.link').css('display', 'block');
                	$('.left-info-block.mobile-top.big h1').addClass('h1-small');
                } else {
                	$('.left-info-block.mobile-top.big a.link').css('display', 'none');	
                	$('.left-info-block.mobile-top.big h1').removeClass('h1-small');
                }
            })
        },
        updated(){            
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

    .owl-dots.about {
        right: 43%;
    }

    .h1-small {
    	font-size: 30px!important;
    }

    .about-carousel{
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 0;
        padding-top: 12%;
        .item{
            text-align: center;
            display: block;
            position: relative;
            height: 100%;
            width: 60%;
            text-align: left;
            left: 23%;
            h2{
            font-family: bebas;
            font-weight: 800;
            font-size: 5.2vw;
            display: block;
            line-height: 108%;
            margin: 0;
            margin-bottom: 50px;
            color: #0d0809;
            width: 100%;
            color: $black;
                span{
                    color: $orange;
                }
             }
            p{
                //width: 50%;
                font-size: 18px;
                line-height: 180%;
            }
            a{
                color: $orange;
            }
        }
        .owl-item{
            cursor: url(../assets/cursor_left_right4.svg) 22 8 , move;
            &:active, &:focus{
                cursor: url(../assets/cursor_left_right3.svg) 22 8, move;
            }
        }
    }

    .people-block{
        width: 100%;
        height: 70%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item{
            width: 30%;
            padding: 0;
            margin: 0;
            left: 0;
            img{
                width: 100%;
                display: block;
            }
            .content{
                padding: 20px 25px;
                height: 50%;
                background-color: $light-cyan;
                .name{
                    font-family: bebas;
                    font-weight: 800;
                    font-size: 26px;
                    color: $black;
                    width: 100%;
                    margin-bottom: 20px;
                }
                .rank{
                    font-size: 20px;
                    color: $black;
                    opacity: .4;
                    margin-bottom: 20px;
                }
                .contacts{
                    margin-bottom: 20px;
                    a{
                        font-size: 20px;
                        color: $black;
                        opacity: .4;
                        text-decoration: none;
                        display: block;
                        margin-bottom: 5px;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                .socials ul{
                    list-style: none;
                    padding: 0px;
                    margin: 0px;
                    li{
                        display: inline-block;
                        margin-right: 15px;
                        &:last-child{
                            margin-right: 0px;
                        }
                        a{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            background-color: #BAC2C1;
                            display: inline-block;
                            position: relative;
                            i{
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                color: $white;
                            }
                        }
                    }
                }
            }
        }
    }

    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 1025px){
        .about-carousel{
            padding-top: 15%;
            .item {
                p {
                    width: 100%;
                }
            }
        }
    }


    @media (max-width: 930px){

        .about-carousel{
            .item {
                p {
                    font-size: 16px;
                }
            }
        }
    }

    @media (max-width: 770px) {
        .about-carousel {
            padding-top: 20%;
        }
    }

    @media (max-width: 630px) {
        .about-carousel {
            padding-top: 25%;
            .item {
                p {
                    font-size: 13px;
                }
            }
        }
    }

     @media (max-width: 469px){
        .logo {
            display: none;
        }
        .owl-arrows {
            a {
                font-size: 0;
            }
        }
        .about-carousel{
            padding-top: 35%;
            .item {
                width: 90%;
                left: 5%;
                h2 {
                    width: 60%;
                    font-size: 10.2vw;
                    position: absolute;
                    left: 0;
                    bottom: 5%;
                    display: block;
                    margin: 0;
                }


            }
        }
        .people-block{
            height: 80%;
        }
        
    }

</style>

