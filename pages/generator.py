#! python3
import os, json

# def header():

def genItem(dict):
    url = dict['url']
    img = dict['img']
    name = dict['name']
    disc = dict['disc']
    if 'kw' in dict :
        kw = dict['kw']
    line = []
    line.append('\t<div class="col-sm-3">')
    line.append('\t\t<div class="xe-widget xe-conversations box2 label-info" onclick="window.open(\'' + url + '\', \'_blank\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="' + url +'">')
    line.append('\t\t\t<div class="xe-comment-entry">')
    line.append('\t\t\t\t<a class="xe-user-img">')
    line.append('\t\t\t\t\t<img src="../assets/images/logos/' + img + '" class="img-circle" width="40">')
    line.append('\t\t\t\t</a>')
    line.append('\t\t\t\t<div class="xe-comment">')
    line.append('\t\t\t\t\t<a href="#" class="xe-user-name overflowClip_1">')
    line.append('\t\t\t\t\t\t<strong>' + name + '</strong>')
    line.append('\t\t\t\t\t</a>')
    if 'kw' in dict:
        line.append('<p class="overflowKeyword">' + kw + '</p>')
    line.append('\t\t\t\t\t<p class="overflowClip_2">' + disc + '</p>')
    line.append('\t\t\t\t</div>')
    line.append('\t\t\t</div>')
    line.append('\t\t</div>')
    line.append('\t</div>')
    html = ''
    for i in line:
        html += str(i) + '\n'
    return html

def genMenu(menu):
    line = []
    for title in menu:
        line.append('\t\t\t\t\t<li>')
        if 'item' in menu[title]:
            line.append('\t\t\t\t\t\t<a>')
        else:
            line.append('\t\t\t\t\t\t<a href="#' + title + '" class="smooth">')
        line.append('\t\t\t\t\t\t\t<i class="' + menu[title]['icon'] + '"></i>')
        line.append('\t\t\t\t\t\t\t<span class="title">' + title + '</span>')
        line.append('\t\t\t\t\t\t</a>')
        if 'item' in menu[title]:
            line.append('\t\t\t\t\t\t<ul>')
            for subtitle in menu[title]['item']:
                line.append('\t\t\t\t\t\t\t<li>')
                line.append('\t\t\t\t\t\t\t\t<a href="#' + subtitle + '" class="smooth">')
                line.append('\t\t\t\t\t\t\t\t\t<span class="title">' + subtitle + '</span>')
                line.append('\t\t\t\t\t\t\t\t</a>')
                line.append('\t\t\t\t\t\t\t</li>')
            line.append('\t\t\t\t\t\t</ul>')
        line.append('\t\t\t\t\t</li>')
    part = ''
    for i in line:
        part += str(i) + '\n'
    return part

# load json file
dataJson = open('data.json', 'r', encoding='utf-8', newline='')
dataText = json.load(dataJson)
menuJson = open('menu.json', 'r', encoding='utf-8', newline='')
menuText = json.load(menuJson)

# load header, mid, footer
theaderFile = open('theader.html','r', encoding='utf-8', newline='')
midFile = open('mid.html','r', encoding='utf-8', newline='')
footerFile = open('footer.html','r', encoding='utf-8', newline='')
theader = theaderFile.read()
mid = midFile.read()
footer = footerFile.read()

toolFile = open('tool.html','w', encoding='utf-8', newline='')
toolFile.write(theader)

# generate Menu
toolFile.write('\t\t\t\t<ul id="main-menu" class="main-menu">\n')
toolFile.write(genMenu(menuText))

# add mid
toolFile.write(mid)

# generate Item
for id in dataText:
    count = 0
    toolFile.write('<!-- ' + id + ' -->' + '\n')
    toolFile.write('<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="' + id + '"></i>' + id + '</h4>\n')
    toolFile.write('<div class="row">\n')
    items = dataText[id]
    for item in items:
        temp = items[item]
        part = genItem(temp)
        toolFile.write(part)
        count += 1
        if count == 4:
            count = 0
            toolFile.write('</div>\n')
            toolFile.write('<div class="row">\n')
    toolFile.write('</div>\n<br />\n')
    toolFile.write('<!-- END ' + id + ' -->' + '\n')

# add footer
toolFile.write(footer)
toolFile.close()

