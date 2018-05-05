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
;
import { Observable, merge } from 'rxjs'
import { partition } from 'rxjs/operators'

export type RxOperator<I,O> = ($: Observable<I>) => Observable<O>

export default function when <I,O>(predicate: (v: I) => boolean) {
	return function (
    onTrue: RxOperator<I,O>,
    onFalse = identity as RxOperator<I,O>
  ): RxOperator<I,O> {
		return function (_$: Observable<I>) {
			const [t$, f$] = partition(predicate)(_$)
			return merge(onFalse(f$), onTrue(t$))
		}
	}
}

export function identity <V>(v: V): V {
  return v
}
