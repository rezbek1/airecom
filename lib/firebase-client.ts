/**
 * Firebase Client - сохранение и чтение проверок из Firestore
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { AICheckResult } from './ai-client';
import { ParsedWebsiteData, RobotsCheck, LLMsCheck } from './parser';

// Initialize Firebase Admin SDK (server-side only)
if (getApps().length === 0) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
      // Production: use service account
      initializeApp({
        credential: cert(JSON.parse(serviceAccount)),
      });
    } else {
      // Development: use environment variables
      initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
}

const db = getFirestore();

// Configure Firestore to ignore undefined properties
db.settings({ ignoreUndefinedProperties: true });

export interface CheckRecord {
  checkId: string;
  siteUrl: string;
  timestamp: number;
  email: string | null;
  isPremium: boolean;
  language: 'he' | 'ru' | 'en';
  parsedData: ParsedWebsiteData;
  robotsCheck: RobotsCheck;
  llmsCheck: LLMsCheck;
  results: {
    claude: AICheckResult;
    chatgpt: AICheckResult;
    perplexity: AICheckResult;
    grok: AICheckResult;
    gemini: AICheckResult;
  };
  visibilityScore: number;
  recommendations: {
    priority: string[];
    robots_txt_template?: string;
    llms_txt_template?: string;
    schema_org_needed: boolean;
  };
}

/**
 * Сохраняет результат проверки в Firebase
 */
export async function saveCheck(checkData: Omit<CheckRecord, 'checkId' | 'timestamp'>): Promise<string> {
  try {
    const checkId = `check_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const timestamp = Date.now();

    const record: CheckRecord = {
      checkId,
      timestamp,
      ...checkData,
    };

    // Определяем коллекцию в зависимости от наличия email
    const collectionPath = checkData.email
      ? `users/${checkData.email}/checks`
      : 'anonymous_checks';

    await db.collection(collectionPath).doc(checkId).set(record);

    console.log(`Check saved: ${checkId}`);
    return checkId;
  } catch (error) {
    console.error('Error saving check:', error);
    throw new Error('Failed to save check to database');
  }
}

/**
 * Получает последнюю проверку пользователя
 */
export async function getLastCheck(email: string): Promise<CheckRecord | null> {
  try {
    const snapshot = await db
      .collection(`users/${email}/checks`)
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as CheckRecord;
  } catch (error) {
    console.error('Error getting last check:', error);
    return null;
  }
}

/**
 * Получает все проверки пользователя (для Premium)
 */
export async function getAllChecks(
  email: string,
  limit: number = 10
): Promise<CheckRecord[]> {
  try {
    const snapshot = await db
      .collection(`users/${email}/checks`)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => doc.data() as CheckRecord);
  } catch (error) {
    console.error('Error getting all checks:', error);
    return [];
  }
}

/**
 * Получает проверку по ID
 */
export async function getCheckById(
  email: string | null,
  checkId: string
): Promise<CheckRecord | null> {
  try {
    const collectionPath = email
      ? `users/${email}/checks`
      : 'anonymous_checks';

    const doc = await db.collection(collectionPath).doc(checkId).get();

    if (!doc.exists) {
      return null;
    }

    return doc.data() as CheckRecord;
  } catch (error) {
    console.error('Error getting check by ID:', error);
    return null;
  }
}

/**
 * Проверяет, достиг ли пользователь лимита проверок (для Freemium)
 */
export async function checkRateLimit(email: string | null): Promise<{
  allowed: boolean;
  remaining: number;
  resetIn?: number;
}> {
  try {
    if (!email) {
      // Для анонимных пользователей - проверяем по IP (упрощенная логика)
      // В реальности нужно использовать Redis или Upstash Rate Limit
      return {
        allowed: true,
        remaining: 1,
      };
    }

    // Получаем проверки за последний час
    const oneHourAgo = Date.now() - 60 * 60 * 1000;

    const snapshot = await db
      .collection(`users/${email}/checks`)
      .where('timestamp', '>', oneHourAgo)
      .get();

    const checksCount = snapshot.size;
    const FREEMIUM_LIMIT = 5; // 5 проверок в час для freemium

    return {
      allowed: checksCount < FREEMIUM_LIMIT,
      remaining: Math.max(0, FREEMIUM_LIMIT - checksCount),
      resetIn: oneHourAgo + 60 * 60 * 1000 - Date.now(),
    };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return {
      allowed: true,
      remaining: 1,
    };
  }
}

/**
 * Проверяет Premium статус пользователя
 */
export async function checkPremiumStatus(email: string): Promise<boolean> {
  try {
    const userDoc = await db.collection('users').doc(email).get();

    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();
    return userData?.isPremium === true;
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
}

/**
 * Обновляет Premium статус пользователя
 */
export async function updatePremiumStatus(
  email: string,
  isPremium: boolean
): Promise<void> {
  try {
    await db.collection('users').doc(email).set(
      {
        email,
        isPremium,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating premium status:', error);
    throw new Error('Failed to update premium status');
  }
}

/**
 * Очищает старые проверки (для maintenance)
 */
export async function cleanupOldChecks(daysOld: number = 30): Promise<number> {
  try {
    const cutoffDate = Date.now() - daysOld * 24 * 60 * 60 * 1000;

    const snapshot = await db
      .collection('anonymous_checks')
      .where('timestamp', '<', cutoffDate)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`Cleaned up ${snapshot.size} old checks`);
    return snapshot.size;
  } catch (error) {
    console.error('Error cleaning up old checks:', error);
    return 0;
  }
}
