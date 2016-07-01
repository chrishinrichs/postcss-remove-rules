import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('removes all rules when * is used', t => {
    return run(t, 'a { text-decoration: none; color: red; }', '', {
        rulesToRemove: { a: '*' }
    });
});

test('removes only the specified rule, no array', t => {
    return run(t, '.two .classes { text-decoration: none; color: red; }',
        '.two .classes { color: red; }', {
            rulesToRemove: { '.two .classes': 'text-decoration' }
        }
    );
});

test('removes only the specified rules, with array', t => {
    return run(t, 'a { text-decoration: none; color: red; display: block; }',
        'a { display: block; }', {
            rulesToRemove: { a: ['text-decoration', 'color'] }
        }
    );
});
