var html = require('bel')
var morph = require('nanomorph')
var inWindow = require('in-window')

module.exports = function StackView (opts) {
  opts = opts || {}
  var classes = opts.classes || ''
  var views = opts.views || []
  var element

  function push (v) {
    views.push(v)
    return render()
  }

  function pop () {
    views.pop()
    return render()
  }

  function remove (v) {
    views.splice(views.indexOf(v), 1)
    return render()
  }

  function replace (v) {
    views = [v]
    return render()
  }

  function create (views) {
    return html`
      <section class=${classes}>
        ${views.map(v=> {
          return v
        })}
      </section>
    `
  }

  function render () {
    return inWindow && element ?
      morph(element, create(views)) :
      create(views)
  }

  render.push = push
  render.pop = pop
  render.remove = remove
  render.replace = replace

  return render
}
