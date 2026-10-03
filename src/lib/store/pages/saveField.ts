const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const deepSetValue = (
  obj: Record<string, unknown>,
  path: string[],
  value: string
): boolean => {
  if (path.length === 0) return false;

  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[path[path.length - 1]] = value;
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

  const pathParts = [...fieldPath.split('.'), locale];
  deepSetValue(
    updatedPage.content[sectionIndex] as unknown as Record<string, unknown>,
    pathParts,
    value
  );

  try {
    const res = await fetch(`/api/cms/pages/${updatedPage.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPage),
    });
    if (res.ok) {
      console.log('Edit saved to kalp-admin successfully!');
    }
  } catch (err) {
    console.error('Failed to save edit to kalp-admin backend:', err);
  }

  return updatedPage;
};
