<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            .background-collage
                .row
                    .item(style="background-image: url(public/f1.jpg)")
                        //- img(src="../assets/f1.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f2.jpg)")
                        //- img(src="../assets/f2.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f3.jpg)")
                        //- img(src="../assets/f3.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f4.jpg)")
                        //- img(src="../assets/f4.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f5.jpg)")
                        //- img(src="../assets/f5.jpg", alt="")
                        .overlay
                .row
                    .item(style="background-image: url(public/f6.jpg)")
                        //- img(src="../assets/f6.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f7.jpg)")
                        //- img(src="../assets/f7.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f8.jpg)")
                        //- img(src="../assets/f8.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f9.jpg)")
                        //- img(src="../assets/f9.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f10.jpg)")
                        //- img(src="../assets/f10.jpg", alt="")
                        .overlay
                .row
                    .item(style="background-image: url(public/f11.jpg)")
                        //- img(src="../assets/f11.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f12.jpg)")
                        //- img(src="../assets/f12.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f13.jpg)")
                        //- img(src="../assets/f13.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f14.jpg)")
                        //- img(src="../assets/f14.jpg", alt="")
                        .overlay
                    .item(style="background-image: url(public/f15.jpg)")
                        //- img(src="../assets/f15.jpg", alt="")
                        .overlay
            .container
                .left-info-block
                    .tag частники
                    h1 каталог лучших частников
                    router-link(to="/owners/fermers") список частников
                .center-text-block
                    h2 Мы работаем #[br] с #[router-link(to="/owners/fermers") 40 частниками] #[br]в нескольких #[br]регионах

</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                fermers:[
                    {
                        img: '../assets/f1.jpg'
                    }
                ],
                interval: '',
                color: '#000',
                _flow: ''
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
            switchPhotos(){
                let photos = document.querySelectorAll('.item');
                let first = parseInt(Math.random() * (14 - 1) + 1);
                let second = parseInt(Math.random() * (14 - 1) + 1);
                let first_img = photos[first].getAttribute('style');
                let second_img = photos[second].getAttribute('style');
                if (first !=  second) {
                    Velocity(photos[first], {opacity: 0.1}, {duration: 850})
                    Velocity(photos[second], {opacity: 0.1}, {duration: 850/*, delay: 350*/})
                    setTimeout(() => {
                        photos[first].setAttribute('style', second_img);
                    }, 600)
                    setTimeout(() => {
                        photos[second].setAttribute('style', first_img);
                    }, 600)
                    Velocity(photos[first], {opacity: 1}, {duration: 550})
                    Velocity(photos[second], {opacity: 1}, {duration: 550})
                }
            },
            beforeEnter(el){
                clearInterval(this.interval)
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
                clearInterval(this.interval)                
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
                    Velocity(document.querySelectorAll('.center-text-block'), {opacity: 1, translateY: '-50%', translateX: '-50%'}, {duration: 350, delay: 400, easing: 'easeOutCubic'}); 
                    setTimeout(() => {
                        done();
                    }, 700);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#ffffff'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#ffffff');
                    Velocity(document.querySelector('.logo-text'), {color: '#ffffff'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity(el, {translateY: '0%'}, {duration: 450})
                        Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                        Velocity(document.querySelectorAll('.center-text-block'), {opacity: 1,translateY: '-50%', translateX: '-50%'}, {duration: 350, delay: 400, easing: 'easeOutCubic'}); 
                        done();
                    }, 650);
                }

            },
            leave(el, done){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                clearInterval(this.interval)
                // if (this._flow == 'forward'){
                //     Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-80%', translateX: '-50%'}, {duration: 350})
                //     Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                //     Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, easing: 'easeInCubic', complete: done})
                // } else if (this._flow == 'back'){
                //      Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-80%', translateX: '-50%'}, {duration: 350})
                //     Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                //     Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, easing: 'easeInCubic', complete: done})
                // }
                Velocity($(el).find('.center-text-block'), {opacity: 0, translateY: '-80%', translateX: '-50%'}, {duration: 350, easing: 'easeInCubic'})
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 200, easing: 'easeInCubic'});
                Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done})
            }
        },
        created(){
            let img = [];
            for (let i = 1; i < 16; i++) {
                var src = 'public/f'+i+'.jpg';
                img[i] = new Image();
                img[i].src = src;
            }
        },
        mounted(){
            this.interval = setInterval(this.switchPhotos, 2000);
        }
    }
</script>


<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    $menu: #fff;
    $side-menu-hover: #fff;

    .background-collage{
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 0;
        .row{
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            height: 33.33%;
            .item{
                width: 20%;
                height: 100%;
                position: relative;
                background-size: cover;
                img{
                    width: 100%;
                    height: 100%;
                }
                .overlay{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    background-color: transparentize($black, .4);
                }
            }
        }
    }

    .center-text-block{
        h2{
            color: $white;
        }
    }
    
    @media (max-width: 1025px){

        .background-collage .row .item{
            background-position: 50% 0%;
        }

    }

    @media (max-width: 469px){
        .left-info-block{
            bottom: auto;
            top: 12%;
        }
    }

    @import 'src/assets/styles/responsive.scss';    


</style>
