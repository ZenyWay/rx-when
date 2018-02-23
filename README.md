# rx-when
[![NPM](https://nodei.co/npm/rx-when.png?compact=true)](https://nodei.co/npm/rx-when/)

[rxjs](http//reactivex.io/rxjs/) 'if-then-else' operator,
shorthand for partition/merge, for more fluid, slightly less cluttered code:
```ts
import when from 'rx-when' // default export can be renamed to 'ifThenElse'...
import { interval } from 'rxjs/observable/interval'
import { map, take } from 'rxjs/operators'

interval(1000).pipe(
  take(5),
  when(v => !(v % 2))(
    map(v => `${v} is even`), // 'then' operator
    map(v => `${v} is odd`) // 'else' operator, optional
  )
)
.subscribe(debug('next:'), debug('error:'), debug('done'))
```

instead of:
```ts
import { merge } from 'rxjs/observable/merge'
import { interval } from 'rxjs/observable/interval'
import { map, partition, take } from 'rxjs/operators'

const source$ = interval(1000).pipe(take(5))
const [ even$, odd$ ] = partition(v => !(v % 2))(source$)
merge(
  map(v => `${v} is even`)(even$),
  map(v => `${v} is odd`)(odd$)
)
.subscribe(debug('next:'), debug('error:'), debug('done'))
```
see the above [example](./example/index.ts) in this directory.
run the example in your browser locally with `npm run example`
or [online here](https://cdn.rawgit.com/ZenyWay/rx-when/v1.0.0/example/index.html).

# API
```ts
declare function when<I, O>(predicate: (v: I) => boolean): (
  onTrue: RxOperator<I, O>,
  onFalse?: RxOperator<I, O> // default to identity function
) => RxOperator<I, O>

type RxOperator<I,O> = ($: Observable<I>) => Observable<O>
```
the `when` operator splits the input stream according to a predicate,
processes the partitioned streams
with the corresponding operators (`onTrue` and `onFalse`),
and merges both resulting streams back into a single output stream.

the `onFalse` operator is optional,
defaults to the identity function that leaves the stream as is.

note that since the `when` operator is this module's default export,
it can easily be renamed to anything else, e.g. `ifThenElse`.

# TypeScript
although this library is written in [TypeScript](https://www.typescriptlang.org),
it may also be imported into plain JavaScript code:
modern code editors will still benefit from the available type definition,
e.g. for helpful code completion.

# License
Copyright 2018 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
