"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpUtils = void 0;
const tools_1 = require("../tools");
class HttpUtils {
}
exports.HttpUtils = HttpUtils;
// If the Node app is running on NGINX or any other proxy for that matter,
// then you will get the local ip address for every request i.e, 127.0.0.1.
// To solve this problem, we need to catch real ip address of the user from where the request is made.
// For achieving this we will look for the originating ip address in the 'X-Forwarded-For' HTTP Header.
// In Express we need to add the following line, if your server is behind a proxy
//    app.set('trust proxy', true);
// And add following line in nginx.conf file:
//    proxy_set_header X-Real-IP $remote_addr;
// Then req.ip for getting user’s ip address and you can also use above code to get ip address here too.
HttpUtils.ipAddress = (req) => {
    let address = getClientIpFromXForwardedFor(req.headers['X-Forwarded-For']) || req.ip || undefined;
    if (!address && req.socket) {
        address = req.socket.remoteAddress;
    }
    return address;
};
function getClientIpFromXForwardedFor(value) {
    if (!value) {
        return value;
    }
    if (typeof value !== 'string') {
        throw new TypeError(`Expected a string, got "${typeof value}"`);
    }
    // x-forwarded-for may return multiple IP addresses in the format:
    // "client IP, proxy 1 IP, proxy 2 IP"
    // Therefore, the right-most IP address is the IP address of the most recent proxy
    // and the left-most IP address is the IP address of the originating client.
    // source: http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html
    // Azure Web App's also adds a port for some reason, so we'll only use the first part (the IP)
    const forwardedIps = value.split(',').map((e) => {
        const ip = e.trim();
        if (ip.includes(':')) {
            const split = ip.split(':');
            // make sure we only use this if it's ipv4 (ip:port)
            if (split.length === 2) {
                return split[0];
            }
        }
        return ip;
    });
    // Sometimes IP addresses in this header can be 'unknown' (http://stackoverflow.com/a/11285650).
    // Therefore taking the left-most IP address that is not unknown
    // A Squid configuration directive can also set the value to "unknown" (http://www.squid-cache.org/Doc/config/forwarded_for/)
    return forwardedIps.find(isIp);
}
function isIp(value) {
    return tools_1.RegExpUtil.ipv4.test(value) || tools_1.RegExpUtil.ipv6.test(value);
}
//# sourceMappingURL=httpUtils.js.map