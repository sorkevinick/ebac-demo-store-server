import { group, sleep } from 'k6';
import Login from '../request/login.request.js';
import Product from '../request/product.request.js';
import Customer from '../request/customer.request.js';
import data from '../data/usuarios.json';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
};

export default function () {
    const login = new Login();
    const product = new Product();
    const customer = new Customer();

    group('Login e obtenção do token', () => {
        login.access(data.usuarioOk.user, data.usuarioOk.pass);
    });

    const token = login.getToken();

    group('Testes de Produtos', () => {
        product.listProducts(token);
        product.getProductOrders(token, 1); 
    });

    group('Testes de Clientes', () => {
        customer.listCustomers(token);
        customer.createCustomer(token);
    });

    sleep(1);
}
