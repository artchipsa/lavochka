<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" appear v-bind:css="false")
        .view(:style="{backgroundColor: color}")
            router-link(to="/events").link.news Новости
            h2.mission #[span свежие и натуральные продукты] в каждом доме от мастеров своего дела<br>
                router-link(to="/about").link О компании
            img.center-plate(src="../assets/woodplate.png", alt="")
            router-link(to="/products/sausages")
                img.float(src="public/m7.png", alt="")
            router-link(to="/products/milks")
                img.float(src="public/m8.png", alt="")
            router-link(to="/products/veges")
                img.float(src="public/m1.png", alt="")
            router-link(to="/products/fishs")
                img.float(src="public/m2.png", alt="")
            router-link(to="/products/meats")
                img.float(src="public/m3.png", alt="")
            router-link(to="/products/salads")
                img.float(src="public/m4.png", alt="")
            router-link(to="/products/jams")
                img.float(src="public/m5.png", alt="")
            router-link(to="/products/breads")
                img.float(src="public/m6.png", alt="")
            .container
                .news-container
                    router-link(to="/events/new-shop").small-message
                        .tag Свежие новости
                        span Открытие магазина 8 сентрября
                    router-link(to="/events/degustation").small-message
                        .tag Свежие новости
                        span Экскурсии с дегустациями
                    router-link(to="/events/zeleniy").small-message
                        .tag Свежие новости
                        span Фестиваль "Зеленый"
                .left-info-block.main-block
                    h1 супермаркет натральных продуктов
