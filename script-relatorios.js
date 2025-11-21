/**
 * RELATÓRIOS E ANÁLISES ESTRATÉGICAS - PARKFLOW
 * Database: DatabaseAS
 * * Como usar:
 * 1. Abra o terminal do Compass (_MONGOSH).
 * 2. Cole este código.
 * 3. Analise os resultados impressos (JSON).
 */

// 1. Garantir conexão no banco correto
const dbAS = db.getSiblingDB('DatabaseAS');
print(`\n>>> GERANDO RELATÓRIOS PARA: ${dbAS.getName()} <<<\n`);

// ==============================================================================
// RELATÓRIO 1: Faturamento Total por Status (Pago vs Aberto)
// P: Quanto já recebemos e quanto ainda temos "na rua" (em aberto)?
// ==============================================================================
print("--- [1] Faturamento por Status ---");
const relatorio1 = dbAS.tickets.aggregate([
    {
        $group: {
            _id: "$status",
            totalArrecadado: { $sum: "$valorTotal" },
            qtdTickets: { $sum: 1 }
        }
    },
    { $project: { _id: 0, status: "$_id", totalArrecadado: 1, qtdTickets: 1 } }
]).toArray();
printjson(relatorio1);


// ==============================================================================
// RELATÓRIO 2: Receita por Tipo de Cliente (Mensalista vs Avulso)
// P: Quem traz mais dinheiro para o estacionamento? O cliente fiel ou o rotativo?
// ==============================================================================
print("\n--- [2] Receita por Tipo de Cliente ---");
const relatorio2 = dbAS.tickets.aggregate([
    {
        $lookup: {
            from: "clientes",
            localField: "clienteId",
            foreignField: "_id",
            as: "dadosCliente"
        }
    },
    { $unwind: "$dadosCliente" },
    {
        $group: {
            _id: "$dadosCliente.tipo",
            receitaTotal: { $sum: "$valorTotal" },
            ticketMedio: { $avg: "$valorTotal" }
        }
    }
]).toArray();
printjson(relatorio2);


// ==============================================================================
// RELATÓRIO 3: Ocupação por Andar
// P: Qual andar é o mais utilizado? (Útil para logística ou manutenção)
// ==============================================================================
print("\n--- [3] Ocupação/Uso por Andar ---");
const relatorio3 = dbAS.tickets.aggregate([
    {
        $lookup: {
            from: "vagas",
            localField: "vagaId",
            foreignField: "_id",
            as: "dadosVaga"
        }
    },
    { $unwind: "$dadosVaga" },
    {
        $group: {
            _id: "$dadosVaga.andar",
            totalUsos: { $sum: 1 }
        }
    },
    { $sort: { totalUsos: -1 } } // Ordenar do mais usado para o menos usado
]).toArray();
printjson(relatorio3);


// ==============================================================================
// RELATÓRIO 4: Produtividade dos Operadores
// P: Qual funcionário registrou mais entradas de veículos?
// ==============================================================================
print("\n--- [4] Produtividade por Operador ---");
const relatorio4 = dbAS.tickets.aggregate([
    {
        $lookup: {
            from: "funcionarios",
            localField: "operadorEntradaId",
            foreignField: "_id",
            as: "dadosOperador"
        }
    },
    { $unwind: "$dadosOperador" },
    {
        $group: {
            _id: "$dadosOperador.nome",
            turno: { $first: "$dadosOperador.turno" },
            ticketsGerados: { $sum: 1 }
        }
    },
    { $sort: { ticketsGerados: -1 } }
]).toArray();
printjson(relatorio4);


// ==============================================================================
// RELATÓRIO 5: Tempo Médio de Permanência (Apenas Tickets Pagos/Fechados)
// P: Quanto tempo, em média, um carro fica estacionado? (Em minutos)
// ==============================================================================
print("\n--- [5] Tempo Médio de Permanência (Minutos) ---");
const relatorio5 = dbAS.tickets.aggregate([
    { $match: { status: "Pago", dataSaida: { $exists: true } } },
    {
        $project: {
            diferencaEmMilissegundos: { $subtract: ["$dataSaida", "$dataEntrada"] }
        }
    },
    {
        $group: {
            _id: null, // Grupo geral
            tempoMedioMinutos: { $avg: { $divide: ["$diferencaEmMilissegundos", 60000] } }
        }
    },
    { $project: { _id: 0, tempoMedioMinutos: { $round: ["$tempoMedioMinutos", 2] } } }
]).toArray();
printjson(relatorio5);


// ==============================================================================
// RELATÓRIO 6: Ranking dos "Top 3" Clientes que mais gastaram
// P: Quem são nossos clientes VIPs baseados em faturamento?
// ==============================================================================
print("\n--- [6] Top 3 Clientes (VIPs) ---");
const relatorio6 = dbAS.tickets.aggregate([
    {
        $lookup: {
            from: "clientes",
            localField: "clienteId",
            foreignField: "_id",
            as: "infoCliente"
        }
    },
    { $unwind: "$infoCliente" },
    {
        $group: {
            _id: "$infoCliente.nome",
            totalGasto: { $sum: "$valorTotal" },
            visitas: { $sum: 1 }
        }
    },
    { $sort: { totalGasto: -1 } },
    { $limit: 3 }
]).toArray();
printjson(relatorio6);


// ==============================================================================
// RELATÓRIO 7: Faturamento por Tipo de Veículo (Carro, Moto, etc)
// P: Devemos focar mais em vagas de moto ou carro? Onde está a receita?
// ==============================================================================
print("\n--- [7] Faturamento por Tipo de Veículo ---");
const relatorio7 = dbAS.tickets.aggregate([
    {
        $lookup: {
            from: "vagas",
            localField: "vagaId",
            foreignField: "_id",
            as: "infoVaga"
        }
    },
    { $unwind: "$infoVaga" },
    {
        $group: {
            _id: "$infoVaga.tipo",
            totalReceita: { $sum: "$valorTotal" }
        }
    },
    { $sort: { totalReceita: -1 } }
]).toArray();
printjson(relatorio7);


// ==============================================================================
// RELATÓRIO 8: Histórico Diário de Faturamento
// P: Qual foi o faturamento dia após dia? (Tendência)
// ==============================================================================
print("\n--- [8] Histórico de Faturamento Diário ---");
const relatorio8 = dbAS.tickets.aggregate([
    { $match: { status: "Pago" } },
    {
        $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$dataSaida" } },
            totalDia: { $sum: "$valorTotal" },
            qtdTicketsPagos: { $sum: 1 }
        }
    },
    { $sort: { _id: 1 } } // Ordenar por data crescente
]).toArray();
printjson(relatorio8);