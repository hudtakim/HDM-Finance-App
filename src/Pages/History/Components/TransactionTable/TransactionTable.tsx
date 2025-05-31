import React from "react";
import styles from "./style.module.scss";

type Transaction = {
  Timestamp: string;
  User: string;
  Kategori: string;
  Jumlah: number;
  Keterangan: string;
};

type TransactionTableProps = {
  data: Transaction[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Kategori</th>
            <th>Jumlah</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx, index) => (
            <tr key={index}>
              <td>{new Date(tx.Timestamp).toLocaleString()}</td>
              <td>{tx.User}</td>
              <td>{tx.Kategori}</td>
              <td>{tx.Jumlah.toLocaleString("id-ID")}</td>
              <td>{tx.Keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;