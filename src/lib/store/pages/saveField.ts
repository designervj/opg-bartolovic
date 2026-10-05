const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const deepSetValue = (obj: Record<string, unknown>, fieldPath: string, value: string, locale: string): boolean => {
  const path = fieldPath.split('.').filter(Boolean);
  if (path.length === 0) return false;

  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = path[path.length - 1];
  const existingValue = current[lastKey];
  if (existingValue && typeof existingValue === 'object' && !Array.isArray(existingValue)) {
    (existingValue as Record<string, unknown>)[locale] = value;
  } else {
    current[lastKey] = value;
  }
  return true;
};

export const saveField = async (
  currentPage: any,
  sectionId: string,
  fieldPath: string,
  value: string,
  locale: string = 'en'
): Promise<any> => {
  if (!currentPage) {
    throw new Error('No current page loaded.');
  }

  const updatedPage = deepClone(currentPage);
  if (!Array.isArray(updatedPage.content)) {
    throw new Error('Page content is malformed.');
  }

  const sectionIndex = updatedPage.content.findIndex(
    (section: any) => section.id === sectionId || section.type === sectionId || section.adminTitle === sectionId
  );

  if (sectionIndex === -1) {
    throw new Error('Section not found.');
  }

  deepSetValue(
    updatedPage.content[sectionIndex] as unknown as Record<string, unknown>,
    fieldPath,
    value,
    locale
  );

  const rawPageId = updatedPage.id || updatedPage._id || updatedPage.slug;
  const pageId = typeof rawPageId === 'object' ? rawPageId?.$oid || String(rawPageId) : String(rawPageId || updatedPage.slug || '');
  const {
    id,
    _id,
    createdAt,
    updatedAt,
    currentRevisionId,
    publishedRevisionId,
    headVersion,
    studioRevision,
    updatedBy,
    ...pageUpdatePayload
  } = updatedPage;

  if (!pageId) {
    throw new Error('No page id or slug available for saving.');
  }

  const saveTargets = Array.from(new Set([pageId, updatedPage.slug].filter(Boolean)));
  let lastError = '';

  for (const target of saveTargets) {
    const res = await fetch(`/api/cms/pages/${encodeURIComponent(target)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageUpdatePayload),
    });

    if (res.ok) {
      console.log('Edit saved to kalp-admin successfully!');
      await res.json().catch(() => null);
      return updatedPage;
    }

    lastError = await res.text().catch(() => `HTTP ${res.status}`);
  }

  throw new Error(`Failed to save edit to kalp-admin backend: ${lastError || 'unknown error'}`);
};
