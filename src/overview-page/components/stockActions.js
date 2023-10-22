import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const fakeBuyStock = async (userId, symbol, quantity, price, google_mid, name, currency, isStocks) => {
    try {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', userId);
        const holdingsRef = collection(userRef, 'holdings');
        // Calculate the total price for this transaction
        const totalPrice = quantity * price;
        // Check if the user already owns this stock
        const existingHoldings = await getDocs(query(holdingsRef, where('symbol', '==', symbol)));
        if (existingHoldings.size > 0) {
          // Update the quantity if the user already owns this stock
          const stockDoc = existingHoldings.docs[0];
          await updateDoc(stockDoc.ref, {
            quantity: stockDoc.data().quantity + quantity,
            totalPrice
          });
        } else {
          // Add the stock to the user's holdings if they don't already own it
          await addDoc(holdingsRef, {
            symbol,
            quantity,
            totalPrice,
            google_mid,
            name,
            currency,
            isStocks
          });
        }
      
        // Record the transaction
        const transactionsRef = collection(userRef, 'transactions');
        await addDoc(transactionsRef, {
          type: 'buy',
          symbol,
          quantity,
          price,
          totalPrice,
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
        const holdingsRef = collection(userRef, 'holdings');
        const totalPrice = quantity * price;
  
        // Check if the user owns this stock
        const existingHoldings = await getDocs(query(holdingsRef, where('symbol', '==', symbol)));
  
        if (existingHoldings.size > 0 && existingHoldings.docs[0].data().quantity >= quantity) {
            // Update the quantity if the user has enough of this stock
            const stockDoc = existingHoldings.docs[0];
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
