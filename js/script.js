'use strict'
window.addEventListener('DOMContentLoaded', function() {
    
    const tabs = document.querySelectorAll('.case__tabs-item'),
          hover = document.querySelector('.hover'),
          parentTabs = document.querySelector('.case__tabs'),
          tabsContent = document.querySelectorAll('.case__img-item'),
          prevButtons = document.querySelectorAll('.case__img-prev'),
          nextButtons = document.querySelectorAll('.case__img-next'),
          imgs = document.querySelectorAll('.image'),
          descs = document.querySelectorAll('.desc'),
          nav = document.querySelector('.header__container'),
          header = document.querySelector('.header');
    
    let currentIndex = 0;

    function hideTabs() {
        tabs.forEach(item => {
            item.classList.remove('active');
            hover.style.width = `${item.offsetWidth}px`;
        })
        tabsContent.forEach(item => {
            item.classList.remove('show');
        })
        imgs.forEach(item => {
            item.classList.remove('showImg');
        })
        descs.forEach(item => {
            item.classList.remove('show');
        })
    }

    function showTabs(i = 0) {
        tabs[i].classList.add('active');
        tabsContent[i].classList.add('show');
        let imgTabs = tabsContent[i].children[1].children[0];
        let descTabs = tabsContent[i].children[0].children[0];
        imgTabs.classList.add('showImg');
        descTabs.classList.add('show');
    }

    hideTabs();
    showTabs();
 
    nextButtons.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target;
            const arrImgs1 = target.parentElement.previousElementSibling.children;
            const arrDesc1 = target.parentElement.previousElementSibling.previousElementSibling.children;
            currentIndex = (currentIndex + 1) % (arrImgs1.length - 1);
            [...arrImgs1].forEach(img => img.classList.remove('showImg')); 
            arrImgs1[currentIndex].classList.add('showImg');
            [...arrDesc1].forEach(desc => desc.classList.remove('show')); 
            arrDesc1[currentIndex].classList.add('show');
    
        })
    })

    prevButtons.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target;
            const arrImgs2 = target.parentElement.previousElementSibling.children;
            const arrDesc2 = target.parentElement.previousElementSibling.previousElementSibling.children;
            currentIndex = (currentIndex - 1 + (arrImgs2.length - 1)) % (arrImgs2.length - 1);
            [...arrImgs2].forEach(img => img.classList.remove('showImg')); 
            arrImgs2[currentIndex].classList.add('showImg');
            [...arrDesc2].forEach(desc => desc.classList.remove('show')); 
            arrDesc2[currentIndex].classList.add('show');
    
        })
    })
    
    parentTabs.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('case__tabs-item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                    hover.style.left = `${target.offsetLeft}px`;
                }
            })
        }
    })
    if (window.innerWidth > 767) {
        window.addEventListener("scroll", function(event){
            let scroll = this.scrollY;
             if (scroll >= 20) {
                nav.classList.add('fix');
                header.style.padding = "50px 0";
            } else {
                nav.classList.remove('fix');
                header.style.padding = "20px 0";
            }
        });
      }
});