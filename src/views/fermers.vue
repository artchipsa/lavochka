<template lang="pug">
	transition(v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave" v-on:enter="enter" v-on:leave="leave" mode="out-in" v-bind:css="false" appear)
		.view(:style="{backgroundColor: color}")
			.inner-right-sidebar
				router-link(to="/owners").close
					.icon
						include ../assets/close.svg
					span назад
			.container(v-if="ferm_data && Object.keys(ferm_data).length")
				iscroll-view.scroll-view(ref="Scrollbar" :options="{mouseWheel: true, click: true, tap:true, scrollbars: true, probeType: 3, preventDefault: false}")
					.filter-block
						.select-block
							span.label вид продукции
							v-select(:searchable="false" :on-change="changeCallback" :value="options[0].label" :options="options" placeholder="Выберете тип")
						.slider-block
							span.label удаленность
							span.value {{ sliderVal }} 
							vue-slider(ref="slider" @drag-end="callbackSlider" v-bind="slider" v-model="slider.value")
					section
						.fermers-block
							.error-message По данному виду не найден ни один частник ;(
							router-link.item(:to="fermer.link" v-for="fermer in ferm_data.fermers" v-bind:data-category="fermer.category" v-bind:data-distance="fermer.distance" :key="fermer.id")
								.img(:style="{backgroundImage: fermer.img}")
								.content
									.name {{ fermer.name }}
									.shop {{ fermer.ferma }}
				.left-info-block.mobile-top.big
					.tag Частники
					h1 Каталог частников
					span 40 поставщиков 234 видов продукции 
</template>

<script>
    import axios from 'axios';
    import vueSlider from 'vue-slider-component'

	export default {
        components:{
            vueSlider
        },
        props:['from'],
        data(){
            return{
                color: '#FAF6EB',
                ferm_data: {},
                options: [
                    {
                        label: 'Все виды',
                        value: 'all'
                    },
                    {
                        label: 'плоды и растения',
                        value: 'veges',
                    },
                    {
                        label: 'Рыба',
                        value: 'fishs',
                    },
                    {
                        label: 'Мясо, шашлыки',
                        value: 'meats',
                    },
                    {
                        label: 'Салаты. Готовые блюда',
                        value: 'salads',
                    },
                    {
                        label: 'Запасы и заготовки',
                        value: 'jams',
                    },
                    {
                        label: 'Хлеб, выпечка, кондитерка',
                        value: 'breads',
                    },
                    {
                        label: 'Колбасы, деликатесы',
                        value: 'sausages',
                    },
                    {
                        label: 'Молочная продукция',
                        value: 'milks',
                    }
                ],
                selectVal: '',
                sliderVal: 'В городе',
                slider: {
                    value: 0,
                    width: 240,
                    min: 0,
                    max: 1500,
                    interval: 500,
                    tooltip: "hover",
                    height: 4,
                    style: {
                        "display": "inline-block",
                        "marginLeft": "10px"
                    },
                    bgStyle:{
                        "backgroundColor": "#0D0809"
                    },
                    processStyle:{
                        "backgroundColor": "transparent"
                    },
                    tooltipStyle:{
                        "backgroundColor": "#312217",
                        "borderColor": "#312217"                      
                    },
                    sliderStyle:{
                        "width": "9px",
                        "height": "25px",
                        "backgroundColor": "#DF8061",
                        "borderColor": "#DF8061"                                              
                    }
                }
            }
        },
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
                }, 50)
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
            callbackSlider(val){
                this.filter(this.selectVal, this.slider.value);
                switch (this.slider.value) {
                    case 0:
                        this.sliderVal = "В городе"
                        break;
                    case 500:
                        this.sliderVal = "до 500 км"
                        break;                        
                    case 1000:
                        this.sliderVal = "до 1000 км"
                        break;                        
                    case 1500:
                        this.sliderVal = "> 1000 км"
                        break;                        
                    default:
                        break;
                }
            },
            changeCallback(val){
                this.selectVal = val.value
                this.filter(val.value, this.slider.value)
            },
            filter(select_val, slider_val){
                let vm = this;
                const iscroll = this.$refs.Scrollbar;
                if (select_val == 'all' || select_val == undefined){
                    $('.fermers-block .item').each(function(){
                        $(this).fadeIn(300, function(){
                            $('.error-message').hide();                            
                            iscroll.refresh();
                            $(this).removeClass('none');                            
                        });
                    });                    
                } else {
                    $('.fermers-block .item').each(function(){
                        var this_select_value = $(this).data('category');
                        var this_slider_value = $(this).data('distance');
                        if (this_select_value == select_val && this_slider_value == slider_val){
                            setTimeout(() => {
                                $('.error-message').hide();
                                $(this).fadeIn(300, function(){
                                    iscroll.refresh();
                                    $(this).removeClass('none');
                                });
                            }, 300)
                        } else {
                            $(this).fadeOut(300, function(){
                                iscroll.refresh();
                                $(this).addClass('none')
                                if ($('.fermers-block .item.none').length == $('.fermers-block .item').length){
                                    $('.error-message').show();
                                }
                            });
                        }
                    });
                }
            }
    	},
    	created(){
    		const path = this.$route.path;
            const data_src = 'src/data' + path + '/data.json';
            
            axios.get(data_src).
                then(response => {
                    this.ferm_data = response.data;
                }).catch(error => {
                    console.log(error);
                });

            const iscroll = this.$refs.Scrollbar;            
            iscroll.refresh();
        },
        mounted(){
            let iscroll
            setTimeout(() => {
                iscroll = this.$refs.Scrollbar;                
                iscroll.refresh();
            }, 550)
        }
   	}
