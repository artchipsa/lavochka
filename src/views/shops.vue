<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            #map
            .count Магазины
            .map_info(v-for="shop in shops")
                a(href="" @click.prevent="closeInfo").close
                    img(src="../assets/close.svg", alt="")
                    span закрыть
                .content
                    .distance {{ shop.distance }}
                    .street {{ shop.street }}
                    .owner
                        //- (:style="{backgroundImage: shop.owner_pic}")
                        .img
                            img(:src="shop.img_pic")
                        .owner-info
                            .owner-name {{ shop.owner_name }}
                            .owner-status {{ shop.owner_status }}
                    .text {{ shop.shop_story }}
                    .contacts-block
                        a.email(:href="'mailto:shop.email'") {{ shop.email }}
                        .phones
                            a.phone(v-for="phone in shop.phones" :href="'tel: phone'") {{ phone }}
</template>

<script>
    export default {
        props:['flow', 'links'],
        data(){
            return{
                color: '#f2f2f2',
                style: [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "weight": "0.01"
                            },
                            {
                                "hue": "#ff0000"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "weight": "0.01"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }
                ],
                shops:[
                    {
                        icon: 'public/marker.png',
                        pos: { lat: 56.0385078, lng: 92.87653209999996 },
                        distance: 'В городе',
                        street: 'Красноярск ул. Дмитрия Мартынова, 18',
                        owner_pic: 'url(public/max.jpg)',
                        img_pic: 'public/max.jpg',
                        owner_name: 'Максим Павлов',
                        owner_status: 'управляющий',
                        shop_story: 'Самые вкусные, свежие и натуральные продукты в каждом доме от мастеров своего дела. Мы создаем возможность городским жителям напрямую встретиться с предложениями от честного частного производителя.',
                        email: 'info@lavochkamarket.ru',
                        phones: ['209-18-00']
                    },
                    {
                        icon: 'public/soon_marker.png',
                        pos: { lat: 56.0489806, lng: 92.91521560000001 },
                        distance: 'В городе',
                        street: 'Скоро открытие',
                        owner_pic: 'url(public/max.jpg)',
                        img_pic: 'public/max.jpg',
                        owner_name: 'Максим Павлов',
                        owner_status: 'управляющий'
                    },
                    {
                        icon: 'public/soon_marker.png',
                        pos: { lat: 56.0367123, lng: 92.87089170000002 },
                        distance: 'В городе',
                        street: 'Скоро открытие',
                        owner_pic: 'url(public/max.jpg)',
                        img_pic: 'public/max.jpg',
                        owner_name: 'Максим Павлов',
                        owner_status: 'управляющий'
                    }
                ],
                big_marker: '../src/assets/big_marker.png',
                small_icon: '../src/assets/marker.png',
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
            beforeEnter(el){
                clearInterval(this.interval)
                Velocity($(el).find('.count'), {translateX: '-150%'}, { duration: 10});
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
            },
            beforeLeave(){
                clearInterval(this.interval)                
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
                    Velocity(document.querySelectorAll('.count'), {translateX: '0%'}, {duration: 350, delay: 200, easing: 'easeOutCubic'}); 
                    setTimeout(() => {
                        done();
                    }, 600);
                } else {
                    Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                    // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                    $('.logo svg g use').css('fill', '#312217');
                    Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                    setTimeout(() => {
                        Velocity($(el).find('.count'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                        done();
                    }, 600);
                }
            },
            leave(el, done){
                clearInterval(this.interval)
                document.querySelector('body').style.backgroundColor = '#f2f2f2';
                Velocity($(el).find('.count'), {translateX: '-150%'}, { duration: 350, easing: 'easeInCubic', complete: done});
            },
            showInfo(id){
                // let infos = document.querySelectorAll('.map_info');
                // for (let i = 0; i < infos.length; i++){
                //     if (infos[i].style.translateY = "0%"){
                //         Velocity(infos[i], {translateY: '-200%'}, {duration: 450});
                //     }
                // }
                // Velocity(infos[id], {translateY: '0%'}, {duration: 450});
                $('.map_info').removeClass('active');
                $('.map_info').eq(id).addClass('active');
            },
            closeInfo(event){
                let el = event.currentTarget;
                let parent = el.parentNode;
                $(parent).removeClass('active');
            },
            findParent(el, cls){
                while ((el = el.parentElement) && !el.classList.contains(cls));
                return el;
            },
            mapInit(){
                let self = this;
                let center = {lat: 56.0385075, lng: 92.87653209999996};
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: center,
                    disableDefaultUI: true,
                    scrollwheel: false,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    styles: self.style
                });

                let markers = []
                let marker, i;

                for (i = 0; i < self.shops.length; i++){

                    marker = new google.maps.Marker({
                        position: self.shops[i].pos,
                        icon: self.shops[i].icon,
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            console.log(marker, i);
                            // marker.setIcon(self.big_marker);
                            self.showInfo(i);
                        }
                    })(marker, i));

                }
                        

            }
        },
        mounted(){
            this.mapInit();
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';

    #map{
        width: 100%;
        height: 100%;
    }

    .count{
        position: absolute;
        top: 15.5%;
        left: 3%;
        color: $orange;
        font-family: bebas;
        font-weight: 800;
        font-size: 2.2vw;
        line-height: 100%;
        z-index: 1;
    }

    .map_info{
        position: absolute;
        top: 0px;
        right: 10%;
        z-index: 3;
        height: 100%;
        width: 590px;
        background-color: $black;
        padding: 75px;
        color: $white;
        transition: all .45s; 
        transform: translateY(-200%);
        &.active{
            transform: translateY(0%);
        }
        .content{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .close{
            position: absolute;
            right: 40px;
            top: 94px;
            display: block;
            text-decoration: none;
            transform: rotate(90deg);
            img{
                vertical-align: middle;
                margin-right: 30px;
            }
            span{
                font-family: bebas;
                font-size: 16px;
                font-weight: 800;
                color: $white;
                vertical-align: middle;
            }
        }
        .distance{
            font-family: bebas;
            font-weight: 800;
            color: $orange;
            width: 15%;
        }
        .street{
            font-size: 51px;
            font-weight: 800;
            font-family: bebas;
            width: 65%;
        }
        .owner .img{
            display: inline-block;
            vertical-align: middle;
            width: 132px;
            height: 132px;
            // background-position: 50% 0;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 50%;
            margin-right: 40px;
            overflow: hidden;
        }
        .owner img{
            display: inline-block;
            vertical-align: middle;
            width: 132px;
        }
        .owner-info{
            display: inline-block;
            vertical-align: middle;
            width: 60%;
            .owner-name{
                font-family: bebas;
                font-weight: 800;
                font-size: 30px;
                line-height: 130%;
                margin-bottom: 20px;
            }
            .owner-status{
                opacity: 0.65;
            }
        }
        .text{
            font-size: 18px;
            line-height: 120%;
        }
        .email{
            font-size: 18px;
            color: $white;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 30px;
        }
        .phone{
            font-size: 18px;
            color: $white;
            text-decoration: none;
            display: block;
            margin-bottom: 10px;
            &:last-child{
                margin-bottom: 0px;
            }
        }
    }

    @media (max-width: 1367px){
        .map_info{
            padding: 40px;
        }
        .map_info .close{
            right: 0px;
            top: 75px;
        }
        .map_info .distance{
            font-size: 14px;
        }
        .map_info .street{
            font-size: 38px;
        }
        .map_info .text{
            font-size: 16px;
        }
    }

    @media (max-width: 469px){

        .count{
            font-size: 9.5vw;
        }

        .map_info{
            right: 0%;
            width: 100%;
            height: 100%;
            z-index: 5;
            padding: 3%;
            padding-bottom: 60px;
        }
        .map_info .close{
            top: 48px;
            right: -25px;
        }
        .map_info .street{
            font-size: 28px;
        }
        .map_info .owner img{
            margin-right: 20px;
            width: 32%;
        }
        .map_info .owner .img{
            width: 110px;
            height: 110px;
            background-position: 0% 0%;
            background-size: 110px auto;
            overflow: hidden;
        }
        .map_info .owner img{
            width: 110px;
        }
        .map_info .owner-info{
            width: 55%;
        }
        .map_info .owner-info .owner-name{
            font-size: 24px;
        }
        .map_info .text{
            font-size: 14px;
        }

    }

    @media (max-width: 321px){

        .map_info .distance{
            width: 50%;
            margin-bottom: 5px;
        }
        .map_info .street{
            font-size: 26px;
        }

        .map_info .close img{
            margin-right: 10px;
        }
        .map_info .owner img{
            width: 100px;
        }
        .map_info .owner .img{
            width: 100px;
            height: 100px;
            margin-right: 20px;
        }
        .map_info .close{
            top: 87px;
            right: -22px;
        }
        .map_info .owner-info{
            width: 50%;
        }
        .map_info .email{
            margin-bottom: 18px;
        }
    }

    @import 'src/assets/styles/responsive.scss';    

</style>
