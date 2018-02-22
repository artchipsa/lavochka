<template lang="pug">
    .main 
        router-link(to="/").mobile-logo
            include ../assets/logo.svg
        .contacts-top
            a(href="tel:+7 929 338 23 26") +7 929 338-23-26
            a(href="mailto:maxpavlovval@mail.ru") maxpavlovval@mail.ru
        a(href="#" @click.prevent="showMenu")#menu МЕНЮ
            span
        transition(name="modal")
            menulist(v-show="show_menu" show_menu="show_menu")
        .logo.main-logo
            include ../assets/logo.svg
            //- .small-logo
            //-     include ../assets/logo.svg    
            p.logo-text супермаркет отборных продуктов    
        aside.right-menu
            .handler
            .socials-block
                ul
                    li(v-for="social in socials")
                        a(v-bind:href="social.url", target="_blank")
                            i.fa(aria-hidden="true" :class="social.icon")
            .links-block
                ul
                    li(v-for="link in links"  @click="mainLineAnimation")
                        router-link(:to="link.url"  exact) {{ link.name }}
        v-touch(v-on:pan="touch_move")
            router-view(:flow="flow" :links="links" :from="from")
</template>

<script>

     import menulist from '../components/menu.vue';
     import uiColor from '../mixins/uiColor.js';

    export default {
        name: 'app',
        components:{
            menulist
        },
        mixins:[uiColor],
        data(){
            return{
                socials: [
                     {
                        icon: 'fa-instagram',
                        url: 'https://www.instagram.com/lavochkamarket/'
                    },
                    {
                        icon: 'fa-facebook-official',
                        url: 'https://www.facebook.com/lavochkamarket'
                    },
                    {
                        icon: 'fa-vk',
                        url: 'https://vk.com/lavochkamarket'
                    }
                ],
                links:[
                    {
                        name: 'Главная',
                        url: '/'
                    },
                    {
                        name: 'новости',
                        url: '/events'
                    },
                    {
                        name: 'о компании',
                        url: '/about'
                    },
                    {
                        name: 'принципы',
                        url: '/principes'
                    },
                    {
                        name: 'частники',
                        url: '/owners'
                    },
                    {
                        name: 'продукция',
                        url: '/products'
                    },
                    {
                        name: 'цены',
                        url: '/prices'
                    },
                    {
                        name: 'магазины',
                        url: '/shops'
                    }
                ],
                flow: '',
                show_menu: false,
                from: ''
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path
                const fromDepth = from.path
                let current;
                let next;
                for (let i = 0; i < this.links.length; i++){
                    if (toDepth == this.links[i].url){
                        next = i;
                    }
                    if (fromDepth == this.links[i].url){
                        current = i;
                    }
                }
                this.flow = current < next ? 'forward' : 'back';
                this.from = from.path;
            }
        },
        methods:{
            showMenu(event){
                this.show_menu = !this.show_menu;
                document.querySelector('#menu').classList.toggle('active');
            },
            mainLineAnimation(){
                let step = 12.5;
                let active = document.querySelector('.router-link-exact-active');
                let all_links = document.querySelectorAll('.links-block a');
                let index = [].indexOf.call(all_links, active) + 1;
                Velocity(document.querySelector('.handler'), {height: (index*step+'%')}, {duration: 400});
            },
            touch_move(event){
                let self = this;
                let lastAnimation = 0;
				if ($(window).width() < 1030 && this.links.length){
					if (event.additionalEvent == 'panup' || event.additionalEvent == 'pandown'){
						let deltaOfInterest = event.deltaY,
							timeNow = new Date().getTime(),
							quietPeriod = 500;

						if(timeNow - self.lastAnimationTouch < quietPeriod + 1000) {
							event.preventDefault();
						    return;
						}

					   setTimeout(() => {
                            let path = self.$route.path;
                            let current;
                            for (let i = 0; i < self.links.length; i++) {
                                if (path == self.links[i].url){
                                    current = i;
                                }
                            }
                            if (deltaOfInterest < 0) {
                                if ($('.links-block li').eq(current).next().length > 0){
                                    var links = document.querySelectorAll('.links-block li a');
                                    links[current+1].click();
                                    self.uiColorChange();
                                } 
                            } else {
                                if ($('.links-block li').eq(current).prev().length > 0){
                                    var links = document.querySelectorAll('.links-block li a');
                                    links[current-1].click();
                                    self.uiColorChange();
                                } 
                            }
                        }, 1)
					   self.lastAnimationTouch = timeNow;	
					}
				}
			}
        },
        mounted(){
        
            this.uiColorChange();
            var self = this;

            //menu links
            $('.main-nav a').click(function(){
                self.show_menu = false;
                document.querySelector('#menu').classList.toggle('active');                
            });

            document.addEventListener('keyup', (e) => {
				if (e.keyCode === 27){
                    this.show_menu = false;
                    document.querySelector('#menu').classList.remove('active');
                    
				}
			});	

            //scroll
            let lastAnimation = 0;
            $(document).bind('mousewheel DOMMouseScroll', function(event) {
				let delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
				event.preventDefault();
                init_scroll(event, delta);
            });
            
			function init_scroll(event, delta) {
				let deltaOfInterest = delta,
					timeNow = new Date().getTime(),
					quietPeriod = 500;
				if(timeNow - lastAnimation < quietPeriod + 1000) {
					event.preventDefault();
				    return;
				}
			   setTimeout(() => {
                   let path = self.$route.path;
                   let current;
                   for (let i = 0; i < self.links.length; i++) {
                       if (path == self.links[i].url){
                           current = i;
                       }
                    }
				    if (deltaOfInterest < 0) {
					    if ($('.links-block li').eq(current).next().length > 0){
                            var links = document.querySelectorAll('.links-block li a');
                            links[current+1].click();
                            self.uiColorChange();
                        } 
				   	} else {
				      	if ($('.links-block li').eq(current).prev().length > 0){
                            var links = document.querySelectorAll('.links-block li a');
                            links[current-1].click();
                            self.uiColorChange();
                        } 
				   	}
			   }, 200)
			   
			   lastAnimation = timeNow;
			}


        },
        updated(){
            setTimeout(() => {
                this.uiColorChange();
            }, 1190)
            this.mainLineAnimation();
        }
    }