</script>

<style lang="scss">
     //vars
    @import 'src/assets/styles/settings.scss';

    .scroll-down{
        display: none;
    }

    .error-message{
        font-family: bebas;
        font-weight: 800;
        font-size: 32px;
        display: none;
    }

    .filter-block{
        margin-bottom: 90px;
        .label{
            font-size: 18px;
            font-family: bebas;
            font-weight: 900;
            color: $black-brown;
            opacity: .55;
            letter-spacing: 1.2px;
            margin-bottom: 30px;
            display: block;
        }
    }

    .select-block{
        width: 30%;
        margin-right: 20%;
        display: inline-block;
        vertical-align: middle;
    }

    .v-select .dropdown-toggle{
        border: none;
        border-radius: 0px;
    }
   .v-select .selected-tag{
        font-family: bebas;
        font-weight: 800;
        font-size: 28px;
        color: $black-brown;
        background-color: transparent;
        border: none;
        padding: 0px;
    }
    .v-select .dropdown-menu{
        font-family: bebas;
        font-size: 18px;
        letter-spacing: 1.2;
    }

    .v-select .dropdown-menu > .highlight > a {
        background: $brown;
    }

    .slider-block{
        display: inline-block;
        width: 35%;
        vertical-align: middle;
        .value{
            font-family: bebas;
            font-weight: 800;
            font-size: 28px;
            color: #312217;
            display: inline-block;
        }
    }
    .slider-block{
        display: none;
    }
    @media (max-width: 1367px){
        .filter-block{
            margin-top: 30px;
            margin-bottom: 40px;
        }
        .filter-block .label{
            margin-bottom: 15px;
        }
        .select-block{
            width: 35%;
            margin-right: 15%;
        }
        .v-select .selected-tag {
            font-size: 24px;
        }
        .slider-block .value{
            font-size: 24px;
        }
        .slider-block{
            width: 50%;
        }
    }

    @media (max-width: 1025px){

        .vue-slider-wrap{
            width: 150px!important;
        }

        .select-block{
            margin-right: 5%;
            width: 45%;
        }

    }

    @media (max-width: 769px){
        .filter-block {
            width: 75%;
            margin: 0 auto;
            margin-top: 50px;
            margin-bottom: 40px;
        }
        .v-select .selected-tag {
            font-size: 20px;
        }
        .slider-block .value {
            font-size: 20px;
            vertical-align: middle;
        }
        .vue-slider-wrap{
             vertical-align: middle;
        }
    }

    @media (max-width: 469px){
        .filter-block{
            width: 94%;
        }
        .select-block{
            margin-right: 0px;
            margin-bottom: 20px;
            width: 100%;
        }
        .slider-block{
            width: 100%;
        }
        .vue-slider-wrap{
            width: 250px!important;
            margin-left: 0px!important;
        }
        .filter-block .label{
            margin-bottom: 10px;
        }
    }

    @import 'src/assets/styles/responsive.scss';    


</style>
