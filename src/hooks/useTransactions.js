import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Create query WITHOUT orderBy to avoid index requirement
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', currentUser.uid)
      // No orderBy here - we'll sort on the client side
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const transactionData = [];
        snapshot.forEach((doc) => {
          transactionData.push({ 
            id: doc.id, 
            ...doc.data() 
          });
        });
        
        // Sort by date on the client side (newest first)
        transactionData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // Descending order
        });
        
        setTransactions(transactionData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentUser]);

  const addTransaction = async (transaction) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      // No need to refresh - onSnapshot will update automatically
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const transactionRef = doc(db, 'transactions', id);
      await updateDoc(transactionRef, updatedTransaction);
      // No need to refresh - onSnapshot will update automatically
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const transactionRef = doc(db, 'transactions', id);
      await deleteDoc(transactionRef);
      // No need to refresh - onSnapshot will update automatically
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
};