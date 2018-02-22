<template lang="pug">
     transition(v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-on:before-leave="beforeLeave" mode="out-in" v-bind:css="false" appear)
        .view(:style="{backgroundColor: color}")
            .inner-right-sidebar
                router-link(to="/products").close
                    .icon
                        include ../assets/close.svg
            .container(v-if="prod_data && Object.keys(prod_data).length")
                iscroll-view.scroll-view(ref="Scrollbar" :options="{mouseWheel: true, click: true, tap:true, scrollbars: true, probeType: 3, preventDefault: false}")
                    .products-grid
                        router-link.item(v-for="item in prod_data.items" :to="item.link" :key="item.id")
                            img(:src="item.img", :alt="item.name")
                            span {{item.name}}
                .left-info-block.mobile-top.big
                    .tag продукция
                    h1 {{ prod_data.description.name }}
                    //- span {{ prod_data.description.small_message }}
</template>

<script>
    import axios from 'axios';

    export default {
        data(){
            return{
                color: '#D5DFDE',
                prod_data: {}
            }
        },
        props:['from'],
        methods:{
           beforeEnter(el){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                Velocity(el, {translateY: '200%'}, {duration: 10})
                Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 10})
                Velocity($(el).find('.inner-right-sidebar'), {translateY: '-150%'}, {opacity: 0}, {duration: 10});
                setTimeout(() => {
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                    Velocity($(el).find('.products-grid .item'),{opacity: 0}, {duration: 10});
                }, 250)
                if ($(window).width() > 700){
                     Velocity(document.querySelector('.logo'), {opacity: 1}, {duration: 10})
                }
            },
            beforeLeave(el){
                
            },
            enter(el, done){
                $(".contacts-top").css("right", "22%");
                if ($(window).width() < 500){
                    Velocity(document.querySelector('.logo'), {opacity: 0}, {display: 'none'}, {duration: 1})
                }
                Velocity(document.querySelector('.logo svg'), {width: 125, height: 70}, {duration: 10})
                // Velocity(document.querySelectorAll('.logo svg g use'), {fill: '#312217'}, {duration: 350})
                $('.logo svg g use').css('fill', '#312217');
                Velocity(document.querySelector('.logo-text'), {color: '#312217'}, {display: 'block'},{duration: 350})
                setTimeout(() => {
                    Velocity(el, {translateY: '0%'}, {duration: 450})
                    Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 300});
                    Velocity($(el).find('.inner-right-sidebar'), {translateY: '0%'}, {duration: 350, delay: 300});
                    Velocity($(el).find('.products-grid .item'), "transition.slideUpIn", {stagger: 150, delay: 400});
                    done();
                }, 450);
            },
            leave(el, done){
                Velocity(el, {translateY: '200%'}, {duration: 450, delay: 400, complete: done})
                Velocity($(el).find('.center-text-block'), {translateY: '-200%', translateX: '-50%'}, {duration: 200})
                Velocity($(el).find('.inner-right-sidebar'), {translateY: '-150%'}, {duration: 350, delay: 150});
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, delay: 170});
            },
        },
        created(){
            const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.prod_data = response.data;
                    const iscroll = this.$refs.Scrollbar;            
                    iscroll.refresh();
                }).catch(error => {
                    console.log(error);
                });
        },
        mounted(){
            const iscroll = this.$refs.Scrollbar;            
            iscroll.refresh();
        },
        updated(){
            const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.prod_data = response.data;
                    const iscroll = this.$refs.Scrollbar;            
                    iscroll.refresh();
                }).catch(error => {
                    console.log(error);
                });
        }

    }
</script>


<style lang="scss">
    //vars
    @import 'src/assets/styles/settings.scss';


    .scroll-down{
        display: none;
    }


    .products-grid{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        min-height: 70vh;
        .item{
            width: 33%;
            margin-bottom: 30px;
            height: 300px;
            text-align: center;
            position: relative;
            img{
                max-height: 250px;
            }
            &:hover{
                span{
                    opacity: 1;
                }
            }
            span{
                position: absolute;
                bottom: 0px;
                left: 50%;
                width: 70%;
                transform: translateX(-50%);
                font-family: bebas;
                font-weight: 800;
                font-size: 18px;
                opacity: 0;
                transition: all .35s;
                color: $black;
            }
        }
    }

    @media (max-width: 1025px) {
        .products-grid .item {
            width: 50%;
        }
        .products-grid .item span{
            opacity: 1;
        }
    }

    @media (max-width: 769px){
        .products-grid{
            padding-top: 30px;
        }
    }


    @import 'src/assets/styles/responsive.scss';    

    @media (max-width: 469px){

        .products-grid .item{
            width: 100%;
        }
        
    }

</style>

