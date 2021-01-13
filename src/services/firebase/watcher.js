import { CATEGORIES, TASKS, } from '../../constants';
import { auth, db } from './setup';

export function watchUserChanges(callback) {
    const unsub = auth.onAuthStateChanged((user) => {
        if (user && !user.isAnonymous) {
            callback({
                id: user.uid,
                email: user.email,
                displayName: user.displayName,
            });
        } else {
            callback(null);
        }
    });

    return unsub;
}

export function watchTasks(callback) {
    const unsub = db
        .collection(TASKS)
        .onSnapshot((snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({ ...data, id: doc.id, });
            });

            callback(docs);
        });

    return unsub;
}

export function watchCategories(callback) {
    const unsub = db
        .collection(CATEGORIES)
        .onSnapshot((snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({ ...data, id: doc.id, });
            });

            callback(docs);
        });

    return unsub;
}

export function watchColors(callback) {
    const unsub = db
        .collection('colors')
        .onSnapshot((snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({ ...data, id: doc.id, });
            });

            callback(docs);
        });

    return unsub;
}

export function watchIcons(callback) {
    const unsub = db
        .collection('icons')
        .onSnapshot((snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                docs.push({ ...data, id: doc.id, });
            });

            callback(docs);
        });

    return unsub;
}