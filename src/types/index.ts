export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[] | string;
  img: string;
  describe: string;
  language: string;
  content: string;
}

// 新增列表页使用的类型
export interface PostPreview {
  slug: string;
  title: string;
  date: string;
  tags: string[] | string;
  img: string;
  describe: string;
}