import { TransformableInfo } from 'logform';

const printf = (info: TransformableInfo): string => {
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
    } else {
      const extra = '\t' + JSON.stringify(metadata);
      log_text += extra;
    }
  }
  return log_text;
};

// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
// const printf = (opts?: {label: string, level: string, timestamp: string, message: any, metadata: any}) => {
//   opts = opts || {label: '', level: '', timestamp: '', message: '', metadata: undefined};
//   const msg = (typeof opts.message === 'string') ? opts.message : JSON.stringify(opts.message);
//   let log_text = `${opts.timestamp} [${opts.label}] - [${opts.level}]: ${msg}`;
//   if (opts.metadata) {
//     log_text += '\n';
//     if (opts.metadata instanceof Error) {
//       log_text += opts.metadata.message;
//       log_text += '\n';
//       log_text += opts.metadata.stack;
//     } else {
//       const extra = '\t' + JSON.stringify(opts.metadata);
//       log_text += extra;
//     }
//   }
//   return log_text;
// };

// const printf = (label: string, level: string, timestamp: string, message: any, metadata: any) => {
//   const msg = (typeof message === 'string') ? message : JSON.stringify(message);
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

export { printf };


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
