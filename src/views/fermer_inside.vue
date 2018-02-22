<template lang="pug">
    transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
        .view
            .inner-right-sidebar
                router-link(to="/owners/fermers").close
                    .icon
                        include ../assets/close.svg
                    span назад
                .links-block
                    ul
                        li.active
                            a(href="#info") информация
                        li
                            a(href="#products") продукция
                        li(v-if="owner_data.history")
                            a(href="#history") история
                        li(v-if="owner_data.imgs.length > 1")
                            a(href="#photo") фото
            .overlay
            .owl-carousel.background-slider
                .item(v-for="img in owner_data.imgs" :style="{backgroundImage: img}")
            .container(v-if="owner_data && Object.keys(owner_data).length")
                iscroll-view.scroll-view(ref="Scrollbar" @scroll="spy" :options="{mouseWheel: true, tap:true, scrollbars: true, probeType: 3, preventDefault: false}")
                    section#info
                    section#products(data-change="true")
                        .small-title {{ owner_data.products.tag }}
                        ul.prod_list
                            li(v-for="product in owner_data.products.products_list")
                                router-link(:to="product.url") {{ product.name }}
                    section#history(data-change="true" v-if="owner_data.history")
                        .small-title {{ owner_data.history.tag }}
                        div.smaller(v-html="owner_data.history.title")
                        p {{ owner_data.history.description }}
                    section#photo(v-if="owner_data.imgs.length > 1")
                        .small-title фото
                        .count 01
                        .owl-dots
                        .owl-arrows
                            a(href="#" @click.prevent="prevSlide") 
                                i.fa.fa-caret-left(aria-hidden="true")
                            a(href="#" @click.prevent="nextSlide") 
                                i.fa.fa-caret-right(aria-hidden="true")

                .left-info-block.mobile-top.big
                    h1 {{ owner_data.description.name }}
                    p {{ owner_data.description.farm }}

</template>

<script>
    import axios from 'axios';
    import uiColor from '../mixins/uiColor.js';

    export default {
        data(){
            return{
                owl: '',
                owner_data: {}
            }
        },
        mixins:[uiColor],
        methods:{
            beforeEnter(el){
                document.querySelector('body').style.backgroundColor = '#D5DFDE';
                Velocity(el, {translateY: '200%'}, {duration: 10})
                Velocity($(el).find('.center-text-block'), {opacity: 0});
                Velocity($(el).find('.inner-right-sidebar'), {opacity: 0});
                Velocity($(el).find('.center-text-block'), {translateY: '-80%', translateX: '-50%'}, {opacity: 0}, {duration: 10})
                Velocity($(el).find('.inner-right-sidebar'), {translateY: '-50%'}, {opacity: 0}, {duration: 10});
                setTimeout(() => {
                    Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 10});
                }, 150)
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
                    Velocity($(el).find('.left-info-block'), {translateX: '0%'}, { duration: 350, delay: 200, easing: 'easeOutCubic'});
                    Velocity($(el).find('.inner-right-sidebar'), {opacity: 1, translateY: '0%'}, {duration: 350, delay: 400, easing: 'easeOutCubic'});
                    done();
                }, 600);
            },
            leave(el, done){
                Velocity(el, {translateY: '200%'}, {duration: 350, delay: 400, complete: done})
                Velocity($(el).find('.center-text-block'), {translateY: '-80%', translateX: '-50%'}, {duration: 350, easing: 'easeInCubic'})
                Velocity($(el).find('.inner-right-sidebar'), {opacity: 0, translateY: '-50%'}, {duration: 350, delay: 200, easing: 'easeInCubic'});
                Velocity($(el).find('.left-info-block'), {translateX: '-150%'}, { duration: 350, easing: 'easeInCubic'});
            },
            owlInit(){
                this.owl = $('.background-slider').owlCarousel({
                    items:1,
                    loop: true,
                    center: true,
                    dotsContainer: '.owl-dots'
                })
            },
            prevSlide(){
			    this.owl.trigger('prev.owl.carousel');
			},
			nextSlide(){
			    this.owl.trigger('next.owl.carousel');
            },
            spy(iscroll){
                let top_edge = $('.scroll-view').offset().top;
                let bottom_edge = $('.scroll-view').offset().top + 155;
                $('.scroll-view section').each(function(){
                    let offset = $(this).offset().top;
                    let id = $(this).attr('id');
                    if( offset >= top_edge & offset <= bottom_edge){
                        if ($(this).data('change')){
                            $('.overlay').addClass('dark');
                        } else {
                            $('.overlay').removeClass('dark');
                        }
                        $('.inner-right-sidebar li').removeClass('active');
                        $('a[href$='+id+']').parent().addClass('active');
                    }   
                })
            },
        },
        created(){

    		const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.owner_data = response.data;
                }).catch(error => {
                    console.log(error);
                });
        },
        mounted(){
            let iscroll;
            setTimeout(() => {
                this.owlInit();
                this.owl.on('translate.owl.carousel', (event) => {
                    let index = event.page.index + 1;
                    if (index < 10){
                        document.querySelector('.count').innerText = '0'+index;
                    } else {
                        document.querySelector('.count').innerText = index;
                    }
                });
                this.uiColorChange();
                iscroll = this.$refs.Scrollbar;
                if ($(window).width() < 1025){
                    $('.overlay').addClass('dark');
                }
            }, 1150)


            $(document).on('click', '.inner-right-sidebar .links-block a', function(e){
                e.preventDefault();
                let id = $(this).attr('href');
                let to = $(id).position().top;
                iscroll.scrollBy(0, -to, 250);
                iscroll.refresh();
                return false;
            });

            
        }
    }
</script>

<style lang="scss" scoped>
    //vars
    @import 'src/assets/styles/settings.scss';
    .container{
        z-index: 1;
    }
    .overlay{
        z-index: 1;
        opacity: 0.3;
        transition: all .35s;
        &.dark{
            opacity: 0.9;
        }
    }

    .count{
        font-size: 3.6vw;
        font-family: bebas;
        font-weight: 800;
        line-height: 100%;
        color: #fff;
    }

    .background-slider{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 0;
        .item{
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
    }
    
    .scroll-view section{
        position: relative;
    }

    .prod_list{
        list-style: none;
        padding: 0px;
        li{
            margin-bottom: 15px;
            &:hover{
                a{
                    color: $orange;
                }
            }
            a{
                font-size: 3.4vw;
                font-family: bebas;
                font-weight: 800;
                line-height: 100%;
                color: #fff;
                text-decoration: none;
                transition: all .35s;
            }
        }
    }

    //  @media (max-width: 1025px){
    //     .overlay{
    //         opacity: 0.9!important;
    //     }
    //  }

    @media (max-width: 769px){
        .scroll-view section#photo{
            min-height: 65vh;
        }
        .scroll-view section{
            margin-bottom: 10%;
        }
    }

    @media (max-width: 469px){
        .count[data-v-6e856d5c]{
            font-size: 8.6vw;
        }
        .prod_list li a[data-v-6e856d5c]{
            font-size: 7.4vw;
            text-decoration: underline;
        }
        .scroll-view section#photo[data-v-6e856d5c]{
            min-height: 60vh;
        }
    }

</style>

