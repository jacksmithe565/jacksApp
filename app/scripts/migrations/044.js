import cloneDeep from 'lodash/cloneDeep';

const version = 44;

export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    if (versionedData.data?.AppStateController?.mkrMigrationReminderTimestamp !== undefined) {
      delete versionedData.data.AppStateController.mkrMigrationReminderTimestamp;
    }
    return versionedData;
  },
};
