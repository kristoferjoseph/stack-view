# stack-view
Component for stacking HTML element views.

## install
`npm i stack-view`

## usage

```
var Stack = require('stack-view')
var html = require('bel')
var stack = Stack()
var view1 = html`<h1>1</h1>`
var view2 = html`<h1>2</h1>`
var view3 = html`<h1>3</h1>`
// pushes a view onto the stack
stack.push(view1)
// pushes another view onto the stack
stack.push(view2)
// removes the top veiw off of the stack
stack.pop()
// replaces the current stack of views with one view
stack.replace(view3)
// removes a specific view by reference
stack.remove(view3)
```

### advanced

in the advanced use case you can initialize the `stack-view` by passing a store and an array of initial views. Furthermore your component can be a function that gets passed the store supplied at instantiation time.

```
var Stack = require('stack-view')
var html = require('bel')
var stack = Stack({
  store: x=> { return {title: 'FWEE', bobbles: 'FWI'} },
  views: [
    store=> {html`<h1>store().bobbles</h1>`}
  ]
})
var element = stack.push(store=> {html`<h1>store().title</h1>`})
```

## test
`npm it`
