///<reference types="cypress" />

describe('Alterar um dispositivos', () => {

    it('Alterar um dispositivos', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        const body_cadastro = {
            "name": "Celular michael test",
            "data": {
                "year": 2025,
                "price": 5000.00,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB",
                "owner": "mtyr LTDA"
            }
        }

        const body_put = {
            "name": "Celular michael put",
            "data": {
                "year": 2025,
                "price": 6000.00,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB",
                "owner": "mtyrls LTDA"
            }
        }

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro
        }).as('postDeviceResult')


        // pegando o result do cadastro
        // para pegar o id
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_cadastro.name)
            expect(response_post.body.data.price).equal(body_cadastro.data.price)
            expect(response_post.body.data.owner).equal("mtyr LTDA")

            // fazer o put
            cy.request({
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                body: body_put
            }).as('putDeviceResult')

            // validações de put
            cy.get('@putDeviceResult').then((response_put) => {
                expect(response_put.status).equal(200)
                expect(response_put.body.name).equal(body_put.name)
                expect(response_put.body.updatedAt.slice(0, 10)).to.equal(dataAtual)
                expect(response_put.body.data.price).equal(body_put.data.price)
                expect(response_put.body.data.owner).equal(body_put.data.owner)
            })

        })


    })

})
