document.addEventListener('DOMContentLoaded', function () {
    const lightLogo = document.querySelector('.logo-img.light-logo');
    const darkLogo = document.querySelector('.logo-img.dark-logo');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNavPopup = document.getElementById('mobileNavPopup');
    const popupCloseButton = document.querySelector('.mobile-popup-close');
    const body = document.body;
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    const themeSwitches = document.querySelectorAll('.theme-switch-checkbox');

    

    

    navToggle?.addEventListener('click', () => {
        mobileNavPopup.classList.add('popup-active');
        body.classList.add('popup-open');
        navToggle.setAttribute('aria-expanded', 'true');
    });

    popupCloseButton?.addEventListener('click', () => {
        mobileNavPopup.classList.remove('popup-active');
        body.classList.remove('popup-open');
        navToggle.setAttribute('aria-expanded', 'false');
    });

    // ... (The rest of your mega menu and other logic remains unchanged)
    // Services Mega Menu Logic
    const servicesContainer = document.getElementById('services-mega-menu-content');
    if (servicesContainer) {
        const servicesData = {
            'bitrix24': {
                title: 'Внедрение Битрикс24',
                iconSrc: 'https://via.placeholder.com/24/007BFF/FFFFFF?text=B',
                topImageSrc: 'https://via.placeholder.com/350x120/007BFF/FFFFFF?text=Bitrix24+Services',
                detailsUrl: '/services/bitrix24',
                content: `
                    <h4>⚙️ Внедрение Битрикс24</h4>
                    <ul class="service-benefits">
                        <p>Настроим Битрикс24 под ваш бизнес — без шаблонов, с фокусом на результат и удобство команды:</p>
                        <li>Типовые процессы</li>
                        <li>Роботы</li>
                        <li>Триггеры</li>
                        <li>Бизнес-процессы любой сложности</li>
                        <li>Интеграции со сторонними сервисами (1С, CRM, телефония и др.)</li>
                        <li>Настройка прав доступа</li>
                        <li>Обучение сотрудников</li>
                        <li>Техническая поддержка</li>
                    </ul>
                `
            },
            'sites-apps': {
                title: 'Сайты и приложения',
                iconSrc: 'https://via.placeholder.com/24/28A745/FFFFFF?text=W',
                topImageSrc: 'https://via.placeholder.com/350x120/28A745/FFFFFF?text=Sites+and+Apps',
                detailsUrl: '/services/sites-apps',
                content: `
                    <h4>⚙️ Сайты и приложения</h4>
                    <p>Веб-приложения:</p>
                    <ul class="service-benefits">
                        <li>Web-разработка на базе CMS 1C-Битрикс</li>
                        <li>CMS Wordpress</li>
                        <li>Реактивные сайты</li>
                        <li>Корпоративные сайты</li>
                        <li>Интернет-магазины</li>
                        <li>Индивидуальные решения</li>
                    </ul>
                `
            },
            'amocrm': {
                title: 'Внедрение amoCRM',
                iconSrc: 'https://via.placeholder.com/24/FFC107/000000?text=A',
                topImageSrc: 'https://via.placeholder.com/350x120/FFC107/000000?text=amoCRM+Services',
                detailsUrl: '/services/amocrm',
                content: `
                    <h4>⚙️ Внедрение amoCRM</h4>
                    <ul class="service-benefits">
                        <p>Поможем вашему бизнесу продавать больше и эффективнее с amoCRM:</p>
                        <li>Аудит и оптимизация воронки продаж</li>
                        <li>Настройка digital-воронки</li>
                        <li>Интеграция с сайтом, телефонией, соцсетями</li>
                        <li>Создание кастомных виджетов и интеграций</li>
                        <li>Обучение команды работе в amoCRM</li>
                        <li>Техническая поддержка и консультации</li>
                    </ul>
                `
            }
        };

        // Clear existing content
        servicesContainer.innerHTML = '';

        const servicesMenuMain = document.createElement('div');
        servicesMenuMain.className = 'services-menu-main';
        const servicesList = document.createElement('ul');

        const serviceDetailsContainer = document.createElement('div');
        serviceDetailsContainer.className = 'service-details';

        const topImage = document.createElement('img');
        topImage.alt = 'Наши услуги';
        topImage.className = 'service-details-top-image';
        serviceDetailsContainer.appendChild(topImage);

        const consultationButton = document.createElement('a');
        consultationButton.href = '#';
        consultationButton.className = 'consultation-button';
        consultationButton.innerHTML = 'Получить бесплатную<br>консультацию';
        serviceDetailsContainer.appendChild(consultationButton);

        const detailsContentWrapper = document.createElement('div');
        serviceDetailsContainer.appendChild(detailsContentWrapper);

        const detailsButton = document.createElement('a');
        detailsButton.className = 'details-button';
        detailsButton.textContent = 'Подробнее';
        
        Object.keys(servicesData).forEach(key => {
            const service = servicesData[key];
            
            // Populate the left-side menu
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.serviceId = key;
            link.innerHTML = `<img src="${service.iconSrc}" class="service-icon" alt=""> ${service.title}`;
            listItem.appendChild(link);
            servicesList.appendChild(listItem);

            // Create the content panel for the right side
            const detailElement = document.createElement('div');
            detailElement.id = `service-${key}`;
            detailElement.className = 'service-details-content';
            detailElement.innerHTML = service.content;
            const buttonWrapper = document.createElement('div');
            buttonWrapper.className = 'details-button-wrapper';
            buttonWrapper.appendChild(detailsButton.cloneNode(true));
            detailElement.appendChild(buttonWrapper);
            detailsContentWrapper.appendChild(detailElement);
        });

        servicesMenuMain.appendChild(servicesList);
        servicesContainer.appendChild(servicesMenuMain);
        servicesContainer.appendChild(serviceDetailsContainer);

        const serviceLinks = servicesList.querySelectorAll('a');
        const detailContents = detailsContentWrapper.querySelectorAll('.service-details-content');

        function showService(serviceId) {
            const serviceData = servicesData[serviceId];
            if (!serviceData) return;

            // Update top image
            topImage.src = serviceData.topImageSrc;

            // Update active link
            serviceLinks.forEach(l => {
                l.classList.toggle('active', l.dataset.serviceId === serviceId);
            });

            // Update active content
            detailContents.forEach(content => {
                const isActive = content.id === `service-${serviceId}`;
                content.classList.toggle('active', isActive);
                if(isActive) {
                    const button = content.querySelector('.details-button');
                    if(button) {
                        button.href = serviceData.detailsUrl;
                    }
                }
            });
        }

        serviceLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const serviceId = link.dataset.serviceId;
                showService(serviceId);
            });
        });

        // Show the first service by default
        const firstServiceId = Object.keys(servicesData)[0];
        if (firstServiceId) {
            showService(firstServiceId);
        }
    }

    // Cases Mega Menu Logic
    const casesContainer = document.getElementById('cases-mega-menu-content');
    if (casesContainer) {
        const casesData = [
            {
                id: 'case1',
                customer: 'ООО "Строй-Проект"',
                title: 'Создание корпоративного сайта',
                tz: 'Разработать современный сайт для строительной компании с каталогом проектов и формой заявки.',
                image1: 'https://via.placeholder.com/300x200.png?text=TZ+Image',
                what_was_done: 'Проведен полный цикл работ: от прототипирования до развертывания на хостинге. Интегрирована CMS для удобного управления контентом.',
                image2: 'https://via.placeholder.com/300x200.png?text=Work+Process',
                result_gallery: ['https://via.placeholder.com/150x100.png?text=Screenshot+1', 'https://via.placeholder.com/150x100.png?text=Screenshot+2', 'https://via.placeholder.com/150x100.png?text=Screenshot+3'],
                key_results: ['🚀 Посещаемость: +500% за 3 месяца', '📈 Заявок с сайта: 15+ в неделю', '⏱️ Срок реализации: 1.5 месяца'],
                tech_stack: ['Wordpress', 'PHP', 'Figma']
            },
            {
                id: 'case2',
                customer: 'Интернет-магазин "ТехноМир"',
                title: 'Внедрение Битрикс24',
                tz: 'Автоматизировать процессы продаж и коммуникации с клиентами. Настроить воронки продаж и интеграцию с 1С.',
                image1: 'https://via.placeholder.com/300x200.png?text=Bitrix24+TZ',
                what_was_done: 'Выполнена настройка CRM, созданы кастомные бизнес-процессы. Проведено обучение сотрудников.',
                image2: 'https://via.placeholder.com/300x200.png?text=Bitrix24+Implementation',
                result_gallery: ['https://via.placeholder.com/150x100.png?text=CRM+Dashboard', 'https://via.placeholder.com/150x100.png?text=Sales+Funnel', 'https://via.placeholder.com/150x100.png?text=Integration+Setup'],
                key_results: ['💰 Рост продаж: +40%', '📉 Сокращение ручных операций: на 80%', '⏱️ Срок внедрения: 3 недели'],
                tech_stack: ['Битрикс24', '1С', 'Бизнес-процессы']
            }
        ];
        const casesMenu = document.createElement('div');
        casesMenu.className = 'cases-menu-main';
        const casesList = document.createElement('ul');
        const caseDetailsContainer = document.createElement('div');
        caseDetailsContainer.className = 'case-details';
        casesData.forEach(caseItem => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = caseItem.title;
            link.dataset.caseId = caseItem.id;
            listItem.appendChild(link);
            casesList.appendChild(listItem);
            const detailElement = document.createElement('div');
            detailElement.id = `case-${caseItem.id}`;
            detailElement.className = 'case-details-content';
            detailElement.innerHTML = `
                <h4>💼 ${caseItem.title}</h4>
                <p><strong>Заказчик:</strong> ${caseItem.customer}</p>
                <div class="case-key-results"><h5>Ключевые результаты:</h5><ul>${caseItem.key_results.map(result => `<li>${result}</li>`).join('')}</ul></div>
                <h5>ТЗ:</h5><p>${caseItem.tz}</p><img src="${caseItem.image1}" alt="ТЗ">
                <h5>Что было сделано:</h5><p>${caseItem.what_was_done}</p><img src="${caseItem.image2}" alt="Процесс работы">
                <div class="case-tech-stack"><strong>Технологии:</strong>${caseItem.tech_stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div>
                <h5>Результат:</h5><div class="case-gallery">${caseItem.result_gallery.map(img => `<img src="${img}" alt="Результат">`).join('')}</div>
            `;
            caseDetailsContainer.appendChild(detailElement);
        });
        casesMenu.appendChild(casesList);
        casesContainer.appendChild(casesMenu);
        casesContainer.appendChild(caseDetailsContainer);
        const viewAllCasesButton = document.createElement('div');
        viewAllCasesButton.className = 'mega-menu-view-all-wrapper';
        viewAllCasesButton.innerHTML = `<a href="#" class="view-all-cases-button">Посмотреть все кейсы</a>`;
        document.getElementById('cases-mega-menu').appendChild(viewAllCasesButton);
        const caseLinks = casesList.querySelectorAll('a');
        const detailContents = caseDetailsContainer.querySelectorAll('.case-details-content');
        caseLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const caseId = link.dataset.caseId;
                caseLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                detailContents.forEach(content => {
                    content.id === `case-${caseId}` ? content.classList.add('active') : content.classList.remove('active');
                });
            });
        });
        if (caseLinks.length > 0) {
            caseLinks[0].classList.add('active');
            detailContents[0].classList.add('active');
        }
    }

    // License Mega Menu Logic
    const licenseData = {
        'bitrix24-licenses': [
            {
                title: 'Бесплатный',
                subtitle: 'Начните работать онлайн и продавать больше с CRM',
                users: 'неограниченно пользователей',
                price: { month: 0, year: 0 },
                storage: '5 ГБ',
                features: [
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Календарь</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Соцсеть компании</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Лента</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Доски</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>База знаний</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Чат</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Каналы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Битрикс24 Синк</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Коллабы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Задачи и Проекты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CoPilot</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-подпись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Диск</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Контакт-центр</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сайты</span></li>'
                ],
                buttonText: 'СОЗДАТЬ',
                popular: false
            },
            {
                title: 'Базовый',
                subtitle: 'CRM для небольших отделов продаж',
                users: '5 пользователей',
                price: { month: 2490, year: 1990 },
                storage: '24 ГБ',
                features: [
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Календарь</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Соцсеть компании</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Лента</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Доски</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>База знаний</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Чат</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Каналы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Битрикс24 Синк</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Коллабы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Задачи и Проекты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CoPilot</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-подпись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Диск</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Контакт-центр</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сайты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Интернет-магазин</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Поддержка</span></li>'
                ],
                buttonText: 'КУПИТЬ',
                popular: false
            },
            {
                title: 'Стандартный',
                subtitle: 'Для совместной работы всей компании или рабочих групп',
                users: '50 пользователей',
                price: { month: 6990, year: 5590 },
                storage: '100 ГБ',
                features: [
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Календарь</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Соцсеть компании</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Лента</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Доски</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>База знаний</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Чат</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Каналы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Битрикс24 Синк</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Коллабы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Задачи и Проекты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CoPilot</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-подпись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Диск</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Контакт-центр</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сайты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Интернет-магазин</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Маркетинг</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Документы Онлайн</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>КЭДО + Госключ</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Поддержка</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Администрирование</span></li>'
                ],
                buttonText: 'КУПИТЬ',
                popular: false
            },
            {
                title: 'Профессиональный',
                subtitle: 'Для максимальной автоматизации всех процессов в компании',
                users: '100 пользователей',
                price: { month: 13990, year: 11190 },
                storage: '1 024 ГБ',
                features: [
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Календарь</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Соцсеть компании</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Лента</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Доски</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>База знаний</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Чат</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Каналы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Битрикс24 Синк</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Коллабы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Задачи и Проекты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM №1</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CoPilot</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-подпись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Диск</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Контакт-центр</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сайты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Интернет-магазин</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Маркетинг</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Документы Онлайн</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>КЭДО + Госключ</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-запись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сквозная аналитика</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Автоматизация</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>HR: Компания</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Поддержка</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Администрирование</span></li>'
                ],
                buttonText: 'КУПИТЬ',
                popular: true
            },
            {
                title: 'Энтерпрайз',
                subtitle: 'Почему Битрикс24 Энтерпрайз?',
                features: [
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Календарь</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Соцсеть компании</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Лента</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Доски</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>База знаний</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Чат</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Каналы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Битрикс24 Синк</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Коллабы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Задачи и Проекты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CRM №1</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>CoPilot</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-подпись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Диск</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Контакт-центр</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сайты</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Интернет-магазин</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Маркетинг</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Документы Онлайн</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>КЭДО + Госключ</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Онлайн-запись</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Сквозная аналитика</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Автоматизация</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>HR: Компания</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Филиалы</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Энтерпрайз-кластер</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Энтерпрайз-пакет</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Поддержка</span></li>',
                    '<li style="display: flex; align-items: start;"><span style="color: #28a745; margin-right: 8px; font-weight: bold; line-height: 1.4;">✔</span><span>Администрирование</span></li>'
                ],
                buttonText: 'КУПИТЬ',
                popular: false,
                userTiers: [
                    { users: 250, price: { month: 33990, year: 27192 }, storage: '3 ТБ' },
                    { users: 500, price: { month: 59990, year: 47992 }, storage: '5 ТБ' },
                    { users: 1000, price: { month: 99990, year: 79992 }, storage: '10 ТБ' },
                    { users: 2000, price: { month: 199990, year: 159992 }, storage: '20 ТБ' },
                    { users: 3000, price: { month: 299990, year: 239992 }, storage: '30 ТБ' },
                    { users: 4000, price: { month: 399990, year: 319992 }, storage: '40 ТБ' },
                    { users: 5000, price: { month: 499990, year: 399992 }, storage: '50 ТБ' },
                    { users: 6000, price: { month: 599990, year: 479992 }, storage: '60 ТБ' },
                    { users: 7000, price: { month: 699990, year: 559992 }, storage: '70 ТБ' },
                    { users: 8000, price: { month: 799990, year: 639992 }, storage: '80 ТБ' },
                    { users: 9000, price: { month: 899990, year: 719992 }, storage: '90 ТБ' },
                    { users: 10000, price: { month: 999990, year: 799992 }, storage: '100 ТБ' }
                ]
            }
        ]
    };
    function formatPrice(price) {
        if (price === 0) return '0 ₽';
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }
    function createLicenseCard(cardData, isYearly) {
        let price, oldPrice, userContent, storage;
        const period = '/мес.';
        if (cardData.userTiers) {
            const selectedTier = cardData.userTiers[0];
            price = formatPrice(isYearly ? selectedTier.price.year : selectedTier.price.month);
            oldPrice = isYearly ? formatPrice(selectedTier.price.month) : null;
            storage = selectedTier.storage;
            userContent = `
                <select class="user-select-dropdown" data-card-title="${cardData.title}">
                    ${cardData.userTiers.map(tier => `<option value="${tier.users}">${tier.users} пользователей</option>`).join('')}
                </select>
            `;
        } else {
            price = formatPrice(isYearly ? cardData.price.year : cardData.price.month);
            oldPrice = isYearly ? formatPrice(cardData.price.month) : null;
            storage = cardData.storage;
            userContent = `<p class="user-count">${cardData.users}</p>`;
        }
        return `
            <div class="license-card ${cardData.popular ? 'popular' : ''}" data-title="${cardData.title}">
                <div class="card-header">
                    <h3>${cardData.title}</h3>
                    <p class="card-subtitle">${cardData.subtitle}</p>
                </div>
                <div class="card-body">
                    ${userContent}
                    <div class="price-container">
                        <span class="price">${price}<span class="period">${period}</span></span>
                        ${oldPrice ? `<span class="old-price">${oldPrice}${period}</span>` : '<span class="old-price">&nbsp;</span>'}
                    </div>
                    <a href="#" class="buy-button">${cardData.buttonText}</a>
                    <p class="storage-info"><strong>Хранилище:</strong> ${storage}</p>
                </div>
                <div class="card-footer">
                    <ul class="features">
                        ${cardData.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    function renderLicenseCards(tabId, isYearly) {
        const container = document.querySelector(`#${tabId} .license-cards-container`);
        if (!container) return;
        const cardsHtml = licenseData[tabId].map(card => createLicenseCard(card, isYearly)).join('');
        container.innerHTML = cardsHtml;
        addDropdownEventListeners();
    }
    function addDropdownEventListeners() {
        document.querySelectorAll('.user-select-dropdown').forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                const selectedUsers = parseInt(this.value);
                const cardTitle = this.dataset.cardTitle;
                const isYearly = document.getElementById('price-toggle').checked;
                const cardData = licenseData['bitrix24-licenses'].find(c => c.title === cardTitle);
                const selectedTier = cardData.userTiers.find(t => t.users === selectedUsers);
                const price = formatPrice(isYearly ? selectedTier.price.year : selectedTier.price.month);
                const oldPrice = isYearly ? formatPrice(selectedTier.price.month) : null;
                const period = '/мес.';
                const cardElement = this.closest('.license-card');
                cardElement.querySelector('.price').innerHTML = `${price}<span class="period">${period}</span>`;
                cardElement.querySelector('.old-price').innerHTML = oldPrice ? `${oldPrice}${period}` : '&nbsp;';
                cardElement.querySelector('.storage-info').innerHTML = `<strong>Хранилище:</strong> ${selectedTier.storage}`;
            });
        });
    }
    renderLicenseCards('bitrix24-licenses', false);
    const priceToggle = document.getElementById('price-toggle');
    priceToggle?.addEventListener('change', function() {
        renderLicenseCards('bitrix24-licenses', this.checked);
    });
    const tabButtons = document.querySelectorAll('.license-tabs .tab-button');
    const tabContents = document.querySelectorAll('.license-tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const tabId = button.dataset.tab;
            tabContents.forEach(content => {
                content.id === tabId ? content.classList.add('active') : content.classList.remove('active');
            });
        });
    });
    const wrapper = document.querySelector('.license-cards-container-wrapper');
    const container = wrapper?.querySelector('.license-cards-container');
    const prevBtn = wrapper?.querySelector('.scroll-arrow.prev');
    const nextBtn = wrapper?.querySelector('.scroll-arrow.next');
    const cardWidth = 320;
    const gap = 24;
    function updateArrows() {
        if (!container) return;
        prevBtn.disabled = container.scrollLeft < 10;
        nextBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    }
    prevBtn?.addEventListener('click', () => {
        if (!container) return;
        container.scrollLeft -= (cardWidth + gap);
        setTimeout(updateArrows, 400);
    });
    nextBtn?.addEventListener('click', () => {
        if (!container) return;
        container.scrollLeft += (cardWidth + gap);
        setTimeout(updateArrows, 400);
    });
    if (container) {
        updateArrows();
        new ResizeObserver(updateArrows).observe(container);
        container.addEventListener('scroll', updateArrows);
    }

    // Prevent page scroll when scrolling inside mega menus
    const scrollableMegaMenuAreas = document.querySelectorAll('.service-details, .case-details, .license-card .features, .services-menu-main');
    scrollableMegaMenuAreas.forEach(element => {
        element.addEventListener('wheel', function(event) {
            if (element.scrollHeight <= element.clientHeight) {
                return;
            }
            const isScrollingDown = event.deltaY > 0;
            const isScrollingUp = event.deltaY < 0;
            const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 1;
            const atTop = element.scrollTop < 1;
            if ((isScrollingDown && atBottom) || (isScrollingUp && atTop)) {
                event.preventDefault();
            }
            event.stopPropagation();
        });
    });

    

    // Update Date and Time
    function updateDateTime() {
        const now = new Date();
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const moscowDate = now.toLocaleDateString('ru-RU', { ...optionsDate, timeZone: 'Europe/Moscow' });
        const moscowTime = now.toLocaleTimeString('ru-RU', { ...optionsTime, timeZone: 'Europe/Moscow' });

        document.getElementById('current-date').textContent = moscowDate;
        document.getElementById('current-time').textContent = moscowTime;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Corporate Portal Price Logic
    const corporateUsersDropdown = document.getElementById('corporate-users');
    const corporatePriceDisplay = document.getElementById('corporate-price');

    const corporatePrices = {
        '50': '159 000 ₽',
        '100': '229 000 ₽',
        '250': '349 000 ₽',
        '500': '599 000 ₽'
    };

    function updateCorporatePrice() {
        if (corporateUsersDropdown && corporatePriceDisplay) {
            const selectedUsers = corporateUsersDropdown.value;
            corporatePriceDisplay.textContent = corporatePrices[selectedUsers];
        }
    }

    if (corporateUsersDropdown) {
        corporateUsersDropdown.addEventListener('change', updateCorporatePrice);
        // Set initial price on load
        updateCorporatePrice();
    }
});


window.addEventListener('message', function (e) {
    if (!e.origin.includes('github.io')) return;
    const iframe = document.getElementById('probixFrame');
    if (iframe && e.data && e.data.type === 'resize' && e.data.height) {
        iframe.style.height = e.data.height + 'px';
    }
});
