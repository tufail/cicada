import Cookies from 'js-cookie';

export default class CicadaTrack {
	constructor() {
		this.url_src = this.getParameter('utm_source') || false;
		this.url_glicd = this.getParameter('gclid') || false;
		this.url_mdm = this.getParameter('utm_medium') || false;
		this.boot();
	}

	boot() {
		this.setFirstTrackingCookies();
		$.get('https://www.cloudflare.com/cdn-cgi/trace', (data) => {
			var dataarray = data.split('\n');
			var nameDf = dataarray[2].slice(3);
			var nname = this.formateCk(nameDf);
			if (!Cookies.get('crsi') && this.getQueryString('crsi')) {
				Cookies.set('crsi', this.getQueryString('crsi'), { expires: 120 });
			} else if (!Cookies.get('crsi')) {
				Cookies.set('crsi', nname, { expires: 120 });
			}
			if (!Cookies.get('crst')) {
				Cookies.set('crst', this.getT(), { expires: 120 });
			}
		});

		$(window).on('load', () => {
			setTimeout(() => {
				$('a[href]').each(function(link) {
					var nlink = $(this).attr('href');
					if (nlink !== '#' && this.is_external(nlink)) {
						var nhrf = this.updateQprm(nlink, 'crsi', Cookies.get('crsi'));
						$(this).attr('href', nhrf);
					}
				});
			}, 2000);
		});
	}

	//get paramter from the URL
	getParameter(param) {
		let params = window.location.search.substr(1).split('&');
		for (var i = 0; i < params.length; i++) {
			var p = params[i].split('=');
			if (p[0] == param) {
				return decodeURIComponent(p[1]);
			}
		}
		return false;
	}

	getQueryString(field, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	}

	updateQprm(uri, key, value) {
		var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
		var separator = uri.indexOf('?') !== -1 ? '&' : '?';
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + '=' + value + '$2');
		} else {
			return uri + separator + key + '=' + value;
		}
	}

	getT(timestamp) {
		var date = new Date();
		return [
			('0' + date.getDate()).slice(-2), // Get day and pad it with zeroes
			('0' + (date.getMonth() + 1)).slice(-2), // Get month and pad it with zeroes
			date.getFullYear() // Get full year
		].join('-'); // Glue the pieces together
	}

	formateCk(val) {
		return val.replace(/\./gm, '');
	}

	setFirstTrackingCookies() {
		let src_cookie = Cookies.get('cicada_src'); 
		// If at least one URL parameter exist AND the cookie doesn't exist
		if ((this.url_src !== false || this.url_glicd !== false) && (src_cookie == null || src_cookie == '')) {
			if (this.url_src !== false) {
				Cookies.set('cicada_src', (this.url_src || 'google'), { expires: 120 });  
			}
			if (this.url_mdm !== false) {
				Cookies.set('cicada_mdm', this.url_mdm, { expires: 120 });
			} else {
				Cookies.set('cicada_mdm', 'cpc', { expires: 120 });  
			}
		} else if (src_cookie == null || src_cookie == '') {
			Cookies.set('cicada_src', document.referrer, { expires: 120 });
			if (window.location.href == document.referrer) {
				Cookies.set('cicada_mdm', 'direct', { expires: 120 });
				Cookies.set('cicada_src', window.location.host, { expires: 120 });
			} else {
				Cookies.set('cicada_src', (document.referrer.match('.*\://(?:www.)?([^\/]+)')[1] || document.referrer.match('.*\://(?:www.)?([^\/]+)')[0]), { expires: 120 });
				Cookies.set('cicada_mdm', 'organic', { expires: 120 });
			}
		}
	}

	is_external(url) {
		var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
		if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
			return true;
		if (
			typeof match[2] === 'string' &&
			match[2].length > 0 &&
			match[2].replace(new RegExp(':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'), '') !==
				location.host
		)
			return true;
		return false;
	}
}

window.CicadaTrack = new CicadaTrack();
