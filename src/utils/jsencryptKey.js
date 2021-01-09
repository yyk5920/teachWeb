import { JSEncrypt } from 'jsencrypt'

//RSA加密

export const encruption = function (key,obj) {

    let encrypt = new JSEncrypt();

    encrypt.setPublicKey(

        //KEY RSA公钥

        key

    );

    return encrypt.encrypt(obj);

};

//RSA解密

export const decryption = function (key,obj) {

    let _decryp = new JSEncrypt();

    _decryp.setPrivateKey(

        //KEY RSA私钥

        key

    );

    return _decryp.decrypt(obj)

};