</script>

<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';
    body{
        background-color: #D5DFDE;
    }

    .contacts-top{
        position: absolute;
        z-index: 2;
        top: 2.6%;
        right: 12%;
        &.white{
            a{
                color: #fff;
            }
        }
        a{
            display: block;
            margin-bottom: 5px;
            font-size: 16px;
            color: $brown;
            text-decoration: none;
            &:last-child{
                margin-bottom: 0px;
            }
        }
    }

    .scroll-down{
        z-index: 2;
        position: absolute;
        bottom: 8%;
        left: 48%;
        transform: translateX(-50%);
        color: $gray;
        font-family: bebas;
        font-weight: 800;
        text-transform: uppercase;
    }

    .main{
        height: 100%;
        width: 100%;
    }

    #app{
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .view{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        /* z-index: 1; */
    }
    .logo{
        position: absolute;
        top: 28px;
        left: 48%;
        transform: translateX(-50%);
        z-index: 2;
        text-align: center;
    
        &.white{
            svg g use {
                fill: #fff!important;
            }
            .logo-text{
                color: #fff!important;
            }
        }
        svg g use {
            transform: all  .35s;
            fill: #FAF6EB;
        }
    }
    .black-carousel .container{
        overflow: hidden;
    }
    .logo-text{
        font-family: bebas;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: 1.5px;
        color: $brown;
        text-align: center;
        display: none;
        opacity: 1;
    }
    .container{
        width: 90%;
        height: 100%;
        position: relative;
    }
    .owl-carousel .owl-stage-outer, .owl-carousel .owl-stage, .owl-item{
        height: 100%;
    }

    .modal-enter-active, .modal-leave-active{
		transition: all .35s ease-in-out;
	}
	.modal-enter, .modal-leave-to{
		transform: translate3d(0,-100%,0);
	}

    #menu{
        position: absolute;
        top: 28px;
        left: 46px;
        width: 53px;
        height: 5px;
        line-height: 100%;
        padding: 12px 0px;
        z-index: 5;
        color: $brown;
        text-decoration: none;
        font-family: bebas;
        font-weight: 800;
        font-size: 26px;
        padding-top: 0;
        &.white{
            color: #fff;
            span{
                background-color: #fff;
            }
        }
        &:hover{
            span{
                width: 45px;
                &:after{
                    width: 45px;
                }
            }
        }
        span{
            margin-top: 6px;
            background-color: transparent;
            width: 53px;
            height: 3px;
            display: none;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            transition: all .35s;
            &:after{
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0px;
                width: 30px;
                height: 3px;
                background-color: inherit;
                transition: all .35s;                
            }
        }
        &.active{
            span{
                display: inline-block;
                transform: translateY(-50%) rotate(45deg);
                width: 45px;              
                background-color: $brown;                  
                &:after{
                    width: 45px;                    
                    transform: rotate(-90deg);
                    bottom: 0px;
                }
            }
        }
        
    }
    .background{
        background-size: cover;
    }
    .right-menu{
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
        width: 10%;
        z-index: 2;
        display: flex;
        border-left: 1px solid $side-menu;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 42px;
        padding-bottom: 72px;
        &.white{
            .links-block{
                ul{
                    li{
                        a{
                            &.router-link-exact-active{
                                color: #fff!important;
                            }
                            &:hover{
                                color: #fff; 
                            }
                        }
                    }
                }
            }
        }
        .handler{
            position: absolute;
            left: -5px;
            top: 0px;
            background-color: $side-menu;
            width: 5px;
        }
        .socials-block{
            ul{
                padding: 0px;
                margin: 0px;
                list-style: none;
                li{
                    margin-bottom: 46px;
                    width: 28px;
                    text-align: center;
                    a{
                        color: $side-menu;
                        .fa{
                            font-size: 26px;
                        }
                    }
                }
            }
        }
        .links-block{
            ul{
                list-style: none;
                padding: 0px;
                margin: 0px;
                li{
                   margin-bottom: 28px;
                   font-family: bebas;
                   font-weight: 800;
                   font-size: 16px;
                   &:last-child{
                       margin-bottom: 0px;
                   }
                   a{
                        text-decoration: none;
                        transition: all .35s;
                        color: $side-menu;
                        color: #848484;                       
                       &:hover{
                           color: $side-menu-hover;
                       }
                   }
                }
            }
        }
    }

    .router-link-exact-active{
        color: $side-menu-hover!important;
    }


    .left-info-block{
        position: absolute;
        bottom: 8%;
        left: 3%;
        width: 200px;
        z-index: 1;
        &.main-block {
            width: 300px;
        }
        &.white{
            a{
                color: #fff;
            }
            h1{
                color: #fff!important;
            }
        }
        &.top{
            bottom: auto;
            top: 18%;
        }
        .tag{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $gray;
            margin-bottom: 50px;
        }
        h1{
            font-family: bebas;
            font-weight: 800;
            font-size: 40px;
            line-height: 120%;
            margin: 0px;
            margin-bottom: 50px;
            color: $brown;
            span {
                    color: $orange!important;
            }
            &.without-link {
                margin-bottom: 0;
            }
        }
        p{
            font-family: bebas;
            font-weight: 800;
            font-size: 22px;
            color: #fff;
            margin-bottom: 40px;
            &:last-child{
                margin-bottom: 0px;
            }
        }
        a{
            font-family: bebas;
            font-weight: 800;
            font-size: 20px;
            color: $orange!important;
            &:hover{
                text-decoration: none;
            }
        }
    }

    .center-text-block{
        position: absolute;
        top: 50%;
        left: 52%;
        transform: translateY(-50%) translateX(-50%);
        width: 50%;
        min-height: 50%;
        h2{
            font-family: bebas;
            font-weight: 800;
            font-size: 5.2vw;
            display: block;
            line-height: 115%;
            margin: 0px;
            margin-bottom: 50px;
            color: $white;
            width: 100%;
            span, a{
                color: $orange;
            }
        }
    }

    .small-title{
        font-family: bebas;
        font-weight: 800;
        font-size: 20px;
        color: $gray;
        margin-bottom: 76px;
    }

     .owl-dots{
        position: absolute;
        bottom: 10%;
        right: 50%;
        &.white{
            .owl-dot{
                background-color: $white;
            }
        }
        .owl-dot{
            width: 10px;
            height: 10px;
            padding: 5px;
            border-radius: 50%;
            display: inline-block;
            background-color: $black-brown;
            opacity: 0.3;
            margin-right: 20px;
            cursor: pointer;
            transition: all .35s;
            &.active, &:hover{
                opacity: 1;
            }
            &:last-child{
                margin-right: 0px;
            }
        }
    }
    .owl-arrows{
        position: absolute;
        bottom: 8%;
        right: 3%;
        a{
            display: block;
            font-family: bebas;
            font-weight: 800;
            text-align: right;
            color: $gray;
            margin-right: 0;
            font-size: 20px;
            margin-bottom: 15px;
            text-decoration: none;
            &:last-child{
                margin-right: 0px;
            }
            i {
                font-size: 30px;
                margin-left: 10px;
            }
        }
    }

    .inner-right-sidebar{
        position: absolute;
        top: 0px;
        height: 100%;
        right: 10%;
        width: 10%;
        z-index: 2;
        display: flex;
        border-left: 1px solid $side-menu;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 42px;
        padding-bottom: 72px;
        &.white{
            .close{
                .icon svg g use{
                    fill: #fff;
                }
            }
            .links-block{
                ul{
                    li{
                        &.active{
                            a{
                                color: #fff; 
                            }
                        }
                        a{
                            &.router-link-exact-active{
                                color: #fff!important;
                            }
                            &:hover{
                                color: #fff; 
                            }
                        }
                    }
                }
            }
        }
        .close{
            transform: rotate(90deg);
            width: 255px;
            margin-top: 110px;
            .icon{
                display: inline-block;
                vertical-align: middle;
                margin-right: 30px;
                svg g use{
                    fill: #312217;
                }
            }
            span{
                vertical-align: middle;
                display: inline-block;
                font-family: bebas;
                font-weight: 800;
                font-size: 16px;
                color: $gray;
            }
        }
        .links-block{
            ul{
                list-style: none;
                padding: 0px;
                margin: 0px;
                li{
                   margin-bottom: 28px;
                   font-family: bebas;
                   font-weight: 800;
                   font-size: 16px;
                   &.active{
                       a{
                           color: $brown;
                       }
                   }
                   &:last-child{
                       margin-bottom: 0px;
                   }
                   a{
                       text-decoration: none;
                       transition: all .35s;
                       color: #848484;
                       &:hover{
                           color: $side-menu-hover;
                       }
                   }
                }
            }
        }
    }

    .iScrollIndicator{
        background-color: $gray!important;
        border: none!important;
        border-radius: 0px!important;
    }

    .scroll-view {
        /* -- Attention: This line is extremely important in chrome 55+! -- */
        touch-action: none;
        /* -- Attention-- */
        position: absolute;
        height: 75%;
        width: 70%;
        left: 54%;
        padding: 0px 4%;
        transform: translateX(-50%);
        margin-top: 10%;
        margin-bottom: 5%;
        overflow: hidden;
        &.white{
            h2, p{
                color: $white;
            }
        }
        h2{
            font-family: bebas;
            font-weight: 800;
            font-size: 5.2vw;
            display: block;
            line-height: 115%;
            margin: 0px;
            margin-bottom: 50px;
            color: $black;
            width: 90%;
            span{
                color: $orange;
            }
        }
        section{
            min-height: 75vh;
        }
        p{
            width: 50%;
            font-size: 18px;
            line-height: 180%;
            margin-bottom: 50px;
        }
    }

    

    .people-block{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        &.invert{
            .content{
                background-color: $main!important;
            }
        }
        .item{
            width: 30%;
            margin-right: 3%;
            margin-bottom: 3%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            height: 610px;
            text-decoration: none;
            img{
                width: 100%;
                display: block;
            }
            .img{
                height: 45%;
                width: 100%;
                background-size: cover;
                background-position: 50% 0%;
            }
            .content{
                padding: 30px;
                min-height: 40%;
                height: 55%;
                background-color: $light-cyan;
                .name{
                    font-family: bebas;
                    font-weight: 800;
                    font-size: 28px;
                    color: $black;
                    width: 100%;
                    margin-bottom: 34px;
                }
                .rank{
                    font-size: 20px;
                    color: $black;
                    opacity: .4;
                    margin-bottom: 64px;
                }
                .small-text{
                    font-size: 14px;
                    color: $black;
                    opacity: .4;
                }
                .contacts{
                    margin-bottom: 20px;
                    a{
                        font-size: 20px;
                        color: $black;
                        opacity: .4;
                        text-decoration: none;
                        display: inline-block;
                        margin-bottom: 5px;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                .shop{
                    font-family: bebas;
                    font-weight: 800;
                    color: $black;
                    opacity: .4;
                    font-size: 26px;
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

    .fermers-block{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        &.invert{
            .content{
                background-color: $main!important;
            }
        }
        .item{
            width: 30%;
            margin-right: 3%;
            margin-bottom: 3%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            height: 610px;
            text-decoration: none;
            img{
                width: 100%;
                display: block;
            }
            .img{
                height: 55%;
                width: 100%;
                background-size: cover;
                background-position: 50% 0%;
            }
            .content{
                padding: 30px;
                min-height: 40%;
                height: 45%;
                background-color: $light-cyan;
                .name{
                    font-family: bebas;
                    font-weight: 800;
                    font-size: 28px;
                    color: $black;
                    width: 100%;
                    margin-bottom: 34px;
                }
                .rank{
                    font-size: 20px;
                    color: $black;
                    opacity: .4;
                    margin-bottom: 64px;
                }
                .small-text{
                    font-size: 14px;
                    color: $black;
                    opacity: .4;
                }
                .contacts{
                    margin-bottom: 20px;
                    a{
                        font-size: 20px;
                        color: $black;
                        opacity: .4;
                        text-decoration: none;
                        display: inline-block;
                        margin-bottom: 5px;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                .shop{
                    font-family: bebas;
                    font-weight: 800;
                    color: $black;
                    opacity: .4;
                    font-size: 26px;
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

    .overlay{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-color: transparentize($black, .5);
    }

    .mobile-logo{
        display: none;
    }
    .smaller h2{
        font-size: 4vw;
    }
    .owl-item{
		cursor: url(../assets/cursor_left_right.svg) 22 8 , move;
		&:active, &:focus{
			cursor: url(../assets/cursor_left_right2.svg) 22 8, move;
		}
	}
    @media (max-width: 1367px){

        .right-menu .socials-block ul li{
            margin-bottom:  20px;
            width: 18px;
        }
        .right-menu .socials-block ul li a .fa{
            font-size: 18px;
        }
        .right-menu{
            padding-top: 22px;
            padding-bottom: 62px;

        }
        .right-menu .links-block ul li{
            margin-bottom: 20px;
            font-size: 15px;
        }
        .inner-right-sidebar .links-block ul li{
            margin-bottom: 20px;
            font-size: 15px;
        }
        .center-plate{
            width: 55%;
            top: 52%;
        }
        .center-text-block h2{
            margin-bottom: 30px;
            line-height: 105%;
        }
        .logo-text{
            margin: 0px;
        }
        .center-text-block{
            top: 52%;
        }

        .inner-right-sidebar{
            padding-top: 22px;
            padding-bottom: 62px;
        }
        .left-info-block{
            width: 220px;
        }
        .left-info-block h1{
            font-size: 38px;
        }
        .left-info-block.top{
            top: 19%;
        }
        .small-title{
            margin-bottom: 55px;
        }
    }
    
    @media (max-width: 1025px){

        html, body, #app{
            height: 100%;
        }
        .center-plate{
            width: 70%;
        }
        .logo{
            left: 47%;
        }
        #menu{
            font-size: 0;
            span {
                display: inline-block;
                background-color: $brown;
            }
        }

    }
    @import 'src/assets/styles/responsive.scss';    
    @media only screen
      and (min-device-width: 321px)
      and (max-device-width: 736px)
      and (min-aspect-ratio: 13/9)
      and (orientation: landscape) {
      	.main{
			display: none;
		}
		.landscape{
			z-index: 2;
			display: block;
			position: absolute;
			top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
			transform: translate(-50%, -50%);
			color: $brown;
			font-size: 4.2vw;
            text-align: center;
            p{
                margin: 0px;
                text-transform: uppercase;
                font-weight: 800;
                position: absolute;
                width: 60%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .floats-block{
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 0;
                .float{
                    position: absolute;
                    z-index: 0;
                    width: 130px;
                    &:nth-child(1){
                        top: 22%;
                        left: -2%;
                    }
                    &:nth-child(2){
                        top: 2%;
                        left: 17%;
                        transform: rotate(45deg);
                    }
                    &:nth-child(3){
                        top: 77%;
                        right: 20%;
                    }
                    &:nth-child(4){
                        top: 25%;
                        left: 81%;
                        transform: rotate(-57deg);
                    }
                    &:nth-child(5){
                        top: 92%;
                        left: 17%;
                    }
                }
            }
		}
      }

</style>

