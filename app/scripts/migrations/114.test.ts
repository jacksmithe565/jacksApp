import { migrate, version } from './114';

const oldVersion = 113;

describe('migration #114', () => {
  afterEach(() => jest.resetAllMocks());

  it('updates the version metadata', async () => {
    const oldStorage = { meta: { version: oldVersion }, data: {} };
    const newStorage = await migrate(oldStorage);
    expect(newStorage.meta).toStrictEqual({ version });
  });

  describe('deprecates transactionSecurityCheckEnabled in PreferencesController', () => {
    it('sets securityAlertsEnabled and hasMigratedFromOpenSeaToBlockaid to true if transactionSecurityCheckEnabled is true', async () => {
      const oldData = { PreferencesController: { transactionSecurityCheckEnabled: true, securityAlertsEnabled: false } };
      const expectedState = { PreferencesController: { securityAlertsEnabled: true, hasMigratedFromOpenSeaToBlockaid: true } };
      const transformedState = await migrate({ meta: { version: oldVersion }, data: oldData });
      expect(transformedState.data).toEqual(expectedState);
    });

    it('should not change securityAlertsEnabled if transactionSecurityCheckEnabled is false', async () => {
      const oldData = { PreferencesController: { transactionSecurityCheckEnabled: false, securityAlertsEnabled: false } };
      const expectedState = { PreferencesController: { securityAlertsEnabled: false } };
      const transformedState = await migrate({ meta: { version }, data }); // Assuming 'data' is correct here
      expect(transformedState.data).toEqual(expectedState);
    });
  });

  it('should not change state in controllers other than PreferencesController', async () => {
    const oldStorage = {
      meta:{version},
      data:{PreferencesController:{bar:'baz'}, foo:'bar'},
    };
    expect(await migrate(oldStorage)).toHaveProperty(['data'],oldStorage.data);
  });
});
