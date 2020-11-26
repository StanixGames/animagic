"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerClientManager = void 0;
const shared_1 = require("@animagic/shared");
exports.ServerClientManager = new shared_1.ClientManager();
// const users = new Map();
// const sessions = new Map();
// users.set('bob', {
//   login: 'bob',
//   password: '123456',
// });
// users.set('mike', {
//   login: 'mike',
//   password: '123456',
// });
// sessions.set('1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746', {
//   session: '1ab2f959-54e5-4f0b-b614-5c3029ac5edc.69f9b548-9b3d-405c-b45a-ad116b0ad746',
//   login: 'bob',
// });
// const doLogin = (login: string, password: string): string | null => {
//   if (users.has(login) && users.get(login).password === password) {
//     for (let s of sessions.values()) {
//       if (s.login === login) {
//         return s.session;
//       }
//     }
//     const session = `${v4()}.${v4()}`;
//     sessions.set(session, {
//       session,
//       login,
//     });
//     return session;
//   }
//   return null;
// }
// const doLogout = (session: string) => {
//   if (sessions.has(session)) {
//     sessions.delete(session);
//   }
// }
// const doCheckSession = (session: string): boolean => {
//   return sessions.has(session);
// }
//# sourceMappingURL=ServerClientManager.js.map