// import * as flsFunctions from './modules/functions.js';
// //import Swiper, { Navigation, Pagination } from 'swiper';

const tabs_slider_data = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    watchOverflow: true,
    observeParents: true,
    breakpoints: {
        540: { slidesPerView: 1, slidesPerGroup: 1, },
        576: { slidesPerView: 1, slidesPerGroup: 1, },
        720: { slidesPerView: 2, slidesPerGroup: 2, },
        992: { slidesPerView: 3, slidesPerGroup: 3, },
        1400: { slidesPerView: 4, slidesPerGroup: 4, }
    }
};

const set_block_of_sliders = (search_query, slider_query, params = {}) => {
    let result_sliders = [];
    let array_id = Array.from(document.querySelectorAll(search_query)).map(e => e.id);;
    if(array_id.length !== 0){
        result_sliders = array_id.map(el => 
            new Swiper(`#${el}>${slider_query}`, {...params, navigation: { nextEl: `#${el} .swiper-button-next`, prevEl: `#${el} .swiper-button-prev`}}));
    }
    return function(){  return result_sliders; }
}

const block_tabs_sliders = 
    set_block_of_sliders('.tab-panel1', '.tab_swiper-container', tabs_slider_data);

const block_tabs_boat_sliders = 
    set_block_of_sliders('.tab-panel2', '.tab_swiper-container', {watchOverflow: true, observeParents: true,});

block_tabs_sliders();
block_tabs_boat_sliders();    


let scroll_list = function(){
    let scrll_ids = document.querySelectorAll('.tab-nav-bx');
    if (scrll_ids.length !== 0) {
        scrll_ids = Array.from(scrll_ids).map(e => e.id);
        return scrll_ids.map(e => { 
            new SimpleBar(document.getElementById(e), { autoHide: false });   
        });
    }else{
        return null;
    }
}

scroll_list();


new Swiper('#main-slider', {});
new Swiper('.card-slider', {
    spaceBetween: 30,
    watchOverflow: true,
    nested: true,
    observeParents: true,
    preloadImages: false,
    lazy: {
        loadPrevNext: true,
    },
    pagination: {
        el: '.card-slide-pagination',
        clickable: true,
    },
});