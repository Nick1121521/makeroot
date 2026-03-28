import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AcquisitionTaxPage from './pages/AcquisitionTaxPage';
import RentComparisonPage from './pages/RentComparisonPage';
import YieldCalculatorPage from './pages/YieldCalculatorPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/acquisition-tax" element={<AcquisitionTaxPage />} />
          <Route path="/rent-comparison" element={<RentComparisonPage />} />
          <Route path="/yield-calculator" element={<YieldCalculatorPage />} />
          <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
