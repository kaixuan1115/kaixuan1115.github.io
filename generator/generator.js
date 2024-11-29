'use strict';

var fs = require('fs');

// def header():

function genItem(dict) {
    var url = dict['url']
	, img = dict['img']
    , name = dict['name']
    , disc = dict['disc']
    , kw = dict['kw'];
    var line = [];
    line.push('\t<div class="col-sm-3">')
    line.push('\t\t<div class="xe-widget xe-conversations box2 label-info" onclick="window.open(\'' + url + '\', \'_blank\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="' + url +'">')
    line.push('\t\t\t<div class="xe-comment-entry">')
    line.push('\t\t\t\t<a class="xe-user-img">')
    line.push('\t\t\t\t\t<img src="./assets/images/logos/' + img + '" class="img-circle" width="40">')
    line.push('\t\t\t\t</a>')
    line.push('\t\t\t\t<div class="xe-comment">')
    line.push('\t\t\t\t\t<a href="#" class="xe-user-name overflowClip_1">')
    line.push('\t\t\t\t\t\t<strong>' + name + '</strong>')
    line.push('\t\t\t\t\t</a>')
    if (kw) line.push('<p class="overflowKeyword">' + kw + '</p>')
    line.push('\t\t\t\t\t<p class="overflowClip_2">' + disc + '</p>')
    line.push('\t\t\t\t</div>')
    line.push('\t\t\t</div>')
    line.push('\t\t</div>')
    line.push('\t</div>')
    return line.join('\n') + '\n';
}

function genMenu(menu) {
    var line = [];
    for (var title in menu) {
        line.push('\t\t\t\t\t<li>')
        if (menu[title]['item']) line.push('\t\t\t\t\t\t<a>')
        else line.push('\t\t\t\t\t\t<a href="#' + title + '" class="smooth">')
        line.push('\t\t\t\t\t\t\t<i class="' + menu[title]['icon'] + '"></i>')
        line.push('\t\t\t\t\t\t\t<span class="title">' + title + '</span>')
        line.push('\t\t\t\t\t\t</a>')
        if (menu[title]['item']) {
            line.push('\t\t\t\t\t\t<ul>')
            for (var subtitle in menu[title]['item']) {
                line.push('\t\t\t\t\t\t\t<li>')
                line.push('\t\t\t\t\t\t\t\t<a href="#' + subtitle + '" class="smooth">')
                line.push('\t\t\t\t\t\t\t\t\t<span class="title">' + subtitle + '</span>')
                line.push('\t\t\t\t\t\t\t\t</a>')
                line.push('\t\t\t\t\t\t\t</li>')
            }
            line.push('\t\t\t\t\t\t</ul>')
        }
        line.push('\t\t\t\t\t</li>')
    }
    return line.join('\n') + '\n';
}

function genMenua(menu) {
    var line = []
    for (var title in menu) {
        line.push('\t\t\t\t\t<li>')
        if (menu[title]['item']) line.push('\t\t\t\t\t\t<a>')
        else line.push('\t\t\t\t\t\t<a href="../index.html#' + title + '">')
        line.push('\t\t\t\t\t\t\t<i class="' + menu[title]['icon'] + '"></i>')
        line.push('\t\t\t\t\t\t\t<span class="title">' + title + '</span>')
        line.push('\t\t\t\t\t\t</a>')
        if (menu[title]['item']) {
            line.push('\t\t\t\t\t\t<ul>')
            for (var subtitle in menu[title]['item']) {
                line.push('\t\t\t\t\t\t\t<li>')
                line.push('\t\t\t\t\t\t\t\t<a href="../index.html#' + subtitle + '">')
                line.push('\t\t\t\t\t\t\t\t\t<span class="title">' + subtitle + '</span>')
                line.push('\t\t\t\t\t\t\t\t</a>')
                line.push('\t\t\t\t\t\t\t</li>')
            }
            line.push('\t\t\t\t\t\t</ul>')
        }
        line.push('\t\t\t\t\t</li>')
    }
    return line.join('\n') + '\n';
}

// load json file
var dataText = require('./data.json')
var menuText = require('./menu.json')

// load header, mid, footer
var iheader = fs.readFileSync('iheader.html', 'utf8')
var aheader = fs.readFileSync('aheader.html', 'utf8')
var mid = fs.readFileSync('mid.html', 'utf8')
var footer = fs.readFileSync('footer.html', 'utf8')
var feeter = fs.readFileSync('feeter.html', 'utf8')

var indexFile = fs.openSync('../index.html', 'w')
fs.writeSync(indexFile, iheader)
var aboutFile = fs.openSync('../pages/about.html','w')
fs.writeSync(aboutFile, aheader)

// generate Menu
fs.writeSync(indexFile, '\t\t\t\t<ul id="main-menu" class="main-menu">\n')
fs.writeSync(aboutFile, '\t\t\t\t<ul id="main-menu" class="main-menu">\n')
fs.writeSync(indexFile, genMenu(menuText))
fs.writeSync(aboutFile, genMenua(menuText))
fs.writeSync(aboutFile, feeter)

// add mid
fs.writeSync(indexFile, mid)

// generate Item
for (var id in dataText) {
    var count = 0
    fs.writeSync(indexFile, '<!-- ' + id + ' -->' + '\n')
    fs.writeSync(indexFile, '<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="' + id + '"></i>' + id + '</h4>\n')
    fs.writeSync(indexFile, '<div class="row" id="content">\n')
    var items = dataText[id]
    for (var item in items) {
        var temp = items[item]
        var part = genItem(temp)
        fs.writeSync(indexFile, part)
        count += 1
        if (count == 4) {
            count = 0
            fs.writeSync(indexFile, '</div>\n')
            fs.writeSync(indexFile, '<div class="row" id="content">\n')
        }
    }
    fs.writeSync(indexFile, '</div>\n</br>\n')
    fs.writeSync(indexFile, '<!-- END ' + id + ' -->' + '\n')
}

// add footer
fs.writeSync(indexFile, footer)

fs.closeSync(indexFile);
fs.closeSync(aboutFile);

