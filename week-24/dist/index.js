"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
function add(a, b) {
    return a + b;
}
app.post('/rpc', (req, res) => {
    const { jsonrpc, method, params, id } = req.body;
    if (jsonrpc !== '2.0' || !method || !Array.isArray(params)) {
        res.status(400).json({
            jsonrpc: '2.0',
            error: {
                code: -32600,
                message: "Invalid Request"
            },
            id: null
        });
    }
    let result;
    switch (method) {
        case 'add':
            result = add(params[0], params[1]);
            break;
        default:
            res.status(400).json({
                jsonrpc: '2.0',
                error: {
                    code: -32601,
                    message: "Invalid method",
                },
                id: null
            });
            return;
    }
    res.json({ jsonrpc: '2.0', result, id });
});
app.listen(port, () => {
    console.log("listening on port 3000");
});
