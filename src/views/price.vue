<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            floats
            .container
                .owl-dots.price
                .owl-carousel.price-carousel
                    .item
                        h2 Скидка на продукцию #[span Вербицких 10%], только до конца ноября
                        p.descr Продолжаем фестиваль свежих продуктов и сегодня у нас большое поступление колбас и деликатесов от семейного мясного хозяйства Вербицкие! Ждём в гости за вкусной колбасой и только до конца ноября всем подписчикам нашего инстаграм скидка на продукцию Вербицких 10%. Достаточно только показать подписку на наш инстаграм при расчёте на кассе :) торопитесь выгода действует только до конца ноября.
                    .item 
                        h2 Для #[br] натурального #[br]  #[span очень #[br] недорого]
                    .item.table
                        table(cellspacing="0" v-if="prices && Object.keys(prices).length")
                            tr(v-for="goods in prices.prices")
                                td
                                    p.name {{goods.name}}
                                    span {{goods.amount}}
                                td
                                    p.price {{goods.price}}
                .owl-arrows.price
                    a(href="#" @click.prevent="prevSlide") 
                        i.fa.fa-caret-left(aria-hidden="true") 
                    a(href="#" @click.prevent="nextSlide") 
                        i.fa.fa-caret-right(aria-hidden="true") 
                .left-info-block.mobile-top.big
                    .tag {{tag}}
                    h1.without-link {{h1}}

</template>

<script> 

    import floats from '../components/float.vue';
    import axios from 'axios';

    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#D5DFDE',
                _flow: '',
                owl: '',
                prices: {},
                items: [
                    {
                        tag: 'акции',
                        h1: 'Самые выгодные предложения',
                    },
                    {
                        tag: 'цены',
                        h1: 'Цены на самые ходовые продукты',
                    },
                    {
                        tag: 'цены',
                        h1: 'Цены на самые ходовые продукты',
                    },
                ],
                tag: 'цены',
                h1: 'Цены на самые ходовые продукты',
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
        components:{
            floats
        },
        methods:{
            beforeEnter(el){
                if (this.flow == ''){
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity(el, {translateY: '0%'}, {duration: 10})                    
                } else {
                    Velocity(el, {translateY: '200%'}, {duration: 10})
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
            },
            beforeLeave(el){
                Velocity(document.querySelector('.left-info-block'), {translateX: '-0%'}, { duration: 10});
            },
            enter(el, done){
                $(".contacts-top").css("right", "12%");
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                if (this.flow == ''){
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#312217');
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    Velocity(document.querySelectorAll('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#312217');
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                         Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                        done();
                    }, 600);
                }
            },
            leave(el, done){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                if (this._flow == 'forward'){
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                    Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, easing: 'easeInCubic', complete: done})
                } else if (this._flow == 'back'){
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                    Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, easing: 'easeInCubic', complete: done})
                }
            },
            owlInit(){
                this.owl = $('.price-carousel').owlCarousel({
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
        created(){
            const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.prices = response.data;
                }).catch(error => {
                    console.log(error);
                });
        },
        mounted() {
            this.owlInit(); 
            this.owl.on('translate.owl.carousel', (event) => {
                let index = event.page.index;
                this.tag = this.items[index].tag;
                this.h1 = this.items[index].h1;
            })
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    .owl-dots.price {
        right: 43%;
    }

    .price-carousel{
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
            overflow: hidden;
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
                font-size: 18px;
                line-height: 180%;
            }
            a{
                color: $orange;
            }

            table{
                table-layout: fixed;
                width: 100%;
                transition: all .45s;
                tr:first-child{
                    td{
                        padding-top: 0px;
                    }
                }
                td{
                    border-bottom: 2px solid $black;
                    padding-bottom: 12px;
                    padding-top: 12px;
                    p{
                        width: 100%;
                        margin: 0px;
                    }
                    .price{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        color: $orange;
                        text-align: right;
                    }
                    .name{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        display: inline-block;
                        margin-right: 60px;
                        width: 65%;
                    }
                    span{
                        font-family: bebas;
                        font-weight: 800;
                        font-size: 26px;
                        color: $black;
                        opacity: 0.45;
                    }
                }
            }
        }
    }
    .logo{
        position: absolute;
        top: 28px;
        left: 48%;
        transform: translateX(-50%);
        z-index: 2;
        text-align: center;
        svg g use {
            fill: $brown;
        }
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: block;
        opacity: 1;
    }
    
    @media (max-width: 1400px) {
        .price-carousel {
            .item {
                table {
                    table-layout: auto;
                    td{
                        .name,
                        .price,
                        span {
                            font-size: 24px;
                        }
                    }
                }
            }
        }
    }
    

    @media (max-width: 1367px){
        .price-carousel {
            .item.table {
                td{
                    padding-top: 5px;
                    padding-bottom: 5px;
                    font-size: 22px;
                }
            }
        }
    }
    
    @media (max-width: 1025px){
        .price-carousel{
            padding-top: 18%;
            .item {
                p {
                    font-size: 16px;
                }
                table {
                    td{
                        .name,
                        .price,
                        span {
                            font-size: 22px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 840px) {
        .price-carousel{
            .item {
                table {
                    td{
                        .name,
                        .price,
                        span {
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 630px) {
        .price-carousel {
            padding-top: 25%;
            .item {
                p {
                    font-size: 14px;
                }
                table {
                    td{
                        .name,
                        .price,
                        span {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }

    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){
        .logo {
            display: none;
        }
        .owl-arrows.vertical {
            a {
                font-size: 0;
            }
        }

        .price-carousel {
            padding-top: 35%;
            .item {
                left: 5%;
                width: 85%;
                &.table {
                    height: 70%;
                    overflow: hidden;
                }
                p.descr {
                    font-size: 12.5px;
                }
                h2 {
                    font-size: 12.2vw;
                    position: absolute;
                    left: 0;
                    bottom: 5%;
                    display: block;
                    margin: 0;
                }
                table {
                    height: 50%;
                    tr {
                        width: auto;
                        td{
                            &:first-child {
                                width: 80%;
                            }
                            .name,
                            p.price,
                            span {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
           
        }

    }

    @media (max-width: 321px){


    }


</style>