</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#FAF6EB',
                interval: '',
                _flow: '',
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
            eventShow(){
                Velocity(
                    document.querySelector('.news-container'), 
                    {
                        opacity: 1
                    }, 
                    {
                        duration: 350,
                        delay: 1500,
                        complete: () => {
                            //setTimeout(() => { this.eventHide() }, 20500)
                        }
                    }
                )
            },
            eventHide(){
                Velocity(
                    document.querySelector('.news-container'),
                    {
                        opacity: 0
                    },
                    {
                        display: 'none'
                    },
                    {
                        duration: 350
                    }
                )
            },
            setPosProducts(){
                let elems = document.querySelectorAll('.float');
                for (let i = 0; i < elems.length; i++) {
                    let X = Math.random() * (window.innerWidth + 50) - 50 + 'px';
                    let Y = Math.random() * (window.innerHeight + 50) - 50 + 'px';
                    Velocity(elems[i], {translateY: Y, translateX: X}, {duration: 1});
                }
            },
            floatProducts(){
                $('.float').each(function(){
                    let transform = $(this).css('transform').split(/[()]/)[1];
                    let X = parseInt(transform.split(',')[4]);
                    let Y = parseInt(transform.split(',')[5]);
                    let left_direction = Math.random() < 0.5 ? -1 : 1;
                    let top_direction = Math.random() < 0.5 ? -1 : 1;
                    let left_step = Math.random() * (90 - 25) + 25;
                    let top_step = Math.random() * (90 - 25) + 25;
                    let duration = left_step * top_step;
                    Velocity($(this),
                        {
                            translateY: Y + (top_step * top_direction),
                            translateX: X + (left_step * left_direction),
                        },
                        { 
                            duration: 4500,
                            easing: 'easeInOutQuad'
                        }
                    )

                });
                // for (let i = 0; i < elems.length; i++) {
                //     let style = elems[i].style;
                //     let regexTranslateY = /\.*translateY\((.*)px\)/i;
                //     let regexTranslateX = /\.*translateX\((.*)px\)/i;                    
                //     let Y = regexTranslateY.exec(style);
                //     let X = regexTranslateX.exec(style);
                //     console.log(Y, X);
                //     let left_direction = Math.random() < 0.5 ? -1 : 1;
                //     let top_direction = Math.random() < 0.5 ? -1 : 1;
                //     let left_step = Math.random() * (50 - 25) + 25;
                //     let top_step = Math.random() * (50 - 25) + 25;
                //     let duration = left_step * top_step;
                //     Velocity(elems[i],
                //         {
                //             translateZ: 0,
                //             translateY: Y + (top_step * top_direction),
                //             translateX: X + (left_step * left_direction),
                //         },
                //         { 
                //             duration: 2500,
                //             easing: 'linear'
                //         }
                //     )
                // }
            },
            beforeEnter(el){
                clearInterval(this.interval);
                el.style.zIndex = 0;

                Velocity(document.querySelectorAll('.logo'), {top: '0px', translateY: '-50%', translateX: '-50%'}, {duration: 1})

                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 1}, {display: 'block'}, {duration: 10})
                    Velocity(document.querySelector('.logo'), {zIndex: '1'}, {duration: 10})
                }

            },
            beforeLeave(el){
                el.style.zIndex = 1;
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo svg'), {width: 120, height: 68}, {duration: 350})
                    Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10});
                }                
            },
            enter(el, done){
                $(".contacts-top").css("right", "12%");    
                // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#FAF6EB'}, {duration: 350})
                Velocity(document.querySelector('.logo-text'), {opacity: 0}, {display: 'none'},{duration: 350})
                $('.logo svg g use').css('fill', '#FAF6EB');
                setTimeout(() => {
                    if ($(window).width() > 1367){
                        Velocity(document.querySelector('.logo'), {top: '51%', translateY: '-50%', translateX: '-50%'}, {duration: 350, complete: done})
                    } else if ($(window).width() < 500) {
                        Velocity(document.querySelector('.logo'), {top: '50%', translateY: '-50%', translateX: '-50%'}, {duration: 350, complete: done})
                    } else {
                        Velocity(document.querySelector('.logo'), {top: '50%', translateY: '-50%', translateX: '-50%'}, {duration: 350, complete: done})
                        
                    }
                    if ($(window).width() > 500){
                        Velocity(document.querySelector('.logo svg'), {width: 304, height: 128}, {duration: 350})
                    } else {
                        Velocity(document.querySelector('.logo svg'), {width: 120, height: 68, opacity: 1}, {duration: 350})
                        Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 350})
                    }
                }, 600)
            },
            leave(el, done){
                clearInterval(this.interval);
                document.querySelector('body').style.backgroundColor = '#FAF6EB';
                let elems = document.querySelectorAll('.float');
                if ($(window).width() > 500){
                    Velocity(document.querySelector('.logo'), {top: 28, translateY: '0%', translateX: '-50%'}, {duration: 350})
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 350})
                } else {
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {duration: 350})
                }                
                // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                $('.logo svg g use').css('fill', '#312217');
                Velocity(document.querySelector('.logo-text'), {opacity: 1}, {display: 'block'},{duration: 350})
                var left;
                if ($(window).width() < 1367 && $(window).width() > 1024){
                        left = 130;                        
                    } else if($(window).width() < 1025) { 
                        left = 82;                                                    
                    } else {
                        left = 180;
                    }
                var sum_duration = 0;
                for (let i = 0; i < elems.length; i++) {
                    var width = elems[i].offsetWidth;
                    var half = ($(window).height()/2) - (elems[i].clientHeight/2);
                    Velocity(elems[i], 'stop');
                    Velocity(elems[i],
                        {
                            top: '0px',
                            translateX: left,
                            translateY: half,
                            zIndex: 2
                        },
                        {
                            duration: 550
                        }
                    )
                    sum_duration += 150;
                    // console.log(sum_duration);

                    if ($(window).width() < 1367 && $(window).width() > 1024){
                        left = left + width + 135;                        
                    } else if($(window).width() < 1025) { 
                        left = left + width + 82;
                    } else {
                        left = left + width + 185;
                    }
                }
                setTimeout(() => {
                    done();
                }, 550)
            }
        },
        created(){
            let img = [];
            $('.float').each(function(){
                var id = $(this).index($('.float'));
                var src = $(this).attr('src');
                img[id] = new Image();
                img[id].src = src;
            });
        },
        mounted(){
            this.eventShow();
            this.setPosProducts();
            if ($(window).width() > 600){
                setTimeout(() => {
                    this.floatProducts();
                }, 10)
                this.interval = setInterval(this.floatProducts, 4500);
            }

        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';

     .center-plate{
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
    h2.mission{
        position: absolute;
        left: 20%;
        top: 2.5%;
        font-family: bebas;
        font-weight: 800;
        font-size: 2.5vw;
        display: block;
        line-height: 100%;
        margin: 0 auto;
        margin-bottom: 50px;
        color: $black;
        width: 50%;
        z-index: 2;
        span{
             color: $orange;
            z-index: 2;
        }
    }
    .link{
        font-family: bebas;
        font-weight: 800;
        font-size: 20px;
        margin: 0 auto;
        color: $orange!important;
        z-index: 2;
        &:hover{
            text-decoration: none;
        }
        &.news {
            position: absolute;
            bottom: 10%;
            left: 20%;
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $gray!important;
            margin-bottom: 50px;
            &::before {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 15px 12.5px 0 12.5px;
                border-color: #a9b2b1 transparent transparent transparent;
                left: 40px;
                top: 30px;
                position: relative;
                vertical-align: top;
            }
        }
    }
    .logo{
        position: absolute;
        /*top: 51%;*/
        left: 48%;
        transform: translate(-50%, -50%);
        z-index: 2;
        text-align: center;
        svg g use {
            fill: #FAF6EB;
        }
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: none;
        opacity: 0;
    }
    .news-container {
        position: absolute;
        width: 65%;
        left: 34%;
        bottom: 8%;
        display: flex;
        justify-content: space-between;
    }
    .small-message{
        padding: 10px;
        border: 1px dashed $gray;
        border-radius: 5px;
        text-decoration: none;
        z-index: 2;
        &.left {
            right: 53%;
        }
        .tag{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $gray;
            margin-bottom: 30px;
        }
        span{
            display: inline-block;
            font-family: bebas;
            font-weight: 800;
            font-size: 26px;
            width: 65%;
            color: $black;
        }
    }
    .float{
        position: absolute;
        z-index: 1;
        width: 150px;
    }

    @media (max-width: 1367px){
        .float{
            width: 100px;
        }
        .logo{
            top: 48%;
            left: 47.5%;
        }
    }
    @media (max-width: 1200px) {
        .news-container {
            display: none!important;
        }
        .link.news {
            left: 45%;
        }
    }
    @media (max-width: 1024px){

        .logo{
            top: 50%;
        }
        .link{
            font-size: 15px;
        }

    }
    @import 'src/assets/styles/responsive.scss';

    @media (max-width: 469px){
        .float{
            display: none;
        }
        .logo{
            display: block;
        }
        .logo svg{
            width: 120px;
            height: 60px;
        }
        h2.mission {
            font-size: 20px;
            width: 70%;
            left: 15%;
            top: 15%;
        }
    }
    @media (max-width: 469px){
        .left-info-block{
            bottom: 4%;
            top: auto;
        }
        .link.news {
            display: none;
        }
    }
</style>



