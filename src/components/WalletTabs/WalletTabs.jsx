import { useState } from 'react';
import {
  Container,
  Box,
  TabLink,
  Outlet,
  TransactWrapper,
  SummaryWrapper,
} from './styled';
import TransactionsList from 'components/TransactionsList/TransactionsList';
import InputTransactionForm from 'components/InputTransactionForm/InputTransactionForm';
import Summary from 'components/Summary/Summary';

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('expense');
  // const handleTab = e => {
  //   setActiveTab(e.currentTarget.id);
  // };

  return (
    <Container>
      <Box>
        <TabLink
          className={activeTab === 'expense' ? 'isActive' : null}
          id="expense"
          onClick={() => setActiveTab('expense')}
        >
          Expenses
        </TabLink>
        <TabLink
          className={activeTab === 'income' ? 'isActive' : null}
          id="income"
          onClick={() => setActiveTab('income')}
        >
          Income
        </TabLink>
      </Box>

      <Outlet>
        <>
          <InputTransactionForm type={activeTab} />
          <TransactWrapper>
            <TransactionsList type={activeTab} />
            <SummaryWrapper>
              <Summary />
            </SummaryWrapper>
          </TransactWrapper>
        </>
      </Outlet>
    </Container>
  );
};
