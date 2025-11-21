🚗 ParkFlow - Sistema de Gestão de Estacionamentos

Gerenciamento inteligente, seguro e eficiente para estacionamentos comerciais.

📋 Sobre o Projeto

O ParkFlow é uma solução desenvolvida para resolver a dificuldade de controle manual de entrada e saída de veículos, cálculo de permanência e gestão financeira de estacionamentos.

O sistema visa automatizar a tarifação, garantir a segurança e fornecer inteligência de negócio (BI) através de relatórios de ocupação e faturamento.

🗂️ Estrutura do Banco de Dados (DatabaseAS)

O banco de dados utiliza o MongoDB para garantir flexibilidade e performance nas transações. Abaixo, a definição das coleções principais.

1. clientes 👤

Armazena os dados dos usuários, diferenciando mensalistas de avulsos.

Relacionamento: Possui documentos embarcados (Embedded) para veículos.

Campos: nome, cpf, tipo, veiculos (Array: placa, modelo, cor).

2. vagas 🅿️

Representa o inventário físico do estacionamento.

Campos: codigo (ex: G1-01), andar, tipo (Carro/Moto/PCD), status.

3. funcionarios 👷

Controle de operadores para auditoria de entradas e saídas.

Campos: nome, matricula, cargo, turno.

4. tabela_precos 💲

Regras de tarifação flexíveis.

Campos: nome, regras (valorHora, tolerancia), ativo.

5. tickets 🎫

A coleção transacional central do sistema.

Relacionamento: Referencia clientes, vagas, funcionarios e tabela_precos via ObjectId.

Campos: placaVeiculo, dataEntrada, dataSaida, valorTotal, status.

📊 Modelagem de Dados

O sistema utiliza uma abordagem híbrida:

Embedada (Denormalized): Para veiculos dentro de clientes (acesso rápido e alta dependência).

Referência (Normalized): Para tickets, garantindo integridade e evitando duplicidade de dados em alta cardinalidade.

🚀 Como Executar

Este projeto contém scripts para execução direta no MongoDB Shell (mongosh) ou no terminal integrado do MongoDB Compass.

1. Popular o Banco de Dados

Utilize o script popular_database_as.js para criar as coleções e inserir a massa de dados (30 clientes, 30 vagas, tickets e funcionários).

# No terminal ou Compass
load("popular_database_as.js")


2. Gerar Relatórios

Utilize o script relatorios_parkflow.js para executar as agregações e visualizar os resultados no console.

# No terminal ou Compass
load("relatorios_parkflow.js")


📈 Relatórios e Análises (Business Intelligence)

O sistema inclui 8 relatórios estratégicos gerados via Aggregation Framework:

#

Relatório

Objetivo

Relatório - 1

Faturamento por Status

Visão de caixa realizado vs. a receber.

Relatório - 2

Receita por Tipo de Cliente

Comparativo Mensalista vs. Avulso.

Relatório - 3

Ocupação por Andar

Identificar zonas mais utilizadas (Logística).

Relatório - 4

Produtividade Operacional

Ranking de atendimentos por funcionário.

Relatório - 5

Tempo Médio de Permanência

Métricas para ajuste de tarifação.

Relatório - 6

Top 3 Clientes VIP

Identificação de clientes para fidelização.

Relatório - 7

Faturamento por Veículo

Análise de receita Carro vs. Moto.

Relatório - 8

Histórico Diário

Tendência de faturamento ao longo do tempo.

📁 Arquivos do Repositório

popular_database_as.js: Script de criação e seed (população) do banco.

relatorios_parkflow.js: Script contendo as queries de agregação.

documentacao_parkflow.pdf: Documentação completa do projeto.

✒️ Autor

Desenvolvido como parte da atividade de Banco de Dados NoSQL.
