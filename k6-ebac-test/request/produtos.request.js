import http from 'k6/http';
import { check, sleep } from 'k6';
import Utils from '../utils/utils';

export default class Product {
    listProducts(token) {
        const url = `${Utils.getBaseUrl()}/api/products`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const response = http.get(url, params);
        check(response, {
            "Listagem de produtos retornou 200": (r) => r.status === 200
        });
        sleep(1);
    }

    getProductOrders(token, id) {
        const url = `${Utils.getBaseUrl()}/api/products/${id}/orders`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const response = http.get(url, params);
        check(response, {
            "Consulta de pedidos retornou 200": (r) => r.status === 200
        });
        sleep(1);
    }
}
