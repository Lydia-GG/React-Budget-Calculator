import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { useState } from 'react';
const { v4: uuid } = require('uuid');

const initialExpenses = [
  {
    id: uuid(),
    charge: 'rent',
    amount: 1600,
  },
  {
    id: uuid(),
    charge: 'car payment',
    amount: 400,
  },
  {
    id: uuid(),
    charge: 'credit card bill',
    amount: 1200,
  },
];

console.log(initialExpenses);

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      const newExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, newExpense]);
      handleAlert({ type: 'success', text: 'item added' });
      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text: 'Charge and Amount are required .',
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
  };

  const handleDelete = (id) => {
    console.log(`item deleted: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`item edited: ${id}`);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1> Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total Spending:{' '}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
