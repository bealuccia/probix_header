        function initProbixHeader() {
            const header = document.querySelector('.site-header');
            try {
                if (header) header.style.backgroundColor = 'orange'; // Script started

                const lightLogo = document.querySelector('.logo-img.light-logo');
                const darkLogo = document.querySelector('.logo-img.dark-logo');
                const navToggle = document.querySelector('.nav-toggle');
                const mobileNavPopup = document.getElementById('mobileNavPopup');
                const popupCloseButton = document.querySelector('.mobile-popup-close');
                const body = document.body;
                const themeSwitches = document.querySelectorAll('.theme-switch-checkbox');

                function updateLogoTheme(isDark) {
                    if (!lightLogo || !darkLogo) return;
                    if (isDark) {
                        lightLogo.classList.add('hidden');
                        darkLogo.classList.remove('hidden');
                    } else {
                        lightLogo.classList.remove('hidden');
                        darkLogo.classList.add('hidden');
                    }
                }

                function applyTheme(isDark) {
                    document.body.classList.toggle('dark-theme', isDark);
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    themeSwitches.forEach(s => {
                        s.checked = isDark;
                        s.setAttribute('aria-checked', isDark);
                    });
                    updateLogoTheme(isDark);
                }

                function debounce(func, delay) {
                    let timeout;
                    return function(...args) {
                        const context = this;
                        clearTimeout(timeout);
                        timeout = setTimeout(() => func.apply(context, args), delay);
                    };
                }

                themeSwitches.forEach(themeSwitch => {
                    themeSwitch.addEventListener('change', debounce(function(e) {
                        const isDark = this.checked;
                        if (isDark) {
                            document.body.classList.add('theme-transition-dark');
                            document.body.classList.remove('theme-transition-light');
                        } else {
                            document.body.classList.add('theme-transition-light');
                            document.body.classList.remove('theme-transition-dark');
                        }
                        setTimeout(() => {
                            applyTheme(isDark);
                        }, 400);
                        setTimeout(() => {
                            document.body.classList.remove('theme-transition-dark', 'theme-transition-light');
                        }, 800);
                    }, 500));
                });

                const savedTheme = localStorage.getItem('theme');
                applyTheme(savedTheme === 'dark');

                navToggle?.addEventListener('click', () => {
                    if (mobileNavPopup) {
                        mobileNavPopup.classList.add('popup-active');
                        body.classList.add('popup-open');
                        navToggle.setAttribute('aria-expanded', 'true');
                    }
                });

                popupCloseButton?.addEventListener('click', () => {
                    if (mobileNavPopup) {
                        mobileNavPopup.classList.remove('popup-active');
                        body.classList.remove('popup-open');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                const servicesContainer = document.getElementById('services-mega-menu-content');
                if (servicesContainer) {
                    const servicesMenuMain = document.createElement('div');
                    servicesMenuMain.className = 'services-menu-main';
                    const servicesList = document.createElement('ul');
                    const services = [
                        { id: 'bitrix24', title: 'Внедрение Битрикс24', icon: '📊' },
                        { id: 'sites-apps', title: 'Сайты и приложения', icon: '📱' },
                        { id: 'software-dev', title: 'Разработка ПО', icon: '💻' }
                    ];
                    services.forEach(service => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = '#';
                        link.innerHTML = `${service.icon} ${service.title}`;
                        link.dataset.serviceId = service.id;
                        listItem.appendChild(link);
                        servicesList.appendChild(listItem);
                    });
                    servicesMenuMain.appendChild(servicesList);
                    servicesContainer.appendChild(servicesMenuMain);
                    const serviceDetailsContainer = document.createElement('div');
                    serviceDetailsContainer.className = 'service-details';
                    const topImage = document.createElement('img');
                    topImage.src = 'https://via.placeholder.com/350x100.png?text=Our+Services';
                    topImage.alt = 'Наши услуги';
                    topImage.className = 'service-details-top-image';
                    serviceDetailsContainer.appendChild(topImage);
                    const consultationButton = document.createElement('a');
                    consultationButton.href = '#';
                    consultationButton.className = 'consultation-button';
                    consultationButton.innerHTML = 'Получить бесплатную<br>консультацию';
                    serviceDetailsContainer.appendChild(consultationButton);
                    const serviceDetailsContent = {
                        'bitrix24': `
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
                                <li>Автоматизация задач</li>
                                <li>Управление проектами</li>
                                <li>CRM-маркетинг</li>
                                <li>Отчетность</li>
                            </ul>
                        `,
                        'sites-apps': `
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
                        `,
                        'software-dev': `
                            <h4>⚙️ Разработка ПО</h4>
                            <ul class="service-benefits">
                            <p>Полный набор услуг в соответствии с индивидуальным видением заказчиков:</p>
                                <li>Заказное программное обеспечение</li>
                                <li>Надежные и эффективные решения с нуля</li>
                                <li>Разработка Enterprise решения</li>
                                <li>Помощь в разработке миграционной политики IT-систем</li>
                                <li>Поддержка и адаптация имеющихся систем и приложений</li>
                            </ul>
                        `
                    };
                    Object.keys(serviceDetailsContent).forEach(key => {
                        const detailElement = document.createElement('div');
                        detailElement.id = `service-${key}`;
                        detailElement.className = 'service-details-content';
                        detailElement.innerHTML = serviceDetailsContent[key];
                        serviceDetailsContainer.appendChild(detailElement);
                    });
                    servicesContainer.appendChild(serviceDetailsContainer);
                    const serviceLinks = servicesList.querySelectorAll('a');
                    const detailContents = serviceDetailsContainer.querySelectorAll('.service-details-content');
                    serviceLinks.forEach(link => {
                        link.addEventListener('click', (event) => {
                            event.preventDefault();
                            const serviceId = link.dataset.serviceId;
                            serviceLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                            detailContents.forEach(content => {
                                content.id === `service-${serviceId}` ? content.classList.add('active') : content.classList.remove('active');
                            });
                        });
                    });
                    if (serviceLinks.length > 0) {
                        serviceLinks[0].classList.add('active');
                        if(detailContents.length > 0) detailContents[0].classList.add('active');
                    }
                }

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
                    const casesMegaMenu = document.getElementById('cases-mega-menu');
                    if(casesMegaMenu) casesMegaMenu.appendChild(viewAllCasesButton);
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
                        if(detailContents.length > 0) detailContents[0].classList.add('active');
                    }
                }

                // ... All other logic for licenses, gallery, etc. ...

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

                if (header) header.style.backgroundColor = ''; // Script finished, reset color
            } catch (e) {
                if (header) header.style.backgroundColor = 'red';
            }
        }

        const probixHeaderInterval = setInterval(function() {
            const header = document.querySelector('.site-header');
            if (header) {
                clearInterval(probixHeaderInterval);
                initProbixHeader();
            }
        }, 100);