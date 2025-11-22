/**
 * SCRIPT DE CRIAÇÃO E POPULAÇÃO - DATABASE: DatabaseAS
 * * VERSÃO SIMPLIFICADA: Veículo como String
 * * Como usar no MongoDB Compass:
 * 1. Abra o terminal integrado (_MONGOSH).
 * 2. Cole o código.
 * 3. Pressione Enter.
 * 4. Dê Refresh nos databases.
 */

// 1. Selecionar (ou criar) o Banco de Dados 'DatabaseAS'
const dbAS = db.getSiblingDB('DatabaseAS');

print(`=================================================`);
print(`INICIANDO OPERAÇÃO NO BANCO: ${dbAS.getName()}`);
print(`=================================================`);

// 2. Limpar o banco
dbAS.dropDatabase();
print("Banco 'DatabaseAS' limpo/resetado com sucesso.");

// ==========================================
// 3. DEFINIÇÃO E INSERÇÃO DE DADOS
// ==========================================

// --- COLLECTION: CLIENTES (30 itens) ---
print("Inserindo 30 Clientes...");
const clientes = [
  // -- 10 Primeiros (Usados nos Tickets) --
  { _id: ObjectId("650000000000000000000001"), nome: "Carlos Oliveira", cpf: "111.222.333-44", tipo: "Mensalista", veiculo: "Civic Prata - ABC-1234" },
  { _id: ObjectId("650000000000000000000002"), nome: "Ana Souza", cpf: "222.333.444-55", tipo: "Avulso", veiculo: "HB20 Branco - DEF-5678" },
  { _id: ObjectId("650000000000000000000003"), nome: "Marcos Lima", cpf: "333.444.555-66", tipo: "Mensalista", veiculo: "Corolla Preto - GHI-9012" },
  { _id: ObjectId("650000000000000000000004"), nome: "Fernanda Costa", cpf: "444.555.666-77", tipo: "Avulso", veiculo: "Fit Vermelho - JKL-3456" },
  { _id: ObjectId("650000000000000000000005"), nome: "Roberto Santos", cpf: "555.666.777-88", tipo: "Avulso", veiculo: "Gol Prata - MNO-7890" },
  { _id: ObjectId("650000000000000000000006"), nome: "Julia Pereira", cpf: "666.777.888-99", tipo: "Mensalista", veiculo: "Compass Cinza - PQR-1234" },
  { _id: ObjectId("650000000000000000000007"), nome: "Lucas Mendes", cpf: "777.888.999-00", tipo: "Avulso", veiculo: "Onix Laranja - STU-5678" },
  { _id: ObjectId("650000000000000000000008"), nome: "Patricia Alves", cpf: "888.999.000-11", tipo: "Mensalista", veiculo: "Renegade Verde - VWX-9012" },
  { _id: ObjectId("650000000000000000000009"), nome: "Bruno Rocha", cpf: "999.000.111-22", tipo: "Avulso", veiculo: "Fiesta Azul - YZA-3456" },
  { _id: ObjectId("650000000000000000000010"), nome: "Carla Dias", cpf: "000.111.222-33", tipo: "Avulso", veiculo: "Kicks Branco - BCD-7890" },
  
  // -- Mais 20 Clientes --
  { _id: ObjectId("650000000000000000000011"), nome: "Ricardo Gomes", cpf: "123.456.789-00", tipo: "Mensalista", veiculo: "Fusca Azul - EEE-1111" },
  { _id: ObjectId("650000000000000000000012"), nome: "Mariana Silva", cpf: "234.567.890-11", tipo: "Avulso", veiculo: "Uno Prata - FFF-2222" },
  { _id: ObjectId("650000000000000000000013"), nome: "Gustavo Henrique", cpf: "345.678.901-22", tipo: "Mensalista", veiculo: "Cruze Preto - GGG-3333" },
  { _id: ObjectId("650000000000000000000014"), nome: "Larissa Manoela", cpf: "456.789.012-33", tipo: "Avulso", veiculo: "Mobi Vermelho - HHH-4444" },
  { _id: ObjectId("650000000000000000000015"), nome: "Felipe Neto", cpf: "567.890.123-44", tipo: "Mensalista", veiculo: "Tracker Cinza - III-5555" },
  { _id: ObjectId("650000000000000000000016"), nome: "Amanda Nunes", cpf: "678.901.234-55", tipo: "Avulso", veiculo: "Argos Branco - JJJ-6666" },
  { _id: ObjectId("650000000000000000000017"), nome: "Thiago Ventura", cpf: "789.012.345-66", tipo: "Mensalista", veiculo: "T-Cross Azul - KKK-7777" },
  { _id: ObjectId("650000000000000000000018"), nome: "Bruna Marquezine", cpf: "890.123.456-77", tipo: "Avulso", veiculo: "Nivus Cinza - LLL-8888" },
  { _id: ObjectId("650000000000000000000019"), nome: "Neymar Jr", cpf: "901.234.567-88", tipo: "Mensalista", veiculo: "Ferrari Vermelho - MMM-9999" },
  { _id: ObjectId("650000000000000000000020"), nome: "Anitta Machado", cpf: "012.345.678-99", tipo: "Avulso", veiculo: "Lamborghini Roxo - NNN-0000" },
  { _id: ObjectId("650000000000000000000021"), nome: "Jorge Amado", cpf: "111.111.111-11", tipo: "Mensalista", veiculo: "Fusca Amarelo - OOO-1111" },
  { _id: ObjectId("650000000000000000000022"), nome: "Clarice Lispector", cpf: "222.222.222-22", tipo: "Avulso", veiculo: "Brasilia Azul - PPP-2222" },
  { _id: ObjectId("650000000000000000000023"), nome: "Machado de Assis", cpf: "333.333.333-33", tipo: "Mensalista", veiculo: "Opala Preto - QQQ-3333" },
  { _id: ObjectId("650000000000000000000024"), nome: "Monteiro Lobato", cpf: "444.444.444-44", tipo: "Avulso", veiculo: "Chevette Bege - RRR-4444" },
  { _id: ObjectId("650000000000000000000025"), nome: "Cecília Meireles", cpf: "555.555.555-55", tipo: "Mensalista", veiculo: "Kombi Branco - SSS-5555" },
  { _id: ObjectId("650000000000000000000026"), nome: "Vinicius de Moraes", cpf: "666.666.666-66", tipo: "Avulso", veiculo: "Maverick Laranja - TTT-6666" },
  { _id: ObjectId("650000000000000000000027"), nome: "Tom Jobim", cpf: "777.777.777-77", tipo: "Mensalista", veiculo: "Landau Preto - UUU-7777" },
  { _id: ObjectId("650000000000000000000028"), nome: "Elis Regina", cpf: "888.888.888-88", tipo: "Avulso", veiculo: "Corcel Verde - VVV-8888" },
  { _id: ObjectId("650000000000000000000029"), nome: "Tim Maia", cpf: "999.999.999-99", tipo: "Mensalista", veiculo: "Santana Vinho - XXX-9999" },
  { _id: ObjectId("650000000000000000000030"), nome: "Rita Lee", cpf: "000.000.000-00", tipo: "Avulso", veiculo: "Fusca Rosa - ZZZ-0000" }
];
dbAS.clientes.insertMany(clientes);


