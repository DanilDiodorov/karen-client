import { parseFragment } from 'parse5'
import { createElement } from 'react'
import convertAttr from 'react-attr-converter'

function hyphenToCamelcase(str) {
    var result = ''
    var upper = false

    for (var i = 0; i < str.length; i++) {
        var c = str[i]

        if (c === '-') {
            upper = true
            continue
        }

        if (upper) {
            c = c.toUpperCase()
            upper = false
        }

        result += c
    }

    return result
}

function convertKey(key) {
    var res = hyphenToCamelcase(key)

    if (key.indexOf('-ms-') === 0) {
        res = res[0].toLowerCase() + res.slice(1)
    }

    return res
}

function styleParser(styleStr) {
    return styleStr
        .split(';')
        .reduce(function (res, token) {
            if (token.slice(0, 7) === 'base64,') {
                res[res.length - 1] += ';' + token
            } else {
                res.push(token)
            }
            return res
        }, [])
        .reduce(function (obj, str) {
            var tokens = str.split(':')
            var key = tokens[0].trim()
            if (key) {
                var value = tokens.slice(1).join(':').trim()
                obj[convertKey(key)] = value
            }
            return obj
        }, {})
}

function renderNode(node, key) {
    if (node.nodeName === '#text') {
        return node.value
    }

    if (node.nodeName === '#comment') {
        return node.value
    }

    var attr = node.attrs.reduce(
        function (result, attr) {
            var name = convertAttr(attr.name)
            result[name] =
                name === 'style' ? styleParser(attr.value) : attr.value
            return result
        },
        { key: key }
    )

    if (node.childNodes.length === 0) {
        return createElement(node.tagName, attr)
    }

    if (node.nodeName === 'script') {
        attr.dangerouslySetInnerHTML = { __html: node.childNodes[0].value }
        return createElement('script', attr)
    }

    var children = node.childNodes.map(renderNode)
    return createElement(node.tagName, attr, children)
}

function renderHTML(html) {
    var htmlAST = parseFragment(html)

    if (htmlAST.childNodes.length === 0) {
        return null
    }

    var result = htmlAST.childNodes.map(renderNode)

    return result.length === 1 ? result[0] : result
}

export default renderHTML
