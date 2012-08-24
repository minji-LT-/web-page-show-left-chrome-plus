function setLeft(dom, direction)
{
    var computedStyle = window.getComputedStyle(dom);
    if (Math.abs(parseInt(computedStyle.marginLeft) - parseInt(computedStyle.marginRight)) <= 2) {
        dom.setAttribute(temp_style, dom.style.cssText);
        if (direction == 'left') dom.style.marginLeft = 0;
        else dom.style.marginRight = 0;
    }
}

function parseChildren(childrens, setted, direction)
{
    for (var i = 0, j = childrens.length; i < j; i++) {
        var dom = childrens[i];
        if (!setted) {
            setLeft(dom, direction);
        } else {
            if (dom.hasAttribute(temp_style)) {
                dom.setAttribute('style', dom.getAttribute(temp_style));
                dom.removeAttribute(temp_style);
            }
        }
        parseChildren(dom.children, setted, direction);
    }
}
var body = document.body;
var temp_style = 'data-style' + Math.random() * 10000;
window.onkeydown = function(e) {
    //press alt + l
    if (e.altKey && String.fromCharCode(e.keyCode) === 'L') {
        if (body.hasAttribute(temp_style)) {
            body.setAttribute('style', body.getAttribute(temp_style));
            body.removeAttribute(temp_style);
            parseChildren(body.children, true);
        } else {
            body.setAttribute(temp_style, body.style.cssText);
            body.style.marginLeft = 0;
            parseChildren(body.children, false, 'left');
        }
    } else if ( e.altKey && String.fromCharCode(e.keyCode) === 'R') {
        if (body.hasAttribute(temp_style)) {
            body.setAttribute('style', body.getAttribute(temp_style));
            body.removeAttribute(temp_style);
            parseChildren(body.children, true);
        } else {
            body.setAttribute(temp_style, body.style.cssText);
            body.style.marginRight = 0;
            parseChildren(body.children, false, 'right');
        }
    }
}