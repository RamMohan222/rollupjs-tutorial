// src/main.js
import { add, sub } from './fun.js';
import foo, {v} from './foo';

import ans from 'the-answer';


console.log('__HELLO__', 'App')
console.log('__HELLO__ Ram')
// __HELLO_ comment
console.log('__GOODBYE__ any where')

export function print() {
   
    console.log(add(1, 2));
    console.log(sub(2, 1));
    console.log('The Ans', ans)
}

// src/main.js
export default function lazyLoading() {
    console.log(foo, v);
    // lazy loading, syntax for the code splitting.
    //import('./foo.js').then(({ default: foo, v }) => console.log(foo, v));
}

print();
lazyLoading();