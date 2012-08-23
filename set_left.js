function setLeft(dom)
{
    var computedStyle = window.getComputedStyle(dom);
    if (Math.abs(parseInt(computedStyle.marginLeft) - parseInt(computedStyle.marginRight)) <= 2) {
        dom.setAttribute(temp_style, dom.style.cssText);
        dom.style.marginLeft = 0;
    }
}

function parseChildren(childrens, setted)
{
    for (var i = 0, j = childrens.length; i < j; i++) {
        var dom = childrens[i];
        if (!setted) {
            setLeft(dom);
        }
        else {
            if (dom.hasAttribute(temp_style)) {
                dom.setAttribute('style', dom.getAttribute(temp_style));
                dom.removeAttribute(temp_style);
            }
        }
        parseChildren(dom.children, setted);
    }
}
var set_left = true;
var body = document.body;
var temp_style = 'data-style' + Math.random() * 10000;
window.onkeydown = function(e) {
    //press crtl + q
    if (e.ctrlKey && String.fromCharCode(e.keyCode) === 'Q') {
        if (set_left) {
            body.setAttribute(temp_style, body.style.cssText);
            body.style.marginLeft = 0;
            parseChildren(body.children, false);
            set_left = false;
        }
        else {
            body.setAttribute('style', body.getAttribute(temp_style));
            body.removeAttribute(temp_style);
            parseChildren(body.children, true);
            set_left = true;
        }
    }
}