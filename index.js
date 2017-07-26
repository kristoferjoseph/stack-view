var html = require('bel')
var morph = require('nanomorph')
var inWindow = require('in-window')
function noop () {}

module.exports = function StackView (opts) {
  opts = opts || {}
  var store = opts.store || noop
  var classes = opts.classes || ''
  var views = []
  var element

  function push (v) {
    views.push(v)
    update()
    return views.length
  }

  function pop () {
    views.pop()
    update()
    return views.length
  }

  function remove (v) {
    views.splice(views.indexOf(v), 1)
    update()
    return views.length
  }

  function replace (v) {
    views = [v]
    update()
    return views.length
  }

  function create () {
    return html`
      <section class=${classes}>
        ${views.map(v=> {
          return v(store)
        })}
      </section>
    `
  }

  function update () {
    inWindow &&
    views && views.length &&
    morph(element, create(views))
  }

  element = create(views)

  return {
    push: push,
    pop: pop,
    replace: replace,
    remove: remove,
    element: element
  }
}
