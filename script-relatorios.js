const dbAS = db.getSiblingDB('DatabaseAS');
print(`\n>>> GERANDO RELATÓRIOS PARA: ${dbAS.getName()} <<<\n`);

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
    { $sort: { totalUsos: -1 } }
]).toArray();
printjson(relatorio3);


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

const relatorio5 = dbAS.tickets.aggregate([
    { $match: { status: "Pago", dataSaida: { $exists: true } } },
    {
        $project: {
            diferencaEmMilissegundos: { $subtract: ["$dataSaida", "$dataEntrada"] }
        }
    },
    {
        $group: {
            _id: null,
            tempoMedioMinutos: { $avg: { $divide: ["$diferencaEmMilissegundos", 60000] } }
        }
    },
    { $project: { _id: 0, tempoMedioMinutos: { $round: ["$tempoMedioMinutos", 2] } } }
]).toArray();
printjson(relatorio5);

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
    { $sort: { _id: 1 } }
]).toArray();
printjson(relatorio8);
