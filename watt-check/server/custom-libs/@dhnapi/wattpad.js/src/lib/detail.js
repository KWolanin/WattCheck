const cheerio = require('cheerio')


module.exports = function wattpadDetail(wp, options, BASEURL) {
	return new Promise((resolve, reject) => {
		wp.get(options.detail)
			.then(async (response) => {
				let $ = cheerio.load(response.data);
				let details = {
					title: $('[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').text().trim(),
					url: options.detail,
					cover: $('[data-testid="cover"] > img').attr('src'),
					author: $('[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(1)').text().trim(),

					stats: {
						status: $('[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(2) > div:nth-child(1)').text().trim().split(', ')[0],
						publish: $('[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) > [data-testid="story-badges"] > div:nth-child(2) > span').text().trim().split(',')[1]?.trim() || '',
						views: $('[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(1) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text().trim(),
						votes: $('[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(2) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text().trim(),
						parts: $('[data-testid="story-details-page"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(3) > .stats-value >  div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text().trim(),
						
						// time: $('span.stats-value').eq(3).text().trim(),
					},
					tagList: [],
					description: $('[data-testid="story-details-page"] > div:nth-child(2) > div:nth-child(1) div:nth-child(5) > pre')
						.contents()
						.filter(function () { return this.type === 'text' })
						.map(function () { return $(this).text() })
						.get()
						.join('')
						.trim()
						.replace(/  +/g, ''),
				/* 	tableOfContents: {
						lastUpdate: $('.table-of-contents.hidden-xxs').find('.table-of-contents__last-updated').text().trim(),
						firstContent: BASEURL + $('a.btn-primary.read-btn').attr('href'),
						contents: [],
					}, */
				};
				$('[data-testid="tag-carousel"]')
					.find(' a')
					.each(function (i, elem) {
						details.tagList.push($(this).text().trim());
					});
				/* $('.table-of-contents.hidden-xxs')
					.find('a.story-parts__part')
					.each(function (i, elem) {
						details.tableOfContents.contents.push({
							[$(this).find('div').text().trim()]: BASEURL + $(this).attr('href'),
						});
					}); */
				resolve({
					status: response.status,
					options: options,
					result: details,
				});
			})
			.catch((error) => reject(error));
	});
};
