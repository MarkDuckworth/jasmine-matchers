/**
 * Created by Mark Duckworth on 3/1/2015. Copyright (c) 2015 Mark Duckworth. All rights reserved.
 */
window.DuckThinks = window.DuckThinks || {};
window.DuckThinks.jasmineMatchers = window.DuckThinks.jasmineMatchers || {};

window.DuckThinks.jasmineMatchers = {
    // Jasmine custom matcher: `toHaveNoOtherOwnPropertiesThan(whitelistedProperties)`
    //-----------------------------------------------------
    // Use this matcher to assert that an object contains only the whitelisted properties.
    toHaveNoOtherOwnPropertiesThan: function(util, customEqualityTesters) {
        return {
            compare: function(actual, whitelistedProperties) {
                // This result object will be returned from compare.
                var result = {pass: true},
                    property;

                // Interpret the `whitelistedProperties` argument.
                if (typeof whitelistedProperties === 'string') {
                    // If `whitelistedProperties` is a string, encapsulate that
                    // value in an array. This is a convenience to the caller.
                    whitelistedProperties = [whitelistedProperties];
                }
                else if (Object.prototype.toString.call(whitelistedProperties) !== '[object Array]') {
                    // If the caller did not define an array of expected properties
                    // or gave another non-Array type,  then use and empty array
                    whitelistedProperties = [];
                }

                // Assert that all own properties in `actual` are in the
                // `whitelistedProperties` array.
                for (property in actual) {
                    if (actual.hasOwnProperty(property)) {
                        if (!util.contains(whitelistedProperties, property, customEqualityTesters)) {
                            // An own property from `actual` was not found in
                            // `whitelistedProperties`, so this test is a failure.
                            result.pass = false;
                            result.message = "Did not expect " + actual + " to have the own property " + property + ".";

                            // Exit the loop early
                            break;
                        }
                    }
                }

                // Set error message for when the expect is inverted with `.not`.
                // This is a very unlikely case, but we will still support it with a message.
                if (result.pass) {
                    result.message = "Expected " + actual + " to contain other own properties.";
                }

                return result;
            }
        };
    }
};