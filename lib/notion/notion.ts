const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface NotionPost {
  id: string;
  title: string;
  date: string;
  types: string[];
  files: string[];
  author: string;
}

export async function getAllPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.DATABASE_ID,
    sorts: [
      {
        //createdateカラムの値で降順に並べる
        property: "createdate",
        direction: "descending",
      },
    ],
  });
  const posts = response.results;
  const postsProperties = posts.map((post: any) => {
    // レコードidの取り出し
    const id = post.id;

    // titleプロパティの取り出し
    const title = post.properties.title.title[0]?.plain_text;

    // dateプロパティの取り出し
    // const date = post.properties.createdate.date.start;

    // multi_selectプロパティの取り出し（例：types）
    const types = post.properties.types.multi_select.map(
      (item: any) => item.name
    );

    // filesプロパティの取り出し（例：file）
    const files = post.properties.file.files.map((file: any) => file.file.url);

    // peopleプロパティの取り出し（例：author）
    // const author = post.properties.author.select.name;

    // プロパティをまとめたオブジェクトを返す
    return { id, title, types, files };
  });
  return postsProperties;
}