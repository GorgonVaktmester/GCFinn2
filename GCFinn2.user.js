// ==UserScript==
// @name         GCFinn 2
// @namespace    http://gorgonvaktmester.net/
// @version      1.0
// @description  Adds map link for "Finn kart" to Geocaching.com cache listings
// @author       GorgonVaktmester
// @include      http://*geocaching.com/geocache/*
// @include      http://*geocaching.com/seek/cache_details.aspx*
// @include      https://*geocaching.com/geocache/*
// @include      https://*geocaching.com/seek/cache_details.aspx*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAwUExURXrd/e77/xfD/CfI/DjM/d72/2rZ/VnU/Zvl/ovh/s3y/qzq/kjQ/b3u/v///wa//EY1+sMAAAHzSURBVHja3JfbloMgDEUhCCgN+P9/O3ITWq7Fl5nJS1lHugmQxEjOh0Yq2ibJZZK9aaKQWgDBTTC9FVqSWgDYTTIapueaGADyucZwsNqRS5R1AdJP2slB3cg+xqh5+N4FKDtF2XXh2rbeRXTK7UY4AusAmJuBfgxBpNGVi6UPCT0P3BL0rEDZXBwQd1X3vi+Lw/OvAGScnAHA/fqQEopsXQDkwaYDjKdbsBKVvTh4mXuKj/+4L4px1I2D6DrX+t7CCT4olfYZpfu58Bb3xrzSyczlQnQzOBK2K2iRoJ16wPYw/SUKje5spiKdDBE/V4JLY5Ml7XFN/BKwYWbM++824B7A7X9DI6fOL4lk+aDTrWNbGwF8DGNbGwJc4GBbC4Ardp2JApCyu64FAKnUBJ28wrY2AaBQApIWAJo4YzXAlVHY1t4PEQuAe1FIbGsjgOSuwrS1EQDdQrytjQ4RU4mpa2MA8BKQaWPAXeLr2gQgOlzXZgDATVubAQSH69oUwDtc135DTfzfAEBbJBAWAXCnzLEG0B9v+W8Bvi1VqtpizwBe4Y+k70IbYDsCbgeVvmb2Fjb3Pq206N/EAajVM8j/r5YjEWmtM5sH+JZNwWoo+2+cYzWUw7eOXE4mUm0s5wEs71xWAml/CqAPAZt56sGk/QgwAI9a3mUUBzsJAAAAAElFTkSuQmCC
// ==/UserScript==

//    This script is a rewrite of the script GCFinn made in
//    2009-2010 by Jostein Austvik Jacobsen

/*
	Copyright (c) 2021 Stein Wilmann

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
*/

var mapLinks
var mapLinksLi
var missing
var partOne
var partTwo
var plint
var query
var lat
var lng
var pair
var key
var cacheName
var finnLink
mapLinks = document.getElementById('ctl00_ContentBody_MapLinks_MapLinks');
missing = mapLinks.outerHTML.indexOf("OpenStreetMap</a>") + 17;
partOne = mapLinks.outerHTML.substr(0, missing);
partTwo = mapLinks.outerHTML.substr(missing+1);
mapLinksLi = mapLinks.getElementsByTagName('li');
query = mapLinksLi[0].getElementsByTagName('a')[0].href.split("?");
query = query[query.length-1];
lat = null;
lng = null;
for (var i = 0; i < query.split("&").length; i++) {
	pair = query.split("&")[i];
	if (pair.split("=").length <= 1) continue;
	key = pair.split("=")[0];
	if (key == "lat"){
		lat = pair.split("=")[1];}
	if (key == "lng" || key == "lon"){
		lng = pair.split("=")[1];}
}
if (lat != null && lng != null) {
	cacheName = document.getElementById('ctl00_ContentBody_CacheName');
	finnLink = document.createElement('li');
    finnLink.innerHTML = '<a href="http://kart.finn.no/?lng='+lng+'&lat='+lat+'&zoom=20&mapType=finnhybrid&markers='+lng+','+lat+',r,'+escape(cacheName)+'" target="_blank">FINN Kart</a>';
    plint = "</li>"+finnLink.outerHTML+"</ul></span>";
} else {
    plint = "</li></ul></span>";
}
mapLinks.outerHTML = partOne.concat(plint,partTwo);


