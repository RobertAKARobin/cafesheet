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

# Todo

- Don't really need getAll; for now, Sheet should be singleton (?)
- Views tests
