"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var adapter_libsql_1 = require("@prisma/adapter-libsql");
var prismaClientSingleton = function () {
    var adapter = new adapter_libsql_1.PrismaLibSql({
        url: process.env.DATABASE_URL || 'file:./dev.db',
    });
    return new client_1.PrismaClient({ adapter: adapter });
};
var prisma = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
