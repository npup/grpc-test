/**
  implementationer av endpoints i dice proto
 */

export function sayHello(call, callback) {
    callback(null, {
        message: `Hej, ${call.request.name}.`,
    });
}
