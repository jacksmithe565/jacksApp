import React from 'react';
import { DisconnectAllModal, DisconnectType } from '.';

export default {
  title: 'Components/Multichain/DisconnectAllModal',
  component: DisconnectAllModal,
  argTypes: {
    type: { control: 'string' },
    hostname: { control: 'string' },
    onClose: { action: 'onClose' },
    onClick: { action: 'onClick' }
  },
  args: {
    type: DisconnectType.Account,
    hostname: 'portfolio.jacksapp.io',
    onClick: () => {},
    onClose: () => {},
  }
};

export const Default = (args) => <DisconnectAllModal {...args} />;
