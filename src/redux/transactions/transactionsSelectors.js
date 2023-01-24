export const selectBalance = state => state.transactions.balance;

export const selectTransactions = state => state.transactions.transactions;
export const selectTransactionsOptions = state => {
  return state.transactions.transactionsOptions;
};

export const selectisLoadingOptions = state =>
  state.transactions.transactionsOptions.isLoading;
// export const selectTransactionsOptionsLength = state => {
//   console.log('Option:', selectTransactionsOptions(state));
//   return selectTransactionsOptions(state).length;
// };
