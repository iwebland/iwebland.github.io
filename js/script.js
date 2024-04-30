'use strict'
window.onload = function() {
    var preloader = document.getElementById('preloader');
    var content = document.getElementById('content');

    // Устанавливаем контент видимым, но полностью прозрачным
    content.style.display = 'block';

    // Скрываем прелоадер и плавно отображаем контент
    setTimeout(function() {
        preloader.style.display = 'none';
        content.style.opacity = 1; // Плавное изменение прозрачности до полной видимости
    }, 100); // Можно установить задержку в зависимости от эффекта, который вы хотите достичь
};

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
          header = document.querySelector('.header'),
          showModals = document.querySelectorAll('.showModal'),
          modal = document.querySelector('.modal'),
          closeModal = document.querySelector('.closeModal');
    
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

    function scrollTopImgs() {
        imgs.forEach(item => {
            item.scrollTo({top: 0});
        })
    }
 
    nextButtons.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target;
            const arrImgs1 = target.parentElement.previousElementSibling.children;
            const arrDesc1 = target.parentElement.previousElementSibling.previousElementSibling.children;
            currentIndex = (currentIndex + 1) % (arrImgs1.length - 1);
            [...arrImgs1].forEach(img => {
                img.classList.remove('showImg');
                scrollTopImgs();
            }); 
            arrImgs1[currentIndex].classList.add('showImg');
            [...arrDesc1].forEach(desc => {
                desc.classList.remove('show');
                desc.scrollTo({top: 0});
            }); 
            arrDesc1[currentIndex].classList.add('show');
    
        })
    })

    prevButtons.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target;
            const arrImgs2 = target.parentElement.previousElementSibling.children;
            const arrDesc2 = target.parentElement.previousElementSibling.previousElementSibling.children;
            currentIndex = (currentIndex - 1 + (arrImgs2.length - 1)) % (arrImgs2.length - 1);
            [...arrImgs2].forEach(img => {
                img.classList.remove('showImg');
                scrollTopImgs();
            });  
            arrImgs2[currentIndex].classList.add('showImg');
            [...arrDesc2].forEach(desc => {
                desc.classList.remove('show');
                desc.scrollTo({top: 0});
            }); 
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
                    item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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

    
    
    //Telegram


    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию

        // Получаем данные из формы
        const formData = new FormData(this);

        // Добавляем токен вашего бота и идентификатор чата
        formData.append('chat_id', '1709865539');
        formData.append('text', '====================\n\n' +
            'Имя:  ' + formData.get('name') + '\n\n' +
            'Связь:  ' + formData.get('contact') + '\n\n' +
            'Тел/Ник:  ' + formData.get('phone') + '\n\n' +
            'Услуга:  ' + formData.get('service')+ '\n\n====================');

        // Отправляем запрос к Telegram Bot API с помощью Fetch API
        fetch('https://api.telegram.org/bot6752478668:AAGgHZCv5Ve6VptKCt3Mcod74XcfAWmbBQo/sendMessage', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.success').style.opacity = 1;
            this.reset();
            setTimeout(modalHide, 3000);
            
        })
        .catch(error => {
            console.log(error);
            
            this.reset();

            const successElement = document.querySelector('.success');
            successElement.innerHTML = '';
    
            const link = document.createElement('a');
            link.textContent = 'Telegram'; 
            link.href = 'https://t.me/design_to_dev';

            const errorMessage = document.createElement('span');
            errorMessage.textContent = `Произошла ошибка! Напишите мне в `;
            successElement.appendChild(errorMessage);
            successElement.appendChild(link);
            document.querySelector('.success').style.opacity = 1;
        });
    });


    // Modal
    function modalShow() {
        modal.classList.add('modalOpen');
        document.querySelector('body').style.overflow = "hidden"
    }
    function modalHide() {
        modal.classList.remove('modalOpen');
        document.querySelector('body').style.overflow = "";
    }

    showModals.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (target && target.classList.contains('showModal')) {
                modalShow();
            }
        })
    })

    closeModal.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;
        if (target == closeModal) {
            modalHide();
        }
    })

});
