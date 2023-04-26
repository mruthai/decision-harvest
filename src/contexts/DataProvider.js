import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, query, deleteDoc, deleteField, updateDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'


export const DataContext = createContext()

export const DataProvider = function(props) {
    const [stockData, setStockData] = useState({})
    const [corns, setCorns] = useState([])
    const [soybeans, setSoybeans] = useState([])
    const { user, userId } = useContext(AuthContext)
    const db = getFirestore()


/* COMMODITIES CORN DATA FUNCTIONS */

async function getStockData(API_KEY) {
    const response = await fetch(`https://www.alphavantage.co/query?function=Corn&interval=monthly&apikey=${API_KEY}`)
    const data = await response.json()
    setStockData(data)
    return data
}

    useEffect(() => {
        async function getCorn() {
            const postQuery = query(collection(db, 'users', userId, 'corns'))    /* userID, Cities to only have user view their own collection */
            const querySnapshot = await getDocs(postQuery)
            const loadedCorn = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, doc.data())
                loadedCorn.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                
                })
                console.log(loadedCorn)
            })
             setCorns(loadedCorn)
             console.log(querySnapshot)
        }

        if (user.loggedIn) {
            getCorn()
        }
    }, [userId])

   
    async function addCorn(corn, valueCorn, bushels) {
        const newCorn = {
            corn,
            valueCorn,
            bushels,
            dateCreated: Timestamp.now()
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, 'corns'), newCorn)
        
        newCorn.id = docRef.id
        
        setCorns ([
            newCorn,
            ...corns
        ])
        window.location.reload()
        return newCorn
    }
    

    async function deleteCorn(uid, id) {
        try {
        const docRef = doc(db,`users/${user.uid}/corns/${uid}`);
        console.log('docRef:', docRef);
        await deleteDoc(docRef);
        console.log('Document successfully deleted.');
        setCorns(prevCorns => prevCorns.filter(corns => corns.uid !== id))
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
       


/* COMMODITIES SOYBEAN DATA FUNCTIONS */

    useEffect(() => {
        async function getSoybeans() {
            const postQuery = query(collection(db, 'users', userId, 'soybeans'))    /* userID, Cities to only have user view their own collection */
            const querySnapshot = await getDocs(postQuery)
            const loadedSoybeans = []
            querySnapshot.forEach((doc) => {
                loadedSoybeans.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                
                })
                console.log(loadedSoybeans)
            })
             setSoybeans(loadedSoybeans)
        }

        if (user.loggedIn) {
            getSoybeans()
        }
    }, [userId])


    async function addSoybeans(soybean) {
        const newSoybeans = {
            soybean,
            dateCreated: Timestamp.now()
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, 'soybeans'), newSoybeans)
        newSoybeans.id = docRef.id

        setSoybeans ([
            newSoybeans,
            ...soybeans
        ])
        window.location.reload()
        return newSoybeans
    }

    const value = {
        getStockData,
        stockData,
        addCorn,
        corns,
        addSoybeans,
        soybeans,
        deleteCorn 

        // getCorn
        
    
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )

}