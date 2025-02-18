import http from 'k6/http';
import { check, sleep } from 'k6';
import Utils from '../utils/utils';

export default class Customer {
    listCustomers(token) {
        const url = `${Utils.getBaseUrl()}/api/customers`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const response = http.get(url, params);
        check(response, {
            "Listagem de clientes retornou 200": (r) => r.status === 200
        });
        sleep(1);
    }

    createCustomer(token) {
        const url = `${Utils.getBaseUrl()}/api/customers`;
        const body = JSON.stringify({
            address: { id: "12345" },
            email: "test@example.com",
            firstName: "Test",
            lastName: "User",
            phone: "1234567890"
        });
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        const response = http.post(url, body, params);
        check(response, {
            "Criação de cliente retornou 201": (r) => r.status === 201
        });
        sleep(1);
    }
}
