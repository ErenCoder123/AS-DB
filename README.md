Documentação do Projeto: ParkFlow - Sistema de Gestão de Estacionamento

1. Nome do Projeto e Descrição

Nome do Sistema: ParkFlow
Descrição: O ParkFlow é um sistema de gerenciamento para estacionamentos comerciais.
Problema/Objetivo: Resolve a dificuldade de controle manual de entrada e saída de veículos, cálculo de permanência, gestão financeira e controle de ocupação de vagas em diferentes andares. O objetivo é automatizar a tarifação, garantir a segurança (sabendo quem entrou e saiu) e fornecer inteligência de negócio sobre a ocupação e faturamento.

2. Propósito do Banco de Dados

O banco de dados DatabaseAS (MongoDB) serve como o repositório central de informações do sistema. Ele armazena dados cadastrais de clientes e funcionários, o inventário de vagas (físico) e, principalmente, o registro transacional de todas as operações (tickets de estacionamento). Ele é essencial para persistir o histórico financeiro e permitir análises de desempenho.

3. Definição das Collections

A. clientes

Propósito: Armazenar dados de quem utiliza o estacionamento, diferenciando mensalistas de avulsos.

Campos Principais:

nome (String): Nome completo.

cpf (String): Identificador único.

tipo (String): "Mensalista" ou "Avulso".

Campo Aninhado (Subdocumento):

veiculos (Array de Objetos): Contém placa, modelo e cor. Justificativa: Um cliente pode ter mais de um carro, e esses dados pertencem estritamente ao cliente.

B. vagas

Propósito: Mapear o espaço físico do estacionamento.

Campos Principais:

codigo (String): Ex: "G1-01".

andar (String): Localização (G1, Térreo, G2).

tipo (String): Carro, Moto, PCD.

status (String): "Livre" ou "Ocupada".

C. funcionarios

Propósito: Controlar quem opera o sistema para fins de auditoria.

Campos Principais:

nome (String).

matricula (String).

cargo (String).

turno (String).

D. tabela_precos

Propósito: Permitir a flexibilidade de tarifas sem alterar o código fonte.

Campos Principais:

nome (String): Ex: "Padrão 2025".

regras (Objeto - Subdocumento): Contém valorHora, horaAdicional, tolerancia.

ativo (Boolean).

E. tickets

Propósito: A collection principal que registra a transação de estacionamento.

Campos Principais:

placaVeiculo (String): Registro rápido.

dataEntrada / dataSaida (Date).

valorTotal (Decimal/Number).

status (String): "Aberto" ou "Pago".

Referências (Relacionamentos): clienteId, vagaId, operadorEntradaId, tabelaPrecoId.

4. Relacionamentos entre as Collections

O sistema utiliza uma Abordagem Híbrida:

Relacionamento por Referência (Normalized):

A collection tickets se relaciona com clientes, vagas, funcionarios e tabela_precos através de seus _id (ObjectIds).

Justificativa: Alta cardinalidade. Um cliente pode ter centenas de tickets ao longo do tempo. Se embutíssemos os tickets dentro do cliente, o documento ficaria gigante. Além disso, se o nome do funcionário mudar, não queremos duplicar essa alteração em mil tickets passados.

Relacionamento Embedado (Denormalized):

A collection clientes contém veiculos como um array de subdocumentos.

Justificativa: Dados estritamente dependentes. Um veículo raramente existe no sistema sem um dono. Além disso, ao carregar o perfil do cliente na tela, já queremos ver os carros dele imediatamente, sem fazer outra query.

5. Modelagem (Diagrama Lógico Simplificado)

erDiagram
    CLIENTE ||--|{ TICKET : "gera"
    CLIENTE ||--|{ VEICULO : "possui (embed)"
    FUNCIONARIO ||--|{ TICKET : "registra"
    VAGA ||--|{ TICKET : "é ocupada por"
    TABELA_PRECO ||--|{ TICKET : "tarifado por"

    CLIENTE {
        ObjectId _id
        string nome
        string cpf
        string tipo
        array veiculos
    }
    VEICULO {
        string placa
        string modelo
        string cor
    }
    VAGA {
        ObjectId _id
        string codigo
        string andar
        string status
    }
    TICKET {
        ObjectId _id
        ObjectId clienteId
        ObjectId vagaId
        ObjectId operadorEntradaId
        Date dataEntrada
        Date dataSaida
        Number valorTotal
        string status
    }


7. Definição dos 8 Relatórios Gerenciais

Os relatórios foram desenvolvidos utilizando o Aggregation Framework do MongoDB para extrair inteligência dos dados:

Faturamento Total por Status:

Utilidade: Visão financeira imediata. Mostra o caixa realizado (pago) vs. o potencial a receber (aberto).

Receita por Tipo de Cliente:

Utilidade: Estratégia de Marketing. Define se o foco deve ser captar mais mensalistas ou investir no rotativo.

Ocupação por Andar:

Utilidade: Logística e Manutenção. Identifica zonas mortas ou superlotadas para direcionar o fluxo.

Produtividade dos Operadores:

Utilidade: Gestão de RH. Identifica funcionários com alto desempenho ou necessidade de treinamento.

Tempo Médio de Permanência:

Utilidade: Precificação. Ajuda a definir se a primeira hora deve ser mais cara baseada na média de estadia.

Top 3 Clientes (VIPs):

Utilidade: Fidelização. Identifica quem deixa mais dinheiro na empresa para ações de CRM.

Faturamento por Tipo de Veículo:

Utilidade: Otimização de Espaço. Se motos geram pouca receita mas ocupam muito espaço, o layout pode ser revisto.

Histórico Diário de Faturamento:

Utilidade: Análise de Tendência. Permite visualizar sazonalidade e crescimento do negócio ao longo do tempo.
