import Cookies from 'js-cookie';

export default class CicadaTrack {
	constructor() {
		this.url_src = this.getParameter('utm_source') || false;
		this.url_glicd = this.getParameter('gclid') || false;
		this.url_mdm = this.getParameter('utm_medium') || false;
		this.org_src = this.getParameter('cicada_org_src') || false;
		this.org_mdm = this.getParameter('cicada_org_mdm') || false;
		this.boot();
	}

	//get paramter from the URL
	getParameter(param) {
		let params = window.location.search.substr(1).split('&');
		for (let i = 0; i < params.length; i++) {
			let p = params[i].split('=');
			if (p[0] == param) {
				return decodeURIComponent(p[1]);
			}
		}
		return false;
	}

	getQueryString(field, url) {
		let href = url ? url : window.location.href;
		let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		let string = reg.exec(href);
		return string ? string[1] : null;
	}

	updateQprm(uri, key, value) {
		let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
		let separator = uri.indexOf('?') !== -1 ? '&' : '?';
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + '=' + value + '$2');
		} else {
			return uri + separator + key + '=' + value;
		}
	}

	getT(timestamp) {
		let date = new Date();
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
		let mdm_cookie = Cookies.get('cicada_mdm');
		if (!mdm_cookie || !src_cookie) {
			let srcData = this.checkMedium(document.referrer || window.location.href);
			Cookies.set('cicada_src', srcData.source, { expires: 120 });
			Cookies.set('cicada_mdm', srcData.medium, { expires: 120 });

			if (this.org_src) {
				Cookies.set('cicada_org_src', this.org_src, { expires: 120 });
				Cookies.set('cicada_org_mdm', this.org_mdm || 'referrer', { expires: 120 });
			} else {
				Cookies.set('cicada_org_src', srcData.source, { expires: 120 });
				Cookies.set('cicada_org_mdm', srcData.medium, { expires: 120 });
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

	boot() {
		this.setFirstTrackingCookies();
		let that = this;
		jQuery(document).ready(() => {
			if (!Cookies.get('crsi')) {
				jQuery.get('https://www.cloudflare.com/cdn-cgi/trace', (data) => {
					var dataarray = data.split('\n');
					var nameDf = dataarray[2].slice(3);
					var nname = that.formateCk(nameDf);
					if (!Cookies.get('crsi') && that.getQueryString('crsi')) {
						Cookies.set('crsi', that.getQueryString('crsi'), { expires: 120 });
					} else if (!Cookies.get('crsi')) {
						Cookies.set('crsi', nname, { expires: 120 });
					}
					if (!Cookies.get('crst')) {
						Cookies.set('crst', that.getT(), { expires: 120 });
					}
				});
			}
		});

		jQuery(window).on('load', () => {
			let that = this;
			jQuery('a[href]').each(function () {
				if (jQuery(this).attr('href')) {
					let nlink = jQuery(this).attr('href');
					if (nlink !== '#' && that.is_external(nlink)) {
						let nhrf = that.updateQprm(nlink, 'crsi', Cookies.get('crsi'));
						nhrf = that.updateQprm(nhrf, 'cicada_org_src', Cookies.get('cicada_org_src'));
						nhrf = that.updateQprm(nhrf, 'cicada_org_mdm', Cookies.get('cicada_org_mdm'));
						jQuery(this).attr('href', nhrf);
					}
				}
			});
		});
	}

	checkMedium(urlString) {
		urlString = urlString.replace('&cicada_org_src=' + this.org_src, '');
		urlString = urlString.replace('cicada_org_src=' + this.org_src, '');
		urlString = urlString.replace('&cicada_org_mdm=' + this.org_mdm, '');
		urlString = urlString.replace('cicada_org_mdm=' + this.org_mdm, '');
		let srcDomain = urlString.match('.*://(?:www.)?([^/]+)')[1] || urlString.match('.*://(?:www.)?([^/]+)')[0];
		let directUrl = window.location.href.match('.*://(?:www.)?([^/]+)')[1] || window.location.href.match('.*://(?:www.)?([^/]+)')[0]
		debugger;
		if (this.url_mdm) {
			return { source: this.url_src, medium: this.url_mdm || 'CPC' };
		} else if (this.url_glicd) {
			return { source: this.url_src || 'google', medium: this.url_mdm || 'CPC' };
		} else if (urlString.indexOf('facebook') > -1 || urlString.indexOf('fb') > -1) {
			return { source: this.url_src || 'facebook', medium: this.url_mdm || 'social' }
		} else if (urlString.indexOf('twitter') > -1) {
			return { source: this.url_src || 'twitter', medium: this.url_mdm || 'social' }
		} else if (urlString.indexOf('gmail') > -1 || urlString.indexOf('outlook') > -1 || urlString.indexOf('email') > -1 || urlString.indexOf('newsletter') > -1) {
			return { source: srcDomain, medium: 'email' }
		} else if (urlString.indexOf('coupons.com') > -1) {
			return { source: 'coupons.com', medium: 'affiliate' }
		} else if (urlString.indexOf('google.com') > -1) {
			return { source: 'google.com', medium: 'organic' }
		} else if (urlString.indexOf('bing.com') > -1) {
			return { source: 'bing.com', medium: 'organic' }
		} else if (urlString.indexOf('duckduckgo.com') > -1) {
			return { source: 'duckduckgo', medium: 'organic' }
		} else if ((window.location.href === document.referrer) || document.referrer === '') {
			return { source: directUrl, medium: 'direct' }
		} else {
			return { source: srcDomain, medium: 'referrer' }
		}
	}
}

window.CicadaTrack = new CicadaTrack();
