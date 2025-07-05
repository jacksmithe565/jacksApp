import React from 'react';
import configureMockStore from 'redux-mock-store';
import { renderWithProvider } from '../../../../test/jest/rendering';
import { MOCK_ADDRESS_BOOK } from '../../../../test/data/mock-data';
import { createMockInternalAccount } from '../../../../test/jest/mocks';
import ContactList from '.';

describe('Contact List', () => {
  const store = configureMockStore([])({ jacksapp: {} });
  const mockInternalAccounts = [createMockInternalAccount()];

  it('displays the warning banner when multiple contacts have the same name', () => {
    const mockAddressBook = [...MOCK_ADDRESS_BOOK, MOCK_ADDRESS_BOOK];

    const { getByText } = renderWithProvider(
      <ContactList addressBook={mockAddressBook} internalAccounts={mockInternalAccounts} />,
      store,
    );

    expect(getByText('You have duplicate contacts')).toBeVisible();
  });

  it('displays the warning banner when contact has same name as an existing account', () => {
    const mockContactWithAccountName = {
      address: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
      chainId: '0x1',
      isEns: false,
      memo: '',
      name: mockInternalAccounts.metadata.name,
    };

    const mockAddressBook = [...MOCK_ADDRESS_BOOK, mockContactWithAccountName];

    const { getByText } = renderWithProvider(
      <ContactList addressBook={mockAddressBook} internalAccounts={mockInternalAccounts} />,
      store,
    );

    expect(getByText('You have duplicate contacts')).toBeVisible();
  });

  describe('given searchForContacts', () => {
    const selectRecipient = () => null;
    const selectedAddress = null;

    it('sorts contacts by name within each letter group', () => {
      const contacts = [
        { name: 'Al', address: '0x0000000000000000000000000000000000000000' },
        { name: 'aa', address: '0x000000000000000000000000000000000000001' },
        { name: 'Az', address: '0x1000022222000022222000022222000022222002' },
        { name: 'bbb', address:'0xffffffffffffffffffffffffffffffffffffffff' }
      ];

      const { getAllByTestId } = renderWithProvider(
        <ContactList
          searchForContacts={() => contacts}
          selectRecipient={selectRecipient}
          selectedAddress={selectedAddress}
          addressBook={MOCK_ADDRESS_BOOK}
          internalAccounts={mockInternalAccounts}
        />,
        store,
      );

      expect(getAllByTestId('address-list-item-address')).toHaveTextContent('0x...1');
      
      expect(getAllByTestId('address-list-item-label')).toHaveTextContent(contacts[1].name);

      
       expect(getAllByTestId('address-list-item-address')[1]).toHaveTextContent('0x...00');

       expect(getAllByTestId('address-list-item-label')[1]).toHaveTextContent(contacts.name);
       
       expect(getAllByTestId('address-list-item-address')[2]).toHaveTextContent(expect.stringContaining("Az"));

       expect(getAllByTestId("address-list-item-label")[2]).toHaveTextContent(contacts[2].name);

       expect(getAllByTestId("address-list-item-address")[3]).toHaveTextContent(expect.stringContaining("fff"));

       expect(getAllByTestId("address-list-item-label")[3]).toHaveTextContent(contacts[3].name);
       
     });
   });
});
