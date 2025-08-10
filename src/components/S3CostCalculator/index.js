import React, { useState } from 'react';
import styles from './styles.module.css';

export default function S3CostCalculator() {
  const [storage, setStorage] = useState(100);
  const [requests, setRequests] = useState(10000);
  const [dataTransfer, setDataTransfer] = useState(50);
  
  // Simple cost calculation (very approximate)
  const storageCost = storage * 0.023;
  const requestCost = requests * 0.0000004;
  const transferCost = dataTransfer * 0.09;
  const totalCost = storageCost + requestCost + transferCost;
  
  return (
    <div className={styles.calculator}>
      <h3>S3 Cost Estimator</h3>
      <div className={styles.sliderContainer}>
        <label>Storage (GB): {storage}</label>
        <input 
          type="range" 
          min="1" 
          max="1000" 
          value={storage} 
          onChange={(e) => setStorage(parseInt(e.target.value))} 
        />
      </div>
      
      <div className={styles.sliderContainer}>
        <label>Requests (per month): {requests}</label>
        <input 
          type="range" 
          min="1000" 
          max="1000000" 
          value={requests} 
          onChange={(e) => setRequests(parseInt(e.target.value))} 
        />
      </div>
      
      <div className={styles.sliderContainer}>
        <label>Data Transfer Out (GB): {dataTransfer}</label>
        <input 
          type="range" 
          min="0" 
          max="1000" 
          value={dataTransfer} 
          onChange={(e) => setDataTransfer(parseInt(e.target.value))} 
        />
      </div>
      
      <div className={styles.results}>
        <p>Estimated monthly cost: <strong>${totalCost.toFixed(2)}</strong></p>
        <small>This is a simplified estimate. For accurate pricing, use the <a href="https://calculator.aws" target="_blank">AWS Pricing Calculator</a>.</small>
      </div>
    </div>
  );
}
