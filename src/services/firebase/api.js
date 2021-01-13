import { TASKS, } from '../../constants';
import { db } from './setup';

export async function createTask(data) {
    return await db.collection(TASKS).doc().set(data);
}

export async function deleteTask(id) {
    return await db.collection(TASKS).doc(id).delete();
}

export async function updateTask(id, data) {
    return await db.collection(TASKS).doc(id).update(data);
}