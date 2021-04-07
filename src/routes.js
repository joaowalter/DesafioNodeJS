const express = require('express');
const { uuid } = require('uuidv4');
const routes = express.Router()

const dados_cliente = [];
const dados_cidade = [];

routes.post('/cidade', (request, response) => {
    const { nome, UF } = request.body;

    const cidade = { id: uuid(), nome, UF };

    dados_cidade.push(cidade);

    return response.json(cidade);
});

routes.post('/cliente', (request, response) => {
    const { nome, sexo, dta_nascimento, idade, cidade_onde_mora } =  request.body;

    const cliente = { id: uuid(), nome, sexo, dta_nascimento, idade, cidade_onde_mora };

    dados_cliente.push(cliente);

    return response.json(cliente);
});

routes.get('/cidade', (request, response) => {
    return response.json(dados_cidade);
});

routes.get('/cidadenome', (request, response) => {
    const { nome } = request.query;

    const result = nome
     ? dados_cidade.filter(cidade => cidade.nome.includes(nome))
     : dados_cidade;

    return response.json(result);
});

routes.get('/cidadeUF', (request, response) => {
    const { UF } = request.query;

    const result = UF
     ? dados_cidade.filter(cidade => cidade.UF.includes(UF))
     : dados_cidade;

    return response.json(result);
});

routes.get('/cliente', (request, response) => {
    return response.json(dados_cliente);
});

routes.get('/clientenome', (request, response) => {
    const { nome } = request.query;

    const result = nome
     ? dados_cliente.filter(cliente => cliente.nome.includes(nome))
     : dados_cliente;

    return response.json(result);
});

routes.get('/clienteid', (request, response) => {
    const { id } = request.query;

    const result = id
     ? dados_cliente.filter(cliente => cliente.id.includes(id))
     : dados_cliente;

    return response.json(result);
});

routes.delete('/cliente/:id', (request, response) => {
    const { id } = request.params;

    const clienteIndex = dados_cliente.findIndex(cliente => cliente.id === id);

    if (clienteIndex < 0) {
        return response.status(400).json({ error: 'Cliente não encontrado.' })
    }

    dados_cliente.splice(clienteIndex, 1);

    return response.status(204).send();
});

routes.put('/cliente/:id', (request, response) => {
    const { id } = request.params;

    const clienteIndex = dados_cliente.findIndex(cliente => cliente.id === id);

    if (clienteIndex < 0) {
        return response.status(400).json({ error: 'Cliente não encontrado.' })
    }

    const cliente = dados_cliente[clienteIndex];
    cliente.nome = request.body.nome;

    return response.json(cliente);
});

module.exports = routes
