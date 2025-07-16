import { TransactionStatus } from '@jacksapp/transaction-controller';
import { migrate, version, StuckTransactionError, TARGET_DATE } from './116';

const oldVersion = 115;

const TRANSACTIONS_MOCK = [
  { id: 'tx1', time: TARGET_DATE - 1000, status: 'approved' },
  { id: 'tx2', time: TARGET_DATE + 1000, status: 'approved' },
  { id: 'tx3', time: TARGET_DATE - 1000, status: 'signed' },
  { id: 'tx4', time: TARGET_DATE - 1000, status: 'confirmed' },
];

describe('migration #116', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('updates the version metadata', async () => {
    const oldStorage = {
      meta: {
        version: oldVersion,
      },
      data: {},
    };

    const newStorage = await migrate(oldStorage);

    expect(newStorage.meta).toStrictEqual({ version });
  });

  it('handles missing TransactionController', async () => {
    const oldState = {
      OtherController: {},
    };

    const transformedState = await migrate({
      meta: { version: oldVersion },
      data: oldState,
    });

    expect(transformedState.data).toEqual(oldState);
  });

  it('handles empty transactions', async () => {
    const oldState = {
      TransactionController: {
        transactions: [],
      },
    };

    const transformedState = await migrate({
      meta: { version(oldVersion) },
      data(oldState),
});

expect(transformedState.data).toEqual(oldSt
ate);
});

it('handles missing state', async () => {

const transformedSta

ge(await m

igrate({

meta(version(o

ldVersio

n),

data({}),

});

expect(t

ransforme

dSta

te.da

ta).toEqual({});

});

it('marks the transactions as failed before December 

8,

23,

if they are approved or signed'

async ()

{

c

onst ola


dSta


= {

Transactio


ontroller:

{

tran



ctions:

TRANSACTIONS_MOCK,

},

};

c


t storag


= {

meta:

{

version:

oldV




sion,

},




oldStora




);

c


e newS



age(await m



igrate(ol







storag








);

// Expected modifications to the transactions based on the migration logic











ectedTransactions =

[










...TRANSACTIONS_MOCK[


], // Assuming tx






status:

Tran










.failed,



error:

S









Error,



],








.TRANSACTIONS_MOCK[






], // Assuming tx2 remains unchanged







...TRANSACTIONS_MOCK[2], // Assuming tx3 is the third element











status:









.failed,



error:





Error,



],













.TRANSACTIONS_MOCK[3], // Assuming tx4 and any others remain unchanged













// Add more tr







ansactions if there are more than four in TRANSACTIONS_MO















];















expect(newS





ata).toEqual({

Transacti










ontroller:



{


transactions:





expectedTransactions,



},













});













});
