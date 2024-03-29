import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types/user';
import { Question, Quiz } from '../types/quiz';

export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
  const userDocRef = doc(db, 'users', userId);

  try {
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      await updateDoc(userDocRef, userData);
    } else {
      await setDoc(userDocRef, userData, { merge: true });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchUsers = (callback: (users: User[]) => void) => {
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
        imageUrl: userData.imageUrl,
      };
    });
    callback(users);
  });

  return unsubscribe;
};

export const fetchUserById = (userId: string, callback: (user: User | null) => void) => {
  const userDocRef = doc(db, 'users', userId);
  const unsubscribe = onSnapshot(userDocRef, (userDocSnapshot) => {
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData) {
        const user: User = {
          id: userDocSnapshot.id,
          name: userData.name,
          points: userData.points,
          highScore: userData.highScore,
          imageUrl: userData.imageUrl,
        };
        callback(user);
      }
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const quizzesRef = collection(db, 'quizzes');
  const quizSnapshot = await getDocs(quizzesRef);

  const quizzes: Quiz[] = await Promise.all(quizSnapshot.docs.map(async (doc) => {
    const quizData = doc.data();
    const questionsRef = collection(doc.ref, 'questions');
    const questionsSnapshot = await getDocs(questionsRef);
    const questions = questionsSnapshot.docs.map((questionDoc) => questionDoc.data()) as Question[];

    return {
      name: quizData.name,
      questions: questions.length,
      image: quizData.image,
      id: doc.id,
      questionsData: questions,
    };
  }));

  return quizzes;
};

export const fetchQuizById = async (quizId: string): Promise<Quiz | null> => {
  const quizDocRef = doc(db, 'quizzes', quizId);
  const quizDocSnapshot = await getDoc(quizDocRef);

  if (quizDocSnapshot.exists()) {
    const quizData = quizDocSnapshot.data();
    if (quizData) {
      const questionsRef = collection(quizDocRef, 'questions');
      const questionsSnapshot = await getDocs(questionsRef);
      const questions = questionsSnapshot.docs.map((questionDoc) => questionDoc.data()) as Question[];

      return {
        name: quizData.name,
        questions: questions.length,
        image: quizData.image,
        id: quizDocSnapshot.id,
        questionsData: questions,
      };
    }
  }

  return null;
};