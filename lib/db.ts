import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types/user';
import { Quiz } from '../types/quiz';

export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, orderBy('points', 'desc'));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        const userData = doc.data();
        return {
          id: doc.id,
          name: userData.name,
          points: userData.points,
          highScore: userData.highScore,
        };
      });
      resolve(users);
    });

    return unsubscribe;
  });
};

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const quizzesRef = collection(db, 'quizzes');
  const quizSnapshot = await getDocs(quizzesRef);

  const quizzes: Quiz[] = quizSnapshot.docs.map((doc) => {
    const quizData = doc.data();
    return {
      name: quizData.name,
      questions: quizData.questions,
      image: quizData.image,
      id: doc.id,
    };
  });

  return quizzes
};

export const fetchQuizById = async (quizId: string): Promise<Quiz | null> => {
  const quizDocRef = doc(db, 'quizzes', quizId);
  const quizDocSnapshot = await getDoc(quizDocRef);

  if (quizDocSnapshot.exists()) {
    const quizData = quizDocSnapshot.data();
    if (quizData) {
      return {
        name: quizData.name,
        questions: quizData.questions,
        image: quizData.image,
        id: quizDocSnapshot.id,
      };
    }
  }

  return null;
};