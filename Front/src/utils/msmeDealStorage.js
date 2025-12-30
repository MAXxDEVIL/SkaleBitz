export const getDealStorageKey = (userId) => (userId ? `msme_deal_${userId}` : 'msme_deal_default');

export const hasStoredDeal = (key) => (typeof window !== 'undefined' ? localStorage.getItem(key) === 'true' : false);

export const persistStoredDeal = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, 'true');
  }
};