// --- COLLECTION: VAGAS (30 itens) ---
// IDs movidos para range 101-130 para evitar conflito com clientes
print("Inserindo 30 Vagas...");
const vagas = [
  // G1 (10 vagas)
  { _id: ObjectId("650000000000000000000101"), codigo: "G1-01", andar: "G1", tipo: "Carro", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000102"), codigo: "G1-02", andar: "G1", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000103"), codigo: "G1-03", andar: "G1", tipo: "Moto", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000104"), codigo: "G1-04", andar: "G1", tipo: "PCD", status: "Livre" },
  { _id: ObjectId("650000000000000000000105"), codigo: "G1-05", andar: "G1", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000106"), codigo: "G1-06", andar: "G1", tipo: "Carro", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000107"), codigo: "G1-07", andar: "G1", tipo: "Moto", status: "Livre" },
  { _id: ObjectId("650000000000000000000108"), codigo: "G1-08", andar: "G1", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000109"), codigo: "G1-09", andar: "G1", tipo: "PCD", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000110"), codigo: "G1-10", andar: "G1", tipo: "Carro", status: "Livre" },
  
  // Térreo (10 vagas)
  { _id: ObjectId("650000000000000000000111"), codigo: "T-01", andar: "Térreo", tipo: "Carro", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000112"), codigo: "T-02", andar: "Térreo", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000113"), codigo: "T-03", andar: "Térreo", tipo: "Moto", status: "Livre" },
  { _id: ObjectId("650000000000000000000114"), codigo: "T-04", andar: "Térreo", tipo: "Carro", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000115"), codigo: "T-05", andar: "Térreo", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000116"), codigo: "T-06", andar: "Térreo", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000117"), codigo: "T-07", andar: "Térreo", tipo: "PCD", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000118"), codigo: "T-08", andar: "Térreo", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000119"), codigo: "T-09", andar: "Térreo", tipo: "Moto", status: "Livre" },
  { _id: ObjectId("650000000000000000000120"), codigo: "T-10", andar: "Térreo", tipo: "Carro", status: "Ocupada" },

  // G2 (10 vagas)
  { _id: ObjectId("650000000000000000000121"), codigo: "G2-01", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000122"), codigo: "G2-02", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000123"), codigo: "G2-03", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000124"), codigo: "G2-04", andar: "G2", tipo: "Moto", status: "Livre" },
  { _id: ObjectId("650000000000000000000125"), codigo: "G2-05", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000126"), codigo: "G2-06", andar: "G2", tipo: "Carro", status: "Ocupada" },
  { _id: ObjectId("650000000000000000000127"), codigo: "G2-07", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000128"), codigo: "G2-08", andar: "G2", tipo: "PCD", status: "Livre" },
  { _id: ObjectId("650000000000000000000129"), codigo: "G2-09", andar: "G2", tipo: "Carro", status: "Livre" },
  { _id: ObjectId("650000000000000000000130"), codigo: "G2-10", andar: "G2", tipo: "Carro", status: "Livre" }
];
dbAS.vagas.insertMany(vagas);


// --- COLLECTION: FUNCIONARIOS ---
// IDs movidos para range 201+
print("Inserindo Funcionarios...");
const funcionarios = [
  { _id: ObjectId("650000000000000000000201"), nome: "João Silva", matricula: "OP-01", cargo: "Operador", turno: "Manhã" },
  { _id: ObjectId("650000000000000000000202"), nome: "Maria Oliveira", matricula: "OP-02", cargo: "Operador", turno: "Tarde" },
  { _id: ObjectId("650000000000000000000203"), nome: "Pedro Souza", matricula: "GR-01", cargo: "Gerente", turno: "Integral" },
  { _id: ObjectId("650000000000000000000204"), nome: "Clara Mendes", matricula: "OP-03", cargo: "Operador", turno: "Noite" },
  { _id: ObjectId("650000000000000000000205"), nome: "Paulo Ricardo", matricula: "SEG-01", cargo: "Segurança", turno: "Noturno" }
];
dbAS.funcionarios.insertMany(funcionarios);


// --- COLLECTION: TABELA_PRECOS ---
// ID movido para range 300+
print("Inserindo Tabelas de Preços...");
const tabelaPrecos = [
  {
    _id: ObjectId("650000000000000000000301"),
    nome: "Padrão 2025",
    regras: { valorHora: 10.00, horaAdicional: 5.00, tolerancia: 15 },
    ativo: true
  },
  {
    _id: ObjectId("650000000000000000000302"),
    nome: "Evento Show",
    regras: { valorUnico: 50.00 },
    ativo: false
  }
];
dbAS.tabela_precos.insertMany(tabelaPrecos);


// --- COLLECTION: TICKETS ---
// IDs atualizados para refletir as novas referências
print("Inserindo Tickets (com relacionamentos atualizados)...");
const tickets = [
  {
    _id: ObjectId("650000000000000000000401"),
    clienteId: ObjectId("650000000000000000000001"), // Carlos
    vagaId: ObjectId("650000000000000000000101"), // G1-01 (Antes era ...21, agora ...101)
    operadorEntradaId: ObjectId("650000000000000000000201"), // João (Antes ...41, agora ...201)
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "ABC-1234",
    dataEntrada: ISODate("2025-11-21T08:00:00Z"),
    dataSaida: null,
    valorTotal: 0.00,
    status: "Aberto"
  },
  {
    _id: ObjectId("650000000000000000000402"),
    clienteId: ObjectId("650000000000000000000002"),
    vagaId: ObjectId("650000000000000000000102"),
    operadorEntradaId: ObjectId("650000000000000000000201"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "DEF-5678",
    dataEntrada: ISODate("2025-11-20T10:00:00Z"),
    dataSaida: ISODate("2025-11-20T12:00:00Z"),
    valorTotal: 15.00,
    status: "Pago"
  },
  {
    _id: ObjectId("650000000000000000000403"),
    clienteId: ObjectId("650000000000000000000003"),
    vagaId: ObjectId("650000000000000000000103"),
    operadorEntradaId: ObjectId("650000000000000000000202"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "GHI-9012",
    dataEntrada: ISODate("2025-11-21T09:30:00Z"),
    dataSaida: null,
    valorTotal: 0.00,
    status: "Aberto"
  },
  {
    _id: ObjectId("650000000000000000000404"),
    clienteId: ObjectId("650000000000000000000004"),
    vagaId: ObjectId("650000000000000000000104"),
    operadorEntradaId: ObjectId("650000000000000000000202"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "JKL-3456",
    dataEntrada: ISODate("2025-11-20T14:00:00Z"),
    dataSaida: ISODate("2025-11-20T15:00:00Z"),
    valorTotal: 10.00,
    status: "Pago"
  },
  {
    _id: ObjectId("650000000000000000000405"),
    clienteId: ObjectId("650000000000000000000005"),
    vagaId: ObjectId("650000000000000000000111"), // T-01
    operadorEntradaId: ObjectId("650000000000000000000204"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "MNO-7890",
    dataEntrada: ISODate("2025-11-21T11:00:00Z"),
    dataSaida: null,
    valorTotal: 0.00,
    status: "Aberto"
  },
  {
    _id: ObjectId("650000000000000000000406"),
    clienteId: ObjectId("650000000000000000000006"),
    vagaId: ObjectId("650000000000000000000112"),
    operadorEntradaId: ObjectId("650000000000000000000201"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "PQR-1234",
    dataEntrada: ISODate("2025-11-19T08:00:00Z"),
    dataSaida: ISODate("2025-11-19T18:00:00Z"),
    valorTotal: 45.00,
    status: "Pago"
  },
  {
    _id: ObjectId("650000000000000000000407"),
    clienteId: ObjectId("650000000000000000000007"),
    vagaId: ObjectId("650000000000000000000113"),
    operadorEntradaId: ObjectId("650000000000000000000202"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "STU-5678",
    dataEntrada: ISODate("2025-11-19T10:00:00Z"),
    dataSaida: ISODate("2025-11-19T11:30:00Z"),
    valorTotal: 15.00,
    status: "Pago"
  },
  {
    _id: ObjectId("650000000000000000000408"),
    clienteId: ObjectId("650000000000000000000008"),
    vagaId: ObjectId("650000000000000000000114"),
    operadorEntradaId: ObjectId("650000000000000000000203"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "VWX-9012",
    dataEntrada: ISODate("2025-11-21T12:00:00Z"),
    dataSaida: null,
    valorTotal: 0.00,
    status: "Aberto"
  },
  {
    _id: ObjectId("650000000000000000000409"),
    clienteId: ObjectId("650000000000000000000009"),
    vagaId: ObjectId("650000000000000000000121"), // G2-01
    operadorEntradaId: ObjectId("650000000000000000000201"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "YZA-3456",
    dataEntrada: ISODate("2025-11-18T09:00:00Z"),
    dataSaida: ISODate("2025-11-18T10:00:00Z"),
    valorTotal: 10.00,
    status: "Pago"
  },
  {
    _id: ObjectId("650000000000000000000410"),
    clienteId: ObjectId("650000000000000000000010"),
    vagaId: ObjectId("650000000000000000000122"),
    operadorEntradaId: ObjectId("650000000000000000000202"),
    tabelaPrecoId: ObjectId("650000000000000000000301"),
    placaVeiculo: "BCD-7890",
    dataEntrada: ISODate("2025-11-18T14:00:00Z"),
    dataSaida: ISODate("2025-11-18T17:00:00Z"),
    valorTotal: 20.00,
    status: "Pago"
  }
];
dbAS.tickets.insertMany(tickets);

print("=================================================");
print("SUCESSO: Banco 'DatabaseAS' populado com 30 clientes e 30 vagas.");
print("=================================================");