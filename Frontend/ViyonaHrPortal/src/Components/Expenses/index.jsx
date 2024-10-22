import { useState } from 'react';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';

const initialTransactions = [
    { id: 'EMP001', item: 'Laptop', orderBy: 'John Doe', from: 'Amazon', date: '2024-03-10', paidBy: 'Visa', status: 'Approved', amount: '500' },
    { id: 'EMP002', item: 'Desktop', orderBy: 'Jane Smith', from: 'Flipkart', date: '2024-02-15', paidBy: 'Razorpay', status: 'Rejected', amount: '1200' },
    { id: 'EMP003', item: 'Mobile', orderBy: 'John Doe', from: 'Flipkart', date: '2024-02-15', paidBy: 'Razorpay', status: 'Rejected', amount: '1200' },
    { id: 'EMP001', item: 'Laptop', orderBy: 'John Doe', from: 'Amazon', date: '2024-03-10', paidBy: 'Visa', status: 'Approved', amount: '500' },
    { id: 'EMP002', item: 'Desktop', orderBy: 'Jane Smith', from: 'Flipkart', date: '2024-02-15', paidBy: 'Razorpay', status: 'Rejected', amount: '1200' },
    { id: 'EMP003', item: 'Mobile', orderBy: 'John Doe', from: 'Flipkart', date: '2024-02-15', paidBy: 'Razorpay', status: 'Rejected', amount: '1200' },
    
    
];

const Expenses = () => {
    const [transactions] = useState(initialTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10); 

    const filteredTransactions = transactions.filter(transaction =>
        transaction.orderBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalEntries = filteredTransactions.length;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredTransactions.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    const getPaymentTypeImage = (paidBy) => {
        switch (paidBy) {
            case 'Visa':
                return '/images/visa.png';  
            case 'PayPal':
                return '/images/paypal.png';  
            case 'Razorpay':
                return '/images/razorpay.png';
            default:
                return '/images/default-payment.png';  
        }
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <h1 className="main-home-head">Expenses</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>

            <div className="department-list-container ">
                <div className="header">
                    <div className="entries-dropdown">
                        <label htmlFor="entriesPerPage">Show </label>
                        <select
                            id="entriesPerPage"
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <label htmlFor="entriesPerPage"> Entries</label>
                    </div>

                    <div className="header-actions">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search orders by client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Order By</th>
                            <th>From</th>
                            <th>Date</th>
                            <th>Paid By</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.item}</td>
                                <td>{transaction.orderBy}</td>
                                <td>{transaction.from}</td>
                                <td>{transaction.date}</td>
                                <td>
                                    <img 
                                        src={getPaymentTypeImage(transaction.paidBy)} 
                                        alt={transaction.paidBy} 
                                        style={{ width: '40px', height: 'auto' }} 
                                    />
                                </td>
                                <td style={{ color: transaction.status === 'Approved' ? 'green' : 'red' }}>{transaction.status}</td> {/* Conditional color based on status */}
                                <td>{transaction.amount} INR</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries</span>
                    <div className="pagination-controls">
                        <button className="previous-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : 'number-button'}>
                                {number}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
