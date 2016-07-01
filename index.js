var postcss = require('postcss');

module.exports = postcss.plugin('remove-rules', function (opts) {
    opts = opts || {};
    var rulesToRemove = opts.rulesToRemove;

    return function (css) {
        if (rulesToRemove) {
            css.walkRules(function (rule) {
                var excludes = rulesToRemove[rule.selector];
                if (excludes) {
                    // One or more rules should be removed
                    if (excludes === '*') {
                        // Remove this entire rule
                        rule.remove();
                    } else {
                        if (typeof excludes === 'string') {
                            excludes = [excludes];
                        }
                        rule.walkDecls(function (decl) {
                            if (excludes.indexOf(decl.prop) !== -1) {
                                decl.remove();
                            }
                        });
                    }
                }
            });
        }
    };
});
