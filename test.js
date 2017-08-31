var test = require('tape')
var StackView = require('./')
var html = require('bel')

test('StackView', t=> {
  var stack

  t.test('should exist', t=> {
    t.ok(StackView, 'you are sane')
    t.end()
  })

  t.test('push', t=> {
    t.test('should be exposed', t=> {
      stack = StackView()
      t.ok(stack.push, 'push function exposed')
      stack = null
      t.end()
    })

    t.test('should push view on to stack', t=> {
      stack = StackView()
      var element = stack.push(html`<h1>PUSH</h1>`)
      t.ok(/PUSH/.test(element), 'pushed a view on to the stack')
      stack = null
      t.end()
    })

  })

  t.test('pop', t=> {
    t.test('should be exposed', t=> {
      stack = StackView()
      t.ok(stack.pop, 'pop function exposed')
      stack = null
      t.end()
    })
    t.test('should pop view off of the stack', t=> {
      stack = StackView({
        views: [
          html`<h1>ONE</h1>`,
          html`<h1>TWO</h1>`
        ]
      })
      var element = stack.pop()
      t.ok(!/TWO/.test(element), 'popped off the top view')
      stack = null
      t.end()
    })
  })

  t.test('remove', t=> {
    t.test('should be exposed', t=> {
      stack = StackView()
      t.ok(stack.remove, 'remove function exposed')
      stack = null
      t.end()
    })
    t.test('should remove view from the stack', t=> {
      var view = html`<h1>REMOVE ME</h1>`
      stack = StackView({
        views: [
          view
        ]
      })
      var element = stack.remove(view)
      t.ok(!/REMOVE/.test(element), 'removed view from stack')
      stack = null
      t.end()
    })
  })

  t.test('replace', t=> {
    t.test('should be exposed', t=> {
      stack = StackView()
      t.ok(stack.replace, 'replace function exposed')
      stack = null
      t.end()
    })
    t.test('should replace all views on the stack', t=> {
      stack = StackView({
        views: [
          store=>{return html`<h1>ONE</h1>`},
          store=>{return html`<h1>TWO</h1>`}
        ]
      })
      var element = stack.replace(store=>{return html`<h1>REPLACED</h1>`})
      t.ok(
        !/ONE/.test(element) &&
        !/TWO/.test(element) &&
        /REPLACED/.test(element),
        'replaced the views on the stack')
      stack = null
      t.end()
    })
  })

})
