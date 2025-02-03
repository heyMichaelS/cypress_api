///<reference types="cypress" />

describe('Cadastrar um dispositivos', () => {

    const payload_cadatro_device = require('../fixtures/cadastrar_device_sucesso.json')

    it('Cadastrar um dispositivos', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)


        cy.cadastrarDevice(payload_cadatro_device).then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 10)).to.equal(dataAtual)
            expect(response.body.name).equal("Celular michael test")

            expect(response.body.data.year).not.string
            expect(response.body.data.year).equal(2025)

            expect(response.body.data.price).not.string
            expect(response.body.data.price).equal(5000.00)

            expect(response.body.data['CPU model']).not.string
            expect(response.body.data['CPU model']).equal("Intel Core i9")

            expect(response.body.data['Hard disk size']).not.empty
            expect(response.body.data['Hard disk size']).equal("2 TB")

            expect(response.body.data.owner).not.empty
            expect(response.body.data.owner).equal("mtyr LTDA")

        })

    })

    it('Cadastrar um dispositivos sem mandar dados', () => {

        cy.cadastrarDevice('').then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error)
                .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')

        })

    })


})