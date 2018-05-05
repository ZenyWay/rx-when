'use strict' /* eslint-env jasmine */
/**
 * @license
 * Copyright 2018 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
//
const when = require('../').default
const interval = require('rxjs').interval
const map = require('rxjs/operators').map
const take = require('rxjs/operators').take

describe('the `when` operator:', function () {
  describe('even/odd example:', function () {
    let next, error, complete

    beforeEach(function () {
      next = jasmine.createSpy('next')
      error = jasmine.createSpy('error')
      complete = jasmine.createSpy('complete')
    })

    beforeEach(function (done) {
      complete.and.callFake(done)
      interval(50).pipe(
        take(5),
        when(v => !(v % 2))(
          map(v => `${v} is even`), // 'then' operator
          map(v => `${v} is odd`) // 'else' operator, optional
        )
      )
      .subscribe(next, error, complete)
    })

    it('completes successfully', function () {
      expect(next.calls.allArgs()).toEqual([
        [ '0 is even' ],
        [ '1 is odd' ],
        [ '2 is even' ],
        [ '3 is odd' ],
        [ '4 is even' ]
      ])
      expect(error).not.toHaveBeenCalled()
      expect(complete).toHaveBeenCalledTimes(1)
    })
  })
})
