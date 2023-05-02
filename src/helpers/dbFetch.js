import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebase'

export const getData = async (table, field, value) => {
    let newArray = []
    const q = query(collection(db, table), where(field, '==', value))
    const data = await getDocs(q)
    data.forEach((doc) => {
        newArray.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return newArray
}

export const getAllData = async (table) => {
    let newArray = []
    const q = query(collection(db, table))
    const data = await getDocs(q)
    data.forEach((doc) => {
        newArray.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return newArray
}

export const getCount = async (table) => {
    const coll = collection(db, table)
    const snapshot = await getCountFromServer(coll)
    return snapshot.data().count
}

export const getCountWhere = async (table, field, value) => {
    const q = query(collection(db, table), where(field, '==', value))
    const snapshot = await getCountFromServer(q)
    return snapshot.data().count
}

export const getDataOrderBy = async (table, field, value, field2) => {
    let newArray = []
    const q = query(
        collection(db, table),
        where(field, '==', value),
        orderBy(field2),
        limit(50)
    )
    const data = await getDocs(q)
    data.forEach((doc) => {
        newArray.push({
            id: doc.id,
            ...doc.data(),
        })
    })
    return newArray
}

export const getDataById = async (table, id) => {
    const data = await getDoc(doc(db, table, id))
    return data.data()
}

export const addData = async (table, data) => {
    const newData = await addDoc(collection(db, table), data)
    return {
        id: newData.id,
        ...data,
    }
}

export const setData = async (table, id, data) => {
    const data1 = await setDoc(doc(db, table, id), data)
    console.log(data1)
}

export const deleteData = async (table, field, value) => {
    const q = query(collection(db, table), where(field, '==', value))
    const docs = await getDocs(q)
    docs.forEach((doc) => {
        deleteDoc(doc.ref)
    })
}

export const deleteDataById = async (table, id) => {
    deleteDoc(doc(db, table, id))
}

export const updateData = async (table, data, field, value) => {
    const q = query(collection(db, table), where(field, '==', value))
    const docs = await getDocs(q)
    docs.forEach((doc) => {
        updateDoc(doc, data)
    })
}

export const updateDataById = async (table, id, data) => {
    updateDoc(doc(db, table, id), data)
}
