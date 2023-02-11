const request = require('supertest');
const expect = require('chai').expect;
const userdata = require('../testdata/userdata.json');
const userdatanegative = require('../testdata/userdatanegative.json');
const userdatalogin = require('../testdata/userdatalogin.json');
const updateUser = require('../testdata/updateUserData.json');
const unitdata = require('../testdata/unitdata.json');

const baseurl = 'https://kasir-api.belajarqa.com';


describe('Kasir Aja API Automation', () => {
    var token;
    var userIdnew;

    // Positive Case
    it('TC-001-Registrasi User: response status is 201', async() => {
        const response = request(baseurl)
        .post('/registration')
        .send(userdata)
        expect((await response).status).to.equal(201)
        });

    it('TC-002-Registrasi User: status is success', async() => {
        const response = request(baseurl)
        .post('/registration')
        .send(userdata)
        expect((await response).body.status).to.equal("success")
        });



    // Negative Case
    it('TC-003-Registrasi User: response status is 400', async() => {
        const response = request(baseurl)
        .post('/registration')
        .send(userdatanegative)
        expect((await response).status).to.equal(400)
        });

    it('TC-004-Registrasi User: status is fail', async() => {
        const response = request(baseurl)
        .post('/registration')
        .send(userdatanegative)
        expect((await response).body.status).to.equal("fail")
        });

    it('TC-005-Registrasi User: Nama tidak boleh kosong', async() => {
        const response = request(baseurl)
        .post('/registration')
        .send(userdatanegative)
        expect((await response).body.message).to.equal("\"name\" is not allowed to be empty")
        });
 
        

    // Positive Case
    it('TC-006-Login User: response status is 201', async() => {
        const response = request(baseurl)
        .post('/authentications')
        .send(userdatalogin)
        expect((await response).status).to.equal(201)
        })

    it('TC-007-Login User: status is success', async() => {
        const response = request(baseurl)
        .post('/authentications')
        .send(userdatalogin)
        expect((await response).body.status).to.equal("success")
        token = (await response).body.data.accessToken
        })



    // Negative Case
    it('TC-008-Login User: response status is 400', async() => {
        const response = request(baseurl)
        .post('/authentications')
        .send({
            "email": "palugada@pm.com",
            "password": ""
        })
        expect((await response).status).to.equal(400)
        });

    it('TC-009-Login User: status is fail', async() => {
        const response = request(baseurl)
        .post('/authentications')
        .send({
            "email": "palugada@pm.com",
            "password": ""
        })
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-010-Login User: Password tidak boleh kosong', async() => {
        const response = request(baseurl)
        .post('/authentications')
        .send({
            "email": "palugada@pm.com",
            "password": ""
        })
        expect((await response).body.message).to.equal("\"password\" is not allowed to be empty")
        });



    //Postive Case
    it('TC-011-Create User: response status is 201', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send(userdata)
        expect((await response).status).to.equal(201)
        userIdnew = (await response).body.data.userId
        });

    it('TC-012-Create User: status is success', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send(userdata)
        expect((await response).body.status).to.equal("success")
        })

    it('TC-013-Create User: User berhasil ditambahkan', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send(userdata)
        expect((await response).body.message).to.equal("User berhasil ditambahkan")
        })



    //Negative Case
    it('TC-014-Create User: response status is 400', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "kasir-serbaguna",
            "email": "user@example.com",
            "password": ""
        })
        expect((await response).status).to.equal(400)
        });

    it('TC-015-Create User: status is fail', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "kasir-serbaguna",
            "email": "user@example.com",
            "password": ""
        })
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-016-Create User: Password tidak boleh kosong', async() => {
        const response = request(baseurl)
        .post('/users')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "kasir-serbaguna",
            "email": "user@example.com",
            "password": ""
        })
        expect((await response).body.message).to.equal("\"password\" is not allowed to be empty")
        });


    
    //Positive Case
    it('TC-017-Get User Detail: response status is 200', async() => {
        const response = request(baseurl)
        .get(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(200)
        });

    it('TC-018-Get User Detail: status is success', async() => {
        const response = request(baseurl)
        .get(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("success")
        })

    it('TC-019-Get User Detail: User berhasil ditambahkan', async() => {
        const response = request(baseurl)
        .get(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.data.user.id).to.equal(`${userIdnew}`)
        })

    //Negative Case
    it('TC-020-Get User Detail: response status is 404', async() => {
        const response = request(baseurl)
        .get('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(404)
        });

    it('TC-021-Get User Detail: status is fail', async() => {
        const response = request(baseurl)
        .get('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-022-Get User Detail: ID tidak valid', async() => {
        const response = request(baseurl)
        .get('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).body.message).to.equal("id tidak valid")
        })

    // Positive Case
    it('TC-023-Get User List: response status is 200', async() => {
        const response = request(baseurl)
        .get('/users')
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(200)
        });

    it('TC-024-Get User List: status is success', async() => {
        const response = request(baseurl)
        .get('/users')
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("success")
        })


    //Positive Case
    it('TC-025-Update User: response status is 200', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .send(updateUser)
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(200)
        });

    it('TC-026-Update User: status is success', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .send(updateUser)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("success")
        })

    it('TC-027-Update User: User berhasil diupdate', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .send(updateUser)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.message).to.equal("User berhasil diupdate")
        })

    it('TC-028-Update User: update name to update-palugada', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .send(updateUser)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.data.name).to.equal("update-palugada")
        })

    
    //Negative Case
    it('TC-029-Update User: response status is 400', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "email": "user@example.com"
        })
        expect((await response).status).to.equal(400)
        });

    it('TC-030-Update User: status is fail', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "email": "user@example.com"
        })
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-031-Update User: Nama tidak boleh kosong', async() => {
        const response = request(baseurl)
        .put(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "email": "user@example.com"
        })
        expect((await response).body.message).to.equal("\"name\" is not allowed to be empty")
        });

    it('TC-032-Update User: response status is 404', async() => {
        const response = request(baseurl)
        .put('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "update-user",
            "email": "user@example.com"
        })
        expect((await response).status).to.equal(404)
        });

    it('TC-033-Update User: status is fail', async() => {
        const response = request(baseurl)
        .put('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "update-user",
            "email": "user@example.com"
        })
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-034-Update User: id tidak valid', async() => {
        const response = request(baseurl)
        .put('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "update-user",
            "email": "user@example.com"
        })
        expect((await response).body.message).to.equal("id tidak valid")
        });

    
    // Positive Case
    it('TC-035-Delete User: response status is 200', async() => {
        const response = request(baseurl)
        .delete(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(200)
        });

    it('TC-036-Delete User: status is success', async() => {
        const response = request(baseurl)
        .delete(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("success")
        })

    it('TC-037-User: User berhasil dihapus', async() => {
        const response = request(baseurl)
        .delete(`/users/${userIdnew}`)
        .set("Authorization", "Bearer " + token)
        expect((await response).body.message).to.equal("User berhasil dihapus")
        })
        
    
    //Negative Case
    it('TC-038-Delete User: response status is 404', async() => {
        const response = request(baseurl)
        .delete('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).status).to.equal(404)
        });

    it('TC-039-Delete User: status is fail', async() => {
        const response = request(baseurl)
        .delete('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-040-Delete User: ID tidak valid', async() => {
        const response = request(baseurl)
        .delete('/users/8ae0a507-1b77-47e2-9235-6078152506158')
        .set("Authorization", "Bearer " + token)
        expect((await response).body.message).to.equal("id tidak valid")
        })


        //Postive Case
    it('TC-041-Add Unit: response status is 201', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send(unitdata)
        expect((await response).status).to.equal(201)
        });

    it('TC-042-Add Unit: status is success', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send(unitdata)
        expect((await response).body.status).to.equal("success")
        })

    it('TC-043-Add Unit: Unit berhasil ditambahkan', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send(unitdata)
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan")
        })



    //Negative Case
    it('TC-044-Add Unit: response status is 400', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "description": "Merek Pentel harga 100ribu"
         })
        expect((await response).status).to.equal(400)
        });

    it('TC-045-Add Unit: status is fail', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "description": "Merek Pentel harga 100ribu"
         })
        expect((await response).body.status).to.equal("fail")
        })

    it('TC-046-Add Unit: Password tidak boleh kosong', async() => {
        const response = request(baseurl)
        .post('/units')
        .set("Authorization", "Bearer " + token)
        .send({
            "name": "",
            "description": "Merek Pentel harga 100ribu"
         })
        expect((await response).body.message).to.equal("name is required, description is optional")
        });
    });

