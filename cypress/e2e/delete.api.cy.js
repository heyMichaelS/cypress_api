///<reference types="cypress" />

describe('Deletar um dispositivos', () => {

    it('Deletar um dispositivos', () => {

        const body = {
            "name": "Celular michael test",
            "data": {
                "year": 2025,
                "price": 5000.00,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB",
                "owner": "mtyr LTDA"
            }
        }
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')


        // pegando o result do cadastro
        // para pegar o id
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)

            cy.request({
                method: 'DELETE',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult')

            // validações de delete
            cy.get('@deleteDeviceResult').then((response_delete) => {
                expect(response_delete.status).equal(200)
                expect(response_delete.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)

            })

        })


    })

    it('Deletar um dispositivos não existente', () => {

        const id_inexistente = '5555'
        cy.request({
            method: 'DELETE',
            url:`/objects/5555`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        // validações de delete
        cy.get('@deleteDeviceResult').then((response_delete) => {
            expect(response_delete.status).equal(404)
            expect(response_delete.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)

        })

    })

    it('Deletar um dispositivos reservado da api', () => {

        const id_reservado = '7'
        cy.request({
            method: 'DELETE',
            url:`/objects/7`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        // validações de delete
        cy.get('@deleteDeviceResult').then((response_delete) => {
            expect(response_delete.status).equal(405)
            cy.log(`Mensagem retornada: ${response_delete.body.error}`);
            expect(response_delete.body.error)
            .equal(`7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)

        

        })

    })


})


