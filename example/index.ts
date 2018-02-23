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
import when from '../'
import log from './console'
import { interval } from 'rxjs/observable/interval'
import { map, take } from 'rxjs/operators'

interval(1000).pipe(
  take(5),
  when<number,string>((v: number) => !(v % 2))(
    map((v: number) => `${v} is even`), // 'then' operator
    map((v: number) => `${v} is odd`) // 'else' operator, optional
  )
)
.subscribe(log('next:'), log('error:'), log('done'))
