var html = require('bel')
var store = require('redeux')()
var hs = require('hash-switch')
var router = require('thataway')({
  '/': function (store) {
    return html`
    <div>
      <h1>Halo</h1>
      <a href='/a' onclick=${
        function(e) {
          e.preventDefault()
          store.navigate('/a')
        }
      }>A</a>
    </div>
    `
  },
  '/a': function (store) {
    return html`
    <div>
      <h1>A</h1>
      <a href='/b' onclick=${
        function(e) {
          e.preventDefault()
          store.navigate('/b')
        }
      }>B</a>
    </div>
    `
  },
  '/b': function (store) {
    return html`
    <div>
      <h1>B</h1>
      <a href='/c' onclick=${
        function(e) {
          e.preventDefault()
          store.navigate('/c')
        }
      }>C</a>
    </div>
    `
  },
  '/c': function (store) {
    return html`
    <div>
      <h1>C</h1>
      <a href='/' onclick=${
        function(e) {
          e.preventDefault()
          store.navigate('/')
        }
      }>Home</a>
    </div>
    `
  }
})
store.navigate = router.navigate
var stack = require('../index.js')({ store: store })
router.subscribe(
  function update (view) {
    // stack.push(view)
    // stack.pop()
    stack.replace(view)
    // stack.remove(view)
  }
)
store.navigate('/')
document.body.appendChild(stack.element)
