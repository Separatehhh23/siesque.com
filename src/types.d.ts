type BlogEntry = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    tags: string[];
    author: string;
    description: string;
    publishDate: Date;
  };
};

export type { BlogEntry };
