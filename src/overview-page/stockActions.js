import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const fakeBuyStock = async (userId, symbol, quantity, price) => {
    try {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', userId);
        const portfolioRef = collection(userRef, 'portfolio');
    
        // Check if the user already owns this stock
        const existingStock = await getDocs(query(portfolioRef, where('symbol', '==', symbol)));
    
        if (existingStock.size > 0) {
          // Update the quantity if the user already owns this stock
          const stockDoc = existingStock.docs[0];
          await updateDoc(stockDoc.ref, {
            quantity: stockDoc.data().quantity + quantity,
          });
        } else {
          // Add the stock to the user's portfolio if they don't already own it
          await addDoc(portfolioRef, {
            symbol,
            quantity,
          });
        }
    
        // Record the transaction
        const transactionsRef = collection(userRef, 'transactions');
        await addDoc(transactionsRef, {
          type: 'buy',
          symbol,
          quantity,
          price,
          timestamp: new Date(),
        });
    
        return true; // Success
      } catch (error) {
        console.error('Error buying stock:', error);
        return false; // Error occurred
      }
  };
  
  export const fakeSellStock = async (userId, symbol, quantity, price) => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      const portfolioRef = collection(userRef, 'portfolio');
  
      // Check if the user owns this stock
      const existingStock = await getDocs(query(portfolioRef, where('symbol', '==', symbol)));
  
      if (existingStock.size > 0 && existingStock.docs[0].data().quantity >= quantity) {
        // Update the quantity if the user has enough of this stock
        const stockDoc = existingStock.docs[0];
        await updateDoc(stockDoc.ref, {
          quantity: stockDoc.data().quantity - quantity,
        });
  
        // Record the transaction
        const transactionsRef = collection(userRef, 'transactions');
        await addDoc(transactionsRef, {
          type: 'sell',
          symbol,
          quantity,
          price,
          timestamp: new Date(),
        });
  
        return true; // Success
      } else {
        return false; // User doesn't own enough of this stock
      }
    } catch (error) {
      console.error('Error selling stock:', error);
      return false; // Error occurred
    }
  };