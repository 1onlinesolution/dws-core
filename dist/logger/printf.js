"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printf = void 0;
const printf = (info) => {
    info = info || { label: '', level: '', timestamp: '', message: '', metadata: undefined };
    const message = info.message;
    const level = info.level;
    const label = info['label'];
    const timestamp = info['timestamp'];
    const metadata = info['metadata'];
    let log_text = `${timestamp} [${label}] - [${level}]: ${message}`;
    if (metadata) {
        log_text += '\n';
        if (metadata instanceof Error) {
            log_text += metadata.message;
            log_text += '\n';
            log_text += metadata.stack;
        }
        else {
            const extra = '\t' + JSON.stringify(metadata);
            log_text += extra;
        }
    }
    return log_text;
};
exports.printf = printf;
// module.exports = ({ label, level, timestamp, message, ...metadata }) => {
//   let msg = (typeof message === 'string') ? message : JSON.stringify(message);
//   let log_text = `${timestamp} [${label}] - [${level}]: ${msg}`;
//   if (metadata) {
//     log_text += '\n';
//     if (metadata instanceof Error) {
//       log_text += metadata.message;
//       log_text += '\n';
//       log_text += metadata.stack;
//     } else {
//       const extra = '\t' + JSON.stringify(metadata);
//       log_text += extra;
//     }
//   }
//   return log_text;
// };
//# sourceMappingURL=printf.js.map