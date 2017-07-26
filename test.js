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

    t.test('should add view', t=> {
      stack = StackView()
      t.equal(stack.push(v=>{return html`<h1>Yup</h1>`}), 1, 'pushed a view on to the stack')
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

    t.test('should pop off a view', t=> {
      stack = StackView()
      stack.push(v=>{return html`<h1>Yup</h1>`})
      t.equal(stack.pop(), 0, 'popped a view off of the stack')
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

    t.test('should remove a view', t=> {
      stack = StackView()
      var view = function () { return html`<h1>Yup</h1>` }
      t.equal(stack.push(view), 1, 'added a view')
      t.equal(stack.remove(view), 0, 'removed the view')
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

    t.test('should replace all views', t=> {
      stack = StackView()
      var view = function () { return html`<h1>Nope</h1>` }
      var view1 = function () { return html`<h1>Yup</h1>` }
      t.equal(stack.push(view), 1, 'added a view')
      t.equal(stack.replace(view1), 1, 'replaced the view')
      stack = null
      t.end()
    })
  })

  t.test('element', t=> {
    t.test('should be exposed', t=> {
      stack = StackView()
      t.ok(stack.element, 'element is exposed')
      stack = null
      t.end()
    })
  })

})
