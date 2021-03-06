import VK from 'vk-openapi';

export default class Api {
  static init() {
    VK.init({
      apiId: 6766409
    });

    return new Promise((resolve, reject) => {
      VK.Auth.login(data => {
        if (data.session) {
          resolve();
        } else {
          reject(new Error('Не удалось авторизироваться'));
        }
      }, 2);
    });
  }

  static callAPI(method, params) {
    params.v = '5.88';

    return new Promise((resolve, reject) => {
      VK.api(method, params, data => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.response);
        }
      });
    });
  }
}
