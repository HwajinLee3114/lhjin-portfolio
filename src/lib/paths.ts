export const imagePath = {
  projectThumb: (filename: string) => `/images/project/thumb/${filename}`,
  projectDetail: (filename: string) => `/images/project/${filename}`,
  tech: (filename: string) => `/images/tech/${filename}`,
} as const
