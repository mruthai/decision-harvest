import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, query, deleteDoc, deleteField, updateDoc } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'


export const DataContext = createContext()

export const DataProvider = function(props) {
    const [stockData, setStockData] = useState({})
    const [corns, setCorns] = useState([])
    const [soybeans, setSoybeans] = useState([])
    const [currentWeatherData, setCurrentWeatherData] = useState({})
    const [cities, setCities] = useState([])
    const { user, userId } = useContext(AuthContext)
    const db = getFirestore()

/* Weather Data Functions */
    useEffect(() => {
        async function getCities() {
            const postQuery = query(collection(db, 'users', userId, 'cities'))    /* userID, Cities to only have user view their own collection */
            const querySnapshot = await getDocs(postQuery)
            const loadedCities = []
            querySnapshot.forEach((doc) => {
                 console.log(doc.id, doc.data())
                loadedCities.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                
                })
                console.log(loadedCities)
                
            })
            setCities(loadedCities)
        }

       if (user.loggedIn ) {
        getCities()
       }
        
    }, [userId])

    async function getWeatherDoc(uid, id) {
        const docRef = doc(db, 'users', uid, 'cities', id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            throw new Error()
        }
        return docSnap.data()
    }

    
    async function getCurrentWeatherData(API_KEY_W, zip) {
        console.log('check dataprovider weather working')
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY_W}&q=${zip}&aqi=no`)
        const data = await response.json()
        console.log(data)
        setCurrentWeatherData(data)
        
    }

    async function addCity(zip) {
        const newCity = {
            zip
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, 'cities'), newCity)
        newCity.id = docRef.id

        setCities ([
            newCity,
            ...cities
        ])
        window.location.reload()
        return newCity
    }
/* COMMODITIES CORN DATA FUNCTIONS */

async function getStockData(API_KEY) {
    const response = await fetch(`https://commodities-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=`)
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

    // async function showCorn(uid,id) {
    //     const docRef = doc(db, 'users', uid, 'corn', id)
    //     const docSnap = await getDoc(docRef)
    //     if (!docSnap.exists()) {
    //         throw new Error
    //     }
    //     return docSnap.data()
    // }    
    async function addCorn(corn) {
        const newCorn = {
            corn,
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
       

    // async function deleteCorn(uid) {
    //     console.log( 'deleteCorn1')
    //     const docRef = doc(db, 'users/' + user.uid + '/corns/' + uid)
    //     console.log( 'deleteCorn2')
    //     console.log(docRef)
    //     await deleteDoc(docRef)
    //     console.log( 'deleteCorn3')
    //     setCorns(lastCorn=>lastCorn.filter(corns => corns.uid !== uid))
    //     console.log( 'deleteCorn4')
       
    // }
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

    

    // async function showOneSoybeans(uid,id) {
    //     const docRef = doc(db, 'users', uid, 'Soybeans', id)
    //     const docSnap = await getDoc(docRef)
    //     if (!docSnap.exists()) {
    //         throw new Error
    //     }
    //     return docSnap.data()
    // }

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
        // getWeatherDoc,
        getCurrentWeatherData,
        currentWeatherData,
        cities,
        addCity,
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