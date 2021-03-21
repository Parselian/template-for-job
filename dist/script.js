'use-strict';

document.addEventListener('DOMContentLoaded', () => {
	let messageBlockTemplate;

	const getCookie = (name) => {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	
	const buildWidget = (data, createNewsList) => {	
		(function createStylesheetLink () {
			const link = document.createElement('link');
	
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', './css/style.css');
	
			document.head.appendChild(link);
		})()

		const widget = `
			<div class="widget">
				<div class="widget__header">
					<img src="./images/news.svg" alt="газета" class="widget__header-icon">
					<h2 class="widget__header-title">Азбука арбитражника</h2>
				</div>

				<div class="widget__body">
					<div class="widget__message">
						<div class="widget__message-author"></div>
						<h3 class="widget__message-title"></h3>
						<a href="#" class="widget__message-link">Посмотреть полностью...</a>
						<div class="widget__message-date"></div>
						
						<div class="widget__message-status">
							<div class="widget__message-status-text">Не просмотрено</div>
						</div>
					</div>
				</div>

				<button class="widget__more">Закрыть</button>
			</div>

			<div class="widget__open">
				<img src="./images/message.svg" alt="чат" class="widget__open-icon">
				<div class="widget__open-counter"></div>
			</div>
		`;

		document.body.insertAdjacentHTML('beforeend', widget);
		
		messageBlockTemplate = document.querySelector('.widget__message').cloneNode(true);
		document.querySelector('.widget__message').remove();

		countNews(data);
		createNewsList(data);
	}

	const countNews = (data) => {
		let counter = 0;
		
		data.forEach(item => {	
			if(!getCookie(item.url)) {
				counter++;
			}
		})

		document.querySelector('.widget__open-counter').textContent = counter
	}

	const createNewsList = (data) => {
		data.forEach(item => {
			const messageBlock = messageBlockTemplate.cloneNode(true);

			for (let key in item) {
				messageBlock.querySelector('.widget__message-author').textContent = `автор: ${item.author}`;
				messageBlock.querySelector('.widget__message-title').textContent = item.title;
				messageBlock.querySelector('.widget__message-date').textContent = item.date;
				messageBlock.querySelector('.widget__message-link').setAttribute('href', item.url);

				if (getCookie(item.url) === 'checked') {
					messageBlock.querySelector('.widget__message-status').textContent = 'Просмотрено';
					messageBlock.querySelector('.widget__message-status').classList.add('widget__message-status_checked');
				}

				document.querySelector('.widget__body').appendChild(messageBlock);
			}
		})
	}

	const eventListenersInit = (data) => {
		document.addEventListener('click', (e) => {
			const target = e.target;
	
			if (target.closest('.widget__open')) {
				document.querySelector('.widget').classList.toggle('widget_show')
			}
	
			if (target.closest('.widget__more')) {
				document.querySelector('.widget').classList.remove('widget_show')
			} 
	
			if (target.closest('.widget__message-link')) {
				const parentContainer = target.closest('.widget__message'),
					messageStatus = parentContainer.querySelector('.widget__message-status'),
					messageUrl = parentContainer.querySelector('a').getAttribute('href');
	
				messageStatus.classList.add('widget__message-status_checked');
				messageStatus.textContent = 'Просмотрено';
	
				document.cookie = `${messageUrl}=checked`;
				countNews(data);
			}
		});
	}

	const getNewsData = () => {
		return fetch('./database.json', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	getNewsData()
		.then((response) => {
			if (response.status !== 200) {
				throw new Error('Status network not 200!')
			}
			return response.text()
		})
		.then((response) => {
			const data = JSON.parse(response);

			buildWidget(data, createNewsList);

			eventListenersInit(data);
		})
		.catch((error) => {
			console.error(error)
		})
});