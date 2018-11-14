# Changelog

- Stopped having a `CSNodeSiblings` class because no use for it yet
	- Switched from `CSNodeSiblings().add()` to `CSNode().create$Child()`
- Made everything possible a getter method because it's easier to track that way
- Stopped doing `.create$Child()` in base class constructor because child classes may have different behavior on create
- Having a getter for `CSNode().children` caused a stack overflow
- Have to use o.before to populate suite-wide variables. ospec runs through the whole script first, then runs through each test, so if a variable is populated outside of a test, unexpected things happen.
- Have to put .forEach inside tests, can't put tests inside .forEach, for similar reason to above
- `.length` instead of `.size` because Columns inherit from ARrays, so may as well be consistent
- `Column` must have `.index` set on creation because `Section.columns` generates a new array each time
- Webpack is a PITA when all you want to do is concat static assets. Switching to Gulp, which is much easier to config.
- Modifying Array prototype. Creating a class that extends Arrays gets all janky, since things like `.filter` and `.map` don't return the new class. Probably will do this to Objects in some way, too.
- `.siblings` was `instance.parent.children.without(instance)`, but this got all kinds of confusing
- To use `class` or to use an ES5-y object factory?
- - `class` looks better / reads better?
- - `static` methods are much faster in Chrome (http://jsbench.github.io/#69e72becc163a625fbec3f1d773ea0b7)
- - Factory gives me more control over whether properties are included in JSON (via `.defineProperty` and `enumerable:`)
- - Factory makes it easier to control which functions are attached to different classes, e.g. cell shouldn't have `.getChildren()`
- - `Object.create` is just as fast as `static`
- Should `sheet.getAll()` be an aggregate of `node.children`, or should `node.children` be a filtering of `sheet.getAll()`?
- - `.getAll()` should probably be an aggregate since there are going to be many instance of `.children`, and if each of those has to filter `.getAll()` it'll probably slow stuff down
- - Plus that'll prevent situations where there are orphaned nodes: if a node isn't a part o a `.children` somewhere it won't be picked up by `.getAll`, and will be garbage collected
- Should `.getAll` or `.children` be its own special class?
- - Looks like `deepEquals` won't work with it
- - Looks like `deepEquals` also won't work if you've added custom properties to an Array with `defineProperty`
- - If it extends `Array`, array methods are still going to be able to called on it via `Array.prototype.method.call`
- - Would have to redefine all Array methods
- - Don't want to confuse people into thinking they can use array methods
- Should `base.sections` traverse through `.children`, or filter some kind of `.all`?
- - Traversing through children will probably be faster?
- - `.all` would just be another array to hide
- - Traversing requires keeping both `.parent` and `.children` in sync
- - `.parent` could also just be overwritten with `Object.defineProperty`?
- `.add()` vs `.addTable()`
- - `.add` can be reused across classes
- - `.addTable` reads better

# Todo
- Views tests
